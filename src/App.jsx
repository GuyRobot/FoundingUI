import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Home } from './pages'
import { Navbar, Sidebar } from './components'

function App() {
  return (
    <div className='relative sm:-8 p-4 bg-[#13131a] min-h-screen flex flex-row text-white'>
      <div className='sm:flex hidden mr-10 relative'>
        <Sidebar />
      </div>
      <div className='flex-1 max-w-[1280px] max-sm:w-full mx-auto sm:pr-5'>
        <Navbar />

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/' element={<Home />} />
          <Route path='/' element={<Home />} />
          <Route path='/' element={<Home />} />
        </Routes>
      </div>
    </div>
  )
}

export default App