import { ThemedText } from "@/components/ThemedText";
import CustomButton from "@/components/ui/CustomButton";
import renderItem from "@/components/ui/OrderItem";
import { formatDateYYYYMMDD } from "@/helpers/formatDateYYYYMMDD";
import { useOrders } from "@/hooks/orders/useOrders";
import { Order } from "@/types/Order";
import React, { useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native";

type ODataResponse<T> = { value: T[]; "@odata.count"?: number };

export default function OrdersScreen() {
  const [filters, setFilters] = useState([]);
  const todayStr = formatDateYYYYMMDD(new Date());
  const filter = `contains(itemName,'') and businessDay ge ${todayStr} and businessDay le ${todayStr}`;

  const params = new URLSearchParams();
  params.set("$count", "true");
  params.set("$select", "id,itemName,businessDay,statusInt,status");
  params.set(
    "$expand",
    "GGDDLine($expand=GGDD($select=itemName);$select=id,ggddId)"
  );
  params.set("$top", "10");
  params.set("$skip", "0");
  params.set("$filter", filter);
  params.set("$orderby", "createDate desc");

  const query = `?${params.toString()}`;

  const { data, isLoading, error } = useOrders(query);

  if (isLoading) return <ActivityIndicator />;
  if (error) return <ThemedText>{String((error as Error).message)}</ThemedText>;

  const list = (data as ODataResponse<Order> | undefined)?.value ?? [];

  const onClickFilter = () => {};

  return (
    <>
      <CustomButton
        title="Filter"
        onPress={onClickFilter}
        style={styles.filterButton}
      />
      <FlatList
        data={list}
        keyExtractor={(i) => String(i.id)}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        contentContainerStyle={{ padding: 16 }}
      />
      {/* Debug: */}
      {/* <ThemedText>{`/odata/Orders${query}`}</ThemedText> */}
      {/* <ThemedText>{JSON.stringify(data, null, 2)}</ThemedText> */}
    </>
  );
}

const styles = StyleSheet.create({
  filterButton: {
    // backgroundColor: "white",
  },
});
