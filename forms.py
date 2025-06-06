
from django import forms
from .models import Event, TicketType

class EventForm(forms.ModelForm):
    class Meta:
        model = Event
        fields = [
            'title', 'description', 'date', 'time', 'location',
            'category', 'image', 'organizer', 'organizer_id',
            'status', 
        ]
        widgets = {
            'image': forms.ClearableFileInput(attrs={
                'class': 'block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 '
                'file:rounded-full file:border-0 file:text-sm file:font-semibold '
                'file:bg-primary file:text-white hover:file:bg-primary-dark'
            }),

            'title': forms.TextInput(attrs={
                'class': 'w-full text-base px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white',
                'placeholder': 'Event Title',
            }),
            'description': forms.Textarea(attrs={
                'class': 'w-full text-base px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white',
                'rows': 4,
                'placeholder': 'Event Description',
            }),
            'date': forms.DateInput(attrs={
                'type': 'date',
                'class': 'w-full text-base px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white',
            }),
            'time': forms.TimeInput(attrs={
                'type': 'time',
                'class': 'w-full text-base px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white',
            }),
            'location': forms.TextInput(attrs={
                'class': 'w-full text-base px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white',
            }),
            'category': forms.Select(attrs={
                'class': 'w-full text-base px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white',
            }),
        }


class TicketTypeForm(forms.ModelForm):
    class Meta:
        model = TicketType
        fields = ['name', 'price', 'description', 'capacity', 'sold']
        widgets = {
            'name': forms.TextInput(attrs={
                'placeholder': 'Input Ticket name eg Free',
                'class': 'w-full text-base px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white',
            }),
            'price': forms.NumberInput(attrs={
                'placeholder': '0.00',
                'min': 0,
                'step': 0.01,
                'class': 'w-full text-base px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white',
            }),
            'capacity': forms.NumberInput(attrs={
                'placeholder': '10000000',
                'min': 1,
                'class': 'w-full text-base px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white',
            }),
            'description': forms.TextInput(attrs={
                'placeholder': "What's included with this ticket",
                'class': 'w-full text-base px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white',
            }),
        }


# Inline formset (if you're using this in the view)
from django.forms import inlineformset_factory

TicketTypeFormSet = inlineformset_factory(
    parent_model=Event,
    model=TicketType,
    form=TicketTypeForm,
    extra=1,
    can_delete=False
)

