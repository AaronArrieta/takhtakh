import { NavLink } from 'react-router-dom'
import './Sidebar.css'

function Sidebar() {
    return (
        <nav className='sidebar'>
            <div className="sidebar-logo"><i className="bi bi-amazon"></i></div>

            <NavLink to="/" end className={({ isActive }) => 'sidebar-link' + (isActive ? ' active' : '')} title='Tasks'>
                <i className="bi bi-check-square-fill"></i>
            </NavLink>

            <NavLink to="/calendar" className={({ isActive }) => 'sidebar-link' + (isActive ? ' active' : '')} title='Calendar'>
                <i className="bi bi-calendar"></i>
            </NavLink>

            <NavLink to="/matrix" className={({ isActive }) => 'sidebar-link' + (isActive ? ' active' : '')} title='Matrix'>
                <i className="bi bi-ui-checks-grid"></i>
            </NavLink>
        </nav>
    )
}

export default Sidebar