import { useEffect, useState } from 'react';
import { useParams } from 'react-router';

import HeaderAndFooter from './HeaderAndFooter';
import ProductCard from '../components/ProductCard';
import HeaderAdditional from '../components/HeaderAdditional';

import { get_products } from '../services/ProductService.ts';


interface ProductsPageShortInfo {
    id: number;
    title: string;
    subtitle: string;
    price: number;
    screenshot: string;
}


function ProductsPage() {
    const params = useParams();

    const [products, setProducts] = useState<ProductsPageShortInfo[]>([]);

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
                            product_id={product.id}
                            title={product.title}
                            subtitle={product.subtitle}
                            price={product.price}
                            image_url={product.screenshot}
                            purchased={false}
                        />
                    ))}
                </div>
            </div>
        </HeaderAndFooter>
    )
}


export default ProductsPage;