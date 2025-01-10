import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import SignupPage from './pages/Signup'
import LoginPage from './pages/Login'
import { Toaster } from 'react-hot-toast'

function App() {

  return (
    <Router>
      <Toaster />
      <Routes>
        <Route path='/signup' element={<SignupPage />} />
        <Route path='/login' element={<LoginPage />} />
      </Routes >
    </Router>

  )
}

export default App
