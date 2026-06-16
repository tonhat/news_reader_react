import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { Article } from '../models/article'
import { articleFromJson } from '../models/article'

const API_KEY = 'YOUR_API_KEY'
const BASE_URL = 'https://newsapi.org/v2'

const mockByCategory: Record<string, Article[]> = {
  general: [
    { title: 'Local Community Rallies for Park Renovation', description: "Residents come together to raise funds for renovating the city's oldest public park.", content: null, source: 'Community News', urlToImage: 'https://picsum.photos/seed/park1/400/200', url: null, publishedAt: '2026-06-12T00:00:00.000' },
  ],
  business: [
    { title: 'Stock Market Reaches All-Time High', description: 'Major indices hit record levels as investor confidence grows amid positive economic data.', content: null, source: 'Financial Times', urlToImage: 'https://picsum.photos/seed/stocks1/400/200', url: null, publishedAt: '2026-06-11T00:00:00.000' },
  ],
  technology: [
    { title: 'New Smartphone Release Breaks Pre-Order Records', description: 'The latest flagship device has garnered millions of pre-orders worldwide within the first 24 hours.', content: null, source: 'TechCrunch', urlToImage: 'https://picsum.photos/seed/phone1/400/200', url: null, publishedAt: '2026-06-09T00:00:00.000' },
    { title: 'Breakthrough in Quantum Computing Achieved', description: 'Researchers have successfully demonstrated a quantum computer with 1000 qubits.', content: null, source: 'Nature', urlToImage: 'https://picsum.photos/seed/quantum1/400/200', url: null, publishedAt: '2026-06-07T00:00:00.000' },
    { title: 'AI Model Achieves Human-Level Reasoning', description: 'A new artificial intelligence system has passed a series of complex reasoning tests.', content: null, source: 'Wired', urlToImage: 'https://picsum.photos/seed/ai1/400/200', url: null, publishedAt: '2026-06-05T00:00:00.000' },
  ],
  science: [
    { title: 'Scientists Discover New Species in Deep Ocean', description: 'A team of marine biologists has discovered several new species in the deepest parts of the Pacific Ocean.', content: null, source: 'Science Daily', urlToImage: 'https://picsum.photos/seed/ocean1/400/200', url: null, publishedAt: '2026-06-10T00:00:00.000' },
  ],
  environment: [
    { title: 'Climate Summit Concludes with Historic Agreement', description: 'World leaders have agreed on ambitious new targets to reduce carbon emissions by 2050.', content: null, source: 'Reuters', urlToImage: 'https://picsum.photos/seed/climate1/400/200', url: null, publishedAt: '2026-06-08T00:00:00.000' },
    { title: 'New Renewable Energy Plant Opens in Desert', description: "The world's largest solar farm begins operations, powering millions of homes.", content: null, source: 'BBC News', urlToImage: 'https://picsum.photos/seed/solar1/400/200', url: null, publishedAt: '2026-06-06T00:00:00.000' },
  ],
}

export const fetchByCategory = createAsyncThunk<Article[], string>(
  'categories/fetchByCategory',
  async (category, { rejectWithValue }) => {
    if (API_KEY === 'YOUR_API_KEY') {
      await new Promise((r) => setTimeout(r, 400))
      return mockByCategory[category] ?? []
    }
    try {
      const controller = new AbortController()
      const timeout = setTimeout(() => controller.abort(), 10000)
      const response = await fetch(
        `${BASE_URL}/top-headlines?country=us&category=${category}&apiKey=${API_KEY}`,
        { signal: controller.signal },
      )
      clearTimeout(timeout)
      if (!response.ok) return rejectWithValue('Failed to fetch')
      const data: Record<string, unknown> = await response.json()
      const articles = data['articles'] as Record<string, unknown>[]
      return articles.map(articleFromJson)
    } catch {
      return rejectWithValue('Network error')
    }
  },
)

const CATEGORIES = ['general', 'business', 'technology', 'science', 'environment'] as const
export type Category = (typeof CATEGORIES)[number]
export { CATEGORIES }

interface CategoriesState {
  items: Article[]
  activeCategory: Category
  loading: boolean
  error: string | null
}

const initialState: CategoriesState = {
  items: [],
  activeCategory: 'general',
  loading: false,
  error: null,
}

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    setCategory(state, action) {
      state.activeCategory = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchByCategory.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchByCategory.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload
      })
      .addCase(fetchByCategory.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  },
})

export const { setCategory } = categoriesSlice.actions
export const selectCategoryArticles = (state: { categories: CategoriesState }) => state.categories.items
export const selectCategoryLoading = (state: { categories: CategoriesState }) => state.categories.loading
export const selectCategoryError = (state: { categories: CategoriesState }) => state.categories.error
export const selectActiveCategory = (state: { categories: CategoriesState }) => state.categories.activeCategory
export default categoriesSlice.reducer
