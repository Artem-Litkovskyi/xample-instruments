import { createContext, useContext, useState, useEffect, type PropsWithChildren } from 'react';

import { make_request } from '../services/BaseService.ts';


interface AuthContextType {
    isAuthenticated: boolean;
    isAdmin: boolean;
    username: string;
    email: string;
    loading: boolean;
    login: (email: string, password: string) => void;
    logout: () => void;
    signup: (username: string, email: string, password: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default function AuthProvider(props: PropsWithChildren) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        make_request('/api/session/', 'GET')
            .then((data) => {
                setIsAuthenticated(data.isAuthenticated);
                setIsAdmin(data.isAuthenticated ? data.isAdmin : false);
                setUsername(data.isAuthenticated ? data.username : '');
                setEmail(data.isAuthenticated ? data.email : '');
            })
            .finally(() => setLoading(false));
    }, []);

    async function login(email: string, password: string) {
        const data = await make_request('/api/login/', 'POST', { email, password });

        setIsAuthenticated(data.isAuthenticated);
        setIsAdmin(data.isAdmin);
        setUsername(data.username);
        setEmail(data.email);
    }

    async function logout() {
        await make_request('/api/logout/', 'POST');

        setIsAuthenticated(false);
        setIsAdmin(false);
        setUsername('');
        setEmail('');
    }

    async function signup(username: string, email: string, password: string) {
        await make_request('/api/signup/', 'POST', { username, email, password });
        await logout();
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, isAdmin, username, email, loading, login, logout, signup }}>
            {props.children}
        </AuthContext.Provider>
    );
};


export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }

    return context;
}
