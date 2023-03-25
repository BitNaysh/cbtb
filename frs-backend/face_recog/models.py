from django.db import models
import os
import uuid
from django.db.models.signals import post_save
from django.dispatch import receiver

# Create your models here.


def upload_to_train_image(instance, filename):
    name, type = os.path.splitext(filename)
    filename = uuid.uuid4().hex + type
    instance.filename = filename
    return 'train_images/{filename}'.format(filename=filename)


class TrainMedia(models.Model):
    name = models.CharField(
        max_length=80, blank=False, null=False)
    address = models.CharField(
        max_length=80, blank=True, null=False, default="")
    description = models.TextField(blank=True, null=False, default="")
    filename = models.CharField(max_length=125, blank=False, unique=True)
    image_url = models.ImageField(
        upload_to=upload_to_train_image, blank=True, null=True)
    creation_date = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


@receiver(post_save, sender=TrainMedia)
def _post_save_receiver(sender, instance, created, **kwargs):
    if created:
        instance.save()
