import { createSlice } from '@reduxjs/toolkit'

type Theme = 'light' | 'dark'

function loadTheme(): Theme {
  const stored = localStorage.getItem('theme')
  if (stored === 'light' || stored === 'dark') return stored
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

interface ThemeState {
  mode: Theme
}

const initialState: ThemeState = {
  mode: loadTheme(),
}

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme(state) {
      state.mode = state.mode === 'light' ? 'dark' : 'light'
    },
    setTheme(state, action) {
      state.mode = action.payload
    },
  },
})

export const { toggleTheme, setTheme } = themeSlice.actions
export const selectThemeMode = (state: { theme: ThemeState }) => state.theme.mode
export default themeSlice.reducer
