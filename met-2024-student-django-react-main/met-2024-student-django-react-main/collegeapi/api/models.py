from django.db import models
    
    
# Model for Sales team
class Team(models.Model):
    name = models.CharField(max_length=100)
    #position = models.CharField(max_length=100, blank=True)
    #phone = models.CharField(max_length=15, blank=True)
    #email = models.EmailField(blank=True)
 
    def __str__(self):
        return self.name
    
#  Model for SalesRepresentative
 # parent = models.ForeignKey('self',on_delete=models.NULL,null=True, blank=True)
class SalesRepresentative(models.Model):
    team = models.ForeignKey(Team, on_delete=models.CASCADE, related_name='sales_reps')
    name = models.CharField(max_length=100)
    position = models.CharField(max_length=100, blank=True)
    phone = models.CharField(max_length=15, blank=True)
    email = models.EmailField()
 
    def __str__(self):
        return self.name
    
#  Model for Customer
class Customer(models.Model):
    name = models.CharField(max_length=100)
    industry = models.CharField(max_length=100, blank=True)
    email = models.EmailField()
    # clients = models.ForeignKey(Client, related_name='customers')
    phone = models.CharField(max_length=15, blank=True)
    #sales_representatives = models.ManyToManyField(SalesRepresentative, related_name='customers')
 
    def __str__(self):
        return self.name
 
 
# Model for representing a client associated with a customer
class Client(models.Model):
    name = models.CharField(max_length=100)
    position = models.CharField(max_length=100, blank=True)
    phone = models.CharField(max_length=15, blank=True)
    email = models.EmailField()
    customer = models.ForeignKey(Customer,on_delete=models.CASCADE,null= True,blank = True)
 
    def __str__(self):
        return self.name
 

 
# Model for representing a location associated with a customer
class Location(models.Model):
    address = models.TextField()
    phone = models.CharField(max_length=15, blank=True)
    manager = models.CharField(max_length=100, blank=True)
    customer = models.ForeignKey(Customer,on_delete=models.CASCADE,null= True,blank = True)
 
    def __str__(self):
        return f"{self.address} - {self.manager}"
    
 
#  Model for SalesOpportunity
class Opportunity(models.Model):
    STAGES = [
        ('Researching', 'Researching'),
        ('Prospecting', 'Prospecting'),
        ('Qualifying', 'Qualifying'),
        ('Pitching', 'Pitching'),
        ('Negotiating', 'Negotiating'),
        ('Closing', 'Closing'),
    ]
 
    description = models.TextField()
    value = models.DecimalField(max_digits=10, decimal_places=2)
    stage = models.CharField(max_length=20, choices=STAGES, default='Researching')
    close_date = models.DateField()
    sales_rep = models.ForeignKey(SalesRepresentative, on_delete=models.CASCADE, related_name='opportunities')
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE, related_name='opportunities')
    location = models.ForeignKey(Location, on_delete=models.SET_NULL, null=True, blank=True, related_name='opportunities')
 
    def __str__(self):
        return f"Opportunity: {self.description} ({self.stage})"


# Creating models here.
class Lecturer(models.Model): 
    first_name = models.CharField(max_length=100) 
    last_name = models.CharField(max_length=100) 
    email = models.EmailField() 
    staff_number = models.CharField(max_length=10) 

    def __str__(self): 
        return f"{self.first_name} {self.last_name}" 

class Student(models.Model): 
    first_name = models.CharField(max_length=100) 
    last_name = models.CharField(max_length=100) 
    email = models.EmailField() 
    student_number = models.CharField(max_length=10) 

    def __str__(self): 
        return f"{self.first_name} {self.last_name}"
    
class Course(models.Model): 
    title = models.CharField(max_length=200) 
    description = models.TextField() 
    lecturer = models.ForeignKey(Lecturer, on_delete=models.SET_NULL, null=True, blank=True) 
    students = models.ManyToManyField(Student, blank=True) 

    def __str__(self): 
        return self.title