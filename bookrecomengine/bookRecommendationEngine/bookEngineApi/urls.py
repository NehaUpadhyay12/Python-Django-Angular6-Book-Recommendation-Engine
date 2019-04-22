from rest_framework.routers import DefaultRouter

from .api import BookViewSet, CategoryViewSet

router = DefaultRouter()
router.register(r'books', BookViewSet)
router.register(r'categories', CategoryViewSet)

urlpatterns = router.urls