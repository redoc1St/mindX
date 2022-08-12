import axios from "axios";
import React from "react";
import SlowRender from "../../components/SlowRender/SlowRender";

export default function Login() {
    const [formState, setFormState] = React.useState({
        username: '',
        password: ''
    })

    const onChangeForm = (e) => {
        const { value, name } = e.target;
        setFormState(prevFormState => {
            return {
                ...prevFormState,
                [name]: value
            }
        })
        console.log(e.target)
    }
    const onSubmit = (e) => {
        e.preventDefault(); //chăn load lại trang
        // console.log(document.getElementById('fname').value) //đây là xử lý ở DOM thật
        console.log(formState);
    }

    return (
        <form onSubmit={onSubmit} >
            <label for="username"> Username:</label><br />
            <input value={formState.username}
                type="text"
                name="username"
                onChange={onChangeForm}
            />
            {formState.username.length=="" &&<div> User name không rỗng</div>}

            <br />
            <label for="password">Password:</label><br />
            <input type="password"
                value={formState.password}
                name="password"
                onChange={onChangeForm}

            />
            {formState.password.length < 6 && <div> Password có độ dài nhỏ nhất là 6 </div>}
            <br /><br />
            <SlowRender></SlowRender>
            <input type="submit" value="Submit" />
        </form>
    )
}