import type { RouteRecordRaw } from 'vue-router'

export const routes: RouteRecordRaw[] = [
  {
    children: [
      {
        component: () => import('~/views/index'),
        meta: {},
        name: 'Index',
        path: '/',
      },
    ],
    component: () => import('~/layout/layout.vue'),
    name: 'Layout',
    path: '/',
    redirect: '/',
  },
  {
    component: () => import('~/views/notFound/notFound.vue'),
    name: 'NotFound',
    path: '/:pathMatch(.*)*',
  },
]
