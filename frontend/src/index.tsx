import React from 'react';
import ReactDOM from 'react-dom/client';
import {createBrowserRouter, Navigate, RouterProvider} from 'react-router-dom';

import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import ProductsPage from "./pages/ProductsPage";
import SignInPage from "./pages/SignInPage";

import './index.css';
import './assets/styles/Buttons.css';
import './assets/styles/Text.css';
import './assets/styles/Panels.css';
import './assets/styles/Forms.css';


const router = createBrowserRouter([
    {
        path: '/',
        element: <HomePage />,
        errorElement: <NotFoundPage />,
    },
    {
        path: '/products',
        element: <Navigate to="/products/all" replace />
    },
    {
        path: '/products/:category',
        element: <ProductsPage />,
    },
    {
        path: '/signin',
        element: <SignInPage />,
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