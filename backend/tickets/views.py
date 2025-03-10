import os
import requests
from rest_framework import serializers, viewsets, status
from rest_framework.response import Response
from .models import Ticket

class TicketSerializer(serializers.ModelSerializer):
    # Define validation for each request
    email = serializers.EmailField(
        required=True,
        error_messages={
            'required': 'Email is required!',
            'invalid': 'Enter a valid email address!'
        }
    )
    name = serializers.CharField(
        required=True,
        error_messages={'required': 'Name is required!'}
    )
    subject = serializers.CharField(
        required=True,
        error_messages={'required': 'Subject is required!'}
    )
    request = serializers.CharField(
        required=True,
        error_messages={'required': 'Issue/Request is required!'}
    )
    
    class Meta:
        model = Ticket
        fields = ['id', 'name', 'email', 'subject', 'request', 'created_at']
    
    def validate_name(self, value):
        if not value.strip():
            raise serializers.ValidationError("Name is required!")
        return value

    def validate_subject(self, value):
        if not value.strip():
            raise serializers.ValidationError("Subject is required!")
        return value

    def validate_request(self, value):
        if not value.strip():
            raise serializers.ValidationError("Issue/Request is required!")
        return value

class TicketViewSet(viewsets.ModelViewSet):
    queryset = Ticket.objects.all()
    serializer_class = TicketSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        try:
            serializer.is_valid(raise_exception=True)
        except serializers.ValidationError as e:
            # Get first error message from dictionary error
            error_message = ""
            if isinstance(e.detail, dict):
                first_key = list(e.detail.keys())[0]
                error_message = e.detail[first_key][0]
            else:
                error_message = str(e.detail)
            return Response(
                {
                    "code": 400,
                    "status": "failed",
                    "message": error_message
                },
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Save to DB if validation success
        ticket = serializer.save()

        zapier_webhook_url = os.getenv('ZAPIER_WEBHOOK_URL', 'https://hooks.zapier.com/hooks/catch/21939796/2qljwy4/')
        data = {
            'id': ticket.id,
            'name': ticket.name,
            'email': ticket.email,
            'subject': ticket.subject,
            'request': ticket.request,
        }
        try:
            zapier_response = requests.post(zapier_webhook_url, json=data)
            zapier_response.raise_for_status()
        except requests.exceptions.RequestException as e:
            return Response(
                {"error": "Failed to send data to Zapier", "details": str(e)},
                status=status.HTTP_502_BAD_GATEWAY
            )

        headers = self.get_success_headers(serializer.data)
        return Response(
            {
                "code": 201,
                "status": "success",
                "message": "Successfully create issue/request",
                "data": serializer.data
            },
            status=status.HTTP_201_CREATED,
            headers=headers
        )