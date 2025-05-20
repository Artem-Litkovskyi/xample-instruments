import { createContext, useContext, useState, useEffect, type PropsWithChildren } from "react";
import Cookies from "universal-cookie";

const cookies = new Cookies();


interface AuthContextType {
    isAuthenticated: boolean;
    getSession: () => void;
    whoami: () => void;
    login: (username: string, password: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }

    return context;
}

export default function AuthProvider(props: PropsWithChildren) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Initial session check
    useEffect(() => {
        fetch("/api/session/", {
            credentials: "same-origin",
        })
            .then((res) => res.json())
            .then((data) => {
                setIsAuthenticated(data.isAuthenticated);
            })
            .catch((err) => {
                console.error("Session check failed", err);
                setIsAuthenticated(false);
            });
    }, []);

    function getSession() {
        fetch("/api/session/", {
            credentials: "same-origin",
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setIsAuthenticated(data.isAuthenticated);
            })
            .catch((err) => {
                console.log("Get session failed", err);
                throw err;
            });
    }

    function whoami() {
        fetch("/api/whoami/", {
            headers: { "Content-Type": "application/json" },
            credentials: "same-origin",
        })
            .then((res) => res.json())
            .then((data) => {
                console.log("You are logged in as: " + data.username);
            })
            .catch((err) => {
                console.log("Who am I failed", err);
                throw err;
            });
    }

    function login(username: string, password: string) {
        fetch("/api/login/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": cookies.get("csrftoken"),
            },
            credentials: "same-origin",
            body: JSON.stringify({ username, password }),
        })
            .then(isResponseOk)
            .then((data) => {
                console.log(data);
                setIsAuthenticated(true);
            })
            .catch((err) => {
                console.log("Log in failed", err);
                throw err;
            });
    }

    function logout() {
        fetch("/api/logout", {
            credentials: "same-origin",
        })
            .then(isResponseOk)
            .then((data) => {
                console.log(data);
                setIsAuthenticated(false);
            })
            .catch((err) => {
                console.log("Log out failed", err);
                throw err;
            });
    }

    function isResponseOk(response: Response) {
        if (response.status >= 200 && response.status <= 299) {
            return response.json();
        } else {
            throw Error(response.statusText);
        }
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, getSession, whoami, login, logout }}>
            {props.children}
        </AuthContext.Provider>
    );
};
