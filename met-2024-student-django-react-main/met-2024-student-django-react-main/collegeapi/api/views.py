#from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Course, Lecturer, Student, Team, SalesRepresentative, Customer, Location, Client, Opportunity
from .serializers import CourseSerializer, LecturerSerializer, StudentSerializer, TeamSerializer, SalesRepresentativeSerializer, ClientSerializer, CustomerSerializer, LocationSerializer, OpportunitySerializer


# This view is for getting location by customer id
class CustomerLocationsView(APIView):
    def get(self, request, customer_id):
        try:
            customer = Customer.objects.get(pk=customer_id)
            locations = Location.objects.filter(customer=customer)
            serializer = LocationSerializer(locations, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Customer.DoesNotExist:
            return Response({"error": "Customer not found"}, status=status.HTTP_404_NOT_FOUND)

class CustomerClientsView(APIView):
    def get(self, request, customer_id):
        try:
            customer = Customer.objects.get(pk=customer_id)
            clients = Client.objects.filter(customer=customer)
            serializer = ClientSerializer(clients, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Customer.DoesNotExist:
            return Response({"error": "Customer not found"}, status=status.HTTP_404_NOT_FOUND)

class StudentByNumberDetail(APIView):
    def get(self, request, student_number):
        try:
            student = Student.objects.get(student_number=student_number)
            serializer = StudentSerializer(student)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Student.DoesNotExist:
            return Response({'error': 'Student not found'}, status=status.HTTP_404_NOT_FOUND)
        
class TotalCoursesView(APIView):
    def get(self, request):
        count = Course.objects.count()
        return Response({'total_courses': count})

class TotalEnrolledStudentsView(APIView):
    def get(self, request):
        total_students = Course.objects.values('students').distinct().count()
        return Response({'total_enrolled_students': total_students})

class StudentsInCourseView(APIView):
    def get(self, request, course_id):
        try:
            course = Course.objects.get(pk=course_id)
            num_students = course.students.count()
            return Response({'course_id': course_id, 'students_enrolled': num_students})
        except Course.DoesNotExist:
            return Response({'error': 'Course not found'}, status=status.HTTP_404_NOT_FOUND)
        
class TeamViewSet(viewsets.ModelViewSet):
    queryset = Team.objects.all()
    serializer_class = TeamSerializer
 
 
class SalesRepresentativeViewSet(viewsets.ModelViewSet):
    queryset = SalesRepresentative.objects.all()
    serializer_class = SalesRepresentativeSerializer
 
 
class ClientViewSet(viewsets.ModelViewSet):
    queryset = Client.objects.all()
    serializer_class = ClientSerializer
 
 
class CustomerViewSet(viewsets.ModelViewSet):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer
 
 
class LocationViewSet(viewsets.ModelViewSet):
    queryset = Location.objects.all()
    serializer_class = LocationSerializer
 
 
class OpportunityViewSet(viewsets.ModelViewSet):
    queryset = Opportunity.objects.all()
    serializer_class = OpportunitySerializer
    
    

# Create your views here.
class CourseViewSet(viewsets.ModelViewSet): 
    queryset = Course.objects.all()
    serializer_class = CourseSerializer

class LecturerViewSet(viewsets.ModelViewSet): 
    queryset = Lecturer.objects.all()
    serializer_class = LecturerSerializer

class StudentViewSet(viewsets.ModelViewSet): 
    queryset = Student.objects.all()
    serializer_class = StudentSerializer