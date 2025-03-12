import Cookies from "js-cookie";
import { StorageKeys } from "./storageKeys";

export const storage = {
  setToken: (token: string) =>
    Cookies.set(StorageKeys.TOKEN, token, { expires: 1 }), // 1 dia de expiração
  getToken: () => Cookies.get(StorageKeys.TOKEN),
  removeToken: () => Cookies.remove(StorageKeys.TOKEN),

  clearAll: () => {
    Cookies.remove(StorageKeys.TOKEN);
  },
};
