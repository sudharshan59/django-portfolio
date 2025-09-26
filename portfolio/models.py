from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator

class PersonalInfo(models.Model):
    name = models.CharField(max_length=100)
    title = models.CharField(max_length=100, blank=True)
    bio = models.TextField()
    profile_image = models.ImageField(upload_to='profile/', blank=True, null=True)
    email = models.EmailField()
    phone = models.CharField(max_length=20, blank=True)
    location = models.CharField(max_length=100, blank=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = "Personal Info"

class Skill(models.Model):
    CATEGORY_CHOICES = [('technical', 'Technical'), ('soft', 'Soft Skills')]
    name = models.CharField(max_length=50)
    level = models.IntegerField(validators=[MinValueValidator(0), MaxValueValidator(100)])
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES, default='technical')
    icon = models.CharField(max_length=50, blank=True)

    def __str__(self):
        return f"{self.name} ({self.level}%)"

    class Meta:
        ordering = ['-level']

class Experience(models.Model):
    title = models.CharField(max_length=100)
    company = models.CharField(max_length=100)
    start_date = models.DateField()
    end_date = models.DateField(blank=True, null=True)
    description = models.TextField()
    is_current = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.title} @ {self.company}"

    class Meta:
        ordering = ['-start_date']

class Education(models.Model):
    degree = models.CharField(max_length=150)
    institution = models.CharField(max_length=150)
    start_date = models.DateField()
    end_date = models.DateField(blank=True, null=True)
    description = models.TextField(blank=True)

    def __str__(self):
        return f"{self.degree} - {self.institution}"

    class Meta:
        ordering = ['-start_date']

class Project(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    tech_stack = models.CharField(max_length=200)
    github_link = models.URLField(blank=True)
    live_link = models.URLField(blank=True)
    thumbnail = models.ImageField(upload_to='projects/', blank=True, null=True)
    order = models.PositiveIntegerField(default=0)

    def __str__(self):
        return self.title

    class Meta:
        ordering = ['order']

class Achievement(models.Model):
    title = models.CharField(max_length=150)
    issuer = models.CharField(max_length=100, blank=True)
    date_earned = models.DateField()
    credential_url = models.URLField(blank=True)
    description = models.TextField(blank=True)

    def __str__(self):
        return self.title

    class Meta:
        ordering = ['-date_earned']

class ContactInfo(models.Model):
    social_platform = models.CharField(max_length=30)
    url = models.URLField()
    icon_class = models.CharField(max_length=50)
    order = models.PositiveIntegerField(default=0)

    def __str__(self):
        return self.social_platform

    class Meta:
        ordering = ['order']