import React from 'react';

export default [
  {
    path: '/user',
    layout: false,
    routes: [
      { path: '/user', routes: [{ name: '登录', path: '/user/login', component: './user/Login' }] },
      { component: './404',path: "/404" },
    ],
  },
  {
    path: '/',
    component: '@/layout/index',
    menu: {
      flatMenu: true,
    },
    routes:[
      {
        path: "/",
        redirect:"/admin"
      },
      {
        path: '/admin',
        name: '管理页',
        icon: 'crown',
        component: './Admin',
        routes: [
          { path: '/admin/sub-page', name: '二级管理页', icon: 'smile', component: './Welcome' },
        ],
      },
      // {
      //   path: '/test1',
      //   name: '测试菜单1',
      //   component: './Iframe'
      // },
    ]
  },
  { component: './404',path: "/404" },
];
