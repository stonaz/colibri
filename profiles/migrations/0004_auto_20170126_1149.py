# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import profiles.email_null


class Migration(migrations.Migration):



    operations = [
        migrations.AlterField(
            model_name='userprofile',
            name='profile_email',
            field=profiles.email_null.EmailNullField(unique=True, max_length=254, blank=True),
        ),
    ]
