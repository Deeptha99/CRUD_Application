import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Create() {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        product_name: '',
        price: '',
        address: ''
    })
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8081/products', values)
            .then(res => {
                navigate('/home')
            })
            .catch(err => console.log(err))
    }

    return (
        <div className='flex items-center justify-center h-screen '>
            <form action="" onSubmit={handleSubmit}>
                <div className='w-96 h-96 flex flex-col items-center justify-center bg-background rounded drop-shadow-md shadow-md'>
                    <h1 className='text-4xl py-2 font-bold'>Add Product</h1>
                    <div className='w-60'>
                        <label htmlFor="product_name" className='block mb-2 '>Product Name</label>
                        <input type="text" name="product_name" id="" onChange={e => setValues({ ...values, product_name: e.target.value })} className='rounded border  w-full py-1 ' />
                    </div>
                    <div className='w-60'>
                        <label htmlFor="price" className='block mb-2 '>Price</label>
                        <input type="text" name="price" id="" onChange={e => setValues({ ...values, price: e.target.value })} className='rounded border  w-full py-1 ' />
                    </div>
                    <div className='w-60'>
                        <label htmlFor="address" className='block mb-2 '>Address</label>
                        <input type="text" name="address" id="" onChange={e => setValues({ ...values, address: e.target.value })} className='rounded border  w-full py-1 ' />
                    </div>
                    <button className='bg-blue text-white rounded p-2 w-60 text-xl mt-4 mb-4 font-bold'>Add +</button>
                </div>
            </form>
        </div>
    )
}

export default Create