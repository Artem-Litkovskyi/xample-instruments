import { useEffect, useState } from 'react';
import { Link } from 'react-router';

import { get_products, type ProductShortInfo } from '../services/ProductService.ts';


function ManageProductsPage() {
    const [products, setProducts] = useState<ProductShortInfo[]>([]);

    useEffect(() => {
        get_products('')
            .then((data) => setProducts(data))
    }, []);

    async function handleRemove(product_id: number) {
        console.log(product_id);
    }

    return (
        <div className='panel dark padded'>
            <h2>All products</h2>

            {products.length === 0 ? (
                <p>No products</p>
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

            <Link to='/addproduct' className='button light'>Add</Link>
        </div>
    )
}


export default ManageProductsPage;