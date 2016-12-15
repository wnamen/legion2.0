from django.shortcuts import render
import json

from django.http import JsonResponse

# Create your views here.
# do stuff with react here
def test(request):
    return JsonResponse({'foo':'bar'})

def test_json(request):
    person = {
        'name':'Sinan Ozdemir',
        'job_title': 'Software Engineering',
        'company': 'Legion Analytics',
        'interests':['Swimming', 'Yachting'],
        'number_of_employees': 45,
        'company_industry': 'Mechanical',
        'personal_city': 'San Francisco',
        'company_city': 'Dallas, TX'
    }
    results = [person]*100
    j = {
        'results':results,
        'num_results':5,
        'page_num': 4,
        'total_page_count': 100
    }
    return JsonResponse(j)
