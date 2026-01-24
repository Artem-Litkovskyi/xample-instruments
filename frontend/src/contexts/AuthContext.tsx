import { createContext, useContext, useState, useEffect, type PropsWithChildren } from 'react';
import Cookies from 'universal-cookie';

import { makeRequest } from '../services/BaseService.ts';


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

const cookies = new Cookies();

export default function AuthProvider(props: PropsWithChildren) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        makeRequest('/api/session/', 'GET')
            .then((data) => {
                if (data.csrfToken) {
                    cookies.set('csrftoken', data.csrfToken, {
                        path: '/',
                        sameSite: 'lax'
                    });
                    console.log('CSRF Token synchronized via Session');
                }

                setIsAuthenticated(data.isAuthenticated);
                setIsAdmin(data.isAuthenticated ? data.isAdmin : false);
                setUsername(data.isAuthenticated ? data.username : '');
                setEmail(data.isAuthenticated ? data.email : '');
            })
            .catch((err) => console.error('Session check failed: ', err))
            .finally(() => setLoading(false));
    }, []);

    async function login(email: string, password: string) {
        const data = await makeRequest('/api/login/', 'POST', { email, password });

        setIsAuthenticated(data.isAuthenticated);
        setIsAdmin(data.isAdmin);
        setUsername(data.username);
        setEmail(data.email);
    }

    async function logout() {
        await makeRequest('/api/logout/', 'POST');

        setIsAuthenticated(false);
        setIsAdmin(false);
        setUsername('');
        setEmail('');
    }

    async function signup(username: string, email: string, password: string) {
        await makeRequest('/api/signup/', 'POST', { username, email, password });
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
