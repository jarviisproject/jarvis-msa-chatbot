import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { chatRequest } from "features/chatbot/reducer/chatSlice"
import Test from "features/diary/components/Test"

export function Ask(props){
    
    const dispatch = useDispatch()
    const key = props.previousStep.key
    const [counter, setCounter] = useState(0)
    const [answer, setAnswer] = useState([])
    const [ text, setText ] = useState('')

    const botAnswer = {
      [key]:useSelector(state => state.chat.chatData[key])
    }

    
    // const [ count, setCount] = useState(0)
    // const [ test, setTest] = useState('')
    // const [ chatanswer, setChatAnswer] = useState({
    //   data: {
    //     chatAnswer : "",
    //     chatKey: ""
    //   }
    // })

    useEffect(()=>{
      setText(props.steps.userinput.value)
      dispatch(chatRequest({'chatKey':props.previousStep.key,'chatAnswer':props.steps.userinput.value}))
    },[text])
    // const a = useSelector(state => state.chat.chatData)
    // setAnswer(a)

    // let chatanswer
    // try {
     const chatanswer = useSelector(state => state.chat.chatData[key])
    // } catch (error) {
    //   chatanswer = "error"
    // }

    // alert(`챗데이터 확인임@@! ${JSON.stringify(chatanswer)}`)

    // setAnswer(chatanswer['data'])
    
    // if (answer != null && counter <1 ){
    //   setCounter(counter + 1)
    //   setAnswer(answer['data'])
    // }
    // alert(`AnswerData확인!! ::: ${JSON.stringify(answer)}`)
    // if(chatanswer == null){
    //   alert('답이 아직 안옴 대기')
    // }
    // else{
    //   alert('답장이 왓다')
    // }
    // console.log(`=============state :: data :: ${JSON.stringify(answer)}`)
    // if(answer != null){
    //     alert('answer 잇음')
    //     setCount(count+1),
    //     setChatAnswer(answer)
    //     alert(answer.data.chatKey)
    //     if (answer.data.chatKey == key){
    //       alert(" 키가 맞다!!")
    //       setTest(answer.data.chatAnswer)
    //     }
    
    // }
    // else{
    //   alert('answer 없음')
    // }
      return (
        <>
        <div>{JSON.stringify(chatanswer)}</div>
        </>
      );
  }

  export function FirstAnswer(){
    const dispatch = useDispatch()
    useEffect(()=>{
      dispatch(chatRequest({'chatKey':"initialKey",'chatAnswer':"오늘 날씨"}))
    },[])
    return(<>
        <div>
         궁금하신 부분 질문해주세요
        </div>
    </>)
    }

export function ResetMessage(){
return(<>
    <div>
    또 다른 궁금하신 부분이 있나요?
    </div>
</>)
}