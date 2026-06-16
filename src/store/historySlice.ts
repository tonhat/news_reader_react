import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { Article } from '../models/article'
import { articleFromJson } from '../models/article'

const STORAGE_KEY = 'history'

function loadHistory(): HistoryEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed: { article: Record<string, unknown>; viewedAt: string }[] = JSON.parse(raw)
      return parsed.map((e) => ({ article: articleFromJson(e.article), viewedAt: e.viewedAt }))
    }
  } catch {
    // ignore
  }
  return []
}

export interface HistoryEntry {
  article: Article
  viewedAt: string
}

interface HistoryState {
  entries: HistoryEntry[]
}

const initialState: HistoryState = {
  entries: loadHistory(),
}

const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    addToHistory(state, action: PayloadAction<Article>) {
      const article = action.payload
      state.entries = state.entries.filter(
        (e) => e.article.title !== article.title || e.article.url !== article.url,
      )
      state.entries.unshift({ article, viewedAt: new Date().toISOString() })
      if (state.entries.length > 50) state.entries.pop()
    },
    clearHistory(state) {
      state.entries = []
    },
  },
})

export const { addToHistory, clearHistory } = historySlice.actions
export const selectHistory = (state: { history: HistoryState }) => state.history.entries
export default historySlice.reducer
