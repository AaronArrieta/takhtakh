import { NavLink } from 'react-router-dom'
import './Sidebar.css'

interface SidebarProps {
    hideTodo: boolean
    hideCalendar: boolean
    hideMatrix: boolean
}

function Sidebar({ hideTodo, hideCalendar, hideMatrix }: SidebarProps) {
    return (
        <nav className='sidebar'>
            <div className="sidebar-logo"><i className="bi bi-amazon"></i></div>

            {!hideTodo && (
                <NavLink to="/" end className={({ isActive }) => 'sidebar-link' + (isActive ? ' active' : '')} title='Tasks'>
                    <i className="bi bi-check-square-fill"></i>
                </NavLink>
            )}

            {!hideCalendar && (
                <NavLink to="/calendar" className={({ isActive }) => 'sidebar-link' + (isActive ? ' active' : '')} title='Calendar'>
                    <i className="bi bi-calendar"></i>
                </NavLink>
            )}

            {!hideMatrix && (
                <NavLink to="/matrix" className={({ isActive }) => 'sidebar-link' + (isActive ? ' active' : '')} title='Matrix'>
                    <i className="bi bi-ui-checks-grid"></i>
                </NavLink>
            )}

            <button className="sidebar-link mt-auto" data-bs-toggle="modal" data-bs-target="#settingsModal" title="Settings" >
                <i className="bi bi-gear"></i>
            </button>
        </nav>
    )
}

export default Sidebar