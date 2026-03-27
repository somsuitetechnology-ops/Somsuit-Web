import { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'dark' | 'light' | 'system'

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

export type SetThemeOptions = { persist?: boolean }

type ThemeProviderState = {
  theme: Theme
  setTheme: (theme: Theme, options?: SetThemeOptions) => void
}

const initialState: ThemeProviderState = {
  theme: 'system',
  setTheme: () => null,
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

export function ThemeProvider({
  children,
  defaultTheme = 'light',
  storageKey = 'moral-tech-theme',
  ...props
}: ThemeProviderProps) {
  // SSR / first paint: no localStorage — hydrate stored preference on client only.
  const [theme, setTheme] = useState<Theme>(defaultTheme)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(storageKey) as Theme | null
      if (stored === 'light' || stored === 'dark' || stored === 'system') {
        setTheme(stored)
      }
    } catch {
      /* private mode / SSR guard */
    }
  }, [storageKey])

  useEffect(() => {
    const root = window.document.documentElement

    root.classList.remove('light', 'dark')

    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
        .matches
        ? 'dark'
        : 'light'

      root.classList.add(systemTheme)
      return
    }

    root.classList.add(theme)
  }, [theme])

  const value = {
    theme,
    setTheme: (next: Theme, options?: SetThemeOptions) => {
      const persist = options?.persist !== false
      if (persist) {
        try {
          localStorage.setItem(storageKey, next)
        } catch {
          /* ignore */
        }
      }
      setTheme(next)
    },
  }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)

  if (context === undefined)
    throw new Error('useTheme must be used within a ThemeProvider')

  return context
}