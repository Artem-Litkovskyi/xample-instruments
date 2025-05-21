import {Outlet} from 'react-router';

import HeaderAdditional from '../components/HeaderAdditional';
import HeaderAndFooter from './HeaderAndFooter';
import AuthRequired from "./AuthRequired.tsx";


function AccountPage() {
    return (
        <AuthRequired>
            <HeaderAndFooter additionalHeader={
                <HeaderAdditional
                    navigation={[
                        {name: 'Account settings', href: '/account/settings'},
                        {name: 'My products', href: '/account/products'},
                        {name: 'Order history', href: '/account/history'},
                    ]}
                />
            }>
                <div className='content narrow'>
                    <Outlet />
                </div>
            </HeaderAndFooter>
        </AuthRequired>
    )
}


export default AccountPage;