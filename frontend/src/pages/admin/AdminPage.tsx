import { Outlet } from 'react-router';

import HeaderAdditional from '../../components/HeaderAdditional.tsx';
import HeaderAndFooter from '../../components/HeaderAndFooter.tsx';
import AuthRequired from "../AuthRequired.tsx";


function AdminPage() {
    return (
        <AuthRequired requireAdmin>
            <HeaderAndFooter additionalHeader={
                <HeaderAdditional
                    navigation={[
                        {name: 'Manage home page', href: '/admin/home'},
                        {name: 'Manage products', href: '/admin/products'},
                    ]}
                />
            }>
                <Outlet />
            </HeaderAndFooter>
        </AuthRequired>
    )
}


export default AdminPage;