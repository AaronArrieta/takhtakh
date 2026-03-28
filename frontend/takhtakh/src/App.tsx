import './App.css'
import Sidebar from './components/Sidebar'
import Tasks from './pages/Tasks'
import Calendar from './pages/Calendar'
import Matrix from './pages/Matrix'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <Sidebar />
        <main className="app-main">
          <Routes>
            <Route path='/' element={<Tasks/>}/>
            <Route path='/calendar' element={<Calendar/>}/>
            <Route path='/matrix' element={<Matrix/>}/>
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;