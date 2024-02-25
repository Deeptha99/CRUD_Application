import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import validation from './signup_validation'
import axios from 'axios'

function Signup() {
    const [values, setValues] = useState({
        username: '',
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
                    navigate('/signup');
                }
            })
            .catch(err => console.log(err))
    }, [navigate])

    const handleSubmit = async (
        event) => {
        event.preventDefault();
        setErrors(validation(values));
        if (errors.username === "" && errors.email === "" && errors.password === "") {
            axios.post('http://localhost:8081/signup', values)
                .then(res => {
                    navigate('/');
                })
                .catch(err => console.log("err"));
        }
    }
    return (
        <div className='flex items-center justify-center h-screen'>
            <form action="" onSubmit={handleSubmit}>
                <div className='w-96 flex flex-col items-center justify-center bg-background rounded drop-shadow-md shadow-md'>
                    <h1 className='text-4xl py-2'>Sign up</h1>
                    <div className='w-60'>
                        <label htmlFor="username" className='block mb-2'>Username :</label>
                        <input type="text" name="username" id="" onChange={handleInput} className='rounded border w-full py-1' />
                        {errors.username && <span className='text-red block'>{errors.username}</span>}
                    </div>
                    <div className='w-60'>
                        <label htmlFor="email" className='block mb-2'>Email :</label>
                        <input type="text" name="email" id="" onChange={handleInput} className='rounded border w-full py-1' />
                        {errors.email && <span className='text-red block'>{errors.email}</span>}
                    </div>
                    <div className='w-60'>
                        <label htmlFor="password" className='block mb-2'>Password :</label>
                        <input type="password" name="password" id="" onChange={handleInput} className='rounded border w-full py-1' />
                        {errors.password && <span className='text-red block'>{errors.password}</span>}
                    </div>
                    <button type='submit' className='bg-blue text-white rounded p-2 w-60 text-xl mb-3 mt-4'>Sign up</button>
                    <p className='mb-4 font-bold'>You have an account ? <Link to="/" className='text-blue'>login</Link></p>
                </div>
            </form>
        </div>
    )
}

export default Signup