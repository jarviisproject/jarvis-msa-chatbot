from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view, parser_classes
from rest_framework.parsers import JSONParser
from django.http import JsonResponse

from chat.api.weather import Weather
from chat.intentModel import IntentModel
from chat.preprocess import Preprocess
import datetime as dt


def weather(question):
    w = Weather()
    q = question['question']
    if q == '오늘':
        today = dt.datetime.now() + dt.timedelta()
        tom = str(today)[0:4] + str(today)[5:7] + str(today)[8:10]
        return w.weather_pre()[tom]
    if q == '내일':
        today = dt.datetime.now() + dt.timedelta(days=1)
        tom = str(today)[0:4] + str(today)[5:7] + str(today)[8:10]
        return w.weather_pre()[tom]
    if q == '모레':
        today = dt.datetime.now() + dt.timedelta(days=2)
        tom = str(today)[0:4] + str(today)[5:7] + str(today)[8:10]
        return w.weather_pre()[tom]


@api_view(['POST'])
@parser_classes([JSONParser])
def question(request):
    p = Preprocess(word2index_dic='./model/chatbot3_dict.bin', userdic='./model/user_nng.tsv')
    intent = IntentModel(model_name='./model/intent_model.h5', proprocess=p)
    question = request
    predict = intent.predict_class(question)
    predict_label = intent.labels[predict]
    print(question)
    print(f'의도 예측 클래스 : {predict}')
    print(f'의도 예측 레이블 : {predict_label}')

    if predict_label == 'weather':
        we = weather(question)
        if we == '맑음':
            return JsonResponse({'answer': f'오늘의 날씨는 {we} 입니다. 야외활동하기 좋은 날씨네요'})
        elif we == '구름 많음':
            return JsonResponse({'answer': f'오늘의 날씨는 {we} 입니다. 구름이 실내활동 지향 합니다'})
        elif we == '흐림':
            return JsonResponse({'answer': f'오늘의 날씨는 {we} 입니다. 비가 올지도 모르니 조심하세요'})
    elif predict_label == 'suggestion':
        return JsonResponse({'suggestion' : 'success'})
    elif predict_label == 'todo':
        return JsonResponse({'todo': 'success'})






