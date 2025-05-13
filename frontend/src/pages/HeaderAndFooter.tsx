import React, {useLayoutEffect} from "react";
import { PropsWithChildren } from 'react'

import Header from "../components/Header";
import Footer from "../components/Footer";


interface HeaderAndFooterProps {
    additionalHeader?: any;
}


function HeaderAndFooter(props: PropsWithChildren<HeaderAndFooterProps>) {
    useLayoutEffect(() => {
        window.scrollTo(0, 0)
    });

    return (
        <div>
            <div className="dock-top">
                <Header />
                {props.additionalHeader}
            </div>

            {props.children}

            <Footer />
        </div>
    )
}


export default HeaderAndFooter;