import pytest
from django.utils import timezone
from tasks.models import Task


@pytest.mark.django_db
class TestTaskModel:
    """Test cases for Task model."""

    def test_create_task(self):
        """Test creating a new task."""
        task = Task.objects.create(
            title="Test Task",
            description="Test Description",
            priority="high"
        )
        assert task.title == "Test Task"
        assert task.description == "Test Description"
        assert task.priority == "high"
        assert task.completed is False

    def test_task_default_values(self):
        """Test task default values."""
        task = Task.objects.create(title="Default Task")
        assert task.completed is False
        assert task.priority == "medium"
        assert task.description == ""

    def test_task_string_representation(self):
        """Test task string representation."""
        task = Task.objects.create(title="Sample Task")
        assert str(task) == "Sample Task"

    def test_task_ordering(self):
        """Test tasks are ordered by creation date (newest first)."""
        task1 = Task.objects.create(title="First Task")
        task2 = Task.objects.create(title="Second Task")
        tasks = Task.objects.all()
        assert tasks[0] == task2
        assert tasks[1] == task1

    def test_task_timestamps(self):
        """Test task timestamps are set correctly."""
        task = Task.objects.create(title="Timestamp Task")
        assert task.created_at is not None
        assert task.updated_at is not None
        assert task.created_at <= task.updated_at
