import { configureStore } from '@reduxjs/toolkit'
import savedReducer from './savedSlice'

const store = configureStore({
  reducer: {
    saved: savedReducer,
  },
})

store.subscribe(() => {
  const state = store.getState()
  try {
    localStorage.setItem('saved_articles', JSON.stringify(state.saved.articles))
  } catch {
    // ignore
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
