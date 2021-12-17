from gensim.models import Word2Vec
from konlpy.tag import Komoran
import time
import pandas as pd
import tensorflow as tf
from tensorflow.keras import preprocessing
from tensorflow.keras.models import Model, load_model
from tensorflow.keras.layers import Input, Embedding, Dense, Dropout, Conv1D, GlobalMaxPool1D, concatenate


class Chatmodel:
    def __init__(self):
        pass

    def execute(self):

        start = time.time()

        print('말뭉치 데이터 읽기')
        question_data = pd.read_csv('./data/intent_data.csv')
        question_data = question_data['Q']
        print(len(question_data))
        print('데이터 읽기 완료: ', time.time() - start)

        komoran = Komoran(userdic='./data')



if __name__ == '__main__':
    chat = Chatmodel()
    chat.execute()
