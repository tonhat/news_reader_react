import { useState, useEffect, useCallback } from 'react'
import type { Article } from '../models/article'
import { fetchTopHeadlines } from '../services/newsService'
import ArticleCard from '../components/ArticleCard'

export default function HomeScreen() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const load = useCallback(async () => {
    setLoading(true)
    setError(false)
    try {
      const data = await fetchTopHeadlines()
      setArticles(data)
    } catch {
      setError(true)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    load()
  }, [load])

  if (loading) {
    return (
      <div className="screen">
        <div className="loading-container">
          <div className="spinner" />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="screen">
        <div className="error-container">
          <p>Failed to load news</p>
          <button onClick={load}>Retry</button>
        </div>
      </div>
    )
  }

  return (
    <div className="screen">
      <div className="screen-header">
        <h2>Top Headlines</h2>
        <button className="refresh-btn" onClick={load} aria-label="Refresh">
          ↻
        </button>
      </div>
      <div className="article-list">
        {articles.map((article, i) => (
          <ArticleCard key={`${article.title}-${i}`} article={article} />
        ))}
      </div>
    </div>
  )
}
