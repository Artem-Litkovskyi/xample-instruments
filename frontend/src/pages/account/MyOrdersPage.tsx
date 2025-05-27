import { useEffect, useState } from 'react';

import { getMyOrders, type OrderInfo } from '../../services/UserService.ts';
import { centsToString } from '../../utils/utils.ts';


function MyOrdersPage() {
    const [orders, setOrders] = useState<OrderInfo[]>([]);

    useEffect(() => {
        getMyOrders()
            .then((data: OrderInfo[]) => setOrders(data))
    }, []);

    return (
        <div className='panel dark padded'>
            <h2>Orders</h2>

            {orders.length === 0 ? (
                <p>Nothing to show here</p>
            ) : (
                <table>
                    <thead>
                    <tr>
                        <th>Date</th>
                        <th>Product</th>
                        <th>Price</th>
                    </tr>
                    </thead>

                    <tbody>
                    {orders.map((item) => (
                        <tr key={item.order_id}>
                            <td>{new Date(item.created_at).toLocaleString()}</td>
                            <td>{item.product_title}</td>
                            <td>${centsToString(item.price)}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    )
}


export default MyOrdersPage;