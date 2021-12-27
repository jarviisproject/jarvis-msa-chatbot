import { PayloadAction } from "@reduxjs/toolkit";
import { call, delay, put, takeLatest } from "redux-saga/effects";
import {
  LoginPayload,
  UserDataPayload,
  loginRequest,
  loginFailure,
  loginSuccess,
  JoinPayload,
  joinSuccess,
  joinFailure,
  joinRequest,
  ExistPayload,
  existSuccess,
  existFailure,
  existRequest,
  ModifyPayload,
  modifySuccess,
  modifyFailure,
  modifyRequest,
  UserLoginDataPayload,
} from "features/user/reducer/userSlice";
import { userAPI } from "features/user";
import { func } from "prop-types";


// function* token(action: PayloadAction<TokenPayload>) {
//   // try {
//   //   const {data} = await axios.post('/api/auth/signin', {email, password});
//   //   console.log(data);
//   try {
//     const result: UserDataPayload = yield call(
//       userAPI.tokenAPI,
//       action.payload
//     );
//     dispatch(setToken(data.token))
//     const { redirectUrl } = queryString.parse(props.location.search);
//     if (redirectUrl) {
//       props.history.push(redirectUrl);
//     } else {
//       props.history.push('/');
//     }
//   }

function* exist(action: PayloadAction<ExistPayload>) {
    try {
      const result: UserDataPayload = yield call(
        userAPI.existAPI,
        action.payload
      );
      yield put(existSuccess(result));
      alert("가능한 아이디입니다.")
    } catch (error: any) {
      yield put(existFailure(error))
      alert(error)
      alert("쓸수없는 아이디입니다.")
    }
  }


  function* join(action: PayloadAction<JoinPayload>) {
    try {
      console.log(action)
      const result: UserDataPayload = yield call(

        userAPI.joinAPI,
        action.payload
      );
      yield put(joinSuccess(result));
      window.location.href = 'users/login'
    } catch (error: any) {
      // alert("아이디오류")
      yield put(joinFailure(error));
    }
  }
  function* login(action: PayloadAction<LoginPayload>) {
    try {
      const result: UserLoginDataPayload = yield call(
        userAPI.loginAPI,
        action.payload
      );
      console.log(`===========================서버에서 받은 값${JSON.stringify(result)}`)
      // alert(`===============payload=================${JSON.stringify(action.payload)}`)
      // const token: UserDataPayload = yield call(
      //   userAPI.tokenAPI,
      //   action_t.payload
      // );
      //요청 성공시
      yield put(loginSuccess(result));
      alert(`============= raw ===================${JSON.stringify(result)}`)
      console.log(`============= raw ===================${JSON.stringify(result)}`)
      alert(`============= result ===================${JSON.parse(JSON.stringify(result.config.data))}`)
      alert(`=============token===================${JSON.parse(JSON.stringify(result.data.token))}`)
      window.localStorage.setItem('sessionToken', JSON.parse(JSON.stringify(result.data.token)))
      window.localStorage.setItem('sessionUser', JSON.parse(JSON.stringify(result.config.data)))
      // window.localStorage.setItem('sessionUser', JSON.stringify(result.config.data.username))
      // window.localStorage.setItem('sessionModify', JSON.stringify(result.config.data))
      alert(`============= sessionToken - saved ===================${window.localStorage.getItem('sessionToken')}`)
      alert(`============= sessionUser - saved ===================${window.localStorage.getItem('sessionUser')}`)
      window.location.href = "/home"
    } catch (error: any) {
      alert(`error :: ${error}`)
      alert("아이디 혹은 비밀번호가 틀렸습니다!")
      yield put(loginFailure(error));
    }
  }
  function* modify(action: PayloadAction<ModifyPayload>) {
    try {
      const result: UserLoginDataPayload = yield call(
        userAPI.modifyAPI,
        action.payload
      );
      yield put(modifySuccess(result));
      // const test = result.config.data
      // alert(`result? :: ${test} :: type :: ${typeof test}`)
      // alert(`result parse :: ${JSON.parse(JSON.stringify(test))} :: type :: ${typeof JSON.parse(JSON.stringify(test))}`)
      window.localStorage.setItem('sessionUser', JSON.parse(JSON.stringify(result.config.data)))
      // alert(`SESSION 저장됨? ${window.localStorage.getItem('sessionUser')}`)
      window.location.href = "/mypage/setting"


    } catch (error: any) {
      // alert("아이디오류")
      yield put(modifyFailure(error));
    }
  }

  // Watch 함수
  export function* watchLogin() {
    yield takeLatest(loginRequest.type, login);
    // loginRequest에서의 type이 실행되면 login함수가 실행되는데
    // loginRequest의 action이 있으면 그 액션이 login함수의 인자로 들어갑니다.
  }
  export function* watchJoin() {
    yield takeLatest(joinRequest.type, join);
  }
  export function* watchExist() {
    yield takeLatest(existRequest.type, exist);
  }
  export function* watchModify() {
    yield takeLatest(modifyRequest.type, modify);
  }