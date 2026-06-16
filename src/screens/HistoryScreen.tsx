import { useDispatch, useSelector } from 'react-redux'
import { selectHistory, clearHistory } from '../store/historySlice'
import ArticleCard from '../components/ArticleCard'

export default function HistoryScreen() {
  const dispatch = useDispatch()
  const entries = useSelector(selectHistory)

  return (
    <div className="screen">
      <div className="screen-header">
        <h2>Reading History</h2>
        {entries.length > 0 && (
          <button className="clear-btn" onClick={() => dispatch(clearHistory())}>
            Clear
          </button>
        )}
      </div>

      {entries.length === 0 ? (
        <div className="empty-container">
          <p>No reading history yet</p>
        </div>
      ) : (
        <div className="article-list">
          {entries.map((entry, i) => (
            <div key={`${entry.article.title}-${i}`} className="history-item">
              <ArticleCard article={entry.article} />
              <span className="history-time">
                Viewed {new Date(entry.viewedAt).toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
