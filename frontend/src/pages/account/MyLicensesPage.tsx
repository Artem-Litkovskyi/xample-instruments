import { useEffect, useState } from 'react';

import { getMyLicenses, type LicenseInfo } from '../../services/UserService.ts';
import { downloadProductFull } from '../../services/ProductService.ts';


function MyLicensesPage() {
    const [licenses, setLicenses] = useState<LicenseInfo[]>([]);

    useEffect(() => {
        getMyLicenses()
            .then((data: LicenseInfo[]) => setLicenses(data))
    }, []);

    async function handleDownload(product_id: number) {
        try {
            await downloadProductFull(product_id);
        } catch (error) {
            console.error(error);
        }
    }

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
                            <td>
                                <button
                                    className='gray'
                                    onClick={() => handleDownload(Number(item.product_id))}
                                >
                                    Download
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}

        </div>
    )
}


export default MyLicensesPage;