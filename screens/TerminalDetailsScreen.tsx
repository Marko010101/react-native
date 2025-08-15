import { RouteProp, useRoute } from "@react-navigation/native";
import { ThemedView } from "../components/ThemedView";
import TerminalItem, { Terminal } from "../components/ui/TerminalItem";

type ParamList = {
  TerminalDetails: { terminal: Terminal };
};

export default function TerminalDetailsScreen() {
  const { params } = useRoute<RouteProp<ParamList, "TerminalDetails">>();
  const { terminal } = params;

  return (
    <ThemedView style={{ padding: 16 }}>
      <TerminalItem item={terminal} compact={false} />
    </ThemedView>
  );
}
