from django.db.models import Q, Subquery
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from .serializers import BookSerializer, CategorySerializer
from .models import Book, Category

class BookViewSet(ModelViewSet):
    queryset = Book.objects.all()
    serializer_class = BookSerializer

    def get_queryset(self):
        queryset = Book.objects.all()
        title = self.request.query_params.get('title', None)
        search = self.request.query_params.get('search', None)
        readId = self.request.query_params.get('read', None)

        if title is not None:
            queryset = queryset.filter(title__icontains=title)

        if search is not None:
            queryset = queryset.filter(Q(title__icontains=search) | Q(author__icontains=search) |
                       Q(edition__icontains=search) | Q(category__categoryName__icontains=search))

        if readId is not None:
            categoryOfReadBook = Book.objects.values("category").filter(pk__exact=readId)
            queryset = queryset.filter(~Q(pk = readId), ~Q(status='Read'), category__in = Subquery(categoryOfReadBook.values('category')))

        return queryset

    # def create(self, request):
    #     serializer = self.get_serializer(data=request.data)
    #
    #     if serializer.is_valid():
    #         category = Category(id = request.data['category']['id'], categoryName = request.data['category']['categoryName'])
    #         Book.objects.create(title = request.data['title'], author = request.data['author'], publishDate = request.data['publishDate'],
    #                     edition = request.data['edition'], category = category)
    #
    #         return Response(
    #             BookSerializer, status=status.HTTP_201_CREATED
    #         )
    #
    #     return Response({
    #         'status': 'Bad request',
    #         'message': 'Book could not be saved with received data.'
    #     }, status=status.HTTP_400_BAD_REQUEST)

class CategoryViewSet(ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer