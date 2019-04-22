from django.db import models

class Category(models.Model):
    categoryName = models.CharField(max_length=50)

    def __str__(self):
        return "Category: {}".format(self.categoryName)

class Book(models.Model):
    bookId = models.AutoField(primary_key=True)
    title = models.CharField(max_length=100)
    author = models.CharField(max_length=100)
    publishDate = models.DateField()
    edition = models.CharField(max_length=10)
    category = models.ForeignKey(Category, on_delete=models.PROTECT)
    status = models.CharField(max_length=10, default='Unread')

    def __str__(self):
        return "Book: {}".format(self.title)
