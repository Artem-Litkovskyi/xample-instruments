import HeaderAndFooter from './HeaderAndFooter';
import ProductCard from '../components/ProductCard';
import HeaderAdditional from '../components/HeaderAdditional';


function ProductsPage() {
    return (
        <HeaderAndFooter additionalHeader={
            <HeaderAdditional
                navigation={[
                    {name: 'All plug-ins', href: '/products/all'},
                    {name: 'Instruments', href: '/products/instruments'},
                    {name: 'Audio effects', href: '/products/effects'},
                ]}
            />
        } >
            <div className='content'>
                <div className='content-grid'>
                    <ProductCard
                        product_id={0}
                        title='Liquid Plant'
                        subtitle='Advanced Hybrid Synthesizer'
                        price={24900}
                        image_url='/logo512.png'
                        purchased={false}
                    />
                    <ProductCard
                        product_id={1}
                        title='Quieth1'
                        subtitle='Virtual Analog Synthesizer'
                        price={15800}
                        image_url='/logo512.png'
                        purchased={true}
                    />
                    <ProductCard
                        product_id={2}
                        title='Omniwheel'
                        subtitle='Essential Source of Sonic Inspiration'
                        price={49900}
                        image_url='/logo512.png'
                        purchased={false}
                    />
                </div>
            </div>
        </HeaderAndFooter>
    )
}


export default ProductsPage;