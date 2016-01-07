# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models
from django.conf import settings
import profiles.models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='PasswordReset',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('temp_key', models.CharField(max_length=100, verbose_name='temp_key')),
                ('timestamp', models.DateTimeField(default=profiles.models.now, verbose_name='timestamp')),
                ('reset', models.BooleanField(default=False, verbose_name='reset yet?')),
                ('user', models.ForeignKey(verbose_name='user', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'password reset',
                'verbose_name_plural': 'password resets',
            },
        ),
        migrations.CreateModel(
            name='UserProfile',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('profile_email', models.EmailField(unique=True, max_length=254, blank=True)),
                ('address', models.CharField(max_length=100, null=True, verbose_name='Indirizzo', blank=True)),
                ('phone', models.CharField(max_length=15, null=True, verbose_name='Tel', blank=True)),
                ('picture', models.ImageField(upload_to=b'profile_images', blank=True)),
                ('public_email', models.BooleanField(default=False)),
                ('public_phone', models.BooleanField(default=False)),
                ('public_address', models.BooleanField(default=False)),
                ('user', models.OneToOneField(to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
