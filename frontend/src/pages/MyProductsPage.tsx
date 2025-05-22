import { useEffect, useState } from 'react';
import { get_my_products } from '../services/ProductService.ts';


interface LicenseInfo {
    license_id: string;
    product_id: string;
    product_title: string;
}


function MyProductsPage() {
    const [licenses, setLicenses] = useState<LicenseInfo[]>([]);

    useEffect(() => {
        get_my_products()
            .then((data) => setLicenses(data))
    }, []);

    return (
        <div className='panel dark padded'>
            <h2>Licenses</h2>

            {licenses.length === 0 ? (
                <p>You have no licenses yet</p>
            ) : (
                <table>
                    <thead>
                    <tr>
                        <th>Product</th>
                        <th>Serial number</th>
                        <th></th>
                    </tr>
                    </thead>

                    <tbody>
                    {licenses.map((item) => (
                        <tr key={item.license_id}>
                            <td>{item.product_title}</td>
                            <td>{item.license_id}</td>
                            <td><button className='gray'>Download</button></td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}

        </div>
    )
}


export default MyProductsPage;