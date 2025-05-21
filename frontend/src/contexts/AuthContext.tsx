import { createContext, useContext, useState, useEffect, type PropsWithChildren } from 'react';
import Cookies from 'universal-cookie';

import ValidationError from '../errors/ValidationError.tsx';

const cookies = new Cookies();


interface AuthContextType {
    isAuthenticated: boolean;
    username: string;
    getSession: () => void;
    whoami: () => void;
    login: (username: string, password: string) => void;
    logout: () => void;
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
            })
            .catch((error) => {
                throw error;
            });
    }

    function whoami() {
        fetch('/api/whoami/', {
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
        })
            .then((res) => res.json())
            .then((data) => {
                console.log('You are logged in as: ' + data.username);
            })
            .catch((error) => {
                throw error;
            });
    }

    async function login(username: string, password: string) {
        const response = await fetch('/api/login/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': cookies.get('csrftoken'),
            },
            credentials: 'include',
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new ValidationError(data.detail);
        }

        setIsAuthenticated(true);
    }

    function logout() {
        fetch('/api/logout', {
            credentials: 'include',
        })
            .then(isResponseOk)
            .then((data) => {
                console.log(data);
                setIsAuthenticated(false);
            })
            .catch((error) => {
                throw error;
            });
    }

    function isResponseOk(response: Response) {
        if (!response.ok) {
            throw Error(response.statusText);
        }

        return response;
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, username, getSession, whoami, login, logout }}>
            {props.children}
        </AuthContext.Provider>
    );
};
