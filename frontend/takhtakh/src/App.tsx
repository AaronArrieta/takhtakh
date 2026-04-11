import { useState, useEffect } from 'react'
import './App.css'
import Sidebar from './components/Sidebar'
import Tasks from './pages/Tasks'
import Calendar from './pages/Calendar'
import Matrix from './pages/Matrix'
import Settings from './components/Settings'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
    const [darkMode, setDarkMode] = useState(false)
    const [hideTodo, setHideTodo] = useState(false)
    const [hideCalendar, setHideCalendar] = useState(false)
    const [hideMatrix, setHideMatrix] = useState(false)

    useEffect(() => { document.documentElement.setAttribute('data-bs-theme', 'light') }, [])

    function toggleDarkMode(enabled: boolean) {
      setDarkMode(enabled)
      document.documentElement.setAttribute('data-bs-theme', enabled ? 'dark' : 'light')
    }

    return (
      <BrowserRouter>
          <div className="app-shell">
              <Sidebar hideTodo={hideTodo} hideCalendar={hideCalendar} hideMatrix={hideMatrix} />
              <main className="app-main">
                  <Routes>
                      <Route path='/' element={<Tasks/>}/>
                      <Route path='/calendar' element={<Calendar/>}/>
                      <Route path='/matrix' element={<Matrix/>}/>
                  </Routes>
              </main>
          </div>

            <Settings darkMode={darkMode} toggleDarkMode={toggleDarkMode} hideTodo={hideTodo} setHideTodo={setHideTodo} hideCalendar={hideCalendar} setHideCalendar={setHideCalendar} hideMatrix={hideMatrix} setHideMatrix={setHideMatrix} />
      </BrowserRouter>
  )
}

export default App