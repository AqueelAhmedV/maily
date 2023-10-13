// import { useEffect, useState } from 'react'
// import reactLogo from './assets/react.svg'
import { BrowserRouter, Routes, Route } from 'react-router-dom' 
import './App.css'
import Landing from './pages/Landing'
import Dashboard from './pages/Dashboard'
import MailEditor from './components/MailEditor'
import Navbar from './components/Navbar'
import NotFoundPage from './pages/NotFound'
import { useEffect, useState } from 'react'
import UserContext from './contexts/UserContext'
import { routes } from './constants'
import axios from 'axios'

function App() {
  
  const [user, setUser] = useState({});
  useEffect(() => {
    axios.get(`${routes.SERVER_URL}/api/user/sample-user`)
    .then(res => setUser(res.data))
    .catch(console.log)
  }, [])

  return (
    <UserContext.Provider value={{user, setUser}}>
    <div className="App relative h-screen bg-[#333]">
      <BrowserRouter>
        <Navbar/>
       <Routes>
          <Route exact path="/" element={<Landing/>}/>
          <Route path='/dashboard' element={<Dashboard/>}/>
          <Route path='/send-mail' element={<MailEditor/>}/>
          <Route path="*" element={<NotFoundPage/>} />
          </Routes>
      </BrowserRouter>
    </div>
    </UserContext.Provider>
  )
}

export default App
