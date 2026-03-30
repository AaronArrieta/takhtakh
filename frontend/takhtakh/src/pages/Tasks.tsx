import { useState } from 'react'
import './Tasks.css'

function Tasks() {
    const [selectedView, setSelectedView] = useState('Today')
    const [taskName, setTaskName] = useState('')
    const [dueDay, setDueDay] = useState('')
    const [dueMonth, setDueMonth] = useState('')
    const [dueYear, setDueYear] = useState('')
    const [priority, setPriority] = useState('green')

    function handleAddTask() {
    if (taskName.trim() === '') return  // don't add empty tasks
    console.log('Adding task:', taskName, dueDay, dueMonth, dueYear, priority)}

    return (
        <div className="tasks-shell">

            {/* LEFT: View Selector */}
            <div className="tasks-views">
                <p className="views-label">SELECT VIEW</p>

                <button className={'view-btn' + (selectedView === 'Today' ? ' selected' : '')} onClick={() => setSelectedView('Today')}>
                    Today
                </button>

                <button className={'view-btn' + (selectedView === 'Next 7 Days' ? ' selected' : '')} onClick={() => setSelectedView('Next 7 Days')}>
                    Next 7 Days
                </button>

                <button className={'view-btn' + (selectedView === 'Inbox' ? ' selected' : '')} onClick={() => setSelectedView('Inbox')}>
                    Inbox
                </button>

            </div>

            {/* MIDDLE: Task List - TO DO*/}
            <div className="tasks-main"></div>

            {/* RIGHT: Create Task - Task Forum */}
            <div className="tasks-create">
                <h2 className='create-title'>CREATE TASK</h2>

                {/* Task Name */}
                <div className="mb-3">
                    <label className="form-label">TASK</label>
                    <input type="text" className="form-control" placeholder='Task name' 
                    value={taskName} onChange={(e) => setTaskName(e.target.value)}/>
                </div>

                {/* Due Date */}
                <div className="mb-3">
                    <label className="form-label">DUE DATE</label>
                    <div className="d-flex gap-2">
                        <input type="number" className="form-control" placeholder="DD" min="1" max="31" value={dueDay} onChange={(e) => setDueDay(e.target.value)}/>
                        <input type="number" className="form-control" placeholder="MM" min="1" max="12" value={dueMonth} onChange={(e) => setDueMonth(e.target.value)}/>
                        <input type="number" className="form-control" placeholder="YYYY" min="2024" max="2100" value={dueYear} onChange={(e) => setDueYear(e.target.value)}/>
                    </div>
                </div>

                {/* Priority + Add */}
                <div className="mb-4">
                    <label className="form-label">PRIORITY</label>
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="dropdown">
                            <button className="btn btn-light dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false"> {priority === 'red' ? '🟥 High' : priority === 'yellow' ? '🟨 Medium' : '🟩 Low'}</button>
                            <ul className="dropdown-menu">
                                <li><a className="dropdown-item" onClick={() => setPriority('red')}>🟥 High</a></li>
                                <li><a className="dropdown-item" onClick={() => setPriority('yellow')}>🟨 Medium</a></li>
                                <li><a className="dropdown-item" onClick={() => setPriority('green')}>🟩 Low</a></li>
                            </ul>
                        </div>
                        <button type="button" className="btn btn-primary w-50" onClick={handleAddTask}>ADD</button>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default Tasks