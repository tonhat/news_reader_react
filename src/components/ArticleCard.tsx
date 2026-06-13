import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import type { Article } from '../models/article'
import { toggleSave, selectSavedArticles } from '../store/savedSlice'

export default function ArticleCard({ article }: { article: Article }) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const savedArticles = useSelector(selectSavedArticles)
  const saved = savedArticles.some(
    (a) => a.title === article.title && a.url === article.url,
  )

  function formatDate(dateStr: string | null) {
    if (!dateStr) return ''
    const d = new Date(dateStr)
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
  }

  return (
    <div
      className="article-card"
      onClick={() => navigate('/detail', { state: { article } })}
    >
      {article.urlToImage && (
        <img
          src={article.urlToImage}
          alt=""
          className="article-card-thumb"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = 'none'
          }}
        />
      )}
      <div className="article-card-body">
        {article.source && <span className="article-source">{article.source}</span>}
        <h3 className="article-title">{article.title}</h3>
        {article.publishedAt && (
          <span className="article-date">{formatDate(article.publishedAt)}</span>
        )}
      </div>
      <button
        className={`bookmark-btn ${saved ? 'bookmark-saved' : ''}`}
        onClick={(e) => {
          e.stopPropagation()
          dispatch(toggleSave(article))
        }}
        aria-label={saved ? 'Unsave' : 'Save'}
      >
        <svg className="bookmark-icon" viewBox="0 0 24 24" width="22" height="22">
          <path
            className="bookmark-fill"
            d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z"
          />
        </svg>
      </button>
    </div>
  )
}
