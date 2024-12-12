from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views
from .views import CustomerLocationsView, CustomerClientsView

router = DefaultRouter()
router.register(r'teams', views.TeamViewSet)
router.register(r'sales-representatives', views.SalesRepresentativeViewSet)
router.register(r'clients', views.ClientViewSet)
router.register(r'customers', views.CustomerViewSet)
router.register(r'locations', views.LocationViewSet)
router.register(r'opportunities', views.OpportunityViewSet)
# router.register(r'courses', views.CourseViewSet) 
# router.register(r'lecturers', views.LecturerViewSet) 
# router.register(r'students', views.StudentViewSet)

urlpatterns = [ 
    path('', include(router.urls)),
    path('customer/<int:customer_id>/locations/', CustomerLocationsView.as_view(), name='customer_locations'),
    path('customer/<int:customer_id>/clients/', CustomerClientsView.as_view(), name='customer_clients'),
    # path('student/number/<str:student_number>/', views.StudentByNumberDetail.as_view(), name='student_by_number_detail'),
    # path('total/courses/', views.TotalCoursesView.as_view(), name='total_courses'),
    # path('total/students/', views.TotalEnrolledStudentsView.as_view(), name='total_enrolled_students'),
    # path('total/students/course/<int:course_id>/', views.StudentsInCourseView.as_view(), name='students_in_course'),
]