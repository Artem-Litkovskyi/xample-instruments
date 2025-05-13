import React from 'react';
import { Link } from 'react-router-dom';

import '../assets/styles/AccountWidget.css';


function AccountWidget() {
    return (
        <div className="account-widget">
            <Link to="/signin">Sign in</Link>
            <Link to="/signup">Sign up</Link>
        </div>
    )
}


export default AccountWidget;