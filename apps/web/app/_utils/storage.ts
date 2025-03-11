import { StorageKeys } from "./storageKeys"; // 🔥 Importando Enum

export const storage = {
  setToken: (token: StorageKeys) =>
    localStorage.setItem(StorageKeys.TOKEN, token),
  getToken: () => localStorage.getItem(StorageKeys.TOKEN),
  removeToken: () => localStorage.removeItem(StorageKeys.TOKEN),

  setRefreshToken: (refreshToken: StorageKeys) =>
    localStorage.setItem(StorageKeys.REFRESH_TOKEN, refreshToken),
  getRefreshToken: () => localStorage.getItem(StorageKeys.REFRESH_TOKEN),
  removeRefreshToken: () => localStorage.removeItem(StorageKeys.REFRESH_TOKEN),

  clearAll: () => {
    localStorage.removeItem(StorageKeys.TOKEN);
    localStorage.removeItem(StorageKeys.REFRESH_TOKEN);
  },
};
