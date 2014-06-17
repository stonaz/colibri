from rest_framework import serializers
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from django.utils.translation import ugettext_lazy as _
from .models import UserProfile

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()
    remember = serializers.BooleanField(default=True, help_text = _("If checked you will stay logged in for 3 weeks"))

    def user_credentials(self, attrs):
        """
        Provides the credentials required to authenticate the user for login.
        """
        credentials = {}
        credentials["username"] = attrs["username"]
        credentials["password"] = attrs["password"]
        return credentials

    def validate(self, attrs):
        """ checks if login credentials are correct """
        user = authenticate(**self.user_credentials(attrs))

        if user:
            if user.is_active:
                self.instance = user
            else:
                raise serializers.ValidationError(_("This account is currently inactive."))
        else:
            error = _("Ivalid login credentials.")
            raise serializers.ValidationError(error)
        return attrs