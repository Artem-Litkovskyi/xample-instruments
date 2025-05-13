import React from "react";
import { PropsWithChildren } from 'react'

import Header from "../components/Header";
import Footer from "../components/Footer";


function HeaderAndFooter(props: PropsWithChildren) {
    return (
        <div>
            <Header />

            {props.children}

            <Footer />
        </div>
    )
}


export default HeaderAndFooter;