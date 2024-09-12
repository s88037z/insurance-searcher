import Axios from "axios";
import { env } from "@/config/env";

export const api = Axios.create({
  baseURL: env.API_URL,
});
api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export type ExtraQueryConfig<
  T extends (...args: TParams[]) => unknown,
  TParams = unknown[],
> = Omit<ReturnType<T>, "queryKey" | "queryFn">;
