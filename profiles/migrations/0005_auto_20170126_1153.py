# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import profiles.email_null


class Migration(migrations.Migration):

    dependencies = [
        ('profiles', '0004_auto_20170126_1149'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userprofile',
            name='profile_email',
            field=profiles.email_null.EmailNullField(max_length=254, unique=True, null=True, blank=True),
        ),
    ]
