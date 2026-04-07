import { useState, useEffect } from 'react'
import './Tasks.css'
import { API_URL } from '../config'
import type { Task } from '../../../../backend/takhtakh/src/models/task.ts'

function Tasks() {
    const [selectedView, setSelectedView] = useState('Today')
    const [taskName, setTaskName] = useState('')
    const [dueDay, setDueDay] = useState('')
    const [dueMonth, setDueMonth] = useState('')
    const [dueYear, setDueYear] = useState('')
    const [priority, setPriority] = useState('green')
    const [tasks, setTasks] = useState<Task[]>([])                      // HM added: for display tasks in CheckList
    const [isEditing, setIsEditing] = useState(false)                   // HM added: controls if modal is visible
    const [editingTask, setEditingTask] = useState<Task | null>(null)   // HM added: which task is being edited
    const [editName, setEditName] = useState('')
    const [editDay, setEditDay] = useState('')
    const [editMonth, setEditMonth] = useState('')
    const [editYear, setEditYear] = useState('')
    const [editPriority, setEditPriority] = useState('green')

    // HM added 4 HELPER FUNCTIONS
    function getPriorityLabel(priority: string) {
        if (priority === 'red') return 'High'
        if (priority === 'yellow') return 'Medium'
        if (priority === 'green') return 'Low'
        return 'Unknown'
    }

    function fetchTasks() {
        fetch(`${API_URL}/taskAPI/getAll`)
            .then(res => res.json())
            .then(data => setTasks(data))
    }

    function getFilteredTasks(): Task[] {
        const today = new Date()

        // Case 1: Filter for Tasks where dueDate === Today
        if (selectedView === 'Today') {
            return tasks.filter(task => {
                const taskDate = new Date(task.dueDate + 'T12:00:00')
                const today = new Date()
                return taskDate.getFullYear() === today.getFullYear() &&
                    taskDate.getMonth() === today.getMonth() &&
                    taskDate.getDate() === today.getDate()
            })
        }

        // Case 2: Filter for Tasks between today up to 7 days from Today
        if (selectedView === 'Next 7 Days') {
            return tasks.filter(task => {
                const taskDate = new Date(task.dueDate + 'T12:00:00')
                const startOfToday = new Date(today)
                startOfToday.setHours(0, 0, 0, 0)  // reset to midnight
                const next7 = new Date(today)
                next7.setDate(today.getDate() + 7)
                return taskDate >= startOfToday && taskDate <= next7
            })
        }

        // Case 3: Inbox (no filtering needed)
        return tasks
    }

    function formatDate(dueDate: string): string {
        const parts = dueDate.split('-')
        // parts[0] = "2026", parts[1] = "04", parts[2] = "06"
        return `${parts[1]}/${parts[2]}/${parts[0]}`
    }

    function handleOpenEdit(task: Task) {
        setEditingTask(task)
        setIsEditing(true)
        setEditName(task.name)
        const parts = task.dueDate.split('-')
        setEditYear(parts[0] ?? '')
        setEditMonth(parts[1] ?? '')
        setEditDay(parts[2] ?? '')
        setEditPriority(task.priorityLevel)
    }

    // HM added useEffect
    useEffect(() => {
        fetchTasks()
    }, [])

    async function handleAddTask() {
        if (taskName.trim() === '') return  // don't add empty tasks
        const response = await fetch(`${API_URL}/taskAPI/create`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: taskName,
                dueDate: `${dueYear}-${dueMonth}-${dueDay}`,
                priorityLevel: priority
            })
        })
        const data = await response.json()
        console.log(data.message)
        fetchTasks()
    }

    async function handleDeleteTask(id: string) {
        // since empty tasks cannot be added, is not handled here (Delete only existing tasks)
        const response = await fetch(`${API_URL}/taskAPI/delete/${id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        })
        const data = await response.json()
        console.log(data.message)
        fetchTasks()
    }

    async function handleCompleteTask(id: string) {
        const response = await fetch(`${API_URL}/taskAPI/edit/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: "Completed" })
        })
        const data = await response.json()
        console.log(data.message)
        fetchTasks()
    }

    async function handleEditTask() {
        if (!editingTask) return
        const response = await fetch(`${API_URL}/taskAPI/edit/${editingTask.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: editName,
                dueDate: `${editYear}-${editMonth}-${editDay}`,
                priorityLevel: editPriority
            })
        })
        const data = await response.json()
        console.log(data.message)
        setIsEditing(false)
        setEditingTask(null)
        fetchTasks()
    }

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

            {/* MIDDLE: Task List*/}
            <div className="tasks-main">
                {getFilteredTasks().map(task => (
                    <div key={task.id} className={`task-card task-card-${task.priorityLevel}`}>
                        <p>{task.name}</p>
                        <p>{formatDate(task.dueDate)}</p>
                        <p>{task.status}</p>
                        <p>{getPriorityLabel(task.priorityLevel)}</p>
                        <div className="task-actions">
                            <button className="btn-action btn-action-delete" onClick={() => handleDeleteTask(task.id)}>Delete</button>
                            <span className="action-divider">|</span>
                            <button className="btn-action btn-action-edit" onClick={() => { handleOpenEdit(task); setIsEditing(true) }}>Edit</button>
                            <span className="action-divider">|</span>
                            <button className="btn-action btn-action-complete" onClick={() => handleCompleteTask(task.id)}>Complete</button>
                        </div>
                    </div>
                ))}
            </div>

            {/* RIGHT: Create Task - Task Forum */}
            <div className="tasks-create">
                <h2 className='create-title'>CREATE TASK</h2>

                {/* Task Name */}
                <div className="mb-3">
                    <label className="form-label">TASK</label>
                    <input type="text" className="form-control" placeholder='Task name'
                        value={taskName} onChange={(e) => setTaskName(e.target.value)} />
                </div>

                {/* Due Date */}
                <div className="mb-3">
                    <label className="form-label">DUE DATE</label>
                    <div className="d-flex gap-2">
                        <input type="number" className="form-control" placeholder="MM" min="1" max="12" value={dueMonth} onChange={(e) => setDueMonth(e.target.value)} />
                        <input type="number" className="form-control" placeholder="DD" min="1" max="31" value={dueDay} onChange={(e) => setDueDay(e.target.value)} />
                        <input type="number" className="form-control" placeholder="YYYY" min="2024" max="2100" value={dueYear} onChange={(e) => setDueYear(e.target.value)} />
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

            {/* EDIT MODAL */}
            {isEditing && editingTask && (
                <div className="modal-overlay">
                    <div className="modal-box">
                        <h2 className="create-title">EDIT TASK</h2>
                        <div className="mb-3">
                            <label className="form-label">TASK</label>
                            <input type="text" className="form-control" value={editName} onChange={(e) => setEditName(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">DUE DATE</label>
                            <div className="d-flex gap-2">
                                <input type="number" className="form-control" placeholder="MM" min="1" max="12" value={editMonth} onChange={(e) => setEditMonth(e.target.value)} />
                                <input type="number" className="form-control" placeholder="DD" min="1" max="31" value={editDay} onChange={(e) => setEditDay(e.target.value)} />
                                <input type="number" className="form-control" placeholder="YYYY" min="2024" max="2100" value={editYear} onChange={(e) => setEditYear(e.target.value)} />
                            </div>
                        </div>
                        <div className="mb-4">
                            <label className="form-label">PRIORITY</label>
                            <div className="dropdown">
                                <button className="btn btn-light dropdown-toggle" type="button" data-bs-toggle="dropdown">
                                    {editPriority === 'red' ? '🟥 High' : editPriority === 'yellow' ? '🟨 Medium' : '🟩 Low'}
                                </button>
                                <ul className="dropdown-menu">
                                    <li><a className="dropdown-item" onClick={() => setEditPriority('red')}>🟥 High</a></li>
                                    <li><a className="dropdown-item" onClick={() => setEditPriority('yellow')}>🟨 Medium</a></li>
                                    <li><a className="dropdown-item" onClick={() => setEditPriority('green')}>🟩 Low</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="d-flex gap-2">
                            <button className="btn btn-primary w-50" onClick={handleEditTask}>Finish Editing</button>
                            <button className="btn btn-secondary w-50" onClick={() => { setIsEditing(false); setEditingTask(null) }}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    )
}

export default Tasks