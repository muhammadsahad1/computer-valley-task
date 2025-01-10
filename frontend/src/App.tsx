import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import SignupPage from './pages/Signup'
import LoginPage from './pages/Login'
import { Toaster } from 'react-hot-toast'

import Navbar from './components/Navbar'
import ProfileForm from './components/Form/ProfileForm'
import Home from './pages/Home'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from './store'

function App() {

  return (
    // here providing the redux store in globaly
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Toaster />
          <Navbar />
          <Routes>
            <Route path='/signup' element={<SignupPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/' element={<Home />} />
            <Route path='/profile' element={<ProfileForm />} />
            <Route path='/home' element={<Home />} />
          </Routes >
        </Router>
      </PersistGate>
    </Provider>

  )
}

export default App
