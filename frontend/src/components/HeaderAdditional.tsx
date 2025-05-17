import NavBar, {NavBarItem} from "./NavBar";
import React from "react";

import '../assets/styles/HeaderAdditional.css';


function HeaderAdditional(props: { navigation: NavBarItem[] }) {
    return (
        <div className="header-additional">
            <NavBar navigation={props.navigation} />
        </div>
    )
}


export default HeaderAdditional;