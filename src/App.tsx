import { Provider, useSelector, useDispatch } from 'react-redux'
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import store from './store'
import { selectThemeMode, toggleTheme } from './store/themeSlice'
import './App.css'
import HomeScreen from './screens/HomeScreen'
import SavedScreen from './screens/SavedScreen'
import DetailScreen from './screens/DetailScreen'
import HistoryScreen from './screens/HistoryScreen'

function NavBar() {
  const navigate = useNavigate()
  const location = useLocation()
  const isDetail = location.pathname === '/detail'
  const theme = useSelector(selectThemeMode)
  const dispatch = useDispatch()

  if (isDetail) return null

  const tabs = [
    { path: '/', label: 'Home', icon: '🏠' },
    { path: '/saved', label: 'Saved', icon: '🔖' },
    { path: '/history', label: 'History', icon: '📖' },
  ]

  return (
    <nav className="bottom-nav">
      {tabs.map((tab) => (
        <button
          key={tab.path}
          className={`nav-tab ${location.pathname === tab.path ? 'active' : ''}`}
          onClick={() => navigate(tab.path)}
        >
          <span>{tab.icon}</span>
          <span>{tab.label}</span>
        </button>
      ))}
      <button className="nav-tab theme-toggle" onClick={() => dispatch(toggleTheme())}>
        <span>{theme === 'dark' ? '☀️' : '🌙'}</span>
        <span>{theme === 'dark' ? 'Light' : 'Dark'}</span>
      </button>
    </nav>
  )
}

function AppContent() {
  const theme = useSelector(selectThemeMode)

  return (
    <div className="app" data-theme={theme}>
      <div className="app-body">
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/saved" element={<SavedScreen />} />
          <Route path="/history" element={<HistoryScreen />} />
          <Route path="/detail" element={<DetailScreen />} />
        </Routes>
      </div>
      <NavBar />
    </div>
  )
}

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </Provider>
  )
}

export default App
