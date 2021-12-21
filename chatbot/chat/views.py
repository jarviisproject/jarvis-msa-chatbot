from rest_framework.decorators import api_view, parser_classes
from rest_framework.parsers import JSONParser
from django.http import JsonResponse

from chat.intentModel import IntentModel
from chat.preprocess import Preprocess
import datetime as dt

from myWeather.models import Weather, weather_question

p = Preprocess(word2index_dic='chat/model/chatbot3_dict.bin', userdic='chat/model/user_nng.tsv')
intent = IntentModel(model_name='chat/model/intent_model.h5', proprocess=p)



@api_view(['POST'])
@parser_classes([JSONParser])
def question(request):
    try:
        question = request.data
        print(type(question['question']))
        predict = intent.predict_class(question['question'])
        predict_label = intent.labels[predict]
        print(f'의도 예측 클래스 : {predict}')
        print(f'의도 예측 레이블 : {predict_label}')
        if predict_label == 'weather':
            we = weather_question(question)
            if we == '맑음':
                return JsonResponse({'answer': f'날씨는 {we} 입니다. 야외활동하기 좋은 날씨네요'})
            elif we == '구름 많음':
                return JsonResponse({'answer': f'날씨는 {we} 입니다. 구름이 실내활동 지향 합니다'})
            elif we == '흐림':
                return JsonResponse({'answer': f'날씨는 {we} 입니다. 비가 올지도 모르니 조심하세요'})
        elif predict_label == 'suggestion':
            return JsonResponse({'suggestion' : 'success'})
        elif predict_label == 'todo':
            return JsonResponse({'todo': 'success'})
    except:
        return JsonResponse({'question' : "fail"})





