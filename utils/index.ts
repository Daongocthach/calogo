import { STORE_NAME } from '@/constants'
import AsyncStorage from '@react-native-async-storage/async-storage'


export const getShortName = (fullName: string | undefined) => {
  if (!fullName) return "??"

  const nameParts = fullName.split(" ")

  const firstInitial = nameParts[0].charAt(0).toUpperCase()
  const lastInitial = nameParts[nameParts.length - 1].charAt(0).toUpperCase()

  return (firstInitial + lastInitial).toUpperCase()
}

export const getCurrentLanguage = async (): Promise<string | null> => {
  try {
    const rawState = await AsyncStorage.getItem(STORE_NAME)
    if (!rawState) return null

    const parsedState = JSON.parse(rawState)
    return parsedState?.state?.currentLanguage ?? null
  } catch (error) {
    return null
  }
}