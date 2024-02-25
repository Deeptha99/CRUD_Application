import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function Update() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [values, setValues] = useState({
        product_name: '',
        price: '',
        address: ''
    })

    useEffect(() => {
        axios.get('http://localhost:8081/view/' + id)
            .then(res => {
                console.log(res)
                setValues({ ...values, product_name: res.data[0].product_name, price: res.data[0].price, address: res.data[0].address })
            })
            .catch(err => console.log(err))
    }, [id])

    const handleUpdate = (event) => {
        event.preventDefault();
        axios.put('http://localhost:8081/update/' + id, values)
            .then(res => {
                console.log(res);
                navigate('/home');
            })
            .catch(err => console.error('Error updating:', err.message));
    };

    return (
        <div className='flex items-center justify-center h-screen '>
            <form action="" onSubmit={handleUpdate}>
                <div className='w-96 h-96 flex flex-col items-center justify-center bg-background rounded drop-shadow-md shadow-md'>
                    <h1 className='text-4xl py-2 font-bold'>Edit Product</h1>
                    <div className='w-60'>
                        <label htmlFor="product_name" className='block mb-2 '>Product Name</label>
                        <input type="text" name="product_name" id="" onChange={e => setValues({ ...values, product_name: e.target.value })} value={values.product_name} className='rounded border  w-full py-1 ' />
                    </div>
                    <div className='w-60'>
                        <label htmlFor="price" className='block mb-2 '>Price</label>
                        <input type="text" name="price" id="" onChange={e => setValues({ ...values, price: e.target.value })} value={values.price} className='rounded border  w-full py-1 ' />
                    </div>
                    <div className='w-60'>
                        <label htmlFor="address" className='block mb-2 '>Address</label>
                        <input type="text" name="address" id="" onChange={e => setValues({ ...values, address: e.target.value })} value={values.address} className='rounded border  w-full py-1 ' />
                    </div>
                    <button className='bg-blue text-white rounded p-2 w-60 text-xl mt-4 mb-4 font-bold'>Update</button>
                </div>
            </form>
        </div>
    )
}

export default Update