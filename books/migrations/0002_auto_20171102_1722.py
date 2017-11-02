# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('books', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='bookhistory',
            name='book',
        ),
        migrations.RemoveField(
            model_name='bookhistory',
            name='given_to',
        ),
        migrations.RemoveField(
            model_name='bookhistory',
            name='took_from',
        ),
        migrations.RemoveField(
            model_name='bookwhereis',
            name='book',
        ),
        migrations.RemoveField(
            model_name='bookwhereis',
            name='user',
        ),
        migrations.DeleteModel(
            name='BookHistory',
        ),
        migrations.DeleteModel(
            name='BookWhereIs',
        ),
    ]
