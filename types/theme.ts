export type ThemeColors = {
    text: string,
    tint: string,
    icon: string,

    background: string
    onBackground: string
    surface: string
    onSurface: string

    primary: string
    onPrimary: string
    primaryContainer: string
    onPrimaryContainer: string

    secondary: string
    onSecondary: string
    secondaryContainer: string
    onSecondaryContainer: string

    tertiary: string
    onTertiary: string
    tertiaryContainer: string
    onTertiaryContainer: string

    error: string
    onError: string
    errorContainer: string
    onErrorContainer: string

    surfaceVariant: string
    onSurfaceVariant: string
    outline: string
    outlineVariant: string

    shadow: string
    scrim: string
    inverseSurface: string
    inverseOnSurface: string
    inversePrimary: string

    level0: string
    level1: string
    level2: string
    level3: string
    level4: string
    level5: string

    surfaceDisabled: string
    onSurfaceDisabled: string
    backdrop: string
}

export type WithThemeColor<T extends string> = T | (string & Record<never, never>)
export type ThemeColorKeys = WithThemeColor<keyof ThemeColors>