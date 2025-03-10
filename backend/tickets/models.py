from django.db import models

# Create your models here.
class Ticket(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    subject = models.CharField(max_length=255)
    request = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
