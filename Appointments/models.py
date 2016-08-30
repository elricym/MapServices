from __future__ import unicode_literals

from django.db import models
import os
# Create your models here.
if 'aanx6afm1dtejr.ccypkmr0kys8.us-west-2.rds.amazonaws.com' in os.environ:
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.mysql',
            'NAME': os.environ['com_map_service'],
            'USER': os.environ['client'],
            'PASSWORD': os.environ['ym771992'],
            'HOST': os.environ['aanx6afm1dtejr.ccypkmr0kys8.us-west-2.rds.amazonaws.com'],
            'PORT': os.environ['3306'],
        }
    }
