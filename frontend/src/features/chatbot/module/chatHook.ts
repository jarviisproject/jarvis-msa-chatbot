import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {RootState , ChatBotPayload, chatRequest} from 'features/chatbot/reducer/chatSlice'


export default function useChat() {
  const { chatLoading } = useSelector((state: RootState) => state.chat);
  const dispatch = useDispatch();

  const chat = useCallback((data: ChatBotPayload) => {
    dispatch(chatRequest(data));
  }, []);

  return { chatLoading, chat };
}
