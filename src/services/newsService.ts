import type { Article } from '../models/article'
import { articleFromJson } from '../models/article'

const API_KEY = 'YOUR_API_KEY'
const BASE_URL = 'https://newsapi.org/v2'

const mockArticles: Article[] = [
  {
    title: 'Scientists Discover New Species in Deep Ocean',
    description: 'A team of marine biologists has discovered several new species in the deepest parts of the Pacific Ocean.',
    content: null,
    source: 'Science Daily',
    urlToImage: 'https://picsum.photos/seed/ocean1/400/200',
    url: null,
    publishedAt: '2026-06-10T00:00:00.000',
  },
  {
    title: 'Stock Market Reaches All-Time High',
    description: 'Major indices hit record levels as investor confidence grows amid positive economic data.',
    content: null,
    source: 'Financial Times',
    urlToImage: 'https://picsum.photos/seed/stocks1/400/200',
    url: null,
    publishedAt: '2026-06-11T00:00:00.000',
  },
  {
    title: 'New Smartphone Release Breaks Pre-Order Records',
    description: 'The latest flagship device has garnered millions of pre-orders worldwide within the first 24 hours.',
    content: null,
    source: 'TechCrunch',
    urlToImage: 'https://picsum.photos/seed/phone1/400/200',
    url: null,
    publishedAt: '2026-06-09T00:00:00.000',
  },
  {
    title: 'Climate Summit Concludes with Historic Agreement',
    description: 'World leaders have agreed on ambitious new targets to reduce carbon emissions by 2050.',
    content: null,
    source: 'Reuters',
    urlToImage: 'https://picsum.photos/seed/climate1/400/200',
    url: null,
    publishedAt: '2026-06-08T00:00:00.000',
  },
  {
    title: 'Local Community Rallies for Park Renovation',
    description: "Residents come together to raise funds for renovating the city's oldest public park.",
    content: null,
    source: 'Community News',
    urlToImage: 'https://picsum.photos/seed/park1/400/200',
    url: null,
    publishedAt: '2026-06-12T00:00:00.000',
  },
  {
    title: 'Breakthrough in Quantum Computing Achieved',
    description: 'Researchers have successfully demonstrated a quantum computer with 1000 qubits.',
    content: null,
    source: 'Nature',
    urlToImage: 'https://picsum.photos/seed/quantum1/400/200',
    url: null,
    publishedAt: '2026-06-07T00:00:00.000',
  },
  {
    title: 'New Renewable Energy Plant Opens in Desert',
    description: "The world's largest solar farm begins operations, powering millions of homes.",
    content: null,
    source: 'BBC News',
    urlToImage: 'https://picsum.photos/seed/solar1/400/200',
    url: null,
    publishedAt: '2026-06-06T00:00:00.000',
  },
  {
    title: 'AI Model Achieves Human-Level Reasoning',
    description: 'A new artificial intelligence system has passed a series of complex reasoning tests.',
    content: null,
    source: 'Wired',
    urlToImage: 'https://picsum.photos/seed/ai1/400/200',
    url: null,
    publishedAt: '2026-06-05T00:00:00.000',
  },
]

async function fetchFromApi(url: string): Promise<Article[]> {
  try {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 10000)
    const response = await fetch(url, { signal: controller.signal })
    clearTimeout(timeout)
    if (!response.ok) return mockArticles
    const data: Record<string, unknown> = await response.json()
    const articles = data['articles'] as Record<string, unknown>[]
    return articles.map(articleFromJson)
  } catch {
    return mockArticles
  }
}

export function fetchTopHeadlines(): Promise<Article[]> {
  if (API_KEY === 'YOUR_API_KEY') return Promise.resolve(mockArticles)
  return fetchFromApi(`${BASE_URL}/top-headlines?country=us&apiKey=${API_KEY}`)
}

export function fetchArticlesByCategory(category: string): Promise<Article[]> {
  if (API_KEY === 'YOUR_API_KEY') return Promise.resolve(mockArticles)
  return fetchFromApi(`${BASE_URL}/top-headlines?country=us&category=${category}&apiKey=${API_KEY}`)
}
