import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Home() {
    const [name, setName] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8081/home')
            .then(res => {
                if (res.data.valid) {
                    setName(res.data.username);
                } else {
                    navigate('/');
                }
            })
            .catch(err => console.error('Error fetching user data:', err));
    }, [navigate]);

    const handleLogout = async () => {
        try {
            const response = await axios.post('http://localhost:8081/logout');
            if (response.data.success) {
                navigate('/');
            } else {
                console.error('Logout failed');
            }
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    const [data, setData] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:8081/table')
            .then(res => setData(res.data))
            .catch(err => console.error('Error fetching table data:', err));
    }, []);

    const handleDelete = (id) => {
        axios.delete('http://localhost:8081/delete/' + id)
            .then(res => {
                window.location.reload();
            })
            .catch(err => console.error('Error fetching table data:', err));
    }

    return (
        <div className='flex items-center justify-center h-screen '>
            <div className='w-5/6 h-1/2 flex flex-col p-3 bg-background rounded drop-shadow-md shadow-md'>
                <div className='flex flex-wrap justify-between mb-5'>
                    <h1 className='text-2xl'>Hello ! {name}</h1>
                    <button onClick={handleLogout} className='bg-red rounded p-2 text-white'>Log out</button>
                </div>
                <div className='mb-4'>
                    <Link to="/create" className='bg-green rounded p-3 text-xl font-bold'>Create + </Link>
                </div>
                <div className='relative overflow-x-auto'>
                    <table className='w-full text-xl text-left '>
                        <thead className='text-xl uppercase'>
                            <tr>
                                <th className='px-6 py-3'>ID</th>
                                <th className='px-6 py-3'>Product Name</th>
                                <th className='px-6 py-3'>Price</th>
                                <th className='px-6 py-3'>Address</th>
                                <th className='px-6 py-3'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((products, index) => {
                                return <tr key={index} className='bg-white border-b'>
                                    <td className='px-6 py-4'>{products.id}</td>
                                    <td className='px-6 py-4'>{products.product_name}</td>
                                    <td className='px-6 py-4'>Rs.{products.price}</td>
                                    <td className='px-6 py-4'>{products.address}</td>
                                    <td className='px-6 py-4'>
                                        <Link to={`/view/${products.id}`} className='bg-green rounded mr-2 p-1.5'>View</Link>
                                        <Link to={`/edit/${products.id}`} className='bg-blue rounded mr-2 p-1.5'>Edit</Link>
                                        <button onClick={() => handleDelete(products.id)} className='bg-red rounded p-1.5'>Delete</button>
                                    </td>
                                </tr>
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Home;
