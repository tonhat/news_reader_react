import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import type { Article } from '../models/article'
import { toggleSave, selectSavedArticles } from '../store/savedSlice'

export default function DetailScreen() {
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const article = (location.state as { article: Article })?.article
  const savedArticles = useSelector(selectSavedArticles)
  const saved = article
    ? savedArticles.some((a) => a.title === article.title && a.url === article.url)
    : false

  if (!article) {
    return (
      <div className="screen">
        <p>Article not found</p>
        <button onClick={() => navigate('/')}>Go back</button>
      </div>
    )
  }

  function formatDate(dateStr: string | null) {
    if (!dateStr) return ''
    const d = new Date(dateStr)
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
  }

  return (
    <div className="screen">
      <div className="screen-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          ← Back
        </button>
        <h2>Article</h2>
        <button
          className={`bookmark-btn ${saved ? 'bookmark-saved' : ''}`}
          onClick={() => dispatch(toggleSave(article))}
          aria-label={saved ? 'Unsave' : 'Save'}
        >
          <svg className="bookmark-icon" viewBox="0 0 24 24" width="24" height="24">
            <path
              className="bookmark-fill"
              d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z"
            />
          </svg>
        </button>
      </div>
      <div className="detail-content">
        {article.urlToImage && (
          <img
            src={article.urlToImage}
            alt=""
            className="detail-image"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none'
            }}
          />
        )}
        {article.source && <span className="article-source">{article.source}</span>}
        <h1 className="detail-title">{article.title}</h1>
        {article.publishedAt && (
          <p className="detail-date">{formatDate(article.publishedAt)}</p>
        )}
        <hr />
        {article.description && <p className="detail-desc">{article.description}</p>}
        {article.content && <p className="detail-content-text">{article.content}</p>}
      </div>
    </div>
  )
}
