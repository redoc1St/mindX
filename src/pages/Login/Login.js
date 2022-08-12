import axios from "../../api/request";
import React from "react";
import SlowRender from "../../components/SlowRender/SlowRender";
import { useForm, useWatch } from 'react-hook-form'
import { Link, useNavigate, NavLink } from 'react-router-dom';
import useAuth from "../../components/hooks/useAuth";
import { useSearchParams } from 'react-router-dom'

function SubmitButton({ control }) {
    const { username, password } = useWatch({ control });
    const disabled = !username || !password;

    return (
        <button type="submit" className="btn btn-primary btn-block" value="Submit" disabled={disabled}>Đăng nhập</button>
    )
}

export default function Login() {
    const { register,
        formState: { errors },
        // watch,      //Bắt từng thay đổi, kiểu như sk onChange
        control,   //ban đầu là dùng cái watch để bắt sự thay đổi để phù hợp thì nút button mới được enable,nhưng vì nó reRender nhiều quá nên dùng cái này để bắt 
        handleSubmit, } = useForm({
            defaultValues: {
                username: '',
                password: '',
            },

            mode: 'onSubmit' //đây có mấy cái để kiểu ấn enter xong mới bỏ hiển thị lỗi
        });
    const navigate = useNavigate();
    const { login } = useAuth()
    
    const [searchParams]=useSearchParams();

    const onSubmit = async (values) => {
        const { username, password } = values;
        try {
            const res = await axios({
                url: '/api/auth/login',
                method: 'post',
                data: { username, password }
            })
            if (res.data.success) {
                // localStorage.setItem('token',res.data.data.token)
                // console.log('thanh cong')
                // login({
                //     _id:res.data.data._id,
                //     token:res.data.data.token
                // })
                // console.log('1',login)
                // login({ token: res.data.data.token })
                login({
                    _id:res.data.data._id,
                    token: res.data.data.token,
                    returnUrl: searchParams.get('returnUrl')||'' })
            }
            console.log('abc', res.data.data.token)
        } catch (error) {
            console.log(error)
        }
    }


    console.log('render')
    console.log(errors)
    // console.log(watch())

    return (
        <form onSubmit={handleSubmit(onSubmit)} >
            <label for="username"> Username:</label><br />
            <input
                type="text"
                name="username"
                {...register('username', { required: true })}
            />
            {errors?.username?.type === 'required' && <p style={{ color: 'red' }}>Username không được để trống</p>}

            <br />
            <label for="password">Password:</label><br />
            <input type="password"
                name="password"
                {...register('password', { required: true, minLength: 6 })}

            />
            {errors?.password?.type === 'required' && <p style={{ color: 'red' }}>Password không được để trống</p>}
            {errors?.password?.type === 'minLength' && <p style={{ color: 'red' }}>Password phải lớn hơn 6 ký tự</p>}

            <br /><br />
            <SlowRender></SlowRender>
            <SubmitButton control={control}></SubmitButton>
            {/* <input type="submit" value="Submit" /> */}
            <div className="card-wrapper mt-4 p-3">
                <div>
                    Test <NavLink to="/login">Login here</NavLink>
                </div>
                <div>
                    No account? <Link to="/signup">Sign up here</Link>
                </div>
            </div>
        </form>
    )
}