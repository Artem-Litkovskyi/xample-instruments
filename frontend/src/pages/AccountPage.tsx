import React from "react";
import {Outlet} from "react-router-dom";

import HeaderAndFooter from "./HeaderAndFooter";
import HeaderAdditional from "../components/HeaderAdditional";


function AccountPage() {
    return (
        <HeaderAndFooter additionalHeader={
            <HeaderAdditional
                navigation={[
                    {name: "Account settings", href: "/account/settings"},
                    {name: "My products", href: "/account/products"},
                    {name: "Order history", href: "/account/history"},
                ]}
            />
        }>
            <div className="content narrow">
                <Outlet />
            </div>
        </HeaderAndFooter>
    )
}


export default AccountPage;