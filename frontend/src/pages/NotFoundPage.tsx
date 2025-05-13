import React from "react";

import HeaderAndFooter from "./HeaderAndFooter";
import NotFound from "../components/NotFound";


function HomePage() {
    return (
        <HeaderAndFooter>
            <div className="content">
                <NotFound />
            </div>
        </HeaderAndFooter>
    )
}


export default HomePage;