// import { useEffect, useState } from 'react'
// import reactLogo from './assets/react.svg'
import { BrowserRouter, Routes, Route } from 'react-router-dom' 
import './App.css'
import Landing from './pages/Landing'
import Dashboard from './pages/Dashboard'
import MailEditor from './components/MailEditor'
import Navbar from './components/Navbar'

function App() {

  return (
    <div className="App relative h-screen bg-[#333]">
      <BrowserRouter>
        <Navbar/>
       <Routes>
          <Route exact path="/" element={<Landing/>}/>
          <Route path='/dashboard' element={<Dashboard/>}/>
          <Route path='/send-mail' element={<MailEditor/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
