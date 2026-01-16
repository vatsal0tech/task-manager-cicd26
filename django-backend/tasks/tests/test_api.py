import pytest
from rest_framework.test import APIClient
from rest_framework import status
from tasks.models import Task


@pytest.mark.django_db
class TestTaskAPI:
    """Test cases for Task API endpoints."""

    def setup_method(self):
        """Set up test client and sample data."""
        self.client = APIClient()
        self.task_data = {
            'title': 'Test Task',
            'description': 'Test Description',
            'priority': 'high'
        }

    def test_create_task(self):
        """Test creating a task via API."""
        response = self.client.post('/api/tasks/', self.task_data, format='json')
        assert response.status_code == status.HTTP_201_CREATED
        assert response.data['title'] == 'Test Task'
        assert Task.objects.count() == 1

    def test_list_tasks(self):
        """Test listing all tasks."""
        Task.objects.create(title="Task 1")
        Task.objects.create(title="Task 2")
        response = self.client.get('/api/tasks/')
        assert response.status_code == status.HTTP_200_OK
        assert len(response.data['results']) == 2

    def test_retrieve_task(self):
        """Test retrieving a single task."""
        task = Task.objects.create(title="Sample Task")
        response = self.client.get(f'/api/tasks/{task.id}/')
        assert response.status_code == status.HTTP_200_OK
        assert response.data['title'] == "Sample Task"

    def test_update_task(self):
        """Test updating a task."""
        task = Task.objects.create(title="Original Title")
        update_data = {'title': 'Updated Title', 'completed': True}
        response = self.client.patch(f'/api/tasks/{task.id}/', update_data, format='json')
        assert response.status_code == status.HTTP_200_OK
        assert response.data['title'] == 'Updated Title'
        assert response.data['completed'] is True

    def test_delete_task(self):
        """Test deleting a task."""
        task = Task.objects.create(title="To Delete")
        response = self.client.delete(f'/api/tasks/{task.id}/')
        assert response.status_code == status.HTTP_204_NO_CONTENT
        assert Task.objects.count() == 0

    def test_get_completed_tasks(self):
        """Test getting completed tasks."""
        Task.objects.create(title="Completed Task", completed=True)
        Task.objects.create(title="Pending Task", completed=False)
        response = self.client.get('/api/tasks/completed/')
        assert response.status_code == status.HTTP_200_OK
        assert len(response.data) == 1

    def test_get_pending_tasks(self):
        """Test getting pending tasks."""
        Task.objects.create(title="Completed Task", completed=True)
        Task.objects.create(title="Pending Task", completed=False)
        response = self.client.get('/api/tasks/pending/')
        assert response.status_code == status.HTTP_200_OK
        assert len(response.data) == 1

    def test_toggle_task_completion(self):
        """Test toggling task completion status."""
        task = Task.objects.create(title="Toggle Task", completed=False)
        response = self.client.post(f'/api/tasks/{task.id}/toggle_complete/')
        assert response.status_code == status.HTTP_200_OK
        assert response.data['completed'] is True

    def test_validate_empty_title(self):
        """Test that empty titles are rejected."""
        invalid_data = {'title': '   ', 'description': 'Test'}
        response = self.client.post('/api/tasks/', invalid_data, format='json')
        assert response.status_code == status.HTTP_400_BAD_REQUEST
