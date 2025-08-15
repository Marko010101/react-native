import { api } from "../lib/axios";

export async function getTerminals() {
  const { data } = await api.get("/odata/Terminals");
  return data;
}
