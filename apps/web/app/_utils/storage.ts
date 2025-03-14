import Cookies from "js-cookie";
import { StorageKeys } from "./storageKeys";

export const storage = {
  setToken: (token: string) =>
    Cookies.set(StorageKeys.TOKEN, token, { expires: 1, path: "/" }), // 1 dia
  getToken: () => Cookies.get(StorageKeys.TOKEN),
  removeToken: () => Cookies.remove(StorageKeys.TOKEN, { path: "/" }),
};
