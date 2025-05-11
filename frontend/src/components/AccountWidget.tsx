import React from 'react';
import '../assets/styles/AccountWidget.css';


function AccountWidget() {
    return (
        <div className="account-widget">
            <a href="/signin">Sign in</a>
            <a href="/signup">Sign up</a>
        </div>
    )
}


export default AccountWidget;