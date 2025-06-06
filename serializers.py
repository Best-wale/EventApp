from rest_framework import serializers
from .models import Event,TicketType,TicketRegistration




class TicketTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = TicketType
        fields = ['id','description','name', 'price', 'capacity', 'sold']
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['price'] = float(instance.price)  # Convert to float for JSON
        return representation


class EventSerializer(serializers.ModelSerializer):
    ticketTypes = TicketTypeSerializer(many=True)
    class Meta:
        model = Event
        fields = ['id','title','description','date','time','location','category','image',"organizer", 'organizer_id','status','created_at', 'ticketTypes' ]

'''
class TicketRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = TicketRegistration
        fields = '__all__'
'''

class TicketRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = TicketRegistration
        fields = ["event", "ticket_type", "name", "email", "ticket_code", "payment_status"]

    def create(self, validated_data):
        ticket_type = validated_data["ticket_type"]
        
        # Attempt to sell a ticket
        if ticket_type.capacity > 0:
            ticket_type.sell_ticket()
            return super().create(validated_data)
        else:
            raise serializers.ValidationError("No tickets available for this event.")


