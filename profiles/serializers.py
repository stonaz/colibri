from rest_framework import serializers
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from django.utils.translation import ugettext_lazy as _
from .models import UserProfile

#class ExtraFieldSerializerOptions(serializers.ModelSerializerOptions):
#    """
#    Meta class options for ExtraFieldSerializerOptions
#    """
#    def __init__(self, meta):
#        super(ExtraFieldSerializerOptions, self).__init__(meta)
#        self.non_native_fields = getattr(meta, 'non_native_fields', ())
#
#
## TODO: rename / remove
#class ExtraFieldSerializer(serializers.ModelSerializer):
#    """
#    ModelSerializer in which non native extra fields can be specified.
#    """
#    
#    _options_class = ExtraFieldSerializerOptions
#    
#    def restore_object(self, attrs, instance=None):
#        """
#        Deserialize a dictionary of attributes into an object instance.
#        You should override this method to control how deserialized objects
#        are instantiated.
#        """
#        for field in self.opts.non_native_fields:
#            attrs.pop(field)
#        
#        return super(ExtraFieldSerializer, self).restore_object(attrs, instance)
#    
#    def to_native(self, obj):
#        """
#        Serialize objects -> primitives.
#        """
#        ret = self._dict_class()
#        ret.fields = self._dict_class()
#
#        for field_name, field in self.fields.items():
#            if field.read_only and obj is None:
#               continue
#            field.initialize(parent=self, field_name=field_name)
#            key = self.get_field_key(field_name)
#            
#            # skips to next iteration but permits to show the field in API browser
#            try:
#                value = field.field_to_native(obj, field_name)
#            except AttributeError as e:
#                if field_name in self.opts.non_native_fields:
#                    continue
#                else:
#                    raise AttributeError(e.message)
#            
#            method = getattr(self, 'transform_%s' % field_name, None)
#            if callable(method):
#                value = method(obj, value)
#            if not getattr(field, 'write_only', False):
#                ret[key] = value
#            ret.fields[key] = self.augment_field(field, field_name, key, value)
#
#        return ret

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
            error = _("Invalid login credentials.")
            raise serializers.ValidationError(error)
        return attrs
    

class UserCreateSerializer(serializers.ModelSerializer):
    """ Profile Serializer for User Creation """
    #password_confirmation = serializers.CharField(label=_('password_confirmation'))
    email = serializers.CharField()
    username = serializers.CharField()
    password = serializers.CharField(allow_blank=False, write_only=True)
    password_confirmation = serializers.CharField(allow_blank=False, write_only=True)
    
    def create(self, attrs, instance=None):
        """
        Given a dictionary of deserialized field values, either update
        an existing model instance, or create a new model instance.
        """
        if instance is not None:
            instance.user.email = attrs.get('user.email', instance.user.email)
            instance.poi = attrs.get('poi', instance.poi)
            instance.user.password = attrs.get('user.password', instance.user.password)
            return instance
        print attrs
        #user = attrs.get('user')
        password_confirmation = attrs.get('password_confirmation')
        password = attrs.get('password')
        if password != password_confirmation:
            raise serializers.ValidationError('Password confirmation mismatch')
        
        user = User.objects.create_user(username=attrs.get('username'), email= attrs.get('email'), password=attrs.get('password'))
        u = UserProfile.objects.create(user=user)
        print u
        return user
    
    #def validate_password_confirmation(self, attrs, source):
    #    """
    #    password_confirmation check
    #    """
    #    password_confirmation = attrs[source]
    #    password = attrs['password']
    #
    #    if password_confirmation != password:
    #        raise serializers.ValidationError(_('Password confirmation mismatch'))
    #
    #    return attrs

    class Meta:
        model = User
        fields = (
            'id',
            # required
            'username', 'email', 'password', 'password_confirmation',
            # optional
            #'first_name', 'last_name', 'about', 'gender',
            #'birth_date', 'address', 'city', 'country'
        )