export const COLOR_THEME_STORAGE_KEY = 'kd_color_theme'

export const COLOR_THEME_IDS = [
  'forest',
  'ocean',
  'navy',
  'harvest',
  'slate',
  'field',
] as const

export type ColorThemeId = (typeof COLOR_THEME_IDS)[number]

export type ColorThemePreset = {
  id: ColorThemeId
  name: string
  description: string
  /** Preview swatches shown in Settings */
  swatches: [string, string, string]
}

export const COLOR_THEMES: ColorThemePreset[] = [
  {
    id: 'forest',
    name: 'Moss Grove',
    description: 'Deep moss green with warm clay accents — earthy shop floor look.',
    swatches: ['#365314', '#9a3412', '#f5f6f0'],
  },
  {
    id: 'ocean',
    name: 'Canal Jade',
    description: 'Canal blue primary with jade green highlights — cool and crisp.',
    swatches: ['#0e4d6e', '#047857', '#f1f7fa'],
  },
  {
    id: 'navy',
    name: 'Ink Citrus',
    description: 'Near-black ink UI with bright citrus-lime actions.',
    swatches: ['#111827', '#65a30d', '#f7faf3'],
  },
  {
    id: 'harvest',
    name: 'Harvest Amber',
    description: 'Warm amber primary with crop-green accents — seasonal sales vibe.',
    swatches: ['#b45309', '#166534', '#faf6f1'],
  },
  {
    id: 'slate',
    name: 'Walnut Leaf',
    description: 'Soft walnut brown primary with fresh leaf-green accents.',
    swatches: ['#57534e', '#15803d', '#f7f6f4'],
  },
  {
    id: 'field',
    name: 'River Mustard',
    description: 'River blue primary with mustard gold accents — bold POS contrast.',
    swatches: ['#1e40af', '#a16207', '#f4f6fb'],
  },
]

/** Default to Harvest Amber — preferred shop look */
export const DEFAULT_COLOR_THEME: ColorThemeId = 'harvest'

export function isColorThemeId(value: unknown): value is ColorThemeId {
  return typeof value === 'string' && (COLOR_THEME_IDS as readonly string[]).includes(value)
}

export function resolveColorThemeId(value: unknown): ColorThemeId {
  return isColorThemeId(value) ? value : DEFAULT_COLOR_THEME
}

export function applyColorTheme(themeId: ColorThemeId) {
  if (typeof document === 'undefined') return
  document.documentElement.setAttribute('data-color-theme', themeId)
}

export function readStoredColorTheme(): ColorThemeId {
  if (typeof window === 'undefined') return DEFAULT_COLOR_THEME
  try {
    return resolveColorThemeId(localStorage.getItem(COLOR_THEME_STORAGE_KEY))
  } catch {
    return DEFAULT_COLOR_THEME
  }
}

export function persistColorTheme(themeId: ColorThemeId) {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(COLOR_THEME_STORAGE_KEY, themeId)
  } catch {
    /* ignore quota / private mode */
  }
  applyColorTheme(themeId)
}
