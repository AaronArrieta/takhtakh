import './Calendar.css'
import { useState, useEffect } from 'react'
import { API_URL } from '../config'
import type { Task } from '../../../../backend/takhtakh/src/models/task.ts'

function Calendar() {
    const [month, setMonth] = useState(new Date().getMonth())
    const [year, setYear] = useState(new Date().getFullYear())
    const [tasks, setTaskList] = useState<Task[]>([])
    
    const startDay = new Date(year, month, 1).getDay()
    const daysInMonth = new Date(year, month + 1, 0).getDate()

    const days = [...Array(daysInMonth).keys()].map(day => day + 1)
    const years = [...Array(10).keys()].map(year => year + 2026)
    const startBuffer = [...Array(startDay).keys()]
    const endRemainder = (startDay + daysInMonth) % 7
    const endBuffer = [...Array(endRemainder === 0 ? 0 : 7 - endRemainder).keys()]
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
        
    function fetchTasks() {
    fetch(`${API_URL}/taskAPI/getAll`)
    .then(res => res.json())
    .then(data => setTaskList(data))
    }

    useEffect(() => {
        fetchTasks()
    }, [])

    function getTasksForDay(day: number) {
    return tasks.filter(task => 
        task.dueDate.split('-').map(Number).join('-') === `${year}-${month + 1}-${day}`
    )
}

    return(
        <div className="calendar-shell">
            <h1>CALENDAR VIEW</h1>
            <div className="calendar-dropdown">
                <select
                style={{fontSize: "20px"}}
                value={month} onChange={(e) => setMonth(parseInt(e.target.value))}>
                    {monthNames.map((monthName, i) => <option key={monthName} value={i}>{monthName}</option>)}
                </select>
                <select
                style={{fontSize: "20px"}}
                value={year} onChange={(e) => setYear(parseInt(e.target.value))}>
                    {years.map((yearValue) => <option key={yearValue} value={yearValue}>{yearValue}</option>)}
                </select>
            </div>
                 <div className="day-name">
                    {dayNames.map(day => <div key={day}>{day}</div>)}
                 </div>
                <div className="calendar-grid">
                    {startBuffer.map((_, i) => <div key={i}></div>)}
                    {days.map(day => 
                        <div key={day}>
                            {day}
                            {getTasksForDay(day).map(task => 
                                <div key={task.id} className={`task-${task.priorityLevel}`}>
                                    {task.name}
                                </div>
                            )}
                        </div>
                    )}
                    {endBuffer.map((_, i) => <div key={i}></div>)}
                </div>
        </div>
    );
}

export default Calendar;