import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from 'react-redux'
import { motion } from 'framer-motion';
import { Controller, useForm } from 'react-hook-form';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import _ from '@lodash';
import { LayOut } from 'features/common'
import 'features/user/style/UserLayout.scss'
import "features/user/style/UserRegister.scss"
import 'features/user/style/Check.scss'
import { existRequest, joinRequest } from '../reducer/userSlice';
import { inputLabelClasses } from '@mui/material';

/**
 * 생년월일/나이/핸드폰번호 추가하기. 
 * Form Validation Schema
 */
const schema = yup.object().shape({
  username: yup.string().required('You must enter your name'),
  email: yup.string().email('You must enter a valid email').required('You must enter a email'),
  password: yup
    .string()
    .required('Please enter your password.')
    .min(8, 'Password is too short - should be 8 chars minimum.'),
  passwordConfirm: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match'),
  birth: yup.string().required('주민번호 앞 6 자리')
            .min(6, '너무 짧습니다.'),
  address: yup.string().required('거주 도시명 까지만 적어주세요!')
              .min(2, '너무 짧습니다.')

});

const defaultValues = {
  username: '',
  email: '',
  phone: '',
  birth: '',
  password: '',
  address: '',
  user_interests:'',
  job:''

};

export default function Register3Page() {
  const { control, formState, handleSubmit, reset, getValues } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(schema),
  });
  const dispatch = useDispatch()

  const { isValid, dirtyFields, errors } = formState;

  function onSubmit() {
    reset(defaultValues);
  }

  return (
    <LayOut>
      <div className="User-container">
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <Card
              square
            >
              <CardContent >
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { delay: 0.2 } }}
                >
                  <div className="flex items-center mb-48">
                    <img className='login-img' src={require("features/user/images/paper-pencil.png").default} />
                    <div className="border-l-1 mr-4 w-1 h-40" />
                    <div>
                      <Typography className="text-24 font-semibold logo-text" color="inherit">
                      </Typography>
                      <Typography
                        class="text-16 tracking-widest -mt-8 font-700"
                        color="textSecondary"
                      >
                        회원가입
                      </Typography>
                    </div>
                  </div>
                </motion.div>
                <form
                  name="registerForm"
                  noValidate
                  className="flex flex-col justify-center w-full"
                  onSubmit={handleSubmit(async (data) => { await dispatch(joinRequest({
                     ...data,
                    //  user_interests: document.getElementsByName('user_interests'),
                    // job:document.getElementsByName('job')
                    })) })}
                >
                  <Controller
                    name="username"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        className="mb-16"
                        label="Name"
                        autoFocus
                        type="username"
                        error={!!errors.username}
                        helperText={errors?.username?.message}
                        variant="outlined"
                        value="admin"
                        fullWidth
                      />
                    )}
                  />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;


                  <Controller
                    id='email'
                    name="email"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        className="mb-16"
                        label="Email"
                        type="email"
                        error={!!errors.email}
                        helperText={errors?.email?.message}
                        variant="outlined"
                        value="admin@test.com"
                        fullWidth
                      />
                    )}
                  />
                {/* <button onClick={handleSubmit(async (data) => {await dispatch(existRequest(data))})}>중복체크</button> */}
                <button type="button" onClick={async ()=>{await dispatch(existRequest(getValues().email))}}>중복체크</button>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                  <Controller
                    name="phone"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        className="mb-16"
                        label="Phone"
                        type="text"
                        error={!!errors.phone}
                        helperText={errors?.phone?.message}
                        variant="outlined"
                        value="010-1234-5678"
                        fullWidth
                      />
                    )}
                  />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                  <Controller
                    name="birth"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        className="mb-16"
                        label="Birth"
                        type="text"
                        error={!!errors.birth}
                        helperText={errors?.birth?.message}
                        variant="outlined"
                        value="1993-1-1"
                        fullWidth
                      />
                    )}
                  />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <Controller
                    name="address"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        className="mb-16"
                        label="address"
                        type="address"
                        error={!!errors.address}
                        helperText={errors?.address?.message}
                        variant="outlined"
                        value="서울시 강남구"
                        fullWidth
                      />
                    )}
                  />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <Controller
                    name="password"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        className="mb-16"
                        label="Password"
                        type="password"
                        error={!!errors.password}
                        helperText={errors?.password?.message}
                        variant="outlined"
                        value="00000000"
                        fullWidth
                      />
                    )}
                  />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <Controller
                    name="passwordConfirm"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        className="mb-16"
                        label="passwordConfirm"
                        type="passwordConfirm"
                        error={!!errors.password}
                        helperText={errors?.password?.message}
                        variant="outlined"
                        value="00000000"
                        fullWidth
                      />
                    )}
                  />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                  <div className="wrap">
                  <h4>Check List 작성하기</h4>
                  <label component="legend">관심있는 직업이 무엇입니까?</label><br/>
                  <Controller
                    name="job"
                    control={control}
                    render={({ field }) => (
                      <>
                      <input
                        {...field}
                        label="job"
                        type="radio"
                        value= "운동선수"
                        id="select0"
                     
                        
                      />
                      <label for="select0"  value= "운동선수">운동선수</label>
                    </>)}
                  />
                   <Controller
                    name="job"
                    control={control}
                    render={({ field }) => (
                      <>
                      <input
                        {...field}
                        label="job"
                        type="radio"
                        value= "화가"
                        id="select1"
                        checked
                      />
                     <label for="select1"  value= "화가">화가</label>
                    </>)}
                  />
                
                <Controller
                    name="job"
                    control={control}
                    render={({ field }) => (
                      <>
                      <input 
                        {...field}
                        label="job"
                        type="radio"
                        value= "개발자"
                        id="select2"
                      />
                     <label for="select2" value= "개발자">개발자</label>
                    </>)}
                  />
                  <div>
                  <label component="legend">취미가 무엇입니까?</label><br/>
                   <Controller
                    name="user_interests"
                    control={control}
                    render={({ field }) => (
                      <>
                      <input 
                        {...field}
                        label="user_interests"
                        type="radio"
                        value= "공연보기"
                        id="select4"
                        
                      />
                      <label for="select4" value= "공연보기">공연보기</label>
                      </>
                    )}
                  />
                   <Controller
                    name="user_interests"
                    control={control}
                    render={({ field }) => (
                      <>
                      <input 
                        {...field}
                        label="user_interests"
                        type="radio"
                        value= "다이어트"
                        id="select5"
                        checked
                      />
                      <label for="select5"  value= "다이어트">다이어트</label>
                      </>
                    )}
                  />
                 <Controller
                    name="user_interests"
                    control={control}
                    render={({ field }) => (
                      <>
                      <input 
                        {...field}
                        label="user_interests"
                        type="radio"
                        value= "영화보기"
                        id="select6"
                      />
                        <label for="select6"value= "영화보기">영화보기</label>
                      </>
                    )}
                  />
                
                  </div>
                  </div>
              
        
                    <Button style={{'margin-top' : '60px'}}
                    variant="contained"
                    color="primary"
                    className="w-full mx-auto mt-16"
                    aria-label="Register"
                    disabled={_.isEmpty(dirtyFields) || !isValid}
                    type="submit"
                  >
                    Create an account
                  </Button>
                </form>
              </CardContent>



              <div className="flex flex-col items-center justify-center pb-32">
                <span className="font-normal">이미 회원이신가요?</span>
                <Link className="font-normal" to="/users/Login">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  로그인하기
                </Link>
              
              </div>
              
            </Card>


            <div className="Register3-rightSection hidden md:flex flex-1 items-center justify-center p-64">
              <div className="max-w-320">
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0, transition: { delay: 0.2 } }}
                >
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { delay: 0.3 } }}
                >
                </motion.div>
                
              </div>
            </div>
          </motion.div>
        </div>
    </LayOut>
  );
}