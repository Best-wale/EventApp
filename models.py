from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models

from cloudinary.models import CloudinaryField
from django.contrib.auth.models import User
from django.conf import settings
 




class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("The Email field is required")
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(email, password, **extra_fields)

class CustomUser(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=30, blank=True)
    last_name = models.CharField(max_length=30, blank=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = CustomUserManager()

    def __str__(self):
        return self.email





'''
class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    country = models.CharField(max_length=255)
'''
class Event(models.Model):
    EVENT_STATUS_CHOICES = [
        ('upcoming', 'Upcoming'),
        ('ongoing', 'Ongoing'),
        ('past', 'Past'),
    ]

    CATEGORY_CHOICES = [
        ('conference', 'Conference'),
        ('concert', 'Concert'),
        ('workshop', 'Workshop'),
        ('sports', 'Sports'),
        ('community', 'Community'),
        ('other', 'Other'),
    ]
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)

    # Auto-generated primary key: id
    title = models.CharField(max_length=255)
    description = models.TextField()
    date = models.DateField()            # Example: 2026-11-15
    time = models.TimeField()            # Example: 09:00
    location = models.CharField(max_length=255)
    #image = CloudinaryField('Image', blank=True,null=True, resource_type='auto')
    
    image = models.ImageField(
        upload_to='event_images/',
        blank=True,
        null=True
    )
    organizer = models.CharField(max_length=100)
    organizer_id = models.IntegerField() # If you have an Organizer model, consider using a ForeignKey
    status = models.CharField(
        max_length=20,
        choices=EVENT_STATUS_CHOICES,
        default='upcoming'
    )
    created_at = models.DateField(auto_now_add=True)      # This field can be manually set or you can later add auto_now_add

    def __str__(self):
        return f"{self.title} ({self.date})"


'''
class TicketType(models.Model):
    # Auto-generated primary key: id
    event = models.ForeignKey(
        Event,
        on_delete=models.CASCADE,
        related_name='ticketTypes'
    )
    name = models.CharField(max_length=100,default='Ordinary Ticket')
    price = models.DecimalField(max_digits=8, decimal_places=2,default=0.00)  # Adjust max_digits as necessary
    description = models.TextField(default='Free Ticket')
    capacity = models.IntegerField(null=True, blank=True)
    sold = models.IntegerField(default=0)

    def __str__(self):
        return f"{self.name} for {self.event.title}"

'''

class TicketType(models.Model):
    event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name='ticketTypes')
    name = models.CharField(max_length=100, default='Ordinary Ticket')
    price = models.DecimalField(max_digits=8, decimal_places=2, default=0.00)
    description = models.TextField(default='Free Ticket')
    capacity = models.IntegerField(null=True, blank=True)  # Total tickets available
    sold = models.IntegerField(default=0)  # Tickets sold

    def sell_ticket(self):
        """ Reduce available tickets and increase sold count """
        if self.capacity and self.capacity > 0:
            self.capacity -= 1
            self.sold += 1
            self.save()
        else:
            raise ValueError("No tickets available for this type.")






    

class TicketRegistration(models.Model):
    #user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    event = models.ForeignKey(Event, on_delete=models.CASCADE)
    ticket_type = models.ForeignKey(TicketType, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    email = models.EmailField()
    ticket_code = models.CharField(max_length=20, unique=True)
    registration_date = models.DateField(auto_now_add=True)
    payment_status = models.CharField(max_length=10, choices=[('paid', 'Paid'), ('free', 'Free')])
    checked_in = models.BooleanField(default=False)
    


    def __str__(self):
        return f"{self.name} - {self.ticket_type.name}"

#PAyment with Stripe
'''
from django.db import models
from djstripe.models import StripeModel

class Payment(StripeModel):
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.CharField(max_length=100)
    paid = models.BooleanField(default=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.user.username} - {self.description}'

'''