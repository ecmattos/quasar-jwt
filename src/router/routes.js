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
    path: '/forgot',
    name: 'forgot',
    component: () => import('pages/auth/password')
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
  },
  {
    path: '/user',

    // We point it to our component
    // where we defined our QLayout
    component: () => import('layouts/user'),

    // Now we define the sub-routes.
    // These are getting injected into
    // layout (from above) automatically
    // by using <router-view> placeholder
    // (need to specify it in layout)
    children: [
      {
        path: 'feed',
        component: () => import('pages/user-feed')
      },
      {
        path: 'profile',
        component: () => import('pages/user-profile')
      }
    ]
  }
]