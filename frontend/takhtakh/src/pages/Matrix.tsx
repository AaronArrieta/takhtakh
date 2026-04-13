import './Matrix.css'
import { useState, useEffect } from 'react'
import { API_URL } from '../config'
import type { Task } from '../../../../backend/takhtakh/src/models/task.ts'

function Matrix() {
    const [tasks, setTasks] = useState<Task[]>([])

    function fetchTasks() {
        fetch(`${API_URL}/taskAPI/getAll`)
            .then(res => res.json())
            .then(data => setTasks(data))
    }

    useEffect(() => {
        fetchTasks()
        const interval = setInterval(fetchTasks, 5000) // re-fetch every 5 seconds
        return () => clearInterval(interval)
    }, [])

    function formatDate(dueDate: string): string {
        const parts = dueDate.split('-')
        return `${parts[1]}/${parts[2]}/${parts[0]}`
    }

    const highTasks      = tasks.filter(t => t.priorityLevel === 'red')
    const mediumTasks    = tasks.filter(t => t.priorityLevel === 'yellow')
    const lowTasks       = tasks.filter(t => t.priorityLevel === 'blue')
    const undefinedTasks = tasks.filter(t => t.priorityLevel === 'undefined')

    function TaskCard({ task }: { task: Task }) {
        return (
            <div className='matrix-task-row'>
                <span className='matrix-task-dot'>•</span>
                <span className='matrix-task-name'>{task.name}</span>
                <span className='matrix-task-date'>{formatDate(task.dueDate)}</span>
            </div>
        )
    }

    return (
        <div className="matrix-shell">
            <h2 className='matrix-title'>EISENHOWER MATRIX</h2>

            <div className='matrix-grid'>

                {/* (top left) HIGH PRIORITY */}
                <div className='matrix-quadrant'>
                    <div className='quadrant-body'>
                        <div className='quadrant-header red'>
                            <i className='bi bi-exclamation-circle-fill'></i>
                            <span> HIGH PRIORITY </span>
                        </div>
                        <div className='quadrant-tasks'>
                            {highTasks.length === 0
                                ? <p className='quadrant-empty'>No tasks</p>
                                : highTasks.map(t => <TaskCard key={t.id} task={t} />)
                            }
                        </div>
                    </div>
                </div>

                {/* (top right) MEDIUM PRIORITY */}
                <div className='matrix-quadrant'>
                    <div className='quadrant-body'>
                        <div className='quadrant-header yellow'>
                            <i className='bi bi-exclamation-circle-fill'></i>
                            <span> MEDIUM PRIORITY </span>
                        </div>
                        <div className='quadrant-tasks'>
                            {mediumTasks.length === 0
                                ? <p className='quadrant-empty'>No tasks</p>
                                : mediumTasks.map(t => <TaskCard key={t.id} task={t} />)
                            }
                        </div>
                    </div>
                </div>

                {/* (bottom left) LOW PRIORITY */}
                <div className='matrix-quadrant'>
                    <div className='quadrant-body'>
                        <div className='quadrant-header blue'>
                            <i className='bi bi-exclamation-circle-fill'></i>
                            <span> LOW PRIORITY </span>
                        </div>
                        <div className='quadrant-tasks'>
                            {lowTasks.length === 0
                                ? <p className='quadrant-empty'>No tasks</p>
                                : lowTasks.map(t => <TaskCard key={t.id} task={t} />)
                            }
                        </div>
                    </div>
                </div>

                {/* (bottom right) UNDEFINED */}
                <div className='matrix-quadrant'>
                    <div className='quadrant-body'>
                        <div className='quadrant-header green'>
                            <i className='bi bi-exclamation-circle-fill'></i>
                            <span> UNDEFINED </span>
                        </div>
                        <div className='quadrant-tasks'>
                            {undefinedTasks.length === 0
                                ? <p className='quadrant-empty'>No tasks</p>
                                : undefinedTasks.map(t => <TaskCard key={t.id} task={t} />)
                            }
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Matrix