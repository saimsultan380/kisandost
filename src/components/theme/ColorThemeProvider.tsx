'use client'

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import {
  COLOR_THEMES,
  DEFAULT_COLOR_THEME,
  applyColorTheme,
  persistColorTheme,
  readStoredColorTheme,
  resolveColorThemeId,
  type ColorThemeId,
  type ColorThemePreset,
} from '@/lib/color-themes'

type ColorThemeContextValue = {
  themeId: ColorThemeId
  themes: ColorThemePreset[]
  setThemeId: (id: ColorThemeId) => void
}

const ColorThemeContext = createContext<ColorThemeContextValue | null>(null)

export function ColorThemeProvider({ children }: { children: React.ReactNode }) {
  const [themeId, setThemeIdState] = useState<ColorThemeId>(DEFAULT_COLOR_THEME)

  useEffect(() => {
    const stored = readStoredColorTheme()
    setThemeIdState(stored)
    applyColorTheme(stored)
  }, [])

  const setThemeId = useCallback((id: ColorThemeId) => {
    const next = resolveColorThemeId(id)
    setThemeIdState(next)
    persistColorTheme(next)
  }, [])

  const value = useMemo(
    () => ({
      themeId,
      themes: COLOR_THEMES,
      setThemeId,
    }),
    [themeId, setThemeId],
  )

  return <ColorThemeContext.Provider value={value}>{children}</ColorThemeContext.Provider>
}

export function useColorTheme() {
  const ctx = useContext(ColorThemeContext)
  if (!ctx) {
    throw new Error('useColorTheme must be used within ColorThemeProvider')
  }
  return ctx
}
