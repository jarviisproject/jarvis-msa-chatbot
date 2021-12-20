import tensorflow as tf
from tensorflow.keras.models import Model, load_model
from tensorflow.keras import preprocessing


class IntentModel:
    def __init__(self, model_name, proprocess):

        self.labels = {0 : 'weather', 1: 'suggestion', 2: 'todo'}

        self.model= load_model(model_name)

        self.p = proprocess

    def predict_class(self, question):
        # 형태소 분석
        pos = self.p.pos(question)

        # 문장 내 키워드 추출(불용어 제거)\
        keywords = self.p.get_keywords(pos)

