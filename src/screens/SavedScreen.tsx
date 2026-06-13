import { useSelector } from 'react-redux'
import { selectSavedArticles } from '../store/savedSlice'
import ArticleCard from '../components/ArticleCard'

export default function SavedScreen() {
  const savedArticles = useSelector(selectSavedArticles)

  if (savedArticles.length === 0) {
    return (
      <div className="screen">
        <div className="empty-container">
          <p>No saved articles yet</p>
        </div>
      </div>
    )
  }

  return (
    <div className="screen">
      <div className="screen-header">
        <h2>Saved Articles</h2>
      </div>
      <div className="article-list">
        {savedArticles.map((article, i) => (
          <ArticleCard key={`${article.title}-${i}`} article={article} />
        ))}
      </div>
    </div>
  )
}
