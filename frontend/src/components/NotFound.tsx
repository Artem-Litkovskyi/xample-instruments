import NavBar from "./NavBar";

import '../assets/styles/NotFound.css';


function NotFound() {
    return (
        <div className="not-found panel light">
            <h1>404 Not Found</h1>
            <NavBar
                navigation={[
                    {name: "Home", href: "/"},
                    {name: "Products", href: "/products"},
                    {name: "Support", href: "/support"},
                ]}
            />
        </div>
    )
}


export default NotFound;