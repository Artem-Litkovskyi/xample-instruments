import React from "react";

import HeaderAndFooter from "./HeaderAndFooter";
import HeaderProducts from "../components/HeaderProducts";
import ProductCard from "../components/ProductCard";


function ProductsPage() {
    return (
        <HeaderAndFooter additionalHeader={<HeaderProducts />} >
            <div className="content">
                <div className="content-grid">
                    <ProductCard
                        title="Liquid Plant"
                        subtitle="Advanced Hybrid Synthesizer"
                        price={24900}
                        href="/product/0"
                        buy_href="/product/0"
                        image_url="/logo512.png"
                    />
                    <ProductCard
                        title="Quieth1"
                        subtitle="Virtual Analog Synthesizer"
                        price={15800}
                        href="/product/1"
                        buy_href="/product/1"
                        image_url="/logo512.png"
                    />
                    <ProductCard
                        title="Omniwheel"
                        subtitle="Essential Source of Sonic Inspiration"
                        price={49900}
                        href="/product/2"
                        buy_href="/product/2"
                        image_url="/logo512.png"
                    />
                </div>
            </div>
        </HeaderAndFooter>
    )
}


export default ProductsPage;