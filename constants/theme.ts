import { Platform } from 'react-native';

export const Colors = {
  light: {
    text: '#111111',
    tint: '#4FD1C5',
    icon: '#6B7280',

    background: '#FFFFFF',
    onBackground: '#1E293B',
    surface: '#F9FAFB',
    onSurface: '#475569',

    primary: '#4FD1C5',
    onPrimary: '#FFFFFF',
    primaryContainer: '#CCFBF1',
    onPrimaryContainer: '#0F766E',

    secondary: '#38BDF8',
    onSecondary: '#FFFFFF',
    secondaryContainer: '#E0F2FE',
    onSecondaryContainer: '#0C4A6E',

    tertiary: '#A78BFA',
    onTertiary: '#FFFFFF',
    tertiaryContainer: '#EDE9FE',
    onTertiaryContainer: '#4C1D95',

    error: '#EF4444',
    onError: '#FFFFFF',
    errorContainer: '#FEE2E2',
    onErrorContainer: '#991B1B',

    surfaceVariant: '#F3F4F6',
    onSurfaceVariant: '#64748B',
    outline: '#CBD5E1',
    outlineVariant: '#E2E8F0',

    shadow: '#000000',
    scrim: '#000000',
    inverseSurface: '#1E293B',
    inverseOnSurface: '#E2E8F0',
    inversePrimary: '#2DD4BF',

    level0: 'transparent',
    level1: '#F8FAFC',
    level2: '#F1F5F9',
    level3: '#E2E8F0',
    level4: '#CBD5E1',
    level5: '#94A3B8',

    surfaceDisabled: '#E2E8F0',
    onSurfaceDisabled: '#9CA3AF',
    backdrop: '#94A3B880',
  },

  dark: {
    text: '#F4F4F5',
    tint: '#5EEAD4',
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: '#5EEAD4',

    background: '#0F172A',
    onBackground: '#E2E8F0',
    surface: '#1E293B',
    onSurface: '#E2E8F0',

    primary: '#5EEAD4',
    onPrimary: '#083344',
    primaryContainer: '#134E4A',
    onPrimaryContainer: '#CCFBF1',

    secondary: '#38BDF8',
    onSecondary: '#082F49',
    secondaryContainer: '#0C4A6E',
    onSecondaryContainer: '#E0F2FE',

    tertiary: '#C084FC',
    onTertiary: '#3B0764',
    tertiaryContainer: '#4C1D95',
    onTertiaryContainer: '#EDE9FE',

    error: '#F87171',
    onError: '#450A0A',
    errorContainer: '#7F1D1D',
    onErrorContainer: '#FEE2E2',

    surfaceVariant: '#334155',
    onSurfaceVariant: '#CBD5E1',
    outline: '#475569',
    outlineVariant: '#64748B',

    shadow: '#000000',
    scrim: '#000000',
    inverseSurface: '#E2E8F0',
    inverseOnSurface: '#1E293B',
    inversePrimary: '#5EEAD4',

    level0: 'transparent',
    level1: '#1E293B',
    level2: '#334155',
    level3: '#475569',
    level4: '#64748B',
    level5: '#94A3B8',

    surfaceDisabled: '#475569',
    onSurfaceDisabled: '#CBD5E1',
    backdrop: '#00000080',
  },
};

export const Fonts = Platform.select({
  ios: {
    sans: 'system-ui',
    serif: 'ui-serif',
    rounded: 'ui-rounded',
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
