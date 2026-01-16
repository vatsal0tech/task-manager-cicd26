

function TaskList({ tasks, onToggleComplete, onDeleteTask, loading }) {
    if (loading) {
        return <div className="loading">Loading tasks...</div>;
    }

    if (tasks.length === 0) {
        return (
            <div className="empty-state">
                <h3>No tasks found</h3>
                <p>Create your first task to get started!</p>
            </div>
        );
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        });
    };

    return (
        <div className="task-list">
            {tasks.map((task) => (
                <div
                    key={task.id}
                    className={`task-item ${task.completed ? 'completed' : ''}`}
                >
                    <div className="task-header">
                        <h3 className="task-title">{task.title}</h3>
                        <span className={`task-priority priority-${task.priority}`}>
                            {task.priority}
                        </span>
                    </div>

                    {task.description && (
                        <p className="task-description">{task.description}</p>
                    )}

                    <div className="task-meta">
                        <div className="task-date">
                            <span>Created: {formatDate(task.created_at)}</span>
                        </div>
                        <div className="task-actions">
                            <button
                                className="btn-small btn-complete"
                                onClick={() => onToggleComplete(task.id)}
                            >
                                {task.completed ? '↺ Undo' : '✓ Complete'}
                            </button>
                            <button
                                className="btn-small btn-delete"
                                onClick={() => onDeleteTask(task.id)}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default TaskList;
