import { login } from "@/service/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useLogin = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({
      username,
      password,
    }: {
      username: string;
      password: string;
    }) => login(username, password),
    onSuccess: async (data) => {
      await AsyncStorage.setItem("userToken", data.token);
      await qc.invalidateQueries({ queryKey: ["me"] });
    },
  });
};
