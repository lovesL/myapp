import React from 'react';
import { PageLoading } from '@ant-design/pro-layout';
import { history } from 'umi';
import RightContent from '@/components/RightContent';
import Iframe from '@/pages/Iframe';
import { currentUser as queryCurrentUser } from './services/ant-design-pro/api';

const isDev = process.env.NODE_ENV === 'development';
const loginPath = '/user/login';

/** 获取用户信息比较慢的时候会展示一个 loading */

export const initialStateConfig = {
  loading: <PageLoading />,
};

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */

export async function getInitialState() {
  const fetchUserInfo = async () => {
    try {
      const msg = await queryCurrentUser();
      return msg.data;
    } catch (error) {
      history.push(loginPath);
    }

    return undefined;
  }; // 如果是登录页面，不执行

  if (history.location.pathname !== loginPath) {
    const currentUser = await fetchUserInfo();
    return {
      fetchUserInfo,
      currentUser,
      settings: {},
    };
  }

  return {
    fetchUserInfo,
    settings: {},
  };
} // ProLayout 支持的api https://procomponents.ant.design/components/layout

// export const qiankun = Promise.resolve({
//   apps:[
//     {
//       name: 'app1', // 唯一 id
//       entry: '//localhost:8001', // html entry
//       microAppProps: { className: 'app1Container' },
//     },
//     {
//       name: 'app2', // 唯一 id
//       entry: '//192.168.123.106:8002', // html entry
//       container: '#app2Container',
//       microAppProps: {  className: 'app2Container' },
//     },
//   ],
//   routes: [
//     {
//       name:"app1",
//       icon: <SmileOutlined />,
//       path: '/app1',
//       microApp: 'app1',
//     },
//     {
//       name:"app2",
//       icon: <SmileOutlined />,
//       path: '/app2',
//       microApp: 'app2',
//     },
//   ],
// });


export const layout = ({ initialState }) => {
  return {
    rightContentRender: () => <RightContent />,
    disableContentMargin: false,
    menu: {
      locale: false,
      request: async (params, defaultMenuData) => {
        const menu=[
          {
            path: '/test2',
            name: '测试菜单2',
            component: Iframe
          }
        ]
        const menus= defaultMenuData.map(res=>{
          if(res.path === "/"){
            return res.routes.concat(menu)
          }
          return res
        });
        console.log(menus.flat());
        return menus.flat()
      },
    },
    onPageChange: () => {
      const { location } = history; // 如果没有登录，重定向到 login
      if (!initialState?.currentUser && location.pathname !== loginPath) {
        history.push(loginPath);
      }
    },
    menuDataRender: menuData => menuData,
    menuHeaderRender: undefined,
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    ...initialState?.settings,
  };
};
