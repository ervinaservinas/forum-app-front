import React from 'react';
import { useRef, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import http from '../plugins/http';
import UserContext from '../context/UserContext';


const Login = () => {
    const nav = useNavigate()
    const { setUser } = useContext(UserContext)
    const [Error, setError] = useState(null)
    const inp = {
        username: useRef(),
        pass: useRef()
    }
    async function login() {
        const user = {
            username: inp.username.current.value,
            password: inp.pass.current.value,
        }
        http.post(user, "login").then(res => {
            if (res.success) {
                inp.username.current.value = ""
                inp.pass.current.value = ""
                setError(null)
                setUser(res.data)
                nav('/')
            } else {
                setError(res.message)
            }
        })
    }

    return (
        <div className='loginFlex d-flex align-items-center '>

            <div>Log in</div>
            <div>


            </div>
            <input className='input' type="text" placeholder='Username' ref={inp.username} />

            <input className='input' type="password" placeholder='Password' ref={inp.pass} />
            <button className='btn' onClick={login}>Log in</button>
            {Error && <div className='d-flex justify-content-center '>{Error}</div>}
        </div>
    );
};

export default Login;