from rest_framework.viewsets import ModelViewSet
from django.contrib.auth.mixins import LoginRequiredMixin
from rest_framework.permissions import AllowAny
from rest_framework.generics import CreateAPIView
from .serializers import EventSerializer,TicketRegistrationSerializer
from .models import Event, TicketType,TicketRegistration
from django.contrib.auth.decorators import login_required
from django.views import View
from django.shortcuts import render, redirect,get_object_or_404
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages
from django.contrib.auth import get_user_model
from .forms import EventForm, TicketTypeFormSet
from rest_framework.response import Response
from rest_framework import status
from io import BytesIO
from django.core.files.base import ContentFile
from django.core.mail import EmailMessage

User = get_user_model()


def homePage(request):
	return render(request,'components/HomePage.html',{})

def EventPage(request):
	return render(request,'components/EventPage.html',{})


from django.http import HttpResponseForbidden

from django.core.mail import send_mail
from django.conf import settings


def send_registration_email(user_email, event_name):
    subject = f"Registration Confirmation for {event_name}"
    message = f"Hello,\n\nYou have successfully registered for {event_name}. We look forward to seeing you there!"
    from_email = settings.EMAIL_HOST_USER
    recipient_list = [user_email]

    send_mail(subject, message, from_email, recipient_list)
    email.attach("ticket_qr.png", qr_io.getvalue(), "image/png")
    

def register_event(request, event_id):
    event = Event.objects.get(id=event_id)
    user_email = 'bwale974@gmail.com' # Assuming user is logged in

    # Register the user for the event (your logic here)
    
    # Send confirmation email
    send_registration_email(user_email, event.title)
    print('sent man')
    return redirect('home')



@login_required(login_url='login')
def AdminPage(request):
    if not request.user.is_superuser:
        return HttpResponseForbidden("You are not authorized to view this page.")
    return render(request,'components/AdminPage.html',{})



def testPage(request):
    return render(request,'testing.html',{})
'''
@login_required(login_url='login')
def DashboardPage(request):
    return render(request,'components/DashboardPage.html',{})
'''
class DashboardPage(LoginRequiredMixin, View):
    template_name = 'components/DashboardPage.html'
    login_url = 'login'  # or your login URL name

    def get(self, request):
        form = EventForm(initial={
            'organizer': request.user,
            'organizer_id': request.user.id,
        })
        formset = TicketTypeFormSet()
        return render(request, self.template_name, {
            'form': form,
            'formset': formset,
        })

    def post(self, request):
        form = EventForm(request.POST, request.FILES)
        formset = TicketTypeFormSet(request.POST)

        if form.is_valid() and formset.is_valid():
            event = form.save(commit=False)
            event.organizer = request.user
            event.organizer_id = request.user.id
            event.save()

            ticket_forms = formset.save(commit=False)
            for ticket in ticket_forms:
                ticket.event = event
                ticket.save()

            messages.success(request, 'Event created successfully!')
            return redirect('home')  # replace with your actual view
        else:
            messages.error(request, 'Please correct the errors below.')
            return render(request, self.template_name, {
                'form': form,
                'formset': formset,
            })





class CreateEventView(LoginRequiredMixin, View):
    template_name = 'components/CreateEventPage.html'
    login_url = 'login'  # or your login URL name

    def get(self, request):
        form = EventForm(initial={
            'organizer': request.user,
            'organizer_id': request.user.id,
        })
        formset = TicketTypeFormSet()
        return render(request, self.template_name, {
            'form': form,
            'formset': formset,
        })

    def post(self, request):
        form = EventForm(request.POST, request.FILES)
        formset = TicketTypeFormSet(request.POST)

        if form.is_valid() and formset.is_valid():
            event = form.save(commit=False)
            event.organizer = request.user
            event.organizer_id = request.user.id
            event.save()

            ticket_forms = formset.save(commit=False)
            for ticket in ticket_forms:
                ticket.event = event
                ticket.save()

            messages.success(request, 'Event created successfully!')
            return redirect('home')  # replace with your actual view
        else:
            messages.error(request, 'Please correct the errors below.')
            return render(request, self.template_name, {
                'form': form,
                'formset': formset,
            })















#All data view
class DataViewSet(ModelViewSet):
	queryset = Event.objects.all()
	serializer_class = EventSerializer


from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import AllowAny
from django.shortcuts import get_object_or_404
from django.core.mail import EmailMessage
import qrcode
from io import BytesIO
from rest_framework.response import Response

class TicketRegistrationViewSet(ModelViewSet):
    queryset = TicketRegistration.objects.all()
    serializer_class = TicketRegistrationSerializer
    permission_classes = [AllowAny]  # Correct attribute name

    def perform_create(self, serializer):
        self.ticket = serializer.save()  # Save ticket instance
        self.send_the_mail()  # Call method to send email

    def send_the_mail(self):
        # Generate QR code for ticket
        qr = qrcode.make(self.ticket.ticket_code)
        qr_io = BytesIO()
        qr.save(qr_io, format='PNG')

        # Fetch the event safely
        event = get_object_or_404(Event, title=self.ticket.event.title)

        user_email = self.ticket.email  # Get recipient email

        # Create email
        email = EmailMessage(
        subject=f"Your Ticket for {event.title}",
        body=f"Hello {self.ticket.name},\n\nHere is your QR code for your ticket {self.ticket.ticket_code}.\n\n You have successfully registered for {self.ticket.event.title}. We look forward to seeing you there!",
        from_email=settings.EMAIL_HOST_USER,
        to=[user_email]
        )
        email.attach("ticket_qr.png", qr_io.getvalue(), "image/png")

        # Send email
        email.send()

        return Response({"message": "QR Code and confirmation email sent!"}, status=201)


'''
class TicketRegistrationViewSet(ModelViewSet):
    queryset = TicketRegistration.objects.all()
    serializer_class = TicketRegistrationSerializer
    permissions = [AllowAny]
    def perform_create(self, serializer):
        self.ticket = serializer.save()
        self.send_the_mail()
        
    
    def send_the_mail(self):
        # Generate QR code
        qr = qrcode.make(self.ticket.ticket_code)
        qr_io = BytesIO()
        qr.save(qr_io, format='PNG')
        
        event = Event.objects.filter(title=self.ticket.event.title).first()

        user_email = self.ticket.email # Assuming user is logged in

    # Register the user for the event (your logic here)
    
    # Send confirmation email
        send_registration_email(user_email, event.title)
        
        return Response({"message": "Confirmation email sent!"})
'''
# View for Logging In, Logging OUt, Sigining up ANd OAUth

class SignupView(View):
    def get(self, request):
        return render(request, 'components/SignupPage.html')

    def post(self, request):
        email = request.POST.get('email')
        password = request.POST.get('password')
        first_name = request.POST.get('first_name')
        last_name = request.POST.get('last_name')

        if User.objects.filter(email=email).exists():
            messages.error(request, 'Email already exists.')
            return redirect('signup')

        user = User.objects.create_user(
            email=email,
            password=password,
            first_name=first_name,
            last_name=last_name
        )
        login(request, user)
        messages.success(request, 'Signup successful!')
        return redirect('home')  # Change 'home' to your actual homepage


class LoginView(View):
    def get(self, request):
        return render(request, 'components/LoginPage.html')

    def post(self, request):
        email = request.POST.get('email')
        password = request.POST.get('password')

        user = authenticate(request, email=email, password=password)
        if user is not None:
            login(request, user)
            messages.success(request, 'Login successful!')
            return redirect('home')
        else:
            messages.error(request, 'Invalid email or password.')
            return redirect('login')


class LogoutView(View):
    def get(self, request):
        logout(request)
        messages.info(request, 'You have been logged out.')
        return redirect('login')







#Payment View 



