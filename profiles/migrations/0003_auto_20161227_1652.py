# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('profiles', '0002_auto_20160107_1518'),
    ]

    operations = [
        migrations.AddField(
            model_name='userprofile',
            name='phone',
            field=models.CharField(help_text='Telefono', max_length=20, null=True, verbose_name='Telefono', blank=True),
        ),
        migrations.AddField(
            model_name='userprofile',
            name='publish_email',
            field=models.BooleanField(default=True),
        ),
        migrations.AddField(
            model_name='userprofile',
            name='publish_phone',
            field=models.BooleanField(default=False),
        ),
    ]
