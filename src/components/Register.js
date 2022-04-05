import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import http from '../plugins/http';

const Register = () => {
    const nav = useNavigate()
    const [getError, setError] = useState(null)
    const inp = {
        username: useRef(),
        pass1: useRef(),
        pass2: useRef()
    }
    async function registerUser() {
        const user = {
            username: inp.username.current.value,
            pass1: inp.pass1.current.value,
            pass2: inp.pass2.current.value
        }

        http.post(user, "register").then(res => {
            if (res.success) {
                setError(null)
                inp.username.current.value = ""
                inp.pass1.current.value = ""
                inp.pass2.current.value = ""
                nav('/prisijungti')
            } else {
                setError(res.error)
            }
        })
    }

    return (
        <div className='loginFlex justify-content-center'>
            <div>Register new account:</div>
            <input className='input' type="text" placeholder='Username' ref={inp.username} />
            <input className='input' type="password" placeholder='Password' ref={inp.pass1} />
            <input className='input' type="password" placeholder='Repeat password' ref={inp.pass2} />
            <button className='btn' onClick={registerUser}>Register</button>
            {getError && <div className='d-flex justify-content-center'>{getError}</div>}
        </div>
    );
};

export default Register;