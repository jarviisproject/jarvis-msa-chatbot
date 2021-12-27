import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux'
import { motion } from 'framer-motion';
import { Controller, useForm } from 'react-hook-form';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import _ from '@lodash';
import 'features/user/style/UserModify.scss'
import { modifyRequest } from '../reducer/userSlice';


// const defaultValues = {
//     username: '',
//     email: '',
//     phone: '',
//     birth: '',
//     password: '',
//     address: '',
//     user_interests: '',
//     job: ''

// };
export default function UserModify() {
    const sessionUser = JSON.parse(window.localStorage.getItem('sessionUser'))
    const defaultValues = {
        username: sessionUser.username,
        email: sessionUser.email,
        phone: sessionUser.phone,
        birth: sessionUser.birth,
        password: sessionUser.password,
        address: sessionUser.address,
        user_interests: sessionUser.user_interests,
        job: sessionUser.job
    
    };
    const { control, formState, handleSubmit, reset, getValues } = useForm({
        mode: 'onChange',
        defaultValues,
    });
    const dispatch = useDispatch()

    const { isValid, dirtyFields, errors } = formState;

    function onSubmit() {
        reset(defaultValues);
    }
    
    return (
        <div className="Modify-sc">
            <Card
                square
            >
                <CardContent >
                    <Typography
                        class="text-16 tracking-widest -mt-8 font-700"
                        color="textSecondary"
                    >
                        회원정보 수정하기
                        {/* <p>{defaultValues.username}</p> */}
                    </Typography>
                    <form
                        name="modifyForm"
                        noValidate
                        className="flex flex-col justify-center w-full"
                      onSubmit={handleSubmit(async (data) => {dispatch(modifyRequest({
                         ...data,
                         email: sessionUser.email
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
                        value={sessionUser.email}
                        fullWidth
                      />
                    )}
                  />
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
                                    required
                                    fullWidth
                                />
                            )}
                        />
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <div className="wrap">
                            <h4>Check List 수정하기</h4>
                            <label component="legend">관심있는 직업이 무엇입니까?</label><br />
                            <Controller
                                name="job"
                                control={control}
                                render={({ field }) => (
                                    <>
                                        <input
                                            {...field}
                                            label="job"
                                            type="radio"
                                            value="운동선수"
                                            id="select0"


                                        />
                                        <label for="select0" value="운동선수">운동선수</label>
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
                                            value="화가"
                                            id="select1"
                                            checked
                                        />
                                        <label for="select1" value="화가">화가</label>
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
                                            value="개발자"
                                            id="select2"
                                        />
                                        <label for="select2" value="개발자">개발자</label>
                                    </>)}
                            />
                            <div>
                                <label component="legend">취미가 무엇입니까?</label><br />
                                <Controller
                                    name="user_interests"
                                    control={control}
                                    render={({ field }) => (
                                        <>
                                            <input
                                                {...field}
                                                label="user_interests"
                                                type="radio"
                                                value="공연보기"
                                                id="select4"

                                            />
                                            <label for="select4" value="공연보기">공연보기</label>
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
                                                value="다이어트"
                                                id="select5"
                                                checked
                                            />
                                            <label for="select5" value="다이어트">다이어트</label>
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
                                                value="영화보기"
                                                id="select6"
                                            />
                                            <label for="select6" value="영화보기">영화보기</label>
                                        </>
                                    )}
                                />

                            </div>
                        </div>
                        <Button style={{ 'margin-top': '60px' }}
                            variant="contained"
                            color="primary"
                            className="w-full mx-auto mt-16"
                            type="submit"
                        >
                            수정 하기
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
