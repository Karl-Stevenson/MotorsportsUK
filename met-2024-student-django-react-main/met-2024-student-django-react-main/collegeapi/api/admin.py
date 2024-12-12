from django.contrib import admin
from .models import Team, SalesRepresentative, Client, Location, Customer, Opportunity
 
# Register all models with the Django admin site
admin.site.register(Team)
admin.site.register(SalesRepresentative)
admin.site.register(Client)
admin.site.register(Location)
admin.site.register(Customer)
admin.site.register(Opportunity)
# admin.site.register(Course)
# admin.site.register(Lecturer)
# admin.site.register(Student)