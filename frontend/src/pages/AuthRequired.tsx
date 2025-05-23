import type { PropsWithChildren } from 'react';
import { Navigate, useLocation } from 'react-router';

import LoaderContainer from '../components/LoaderContainer.tsx';
import { useAuth } from '../contexts/AuthContext.tsx';


interface AuthRequiredProps {
    requireAdmin?: boolean;
}


export default function AuthRequired(props: PropsWithChildren<AuthRequiredProps>) {
    const { isAuthenticated, isAdmin, loading } = useAuth();
    const location = useLocation();

    return (
        <LoaderContainer loading={loading}>
            {(!isAuthenticated || (props.requireAdmin && !isAdmin)) ? (
                <Navigate to='/signin' state={{ returnToUrl: location.pathname }} />
            ) : (
                props.children
            )}
        </LoaderContainer>
    );
}