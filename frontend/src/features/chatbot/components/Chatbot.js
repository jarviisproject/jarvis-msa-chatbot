import ChatBot from "react-simple-chatbot";
import React from "react";
import { ThemeProvider } from "styled-components";
import { useDispatch } from "react-redux";
import {  Ask, Ask2, FirstAnswer, ResetMessage } from "./ChatModules";

export default function Chat() {
  const dispatch = useDispatch()
  return (
    <ThemeProvider
      theme={{
        background: "#f5f8fb",
        fontFamily: "Helvetica Neue",
        headerBgColor: "#EF6C00",
        headerFontColor: "#fff",
        headerFontSize: "15px",
        botBubbleColor: "#EF6C00",
        botFontColor: "#fff",
        userBubbleColor: "#fff",
        userFontColor: "#4a4a4a",
      }}
    >
      <ChatBot
        steps={[
          {
            id: 'welcome',
            message: '안녕하세요 JARVIS 에요',
            trigger: 'question',
          },
          {
            id: 'question',
            component: <FirstAnswer />,
            asMessage: true,
            trigger: 'userinput',
          },
          {
            id: 'userinput',
            user: true,
            trigger: 'answer'
          },
          {
            id: "answer",
            component: <Ask />,
            asMessage: true,
            trigger: 'userinput'
          },
        ]}
        botAvatar={require("../data/jarvis.png").default}
        userAvatar={require("../data/user.png").default}
      />
    </ThemeProvider>
  );
};
