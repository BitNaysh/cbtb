from operator import mod
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.conf import settings

# import pytesseract
import PIL.Image
import os
import uuid


# lets us explicitly set upload path and filename


def upload_to(instance, filename):
    name, type = os.path.splitext(filename)
    filename = uuid.uuid4().hex + type
    instance.filename = filename
    return 'images/{filename}'.format(filename=filename)


class Media(models.Model):

    title = models.CharField(
        max_length=80, blank=False, null=False)
    description = models.TextField()
    text = models.TextField(blank=True)
    filename = models.CharField(max_length=125, blank=False, unique=True)
    image_url = models.ImageField(upload_to=upload_to, blank=True, null=True)
    creation_date = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


@receiver(post_save, sender=Media)
def _post_save_receiver(sender, instance, created, **kwargs):
    if created:
        myconfig = r"--psm 3 --oem 3"
        # face recog
        # instance.text = pytesseract.image_to_string(
        #     PIL.Image.open(
        #         os.path.join(settings.MEDIA_ROOT, "images",
        #                      str(instance.image_url).split('/')[1])
        #     ), config=myconfig)
        instance.text = "lorem ipsum"
        instance.save()
