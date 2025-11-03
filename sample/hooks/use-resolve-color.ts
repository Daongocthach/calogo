import { ThemeColors } from "@/types"
import { useTheme } from "./use-theme"

export function useResolveColor() {
  const colors = useTheme()

  function resolveColor(
    colorName?: ThemeColors | string
  ): string | undefined {
    if (!colorName) return undefined

    if ((colors as any)[colorName as ThemeColors]) {
      return (colors as any)[colorName as ThemeColors]
    }

    return colorName
  }

  return { resolveColor }
}
