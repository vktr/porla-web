import { useMutation, useQuery, type UseMutationOptions, type UseQueryOptions } from "@tanstack/react-query";
import axios from "axios";
import { type SessionsSettingsGetOutput, type SessionsSettingsGetInput } from "./types";

export function useJsonRpc(method: string, data?: any) {
  return useQuery({
    queryFn: () => axios.post(
      "/api/v1/jsonrpc",
      {
        method, params: data || null
      },
      {
        withCredentials: true
      })
      .then(r => r.data.result),
    queryKey: ["api-jsonrpc", method],
  });
}

type JsonRpcResponse<TResult> = {
  result: TResult;
};

export function useQueryMethod<TInput, TOutput>(method: string, input: TInput, opts?: Omit<UseQueryOptions<TOutput>, "queryFn" | "queryKey">) {
  return useQuery<TOutput>({
    queryFn: () => axios.post<JsonRpcResponse<TOutput>>(
      "/api/v1/jsonrpc",
      {
        method,
        params: input
      },
      {
        withCredentials: true
      })
      .then(r => r.data.result),
    queryKey: ["api-jsonrpc-query", method],
    ...opts
  });
}

export function useMutateMethod<TInput, TOutput>(method: string, opts?: UseMutationOptions<TOutput, Error, TInput>) {
  return useMutation({
    mutationFn: (input: TInput) => axios.post<JsonRpcResponse<TOutput>>(
      "/api/v1/jsonrpc",
      {
        method,
        params: input
      },
      {
        withCredentials: true
      })
      .then(r => r.data.result),
    mutationKey: ["api-jsonrpc-mutate", method],
    ...opts
  });
}

export function useAddSessionMutation() {
  type AddSessionMutationInput = {
    name: string;
    settings: any;
  };

  type AddSessionMutationOutput = {};

  return useMutateMethod<AddSessionMutationInput, AddSessionMutationOutput>("sessions.add");
}

export function useGetSessionSettings(input: SessionsSettingsGetInput) {
  return useQueryMethod<SessionsSettingsGetInput, SessionsSettingsGetOutput>("sessions.settings.list", input, {
  });
}
