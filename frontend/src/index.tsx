import React from 'react';
import ReactDOM from 'react-dom/client';
import {createBrowserRouter, Navigate, RouterProvider} from 'react-router-dom';

import Root from "./pages/Root";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import ProductsPage from "./pages/ProductsPage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import AccountPage from "./pages/AccountPage";
import AccountSettingsPage from "./pages/AccountSettingsPage";
import MyProductsPage from "./pages/MyProductsPage";
import OrderHistoryPage from "./pages/OrderHistoryPage";
import ProductPage from "./pages/ProductPage";

import './index.css';
import './assets/styles/Buttons.css';
import './assets/styles/Text.css';
import './assets/styles/Panels.css';
import './assets/styles/Forms.css';
import './assets/styles/Tables.css';


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
                        path: 'products',
                        element: <MyProductsPage />,
                    },
                    {
                        path: 'history',
                        element: <OrderHistoryPage />,
                    },
                ]
            },
            {
                path: 'product/:id',
                element: <ProductPage />,
            }
        ]
    }
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);