import { useEffect, useState } from 'react';

import { get_products, type ProductShortInfo} from '../services/ProductService.ts';
import { delete_product } from '../services/AdminService.ts';


function ManageProductsPage() {
    const [products, setProducts] = useState<ProductShortInfo[]>([]);
    const [error, setError] = useState('');

    useEffect(() => {
        get_products('')
            .then((data) => setProducts(data))
    }, []);

    async function handleRemove(product_id: number) {
        try {
            await delete_product(product_id);
            setError('');
            alert('Removed successfully.');
        } catch (error) {
            setError('Oops, something went wrong...');
            throw error;
        }
    }

    return (
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

            <p>{error}</p>
        </div>
    )
}


export default ManageProductsPage;