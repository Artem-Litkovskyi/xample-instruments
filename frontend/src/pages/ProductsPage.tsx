import HeaderAndFooter from "./HeaderAndFooter";
import ProductCard from "../components/ProductCard";
import HeaderAdditional from "../components/HeaderAdditional";


function ProductsPage() {
    return (
        <HeaderAndFooter additionalHeader={
            <HeaderAdditional
                navigation={[
                    {name: "All plug-ins", href: "/products/all"},
                    {name: "Instruments", href: "/products/instruments"},
                    {name: "Audio effects", href: "/products/effects"},
                ]}
            />
        } >
            <div className="content">
                <div className="content-grid">
                    <ProductCard
                        title="Liquid Plant"
                        subtitle="Advanced Hybrid Synthesizer"
                        price={24900}
                        href="/product/0"
                        buy_href="/product/0"
                        image_url="/logo512.png"
                        purchased={false}
                    />
                    <ProductCard
                        title="Quieth1"
                        subtitle="Virtual Analog Synthesizer"
                        price={15800}
                        href="/product/1"
                        buy_href="/product/1"
                        image_url="/logo512.png"
                        purchased={true}
                    />
                    <ProductCard
                        title="Omniwheel"
                        subtitle="Essential Source of Sonic Inspiration"
                        price={49900}
                        href="/product/2"
                        buy_href="/product/2"
                        image_url="/logo512.png"
                        purchased={false}
                    />
                </div>
            </div>
        </HeaderAndFooter>
    )
}


export default ProductsPage;