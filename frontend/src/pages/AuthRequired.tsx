import type { PropsWithChildren } from 'react';
import { Navigate, useLocation } from 'react-router';

import { useAuth } from '../contexts/AuthContext.tsx';


interface AuthRequiredProps {
    requireAdmin?: boolean;
}


export default function AuthRequired(props: PropsWithChildren<AuthRequiredProps>) {
    const { isAuthenticated, isAdmin, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return (<p>Checking authentication...</p>)
    }

    if (!isAuthenticated || (props.requireAdmin && !isAdmin)) {
        return <Navigate to='/signin' state={{ returnToUrl: location.pathname }} />;
    }

    return props.children;
}