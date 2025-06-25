import { useMutation } from "@tanstack/react-query";
import axios from "axios";

type AuthType = {
  username: string;
  password: string;
}

export function useAuthInit() {
  return useMutation({
    mutationFn: (auth: AuthType) => axios.post("/api/v1/auth/init", auth).then(r => r.data),
    mutationKey: ["auth-init"]
  });
}

export function useAuthLogin() {
  return useMutation({
    mutationFn: (auth: AuthType) => axios.post("/api/v1/auth/login", auth).then(r => r.data),
    mutationKey: ["auth-login"]
  });
}
