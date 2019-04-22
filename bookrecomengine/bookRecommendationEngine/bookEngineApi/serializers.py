from rest_framework import serializers
from .models import Book, Category

class CategorySerializer(serializers.ModelSerializer):

    class Meta:
        model = Category
        fields = '__all__'

class BookSerializer(serializers.ModelSerializer):
    categoryName = serializers.ReadOnlyField(source='category.categoryName')

    class Meta:
        model = Book
        fields = ('pk', 'category', 'categoryName', 'title', 'author','publishDate', 'edition', 'status')


    # category = CategorySerializer(read_only=True)
    # class Meta:
    #     model = Book
    #     fields = '__all__'