import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router';

import HeaderAndFooter from '../components/header/HeaderAndFooter.tsx';
import AuthRequired from './AuthRequired.tsx';

import { buyProduct, getProducts, type ProductShortInfo } from '../services/ProductService.ts';
import { centsToString } from '../utils/utils.ts';


function BuyPage() {
    const navigate = useNavigate();
    const params = useParams();
    const productId = Number(params.id);
    const [product, setProduct] = useState<ProductShortInfo>();
    const [fetchMessage, setFetchMessage] = useState('');

    useEffect(() => {
        getProducts('')
            .then((data: ProductShortInfo[]) => setProduct(
                data.find((element) => element.id === productId)
            ))
            .catch(() => {
                navigate('/404');
            })
    }, []);

    async function handlePurchase() {
        try {
            await buyProduct(productId);
            navigate('/account/licenses/');
        } catch (error) {
            setFetchMessage('Oops, something went wrong...');
            setTimeout(() => setFetchMessage(''), 2000);
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
                        <p>{fetchMessage}</p>
                    </div>
                </div>
            </HeaderAndFooter>
        </AuthRequired>
    )
}


export default BuyPage;