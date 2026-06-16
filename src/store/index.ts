import { configureStore } from '@reduxjs/toolkit'
import savedReducer from './savedSlice'
import categoriesReducer from './categoriesSlice'
import historyReducer from './historySlice'
import themeReducer from './themeSlice'

const store = configureStore({
  reducer: {
    saved: savedReducer,
    categories: categoriesReducer,
    history: historyReducer,
    theme: themeReducer,
  },
})

store.subscribe(() => {
  const { saved, theme, history } = store.getState()
  try {
    localStorage.setItem('saved_articles', JSON.stringify(saved.articles))
    localStorage.setItem('theme', theme.mode)
    localStorage.setItem('history', JSON.stringify(history.entries))
  } catch {
    // ignore
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
