import { useEffect, useState, useRef } from 'react';
import { Link, useLocation } from 'react-router';

import { useAuth } from '../contexts/AuthContext.tsx';

import '../assets/styles/components/AccountWidget.css';


function AccountWidget() {
    const { isAuthenticated, username, logout } = useAuth();
    const location = useLocation();

    const widgetRef = useRef<HTMLDivElement | null>(null);

    const [open, setOpen] = useState(false);

    useEffect(() => {
        let handler = ({target}: MouseEvent) => {
            if (!widgetRef.current?.contains(target as Node)) {
                setOpen(false);
            }
        };

        document.addEventListener('mousedown', handler);

        return () => {
            document.removeEventListener('mousedown', handler);
        }
    })

    return (
        <div className='account-widget' ref={widgetRef}>
            {isAuthenticated ? (
                <div className={`dropdown ${open ? 'open' : ''}`}>
                    <button onClick={() => setOpen(!open)}>
                        {username}
                    </button>
                    <div className='dropdown-content'>
                        <hr />
                        <Link to='/account/settings'>Account settings</Link><br />
                        <Link to='/account/products'>My products</Link><br />
                        <Link to='/account/history'>Order history</Link><br />
                        <hr />
                        <Link to='/' onClick={logout}>Log out</Link>
                    </div>
                </div>
            ) : (
                <>
                    <Link to='/signin' state={{ returnToUrl: location.pathname }}>Sign in</Link>
                    <Link to='/signup' state={{ returnToUrl: location.pathname }}>Sign up</Link>
                </>
            )}

        </div>
    )
}


export default AccountWidget;