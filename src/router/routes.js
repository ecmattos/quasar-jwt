
export default [
  {
    path: '/login',
    name: 'login',
    component: () => import('pages/auth/Login')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('pages/auth/Register')
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
