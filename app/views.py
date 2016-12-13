from django.shortcuts import render
import json

from django.http import JsonResponse

# Create your views here.
# do stuff with react here
def test(request):
    return JsonResponse({'foo':'bar'})
