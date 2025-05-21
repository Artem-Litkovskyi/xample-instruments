import type { PropsWithChildren } from 'react';
import { Navigate, useLocation } from 'react-router';

import { useAuth } from '../contexts/AuthContext.tsx';


export default function AuthRequired(props: PropsWithChildren) {
    const { isAuthenticated } = useAuth();
    const location = useLocation();

    if (!isAuthenticated) {
        return <Navigate to='/signin' state={{ returnToUrl: location.pathname }} />;
    }

    return props.children;
}