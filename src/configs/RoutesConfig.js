import React from 'react'
import { AUTH_PREFIX_PATH, APP_PREFIX_PATH } from 'configs/AppConfig'

export const    publicRoutes = [
    {
        key: 'login',
        path: `${AUTH_PREFIX_PATH}/login`,
        component: React.lazy(() => import('views/auth-views/authentication/login')),
    },
    {
        key: 'register',
        path: `${AUTH_PREFIX_PATH}/register`,
        component: React.lazy(() => import('views/auth-views/authentication/register')),
    },
    {
        key: 'forgot-password',
        path: `${AUTH_PREFIX_PATH}/forgot-password`,
        component: React.lazy(() => import('views/auth-views/authentication/forgot-password')),
    }
]

export const protectedRoutes = [
    
    {
        key: 'dashboard.equityAndBalance',
        path: `${APP_PREFIX_PATH}/dashboards/equityAndBalance`,
        component: React.lazy(() => import('views/app-views/dashboards/accounts')),
    },
    {
        key: 'dashboard.credit',
        path: `${APP_PREFIX_PATH}/dashboards/credit`,
        component: React.lazy(() => import('views/app-views/dashboards/credits')),
    },
    {
        key: 'dashboard.credit',
        path: `${APP_PREFIX_PATH}/dashboards/deals`,
        component: React.lazy(() => import('views/app-views/dashboards/deals')),
    },
    {
        key: 'dashboard.position',
        path: `${APP_PREFIX_PATH}/dashboards/position`,
        component: React.lazy(() => import('views/app-views/dashboards/positions')),
    }

    
]