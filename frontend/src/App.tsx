import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import SignupPage from './pages/Signup'
import LoginPage from './pages/Login'
import { Toaster } from 'react-hot-toast'
import Land from './pages/Land'
import Navbar from './components/Navbar'

function App() {

  return (
    <Router>
      <Toaster />
        <Navbar/>
      <Routes>
        <Route path='/signup' element={<SignupPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/' element={<Land />} />
      </Routes >
    </Router>

  )
}

export default App
