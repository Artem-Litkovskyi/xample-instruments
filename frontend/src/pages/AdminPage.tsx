import { Outlet } from 'react-router';

import HeaderAdditional from '../components/HeaderAdditional';
import HeaderAndFooter from './HeaderAndFooter';
import AuthRequired from "./AuthRequired.tsx";


function AdminPage() {
    return (
        <AuthRequired requireAdmin>
            <HeaderAndFooter additionalHeader={
                <HeaderAdditional
                    navigation={[
                        {name: 'Manage products', href: '/admin/products'},
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


export default AdminPage;