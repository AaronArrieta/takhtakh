import './Matrix.css'

function Matrix() {
    return(
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

                    </div>
                </div>

                {/* (top right) MEDIUM PRIORITY */}
                <div className='matrix-quadrant'>
                    <div className='quadrant-body'>

                        <div className='quadrant-header yellow'>
                            <i className='bi bi-exclamation-circle-fill'></i>
                            <span> MEDIUM PRIORITY </span>
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

                        

                    </div>
                </div>

                {/* (bottom right) UNDEFINED */}
                <div className='matrix-quadrant'>
                    
                    <div className='quadrant-body'>
                        <div className='quadrant-header green'>
                            <i className='bi bi-exclamation-circle-fill'></i>
                            <span> UNDEFINED </span>
                        </div>

                    </div>
                </div>

            </div>
        </div>

    );
}

export default Matrix;