import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import validation from './login_validation'
import axios from 'axios';

function Login() {
    const [values, setValues] = useState({
        email: '',
        password: ''
    })

    const navigate = useNavigate();

    const [errors, setErrors] = useState({})
    const handleInput = (event) => {
        setValues(prev => ({ ...prev, [event.target.name]: [event.target.value] }))
    }

    axios.defaults.withCredentials = true;

    useEffect(() => {
        axios.get('http://localhost:8081/home')
            .then(res => {
                if (res.data.valid) {
                    navigate('/home')
                }
                else {
                    navigate('/');
                }
            })
            .catch(err => console.log(err))
    }, [navigate])

    const handleSubmit = (event) => {
        event.preventDefault();
        setErrors(validation(values));
        if (errors.email === "" && errors.password === "") {
            axios.post('http://localhost:8081/login', values)
                .then(res => {
                    if (res.data.Login) {
                        navigate('/home');
                    }
                    else {
                        alert("Invalid Email or Password");
                    }
                })
                .catch(err => console.log("err"));
        }
    }
    return (
        <div className='flex items-center justify-center h-screen '>
            <form action="" onSubmit={handleSubmit}>
                <div className='w-96 flex flex-col items-center justify-center bg-background rounded drop-shadow-md shadow-md'>
                    <h1 className='text-4xl py-2'>Login</h1>
                    <div className='w-60'>
                        <label htmlFor="email" className='block mb-2 '>Email :</label>
                        <input type="text" name="email" id="" onChange={handleInput} className='rounded border  w-full py-1 ' />
                        {errors.email && <span className='text-red block'>{errors.email}</span>}
                    </div>
                    <div className='w-60'>
                        <label htmlFor="password" className='block mb-2 '>Password :</label>
                        <input type="password" name="password" id="" onChange={handleInput} className='rounded border  w-full py-1 ' />
                        {errors.password && <span className='text-red block'>{errors.password}</span>}
                    </div>
                    <button type='submit' className='bg-blue text-white rounded p-2 w-60 text-xl mb-3 mt-4'>Login</button>
                    <p className='mb-4 font-bold'>You haven't an account? <Link to="/signup" className='text-red'>Signup</Link></p>
                </div>
            </form>
        </div>
    )
}

export default Login