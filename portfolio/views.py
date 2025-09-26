from django.shortcuts import render
from .models import *

def portfolio_view(request):
    context = {
        'personal': PersonalInfo.objects.first(),
        'skills': Skill.objects.all(),
        'experiences': Experience.objects.all(),
        'educations': Education.objects.all(),
        'projects': Project.objects.all(),
        'achievements': Achievement.objects.all(),
        'contacts': ContactInfo.objects.all(),
    }
    return render(request, 'portfolio/index.html', context)