import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import './index.css'

import { AuthContextProvider } from './context/AuthContext'
import App from './App'

createRoot(document.getElementById('root')).render(
  <Router>
    <AuthContextProvider>
      <App/>
    </AuthContextProvider>
  </Router>
)
