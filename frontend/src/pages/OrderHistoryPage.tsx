import {centsToString} from "../utils/utils";


interface OrderInfo {
    date: string;
    product: string;
    price: number;
    orderID: number;
}


function OrderHistoryPage() {
    const licenses: OrderInfo[] = [
        {date: '17-05-2025', product: 'Liquid Plant', price: 2, orderID: 1},
        {date: '15-05-2025', product: 'RS-20 Retro Saturn', price: 1, orderID: 2},
    ]

    return (
        <div className="panel dark padded">
            <h2>Orders</h2>

            <table>
                <thead>
                <tr>
                    <th>Date</th>
                    <th>Product</th>
                    <th>Price</th>
                </tr>
                </thead>

                <tbody>
                {licenses.map((item) => (
                    <tr key={item.orderID}>
                        <td>{item.date}</td>
                        <td>{item.product}</td>
                        <td>${centsToString(item.price)}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}


export default OrderHistoryPage;