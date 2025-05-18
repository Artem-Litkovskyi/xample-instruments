import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router';

import '../assets/styles/AccountWidget.css';


function AccountWidget(props: {loggedIn: boolean}) {
    const ref = useRef<HTMLDivElement | null>(null);

    const [open, setOpen] = useState(false);

    useEffect(() => {
        let handler = ({target}: MouseEvent) => {
            if (!ref.current?.contains(target as Node)) {
                setOpen(false);
            }
        };

        document.addEventListener('mousedown', handler);
    })

    return (
        <div className="account-widget" ref={ref}>
            {props.loggedIn ? (
                <div className={`dropdown ${open ? 'open' : ''}`}>
                    <button onClick={() => setOpen(!open)}>Username</button>
                    <div className="dropdown-content">
                        <hr />
                        <Link to="/account/settings">Account settings</Link><br />
                        <Link to="/account/products">My products</Link><br />
                        <Link to="/account/history">Order history</Link><br />
                        <hr />
                        <Link to="/logout">Log out</Link>
                    </div>
                </div>
            ) : (
                <>
                    <Link to="/signin">Sign in</Link>
                    <Link to="/signup">Sign up</Link>
                </>
            )}

        </div>
    )
}


export default AccountWidget;