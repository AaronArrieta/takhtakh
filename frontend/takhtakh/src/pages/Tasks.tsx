import { useState } from 'react'
import './Tasks.css'

function Tasks() {
    const [selectedView, setSelectedView] = useState('Today')

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

            {/* MIDDLE: Task List - placeholder for now */}
            <div className="tasks-main"></div>

            {/* RIGHT: Create Task - placeholder for now */}
            <div className="tasks-create"></div>

        </div>
    )
}

export default Tasks