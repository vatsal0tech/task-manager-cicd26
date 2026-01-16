import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const taskAPI = {
    // Get all tasks
    getAllTasks: () => api.get('/tasks/'),

    // Get task by ID
    getTask: (id) => api.get(`/tasks/${id}/`),

    // Create new task
    createTask: (taskData) => api.post('/tasks/', taskData),

    // Update task
    updateTask: (id, taskData) => api.patch(`/tasks/${id}/`, taskData),

    // Delete task
    deleteTask: (id) => api.delete(`/tasks/${id}/`),

    // Get completed tasks
    getCompletedTasks: () => api.get('/tasks/completed/'),

    // Get pending tasks
    getPendingTasks: () => api.get('/tasks/pending/'),

    // Toggle task completion
    toggleComplete: (id) => api.post(`/tasks/${id}/toggle_complete/`),
};

export default api;
