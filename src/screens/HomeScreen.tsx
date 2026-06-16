import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchByCategory, setCategory, CATEGORIES } from '../store/categoriesSlice'
import type { Category } from '../store/categoriesSlice'
import {
  selectCategoryArticles,
  selectCategoryLoading,
  selectCategoryError,
  selectActiveCategory,
} from '../store/categoriesSlice'
import ArticleCard from '../components/ArticleCard'

export default function HomeScreen() {
  const dispatch = useDispatch()
  const articles = useSelector(selectCategoryArticles)
  const loading = useSelector(selectCategoryLoading)
  const error = useSelector(selectCategoryError)
  const activeCategory = useSelector(selectActiveCategory)

  useEffect(() => {
    dispatch(fetchByCategory(activeCategory))
  }, [dispatch, activeCategory])

  return (
    <div className="screen">
      <div className="screen-header">
        <h2>Top Headlines</h2>
      </div>

      <div className="category-bar">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            className={`category-chip ${cat === activeCategory ? 'category-active' : ''}`}
            onClick={() => dispatch(setCategory(cat))}
          >
            {cat}
          </button>
        ))}
      </div>

      {loading && (
        <div className="loading-container">
          <div className="spinner" />
        </div>
      )}

      {!loading && error && (
        <div className="error-container">
          <p>{error}</p>
          <button onClick={() => dispatch(fetchByCategory(activeCategory))}>
            Retry
          </button>
        </div>
      )}

      {!loading && !error && (
        <div className="article-list">
          {articles.length === 0 ? (
            <div className="empty-container">
              <p>No articles in this category</p>
            </div>
          ) : (
            articles.map((article, i) => (
              <ArticleCard key={`${article.title}-${i}`} article={article} />
            ))
          )}
        </div>
      )}
    </div>
  )
}
