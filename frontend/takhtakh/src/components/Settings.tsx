interface SettingsProps {
    darkMode: boolean
    toggleDarkMode: (enabled: boolean) => void
    hideTodo: boolean
    setHideTodo: (val: boolean) => void
    hideCalendar: boolean
    setHideCalendar: (val: boolean) => void
    hideMatrix: boolean
    setHideMatrix: (val: boolean) => void
}

function Settings({ darkMode, toggleDarkMode, hideTodo, setHideTodo, hideCalendar, setHideCalendar, hideMatrix, setHideMatrix }: SettingsProps) {
    return (
        <div className="modal fade" id="settingsModal" tabIndex={-1} aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered modal-lg">
                <div className="modal-content" style={{ minHeight: '600px' }}>

                    <div className="modal-header border-0 pb-0">
                        <h2 className="modal-title w-100 text-center fw-semibold">SETTINGS</h2>
                        <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                    </div>

                    <div className="modal-body px-4 py-3 d-flex flex-column align-items-center justify-content-top">
                        <div style={{ width: '400px' }}>

                            {/* Sidebar */}
                            <hr/>
                            <p className="fw-semibold mb-1">Sidebar</p>
                            <p className="text-muted mb-2 fw-semibold" style={{ fontSize: '13px' }}>Hide:</p>

                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" id="hideTodo"
                                    checked={hideTodo}
                                    onChange={(e) => setHideTodo(e.target.checked)}
                                />
                                <label className="form-check-label" htmlFor="hideTodo">To-Do</label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" id="hideCalendar"
                                    checked={hideCalendar}
                                    onChange={(e) => setHideCalendar(e.target.checked)}
                                />
                                <label className="form-check-label" htmlFor="hideCalendar">Calendar</label>
                            </div>
                            <div className="form-check mb-3">
                                <input className="form-check-input" type="checkbox" id="hideMatrix"
                                    checked={hideMatrix}
                                    onChange={(e) => setHideMatrix(e.target.checked)}
                                />
                                <label className="form-check-label" htmlFor="hideMatrix">Eisenhower Matrix</label>
                            </div>

                            {/* Appearance Section */}
                            <hr/>
                            <p className="fw-semibold mb-2">Appearance</p>

                            <div className="form-check form-switch">
                                <input className="form-check-input" type="checkbox" id="darkMode"
                                    checked={darkMode}
                                    onChange={(e) => toggleDarkMode(e.target.checked)}
                                />
                                <label className="form-check-label" htmlFor="darkMode">Dark Mode</label>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Settings