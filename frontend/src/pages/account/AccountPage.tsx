import { Outlet } from 'react-router';

import HeaderAdditional from '../../components/header/HeaderAdditional.tsx';
import HeaderAndFooter from '../../components/header/HeaderAndFooter.tsx';
import AuthRequired from '../AuthRequired.tsx';


function AccountPage() {
    return (
        <AuthRequired>
            <HeaderAndFooter additionalHeader={
                <HeaderAdditional
                    navigation={[
                        {name: 'Account settings', href: '/account/settings'},
                        {name: 'My products', href: '/account/licenses'},
                        {name: 'Order history', href: '/account/orders'},
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