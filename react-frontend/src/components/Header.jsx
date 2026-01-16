

function Header({ stats }) {
    return (
        <header className="header">
            <div className="header-content">
                <h1>📋 Task Manager Pro</h1>
                <div className="stats">
                    <div className="stat-item">
                        <div className="stat-value">{stats.total}</div>
                        <div className="stat-label">Total Tasks</div>
                    </div>
                    <div className="stat-item">
                        <div className="stat-value">{stats.completed}</div>
                        <div className="stat-label">Completed</div>
                    </div>
                    <div className="stat-item">
                        <div className="stat-value">{stats.pending}</div>
                        <div className="stat-label">Pending</div>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
