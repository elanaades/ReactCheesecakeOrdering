import React from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

const OrderRow = ({ order }) => {
    const { id, name, email, base, toppings, specialRequest, quantity, deliveryDate, price } = order;
    return (
        <tr style={{ backgroundColor: 'rgb(248, 249, 250)', borderRadius: '15px' }}>
            <td style={{ paddingTop: '15px', paddingBottom: '15px' }}>
                <Link to={`/orderdetails/${id}`}>
                    {name} - {email}
                </Link>
            </td>
            <td>{base}</td>
            <td>{toppings}</td>
            <td>{specialRequest}</td>
            <td>{quantity}</td>
            <td>{dayjs(deliveryDate).format('MM/DD/YYYY')}</td>
            <td>{price.toFixed(2)}</td>
        </tr>)    
}

export default OrderRow;
