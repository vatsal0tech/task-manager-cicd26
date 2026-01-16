import { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import { taskAPI } from './services/api';

function App() {
    const [tasks, setTasks] = useState([]);
    const [filteredTasks, setFilteredTasks] = useState([]);
    const [filter, setFilter] = useState('all');
    const [loading, setLoading] = useState(false);
    const [stats, setStats] = useState({ total: 0, completed: 0, pending: 0 });

    useEffect(() => {
        fetchTasks();
    }, []);

    const filterTasks = useCallback(() => {
        let filtered = tasks;
        if (filter === 'completed') {
            filtered = tasks.filter(task => task.completed);
        } else if (filter === 'pending') {
            filtered = tasks.filter(task => !task.completed);
        }
        setFilteredTasks(filtered);
    }, [tasks, filter]);

    const calculateStats = useCallback(() => {
        const total = tasks.length;
        const completed = tasks.filter(task => task.completed).length;
        const pending = total - completed;
        setStats({ total, completed, pending });
    }, [tasks]);

    useEffect(() => {
        filterTasks();
        calculateStats();
    }, [filterTasks, calculateStats]);

    const fetchTasks = async () => {
        setLoading(true);
        try {
            const response = await taskAPI.getAllTasks();
            setTasks(response.data.results || response.data);
        } catch (error) {
            console.error('Error fetching tasks:', error);
            alert('Failed to load tasks. Make sure the backend is running!');
        } finally {
            setLoading(false);
        }
    };

    const handleTaskCreated = async (taskData) => {
        try {
            const response = await taskAPI.createTask(taskData);
            setTasks([response.data, ...tasks]);
        } catch (error) {
            console.error('Error creating task:', error);
            alert('Failed to create task. Please try again.');
        }
    };

    const handleToggleComplete = async (taskId) => {
        try {
            const response = await taskAPI.toggleComplete(taskId);
            setTasks(tasks.map(task =>
                task.id === taskId ? response.data : task
            ));
        } catch (error) {
            console.error('Error toggling task:', error);
            alert('Failed to update task. Please try again.');
        }
    };

    const handleDeleteTask = async (taskId) => {
        if (window.confirm('Are you sure you want to delete this task?')) {
            try {
                await taskAPI.deleteTask(taskId);
                setTasks(tasks.filter(task => task.id !== taskId));
            } catch (error) {
                console.error('Error deleting task:', error);
                alert('Failed to delete task. Please try again.');
            }
        }
    };

    return (
        <div className="app-container">
            <Header stats={stats} />
            <main className="main-content">
                <TaskForm onTaskCreated={handleTaskCreated} />

                <div className="filter-tabs">
                    <button
                        className={`tab ${filter === 'all' ? 'active' : ''}`}
                        onClick={() => setFilter('all')}
                    >
                        All Tasks
                    </button>
                    <button
                        className={`tab ${filter === 'pending' ? 'active' : ''}`}
                        onClick={() => setFilter('pending')}
                    >
                        Pending
                    </button>
                    <button
                        className={`tab ${filter === 'completed' ? 'active' : ''}`}
                        onClick={() => setFilter('completed')}
                    >
                        Completed
                    </button>
                </div>

                <TaskList
                    tasks={filteredTasks}
                    onToggleComplete={handleToggleComplete}
                    onDeleteTask={handleDeleteTask}
                    loading={loading}
                />
            </main>
        </div>
    );
}

export default App;
