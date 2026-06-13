import { Provider } from 'react-redux'
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import store from './store'
import './App.css'
import HomeScreen from './screens/HomeScreen'
import SavedScreen from './screens/SavedScreen'
import DetailScreen from './screens/DetailScreen'

function NavBar() {
  const navigate = useNavigate()
  const location = useLocation()
  const isDetail = location.pathname === '/detail'

  if (isDetail) return null

  const tabs = [
    { path: '/', label: 'Home', icon: '🏠' },
    { path: '/saved', label: 'Saved', icon: '🔖' },
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
    </nav>
  )
}

function AppContent() {
  return (
    <div className="app">
      <div className="app-body">
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/saved" element={<SavedScreen />} />
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
