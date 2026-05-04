import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Results from './pages/Results.jsx'
import Home from './pages/Home.jsx'
import Facilities from './pages/Facilities.jsx'
import { Toaster } from 'react-hot-toast'

const App = () => {
  return (
    <>
    <Toaster position="top-right" />
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/results' element={<Results/>}/>
      <Route path='/facilities' element={<Facilities/>}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App