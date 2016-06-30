# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Event',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('priority', models.IntegerField(default=0)),
                ('content', models.TextField()),
                ('duedate', models.DateField()),
                ('done', models.BooleanField(default=False)),
            ],
            options={
                'verbose_name': 'Event',
                'verbose_name_plural': 'Events',
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='EventClass',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=20)),
                ('owner', models.ForeignKey(related_name='todo_service_eventclass_user', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'Event Class',
                'verbose_name_plural': 'Event Classes',
            },
            bases=(models.Model,),
        ),
        migrations.AddField(
            model_name='event',
            name='eventclass',
            field=models.ForeignKey(to='todo_service.EventClass'),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='event',
            name='owner',
            field=models.ForeignKey(to=settings.AUTH_USER_MODEL),
            preserve_default=True,
        ),
    ]
