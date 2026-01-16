from rest_framework import viewsets, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Task
from .serializers import TaskSerializer


class TaskViewSet(viewsets.ModelViewSet):
    """
    ViewSet for Task CRUD operations.
    """
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['title', 'description']
    ordering_fields = ['created_at', 'priority', 'completed']

    @action(detail=False, methods=['get'])
    def completed(self, request):
        """
        Get all completed tasks.
        """
        completed_tasks = self.queryset.filter(completed=True)
        serializer = self.get_serializer(completed_tasks, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def pending(self, request):
        """
        Get all pending tasks.
        """
        pending_tasks = self.queryset.filter(completed=False)
        serializer = self.get_serializer(pending_tasks, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=['post'])
    def toggle_complete(self, request, pk=None):
        """
        Toggle task completion status.
        """
        task = self.get_object()
        task.completed = not task.completed
        task.save()
        serializer = self.get_serializer(task)
        return Response(serializer.data)
