import { useEffect, useState } from 'react';
import { useParams } from 'react-router';

import HeaderAndFooter from './HeaderAndFooter';
import ProductCard from '../components/ProductCard';
import HeaderAdditional from '../components/HeaderAdditional';

import { get_products, type ProductShortInfo } from '../services/ProductService.ts';


function ProductsPage() {
    const params = useParams();

    const [products, setProducts] = useState<ProductShortInfo[]>([]);

    useEffect(() => {
        get_products(params.category === 'all' ? '' : params.category)
            .then((data) => setProducts(data))
    }, [params]);
    
    return (
        <HeaderAndFooter additionalHeader={
            <HeaderAdditional
                navigation={[
                    {name: 'All plug-ins', href: '/products/all'},
                    {name: 'Instruments', href: '/products/instrument'},
                    {name: 'Audio effects', href: '/products/effect'},
                ]}
            />
        } >
            <div className='content'>
                <div className='content-grid'>
                    {products.map((product) => (
                        <ProductCard
                            key={product.id}
                            product_id={product.id}
                            title={product.title}
                            subtitle={product.subtitle}
                            price={product.price}
                            image_url={product.screenshot}
                            purchased={product.purchased}
                        />
                    ))}
                </div>
            </div>
        </HeaderAndFooter>
    )
}


export default ProductsPage;