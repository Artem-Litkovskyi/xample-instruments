import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

import HeaderAndFooter from '../components/HeaderAndFooter.tsx';
import HeaderAdditional from '../components/HeaderAdditional';
import ProductCard from '../components/ProductCard';
import LoaderContainer from '../components/LoaderContainer.tsx';

import { get_products, type ProductShortInfo } from '../services/ProductService.ts';


function ProductsPage() {
    const navigate = useNavigate();
    const params = useParams();
    const [products, setProducts] = useState<ProductShortInfo[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        get_products(params.category === 'all' ? '' : params.category)
            .then((data) => setProducts(data))
            .catch(() => {
                navigate('/404');
            })
            .finally(() => setLoading(false));
        return () => {setLoading(true)}
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
                <LoaderContainer loading={loading} hide>
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
                </LoaderContainer>
            </div>
        </HeaderAndFooter>
    )
}


export default ProductsPage;