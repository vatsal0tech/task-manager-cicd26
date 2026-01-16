import { useState } from 'react';

function TaskForm({ onTaskCreated }) {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        priority: 'medium',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.title.trim()) {
            onTaskCreated(formData);
            setFormData({ title: '', description: '', priority: 'medium' });
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div className="task-form">
            <h2>Create New Task</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Task Title *</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Enter task title..."
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Enter task description..."
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="priority">Priority</label>
                    <select
                        id="priority"
                        name="priority"
                        value={formData.priority}
                        onChange={handleChange}
                    >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                </div>

                <button type="submit" className="btn btn-primary">
                    Add Task
                </button>
            </form>
        </div>
    );
}

export default TaskForm;
