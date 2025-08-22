import OrderFilter from "@/components/OrderFIlter";
import { ThemedText } from "@/components/ThemedText";
import CustomButton from "@/components/ui/CustomButton";
import EmptyOrders from "@/components/ui/EmptyOrders";
import orderItem from "@/components/ui/OrderItem";
import { enumService } from "@/constants/enumService";
import { formatDateYYYYMMDD } from "@/helpers/DateHelpers";
import { useWarehouses } from "@/hooks/warehouses/useWarehouses";
import { fetchOrders } from "@/service/ordersApi";
import { Order } from "@/types/Order";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native";
import { ItemType } from "react-native-dropdown-picker";

const TOP = 20;

export default function OrdersScreen() {
  const {
    data: warehouses,
    error: warehouseError,
    isLoading: isLoadingWarehouses,
  } = useWarehouses();

  // --- selected (effective) date range ---
  const [selectedStartDate, setSelectedStartDate] = useState<Date>(new Date());
  const [selectedEndDate, setSelectedEndDate] = useState<Date>(new Date());

  // --- staged (modal) date range ---
  const [stagedStartDate, setStagedStartDate] = useState<Date>(new Date());
  const [stagedEndDate, setStagedEndDate] = useState<Date>(new Date());

  // Warehouse items
  const warehouseItems = useMemo<ItemType<number>[]>(() => {
    const ws = (warehouses ?? []) as Array<{ id: number; name: string }>;
    return ws.map((w) => ({ label: w.name, value: w.id }));
  }, [warehouses]);

  // UI state
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filters (effective)
  const [selectedOperationTypes, setSelectedOperationTypes] = useState<
    number[]
  >([]);
  const [selectedStatusTypes, setSelectedStatusTypes] = useState<number[]>([]);
  const [selectedWarehouseId, setSelectedWarehouseId] = useState<number | null>(
    null
  );

  // Filters (staged in modal)
  const [stagedOperationTypes, setStagedOperationTypes] = useState<number[]>(
    []
  );
  const [stagedStatusTypes, setStagedStatusTypes] = useState<number[]>([]);
  const [stagedWarehouseId, setStagedWarehouseId] = useState<number | null>(
    null
  );

  // Dropdown source items
  const operationTypeItems = useMemo(
    () =>
      enumService.operationTypesForOrderCreate.map(
        (o) => ({ label: o.name, value: o.id } as ItemType<number>)
      ),
    []
  );

  const statusTypeItems = useMemo(
    () =>
      enumService.orderStatuses.map(
        (o) => ({ label: o.name, value: o.id } as ItemType<number>)
      ),
    []
  );

  const [operationItems, setOperationItems] =
    useState<ItemType<number>[]>(operationTypeItems);
  const [statusItems, setStatusItems] =
    useState<ItemType<number>[]>(statusTypeItems);

  // Open modal with current selections copied into staged state
  const openFilter = () => {
    setStagedOperationTypes(selectedOperationTypes);
    setStagedStatusTypes(selectedStatusTypes);
    setStagedWarehouseId(selectedWarehouseId);
    setStagedStartDate(selectedStartDate);
    setStagedEndDate(selectedEndDate);
    setIsModalOpen(true);
  };

  // Apply from modal → make staged values effective
  const handleApply = (next: {
    operationTypes: number[];
    statusTypes: number[];
    warehouseId: number | null;
    startDate: Date | null;
    endDate: Date | null;
  }) => {
    setSelectedOperationTypes(next.operationTypes);
    setSelectedStatusTypes(next.statusTypes);
    setSelectedWarehouseId(next.warehouseId);

    // Normalize dates and default to today if any is missing
    const today = new Date();
    const start = next.startDate ?? today;
    const end = next.endDate ?? today;
    const [a, b] = start > end ? [end, start] : [start, end];
    setSelectedStartDate(a);
    setSelectedEndDate(b);

    setIsModalOpen(false);
  };

  // Build $filter
  const filter = useMemo(() => {
    const parts: string[] = [
      "contains(itemName,'')",
      `businessDay ge ${formatDateYYYYMMDD(selectedStartDate)}`,
      `businessDay le ${formatDateYYYYMMDD(selectedEndDate)}`,
    ];

    if (selectedOperationTypes.length > 0) {
      parts.push(
        "(" +
          selectedOperationTypes
            .map((id) => `orderType eq ${id}`)
            .join(" or ") +
          ")"
      );
    }
    if (selectedStatusTypes.length > 0) {
      parts.push(
        "(" +
          selectedStatusTypes.map((id) => `statusInt eq ${id}`).join(" or ") +
          ")"
      );
    }
    if (selectedWarehouseId != null) {
      parts.push(`(warehouse/id eq ${selectedWarehouseId})`);
    }

    return parts.join(" and ");
  }, [
    selectedOperationTypes,
    selectedStatusTypes,
    selectedWarehouseId,
    selectedStartDate,
    selectedEndDate,
  ]);

  // --- paging & data fetch ---
  const [items, setItems] = useState<Order[]>([]);
  const [total, setTotal] = useState<number | undefined>(undefined);
  const [skip, setSkip] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const baseParams = useMemo(() => {
    const p = new URLSearchParams();
    p.set("$count", "true");
    p.set("$select", "id,itemName,businessDay,statusInt,status");
    p.set(
      "$expand",
      "GGDDLine($expand=GGDD($select=itemName);$select=id,ggddId)"
    );
    // ✅ sort only by businessDay ascending
    p.set("$orderby", "businessDay asc");
    p.set("$filter", filter);
    return p;
  }, [filter]);

  const makeQuery = useCallback(
    (skipVal: number) => {
      const p = new URLSearchParams(baseParams as any);
      p.set("$top", String(TOP));
      p.set("$skip", String(skipVal));
      return `?${p.toString()}`;
    },
    [baseParams]
  );

  useEffect(() => {
    abortRef.current?.abort();
    const ac = new AbortController();
    abortRef.current = ac;
    setLoading(true);
    setError(null);
    setSkip(0);
    fetchOrders(makeQuery(0))
      .then((res) => {
        setItems(res.value ?? []);
        setTotal(res["@odata.count"]);
      })
      .catch((e) => !ac.signal.aborted && setError(String(e)))
      .finally(() => !ac.signal.aborted && setLoading(false));
    return () => ac.abort();
  }, [makeQuery]);

  const hasMore = total === undefined ? true : items.length < total;

  const loadMore = useCallback(() => {
    if (loading || loadingMore || !hasMore) return;
    setLoadingMore(true);
    const nextSkip = skip + TOP;
    const ac = new AbortController();
    abortRef.current = ac;

    fetchOrders(makeQuery(nextSkip))
      .then((res) => {
        const incoming = res.value ?? [];
        const seen = new Set(items.map((x) => x.id));
        const merged = items.concat(incoming.filter((x) => !seen.has(x.id)));
        setItems(merged);
        setSkip(nextSkip);
        setTotal(res["@odata.count"]);
      })
      .catch((e) => !ac.signal.aborted && setError(String(e)))
      .finally(() => !ac.signal.aborted && setLoadingMore(false));
  }, [hasMore, items, loading, loadingMore, makeQuery, skip]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    abortRef.current?.abort();
    const ac = new AbortController();
    abortRef.current = ac;
    setSkip(0);
    fetchOrders(makeQuery(0))
      .then((res) => {
        setItems(res.value ?? []);
        setTotal(res["@odata.count"]);
      })
      .catch((e) => !ac.signal.aborted && setError(String(e)))
      .finally(() => !ac.signal.aborted && setRefreshing(false));
  }, [makeQuery]);

  if (loading) return <ActivityIndicator />;

  return (
    <>
      {error ? <ThemedText>{error}</ThemedText> : null}
      {warehouseError ? (
        <ThemedText>{String(warehouseError)}</ThemedText>
      ) : null}

      <CustomButton
        title="Filter"
        onPress={openFilter}
        style={styles.filterButton}
      />

      <FlatList
        data={items}
        keyExtractor={(i) => String(i.id)}
        renderItem={orderItem}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        contentContainerStyle={[styles.listContent, { flexGrow: 1 }]}
        onEndReached={loadMore}
        onEndReachedThreshold={0.3}
        ListEmptyComponent={<EmptyOrders />}
        ListFooterComponent={
          loadingMore ? (
            <ActivityIndicator style={{ marginVertical: 16 }} />
          ) : null
        }
        refreshing={refreshing}
        onRefresh={onRefresh}
        indicatorStyle="black"
      />

      <OrderFilter
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        operationItems={operationItems}
        setOperationItems={setOperationItems}
        operationValue={stagedOperationTypes}
        setOperationValue={setStagedOperationTypes}
        statusItems={statusItems}
        setStatusItems={setStatusItems}
        statusValue={stagedStatusTypes}
        setStatusValue={setStagedStatusTypes}
        warehouseItems={warehouseItems}
        warehouseValue={stagedWarehouseId}
        setWarehouseValue={setStagedWarehouseId}
        // NEW: pass staged dates so the modal controls the range picker
        startDate={stagedStartDate}
        endDate={stagedEndDate}
        setStartDate={setStagedStartDate}
        setEndDate={setStagedEndDate}
        onApply={handleApply}
      />
    </>
  );
}

const styles = StyleSheet.create({
  filterButton: { marginVertical: 16, width: "60%", alignSelf: "center" },
  listContent: {
    paddingTop: 0,
    paddingRight: 16,
    paddingBottom: 16,
    paddingLeft: 16,
  },
});
