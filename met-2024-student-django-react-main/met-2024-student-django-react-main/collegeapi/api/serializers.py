from rest_framework import serializers 
from .models import Course, Lecturer, Student, Team, SalesRepresentative, Customer, Location, Client, Opportunity

class CourseSerializer(serializers.ModelSerializer): 
    class Meta: 
        model = Course 
        fields = '__all__'

class LecturerSerializer(serializers.ModelSerializer): 
    class Meta: 
        model = Lecturer 
        fields = '__all__'

class StudentSerializer(serializers.ModelSerializer): 
    class Meta: 
        model = Student 
        fields = '__all__'
        
class TeamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Team
        fields = '__all__'     

class SalesRepresentativeSerializer(serializers.ModelSerializer):
    class Meta:
        model =SalesRepresentative
        fields = '__all__'

class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = '__all__'

class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = '__all__'

class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = '__all__'


class OpportunitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Opportunity
        fields = '__all__'