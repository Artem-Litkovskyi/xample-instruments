import { createContext, useContext, useState, useEffect, type PropsWithChildren } from 'react';
import Cookies from 'universal-cookie';

import ValidationError from '../errors/ValidationError.tsx';

const cookies = new Cookies();


interface AuthContextType {
    isAuthenticated: boolean;
    username: string;
    email: string;
    getSession: () => void;
    login: (email: string, password: string) => void;
    logout: () => void;
    signup: (username: string, email: string, password: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }

    return context;
}

export default function AuthProvider(props: PropsWithChildren) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        getSession();
    }, []);

    function getSession() {
        fetch('/api/session/', {
            credentials: 'include',
        })
            .then((res) => res.json())
            .then((data) => {
                setIsAuthenticated(data.isAuthenticated);
                setUsername(data.username);
                setEmail(data.email);
            })
            .catch((error) => {
                throw error;
            });
    }

    async function login(email: string, password: string) {
        const response = await fetch('/api/login/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': cookies.get('csrftoken'),
            },
            credentials: 'include',
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new ValidationError(response.statusText, data.detail);
        }

        setIsAuthenticated(true);
        setUsername(data.username);
        setEmail(data.email);
    }

    async function logout() {
        const response = await fetch('/api/logout/', {
            method: 'POST',
            headers: {
                'X-CSRFToken': cookies.get('csrftoken'),
            },
            credentials: 'include',
        });

        const data = await response.json();

        if (!response.ok) {
            throw new ValidationError(response.statusText, data.detail);
        }

        setIsAuthenticated(false);
        setUsername('');
        setEmail('');
    }

    async function signup(username: string, email: string, password: string) {
        const response = await fetch('/api/signup/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': cookies.get('csrftoken'),
            },
            credentials: 'include',
            body: JSON.stringify({ username, email, password }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new ValidationError(response.statusText, data.detail);
        }

        setIsAuthenticated(false);
        setUsername('');
        setEmail('');
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, username, email, getSession, login, logout, signup }}>
            {props.children}
        </AuthContext.Provider>
    );
};
