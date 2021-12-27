import { PayloadAction } from "@reduxjs/toolkit";
import { call, delay, put, takeLatest } from "redux-saga/effects";
import { chatAPI } from "..";
import { ChatBotData, ChatBotPayload, chatFailure, chatRequest, chatSuccess } from "../reducer/chatSlice";


function* chatBot(action: PayloadAction<ChatBotPayload>) {
    try {
      const result: ChatBotData = yield call(
        chatAPI.ChatAPI,
        action.payload
      );
      yield put(chatSuccess(result));
      // alert(`SAGA SUCCESS :: ${JSON.stringify(result)}`)
      // window.localStorage.setItem('sesstionchat')
    } catch (error: any) {
      yield put(chatFailure(error))
      alert(error)
    }
  }



  // Watch 함수
  export function* watchChat() {
    yield takeLatest(chatRequest.type, chatBot);
    // loginRequest에서의 type이 실행되면 login함수가 실행되는데
    // loginRequest의 action이 있으면 그 액션이 login함수의 인자로 들어갑니다.
  }