import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

function View() {
    const { id } = useParams();
    const [product, setProduct] = useState([])
    useEffect(() => {
        axios.get('http://localhost:8081/view/' + id)
            .then(res => {
                console.log(res)
                setProduct(res.data[0]);
            })
            .catch(err => console.log(err))
    }, [id])
    return (
        <div className='flex items-center justify-center h-screen '>
            <div className='w-96 flex flex-col items-center justify-center bg-background rounded drop-shadow-md shadow-md'>
                <h1 className='text-4xl py-2 font-bold mb-4'>Product Details</h1>
                <div>
                    <h2 className='text-2xl mb-2'>Product ID : <span className='text-blue font-bold text-xl'>{product.id}</span></h2>
                    <h2 className='text-2xl mb-2'>Product Name : <span className='text-blue font-bold text-xl'>{product.product_name}</span></h2>
                    <h2 className='text-2xl mb-2'>Price : Rs. <span className='text-blue font-bold text-xl'>{product.price}</span></h2>
                    <h2 className='text-2xl mb-2'>Address : <span className='text-blue font-bold text-xl'>{product.address}</span></h2>
                </div>
                <Link to="/home" className='bg-blue text-white rounded p-2 text-xl mt-4 mb-4 font-bold'> Back</Link>
            </div>
        </div>
    )
}

export default View