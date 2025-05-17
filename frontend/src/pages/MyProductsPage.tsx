import React, {useState} from "react";


interface LicenseInfo {
    product: string;
    serial: string;
    productID: number;
}


function MyProductsPage() {
    const licenses: LicenseInfo[] = [
        {product: 'Liquid Plant', serial: 'FDJSK-O2DJJ-98CDA-J2349-5V6FX', productID: 0},
        {product: 'RS-20 Retro Saturn', serial: 'FDJSK-O2DJJ-98CDA-J2349-5V6FX', productID: 1},
    ]

    return (
        <div className="panel dark padded">
            <h2>Licenses</h2>

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
                    <tr key={item.productID}>
                        <td>{item.product}</td>
                        <td>{item.serial}</td>
                        <td><button className='gray'>Download</button></td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}


export default MyProductsPage;