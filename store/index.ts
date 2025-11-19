import { create } from "zustand"
import { createJSONStorage, devtools, persist } from "zustand/middleware"

import { STORE_NAME } from "@/lib/constants"
import { User } from "@/lib/types"
import { asyncStorage } from "@/store/storage"

type StoreState = {
  darkMode: boolean
  currentLanguage: "zh-TW" | "zh-CN" | "en" | "vi"
  isLoggedIn: boolean
  userData: User | null
  accessToken: string
  refreshToken: string
  signIn: (userData: User) => void
  setActionName: <key extends keyof StoreState>(key: key, value: StoreState[key]) => void
  resetCache: () => void
}

const useStore = create<StoreState>()(
  devtools(
    persist(
      (set) => ({
        darkMode: false,
        currentLanguage: "en",
        isLoading: false,
        isLoggedIn: false,
        userData: null,
        accessToken: "",
        refreshToken: "",
        setActionName: (key, value) => {
          set({ [key]: value })
        },
        resetCache: () => {
          asyncStorage.removeItem(STORE_NAME)
          set({
            darkMode: false,
            currentLanguage: "en",
            isLoggedIn: false,
            userData: null,
            accessToken: "",
            refreshToken: "",
          })
        },
        signIn: (userData) => {
          set({
            userData,
            isLoggedIn: true
          })
        },
      }),
      {
        name: STORE_NAME,
        storage: createJSONStorage(() => asyncStorage),
        partialize: (state) => ({
          darkMode: state.darkMode,
          currentLanguage: state.currentLanguage,
          isLoggedIn: state.isLoggedIn,
          userData: state.userData,
          accessToken: state.accessToken,
          refreshToken: state.refreshToken,
        }),
      },
    ),
  ),
)

export default useStore
