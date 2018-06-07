
export default [
  {
    path: '/login',
    name: 'login',
    component: () => import('pages/auth/login')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('pages/auth/register')
  },
  {
    path: '/',
    component: () => import('layouts/default'),
    meta: {auth: true},
    children: [
      { path: '', component: () => import('pages/index') },
      { path: '/account', name: 'account', component: () => import('pages/account') }
    ]
  },

  { // Always leave this as last one
    path: '*',
    component: () => import('pages/404')
  }
]
