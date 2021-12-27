import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { string } from "prop-types";

export interface ChatBotData { //받아오는 데이터//
  data: {
    chatAnswer : string;
    chatKey: string;
  }
}
export interface ChatBotPayload {// 요청데이터
  chatAnswer : string;
  chatKey: string;
}
//미들웨어
export interface ChatBotState {
  chatLoading: boolean;
  chatData: any;
  error: any;
  
}
// api의 param 타입
export interface ParamType {
  chatAnswer : string;
  chatKey: string;
}

const initialState: ChatBotState = {
  chatLoading: false, 
  chatData: null,
  error: null,
  
  
};

const chatSlice = createSlice({
  name: "chatBots",
  initialState,
  reducers: {

    chatRequest(state: ChatBotState, _action: PayloadAction<ChatBotPayload>) {
      state.chatLoading = true;
      state.error = null;
    },

    chatSuccess(state: ChatBotState, action: PayloadAction<ChatBotData>) {
      state.chatLoading = false;
      // state.chatData = action.payload
      const key2 = action.payload.data.chatKey
      const value = action.payload.data.chatAnswer
      state.chatData = {...state.chatData, [key2] : value};
      // alert(` success :: ${JSON.stringify(action.payload)}`)
      // console.log(JSON.stringify(state.chatData))
    },

    chatFailure(state: ChatBotState, action: PayloadAction<{ error: any }>) {
      state.chatLoading = false;
      state.error = action.payload;
    },
  }
});

const store = configureStore({
  reducer: {
    chat: chatSlice.reducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
const { reducer, actions } = chatSlice;
export const {
  chatRequest,
  chatFailure,
  chatSuccess
  
} = actions;
export default reducer;
