import { useEffect, useState } from 'react';

import { getProducts, type ProductShortInfo} from '../../services/ProductService.ts';
import { deleteProduct } from '../../services/AdminService.ts';


function ManageProductsPage() {
    const [products, setProducts] = useState<ProductShortInfo[]>([]);
    const [fetchMessage, setFetchMessage] = useState('');

    useEffect(() => {
        fetchProducts();
    }, []);

    function fetchProducts() {
        getProducts('').then((data) => setProducts(data));
    }

    async function handleRemove(product_id: number) {
        try {
            await deleteProduct(product_id);
        } catch (error) {
            setFetchMessage('Oops, something went wrong...');
            setTimeout(() => setFetchMessage(''), 2000);
            throw error;
        }

        setFetchMessage('Removed successfully!');
        setTimeout(() => setFetchMessage(''), 2000);

        fetchProducts();
    }

    return (
        <div className='content narrow'>
            <div className='panel dark padded'>
                <h2>All products</h2>

                {products.length === 0 ? (
                    <p>Nothing to show here</p>
                ) : (
                    <table>
                        <thead>
                        <tr>
                            <th>Product</th>
                            <th>Category</th>
                            <th></th>
                        </tr>
                        </thead>

                        <tbody>
                        {products.map((item) => (
                            <tr key={item.id}>
                                <td>{item.title}</td>
                                <td>{item.category}</td>
                                <td>
                                    <button
                                        className='gray'
                                        onClick={() => handleRemove(Number(item.id))}
                                    >
                                        Remove
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                )}

                <p>{fetchMessage}</p>
            </div>
        </div>
    )
}


export default ManageProductsPage;