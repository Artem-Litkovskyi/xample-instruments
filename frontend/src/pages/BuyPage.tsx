import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';

import HeaderAndFooter from './HeaderAndFooter';
import AuthRequired from './AuthRequired.tsx';
import type { ProductFullInfo } from './ProductPage.tsx';
import { buy, get_product } from '../services/ProductService.ts';
import { centsToString } from '../utils/utils.ts';


function BuyPage() {
    const params = useParams();

    const [product, setProduct] = useState<ProductFullInfo>();

    const [error, setError] = useState('');

    useEffect(() => {
        get_product(params.id)
            .then((data) => setProduct(data))
    }, []);

    async function handlePurchase() {
        try {
            await buy(Number(params.id));
            setError('');
            alert('Purchased successfully.');
        } catch (error) {
            setError('Oops, something went wrong...');
            throw error;
        }
    }
    
    return (
        <AuthRequired>
            <HeaderAndFooter>
                <div className='content narrow'>
                    <div className='panel dark padded'>
                        <h2>Checkout</h2>

                        <table>
                            <thead>
                            <tr>
                                <th>Product</th>
                                <th>Price</th>
                                <th></th>
                            </tr>
                            </thead>

                            <tbody>
                            <tr>
                                <td>{product?.title}</td>
                                <td>${product && centsToString(product.price)} USD</td>
                                <td><Link to={`/product/${params.id}`} className='button gray'>View</Link></td>
                            </tr>
                            </tbody>
                        </table>

                        <button className='light' onClick={handlePurchase}>Purchase</button>
                        <p>{error}</p>
                    </div>
                </div>
            </HeaderAndFooter>
        </AuthRequired>
    )
}


export default BuyPage;