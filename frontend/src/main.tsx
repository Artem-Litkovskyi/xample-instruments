import { StrictMode } from 'react'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router';
import { createRoot } from 'react-dom/client'

import Root from './pages/Root';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';

import ProductsPage from './pages/ProductsPage';
import ProductPage from './pages/ProductPage';
import BuyPage from './pages/BuyPage.tsx';

import AuthProvider from './contexts/AuthContext.tsx';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';

import AccountPage from './pages/AccountPage';
import AccountSettingsPage from './pages/AccountSettingsPage';
import MyLicensesPage from './pages/MyLicensesPage.tsx';
import MyOrdersPage from './pages/MyOrdersPage.tsx';

import AdminPage from './pages/admin/AdminPage.tsx';
import ManageHomePage from './pages/admin/ManageHomePage.tsx';
import ManageProductsPage from './pages/admin/ManageProductsPage.tsx';

import './index.css';
import './assets/styles/basic/Buttons.css';
import './assets/styles/basic/Text.css';
import './assets/styles/basic/Panels.css';
import './assets/styles/basic/Forms.css';
import './assets/styles/basic/Tables.css';


const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        errorElement: <NotFoundPage />,
        children: [
            {
                index: true,
                element: <Navigate to='home' replace />,
            },
            {
                path: 'home',
                element: <HomePage />,
            },
            {
                path: 'products',
                element: <Navigate to='all' replace />,
            },
            {
                path: 'products/:category',
                element: <ProductsPage />,
            },
            {
                path: 'product/:id',
                element: <ProductPage />,
            },
            {
                path: 'buy/:id',
                element: <BuyPage />,
            },
            {
                path: 'signin',
                element: <SignInPage />,
            },
            {
                path: 'signup',
                element: <SignUpPage />,
            },
            {
                path: 'account',
                element: <AccountPage />,
                children: [
                    {
                        index: true,
                        element: <Navigate to='settings' replace />,
                    },
                    {
                        path: 'settings',
                        element: <AccountSettingsPage />,
                    },
                    {
                        path: 'licenses',
                        element: <MyLicensesPage />,
                    },
                    {
                        path: 'orders',
                        element: <MyOrdersPage />,
                    },
                ]
            },
            {
                path: 'admin',
                element: <AdminPage />,
                children: [
                    {
                        index: true,
                        element: <Navigate to='home' replace />,
                    },
                    {
                        path: 'home',
                        element: <ManageHomePage />,
                    },
                    {
                        path: 'products',
                        element: <ManageProductsPage />,
                    },
                ]
            },
        ]
    }
]);


createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <AuthProvider>
            <RouterProvider router={router} />
        </AuthProvider>
    </StrictMode>,
)
