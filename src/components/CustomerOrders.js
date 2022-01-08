import React, { useState, useEffect } from 'react';
import jwt_decode from "jwt-decode";
import axios from 'axios';
import '../App.css';
import Navbar from './Navbar';

const CustomerOrders = () => {

    const [orders, setOrders] = useState([]);
    const [totalOrder, setTotalOrder] = useState(0);

    var isAuth = false;
    var token = localStorage.getItem('tokenStore');
    if(token)
        isAuth = true;

    if(isAuth == true)
    {
        var decoded = jwt_decode(token);
        var id = decoded.id;
    }
    

    const getOrders = async () => {
        const res = await axios.get(`https://ras-api-server.herokuapp.com/api/orders/find/${id}`,
            {headers: {token: token}}, 
            );
        setOrders(res.data);
        setTotalOrder(res.data.length);
    }

    useEffect(() => {
        getOrders();
    }, []);

    return (
        <>
            <Navbar />
            <div className="customer-home-container">
                <h1>Your Orders</h1>
                <br />
                {
                    totalOrder
                        ?
                            <table className='list-of-orders'>
                                <tr>
                                    <th className='order-table-heading'>S. No.</th>
                                    <th className='order-table-heading'>Order Id</th>
                                    <th className='order-table-heading'>Date</th>
                                    <th className='order-table-heading'>Amount</th>
                                    <th className='order-table-heading'>Status</th>
                                </tr>
                                {
                                orders.map((order, key) => {
                                    return (
                                        <tr>
                                            <td className='order-table-values'>{key+1}</td>
                                            <td className='order-table-values'>{order._id}</td>
                                            <td className='order-table-values'>{order.createdAt}</td>
                                            <td className='order-table-values'>{order.amount}</td>
                                            <td className='order-table-values'>{order.status}</td>
                                        </tr>
                                    )
                                    
                                })}
                            </table>
                        :
                            <h2>No Orders Found</h2>
                }

                
            </div>
        </>
    );
}

export default CustomerOrders;