import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { Article } from '../models/article'
import { articleFromJson } from '../models/article'

const STORAGE_KEY = 'saved_articles'

function loadSaved(): Article[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed: Record<string, unknown>[] = JSON.parse(raw)
      return parsed.map(articleFromJson)
    }
  } catch {
    // ignore
  }
  return []
}

interface SavedState {
  articles: Article[]
}

const initialState: SavedState = {
  articles: loadSaved(),
}

const savedSlice = createSlice({
  name: 'saved',
  initialState,
  reducers: {
    toggleSave(state, action: PayloadAction<Article>) {
      const article = action.payload
      const index = state.articles.findIndex(
        (a) => a.title === article.title && a.url === article.url,
      )
      if (index >= 0) {
        state.articles.splice(index, 1)
      } else {
        state.articles.push(article)
      }
    },
  },
})

export const { toggleSave } = savedSlice.actions
export const selectSavedArticles = (state: { saved: SavedState }) => state.saved.articles
export const selectIsSaved = (article: Article) => (state: { saved: SavedState }) =>
  state.saved.articles.some((a) => a.title === article.title && a.url === article.url)

export default savedSlice.reducer
