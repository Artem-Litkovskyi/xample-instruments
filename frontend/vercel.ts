import { routes, deploymentEnv, type VercelConfig } from '@vercel/config/v1';

export const config: VercelConfig = {
    rewrites: [
        routes.rewrite('/api/:path*', `${deploymentEnv('VITE_BACKEND_URL')}/api/:path*`),
        routes.rewrite('/media/:path*', `${deploymentEnv('VITE_BACKEND_URL')}/media/:path*`),
    ],
};