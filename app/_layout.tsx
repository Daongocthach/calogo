import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useFonts } from 'expo-font'
import { Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { StatusBar } from 'expo-status-bar'
import { useEffect } from 'react'
import { I18nextProvider } from 'react-i18next'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import 'react-native-reanimated'
import Toast from 'react-native-toast-message'

import LoadingScreen from '@/components/common/loading-screen'
import { GlobalAlertProvider } from '@/contexts/global-alert-provider'
import { ThemeProvider } from '@/contexts/theme-provider'
import { FONT_FAMILIES } from '@/lib/constants'
import i18next from '@/locales'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      retry: 2,
      staleTime: 1000 * 60,
      gcTime: 1000 * 60 * 5,
    },
    mutations: {
      retry: 1,
    },
  },
})

SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const [loaded] = useFonts({
    [FONT_FAMILIES.REGULAR]: require('../assets/fonts/Inter-Regular.ttf'),
    [FONT_FAMILIES.MEDIUM]: require('../assets/fonts/Inter-Medium.ttf'),
    [FONT_FAMILIES.SEMIBOLD]: require('../assets/fonts/Inter-SemiBold.ttf'),
    [FONT_FAMILIES.BOLD]: require('../assets/fonts/Inter-Bold.ttf'),
  })

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync()
    }
  }, [loaded])

  if (!loaded) {
    return <LoadingScreen />
  }

  return (
    <ThemeProvider>
      <GestureHandlerRootView>
        <GlobalAlertProvider>
          <QueryClientProvider client={queryClient}>
            <I18nextProvider i18n={i18next}>
              <Stack
                screenOptions={{
                  animation: 'slide_from_right',
                }}
              >
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen name="login" options={{ headerShown: false }} />
                <Stack.Screen name="sign-up" options={{ headerShown: false }} />
                <Stack.Screen name="welcome" options={{ headerShown: false }} />
                <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal', animation: 'fade_from_bottom' }} />
              </Stack>
              <Toast />
            </I18nextProvider>
          </QueryClientProvider>
        </GlobalAlertProvider>
      </GestureHandlerRootView>
      <StatusBar style="auto" />
    </ThemeProvider>
  )
}
