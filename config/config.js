import { userSettings, adminSettings } from './defaultSettings'; // https://umijs.org/config/

import slash from 'slash2';
import themePluginConfig from './themePluginConfig';
const { pwa } = userSettings; // preview.pro.ant.design only do not use in your production ;
// preview.pro.ant.design 专用环境变量，请不要在你的项目中使用它。

const { ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION } = process.env;
const isAntDesignProPreview = ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site';
const plugins = [
  [
    'umi-plugin-react',
    {
      antd: true,
      dva: {
        hmr: true,
      },
      locale: {
        // default false
        enable: true,
        // default zh-CN
        default: 'zh-CN',
        // default true, when it is true, will use `navigator.language` overwrite default
        baseNavigator: true,
      },
      dynamicImport: {
        loadingComponent: './components/PageLoading/index',
        webpackChunkName: true,
        level: 3,
      },
      pwa: pwa
        ? {
          workboxPluginMode: 'InjectManifest',
          workboxOptions: {
            importWorkboxFrom: 'local',
          },
        }
        : false, // default close dll, because issue https://github.com/ant-design/ant-design-pro/issues/4665
      // dll features https://webpack.js.org/plugins/dll-plugin/
      // dll: {
      //   include: ['dva', 'dva/router', 'dva/saga', 'dva/fetch'],
      //   exclude: ['@babel/runtime', 'netlify-lambda'],
      // },
    },
  ],
  [
    'umi-plugin-pro-block',
    {
      moveMock: false,
      moveService: false,
      modifyRequest: true,
      autoAddMenu: true,
    },
  ],
];

if (isAntDesignProPreview) {
  // 针对 preview.pro.ant.design 的 GA 统计代码
  plugins.push([
    'umi-plugin-ga',
    {
      code: 'UA-72788897-6',
    },
  ]);
  plugins.push(['umi-plugin-antd-theme', themePluginConfig]);
}

export default {
  history: 'hash', // 默认是 browser
  plugins,
  hash: true,
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/zh/guide/router.html
  routes: [
    {
      path: '/',
      component: '../layouts/BlankLayout',
      routes: [
        {
          path: '/user',
          component: '../layouts/UserLayout',
          routes: [
            {
              //默认重定向到登录页面
              path: '/user',
              redirect: '/user/login',
            },
            {
              //登录
              name: 'login',
              icon: 'smile',
              path: '/user/login',
              component: './user/login',
            },
            {
              //注册结果页面
              name: 'register-result',
              icon: 'smile',
              path: '/user/register-result',
              component: './user/register-result',
            },
            {
              //注册
              name: 'register',
              icon: 'smile',
              path: '/user/register',
              component: './user/register',
            },
            {
              component: '404',
            },
          ],
        },
        {
          path: '/',
          component: '../layouts/BasicLayout',
          Routes: ['src/pages/Authorized'],
          authority: ['admin', 'user'],
          routes: [
            /********************** 以下为客户端首页 ********************/
            {
              //重定向
              path: '/',
              redirect: '/home',
              authority: ['user'],
            },
            {
              //个人页
              name: 'account',
              icon: 'user',
              path: '/account',
              hideInMenu: 'true',
              routes: [
                // {
                //   //个人中心
                //   name: 'center',
                //   icon: 'smile',
                //   path: '/account/center',
                //   component: './account/center',
                // },
                {
                  //个人设置
                  name: 'settings',
                  icon: 'smile',
                  path: '/account/settings',
                  component: './account/settings',
                },
              ],
            },
            {
              //首页
              path: '/home',
              name: 'home',
              icon: 'home',
              component: './home',
              authority: ['user'],
            },
            {
              //招工&求职
              path: '/recruitAndApplyjob',
              name: 'recruitAndApplyjob',
              icon: 'fire',
              authority: ['user'],
              routes: [
                {
                  //招工信息
                  name: 'recruit',
                  icon: 'smile',
                  path: '/recruitAndApplyJob/recruit',
                  component: './recruitAndApplyjob/recruit',
                },
                {
                  //求职信息
                  name: 'applyjob',
                  icon: 'smile',
                  path: '/recruitAndApplyJob/applyjob',
                  component: './recruitAndApplyjob/applyjob',
                }
              ]
            },
            {
              //农业资讯
              path: '/agriculturalInformation',
              name: 'agriculturalInformation',
              icon: 'read',
              component: './agriculturalInformation',
              authority: ['user'],
              routes: [
                {
                  path: '/agriculturalInformation',
                  redirect: '/agriculturalInformation/articles',
                  authority: ['user'],
                },
                {
                  //文章
                  name: 'articles',
                  icon: 'smile',
                  path: '/agriculturalInformation/articles',
                  component: './agriculturalInformation/articles',
                  hideInMenu: 'true',
                },
              ]
            },
            {
              //滞销求购
              path: '/sell',
              name: 'sell',
              icon: 'thunderbolt',
              authority: ['user'],
              routes: [
                {
                  path: '/sell',
                  redirect: '/sell/list',
                  authority: ['user'],
                },
                {
                  //滞销求购产品列表
                  name: 'list',
                  icon: 'smile',
                  path: '/sell/list',
                  component: './sell',
                  hideInMenu: 'true',
                },
                {
                  //发布滞销求购产品
                  name: 'add',
                  icon: 'smile',
                  path: '/sell/add',
                  component: './sell/add',
                  hideInMenu: 'true',
                },
                {
                  //产品详情页面
                  name: 'detail',
                  icon: 'smile',
                  path: '/sell/detail',
                  component: './sell/detail',
                  hideInMenu: 'true',
                },
              ]
            },
            {
              //智慧问答
              path: '/forum',
              name: 'forum',
              icon: 'bulb',
              authority: ['user'],
              routes: [
                {
                  path: '/forum',
                  redirect: '/forum/list',
                },
                {
                  //问题列表
                  name: 'list',
                  icon: 'smile',
                  path: '/forum/list',
                  component: './forum',
                  hideInMenu: 'true',
                },
                {
                  //提问
                  name: 'add',
                  icon: 'smile',
                  path: '/forum/add',
                  component: './forum/add',
                  hideInMenu: 'true',
                },
                {
                  //问题详情
                  name: 'detail',
                  icon: 'smile',
                  path: '/forum/detail',
                  component: './forum/detail',
                  hideInMenu: 'true',
                },
              ]
            },
            /********************** 以下为后台管理系统 ********************/
            // {
            //   //看板
            //   path: '/dashboard',
            //   name: 'dashboard',
            //   icon: 'dashboard',
            //   authority: ['admin'],
            //   routes: [
            //     {
            //       //分析页
            //       name: 'analysis',
            //       icon: 'smile',
            //       path: '/dashboard/analysis',
            //       component: './dashboard/analysis',
            //       // hideInMenu: 'true',
            //     },
            //     {
            //       //监控页
            //       name: 'monitor',
            //       icon: 'smile',
            //       path: '/dashboard/monitor',
            //       component: './dashboard/monitor',
            //     },
            //     {
            //       //工作台
            //       name: 'workplace',
            //       icon: 'smile',
            //       path: '/dashboard/workplace',
            //       component: './dashboard/workplace',
            //     },
            //   ],
            // },
            // {
            //   //表单页
            //   path: '/form',
            //   icon: 'form',
            //   name: 'form',
            //   authority: ['admin'],
            //   // hideInMenu: 'true',
            //   routes: [
            //     {
            //       //基础表单
            //       name: 'basic-form',
            //       icon: 'smile',
            //       path: '/form/basic-form',
            //       component: './form/basic-form',
            //     },
            //     {
            //       //分步表单
            //       name: 'step-form',
            //       icon: 'smile',
            //       path: '/form/step-form',
            //       component: './form/step-form',
            //     },
            //     {
            //       //高级表单
            //       name: 'advanced-form',
            //       icon: 'smile',
            //       path: '/form/advanced-form',
            //       component: './form/advanced-form',
            //     },
            //   ],
            // },
            // {
            //   //列表页
            //   path: '/list',
            //   icon: 'table',
            //   name: 'list',
            //   authority: ['admin'],
            //   routes: [
            //     {
            //       //搜索列表
            //       path: '/list/search',
            //       name: 'search-list',
            //       component: './list/search',
            //       routes: [
            //         {
            //           //重定向到 搜索列表（文章）
            //           path: '/list/search',
            //           redirect: '/list/search/articles',
            //         },
            //         {
            //           //搜索列表（文章）
            //           name: 'articles',
            //           icon: 'smile',
            //           path: '/list/search/articles',
            //           component: './list/search/articles',
            //         },
            //         {
            //           //搜索列表（项目）
            //           name: 'projects',
            //           icon: 'smile',
            //           path: '/list/search/projects',
            //           component: './list/search/projects',
            //         },
            //         {
            //           //搜索列表（应用）
            //           name: 'applications',
            //           icon: 'smile',
            //           path: '/list/search/applications',
            //           component: './list/search/applications',
            //         },
            //       ],
            //     },
            //     {
            //       //查询表格
            //       name: 'table-list',
            //       icon: 'smile',
            //       path: '/list/table-list',
            //       component: './list/table-list',
            //     },
            //     {
            //       //标准列表
            //       name: 'basic-list',
            //       icon: 'smile',
            //       path: '/list/basic-list',
            //       component: './list/basic-list',
            //     },
            //     {
            //       //卡片列表
            //       name: 'card-list',
            //       icon: 'smile',
            //       path: '/list/card-list',
            //       component: './list/card-list',
            //     },
            //   ],
            // },
            // {
            //   //详情页
            //   path: '/profile',
            //   name: 'profile',
            //   icon: 'profile',
            //   authority: ['admin'],
            //   routes: [
            //     {
            //       //基础详情页
            //       name: 'basic',
            //       icon: 'smile',
            //       path: '/profile/basic',
            //       component: './profile/basic',
            //     },
            //     {
            //       //高级详情页
            //       name: 'advanced',
            //       icon: 'smile',
            //       path: '/profile/advanced',
            //       component: './profile/advanced',
            //     },
            //   ],
            // },
            {
              //用户管理
              path: '/adminUser',
              icon: 'team',
              name: 'adminUser',
              authority: ['admin'],
              routes: [
                {
                  //查询表格
                  name: 'userList',
                  icon: 'table',
                  path: '/adminUser/list',
                  component: './adminUser/list',
                },
              ],
            },
            {
              //招工求职管理
              path: '/adminApplyjobAndRecruit',
              icon: 'fire',
              name: 'adminApplyjobAndRecruit',
              authority: ['admin'],
              routes: [
                {
                  //查询求职表格
                  name: 'applyjobList',
                  icon: 'table',
                  path: '/adminApplyjobAndRecruit/adminApplyjob',
                  component: './adminApplyjobAndRecruit/adminApplyjob',
                },
                {
                  //查询招工表格
                  name: 'recruitList',
                  icon: 'table',
                  path: '/adminApplyjobAndRecruit/adminRecruit',
                  component: './adminApplyjobAndRecruit/adminRecruit',
                },
              ],
            },
            {
              //文章资讯管理
              path: '/adminArticle',
              icon: 'read',
              name: 'adminArticle',
              authority: ['admin'],
              routes: [
                {
                  //文章列表
                  name: 'articleList',
                  icon: 'table',
                  path: '/adminArticle/list',
                  component: './adminArticle/list',
                },
                {
                  //添加文章
                  name: 'articleAdd',
                  icon: 'plus-circle',
                  path: '/adminArticle/add',
                  component: './adminArticle/add',
                },
              ],
            },
            {
              //滞销求购管理
              path: '/adminSell',
              icon: 'thunderbolt',
              name: 'adminSell',
              authority: ['admin'],
              routes: [
                {
                  //查询表格
                  name: 'sellList',
                  icon: 'table',
                  path: '/adminSell/list',
                  component: './adminSell/list',
                },
              ],
            },
            {
              //智慧问答管理
              path: '/adminForm',
              icon: 'bulb',
              name: 'adminForm',
              authority: ['admin'],
              routes: [
                {
                  //查询表格
                  name: 'questionList',
                  icon: 'table',
                  path: '/adminForm/list',
                  component: './adminForm/list',
                },
              ],
            },
            // {
            //   //结果页
            //   name: 'result',
            //   icon: 'check-circle-o',
            //   path: '/result',
            //   routes: [
            //     {
            //       //成功页
            //       name: 'success',
            //       icon: 'smile',
            //       path: '/result/success',
            //       component: './result/success',
            //     },
            //     {
            //       //失败页
            //       name: 'fail',
            //       icon: 'smile',
            //       path: '/result/fail',
            //       component: './result/fail',
            //     },
            //   ],
            // },
            // {
            //   //异常页
            //   name: 'exception',
            //   icon: 'warning',
            //   path: '/exception',
            //   routes: [
            //     {
            //       //403
            //       name: '403',
            //       icon: 'smile',
            //       path: '/exception/403',
            //       component: './exception/403',
            //     },
            //     {
            //       //404
            //       name: '404',
            //       icon: 'smile',
            //       path: '/exception/404',
            //       component: './exception/404',
            //     },
            //     {
            //       //500
            //       name: '500',
            //       icon: 'smile',
            //       path: '/exception/500',
            //       component: './exception/500',
            //     },
            //   ],
            // },
            // {
            //   //图形编辑器
            //   name: 'editor',
            //   icon: 'highlight',
            //   path: '/editor',
            //   routes: [
            //     {
            //       //流程编辑器
            //       name: 'flow',
            //       icon: 'smile',
            //       path: '/editor/flow',
            //       component: './editor/flow',
            //     },
            //     {
            //       //脑图编辑器
            //       name: 'mind',
            //       icon: 'smile',
            //       path: '/editor/mind',
            //       component: './editor/mind',
            //     },
            //     {
            //       //拓扑编辑器
            //       name: 'koni',
            //       icon: 'smile',
            //       path: '/editor/koni',
            //       component: './editor/koni',
            //     },
            //   ],
            // },
            {
              component: './Welcome',
            },
          ],
        },
      ],
    },
  ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    // ...darkTheme,
  },
  define: {
    ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION:
      ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION || '', // preview.pro.ant.design only do not use in your production ; preview.pro.ant.design 专用环境变量，请不要在你的项目中使用它。
  },
  ignoreMomentLocale: true,
  lessLoaderOptions: {
    javascriptEnabled: true,
  },
  disableRedirectHoist: true,
  cssLoaderOptions: {
    modules: true,
    getLocalIdent: (context, _, localName) => {
      if (
        context.resourcePath.includes('node_modules') ||
        context.resourcePath.includes('ant.design.pro.less') ||
        context.resourcePath.includes('global.less')
      ) {
        return localName;
      }

      const match = context.resourcePath.match(/src(.*)/);

      if (match && match[1]) {
        const antdProPath = match[1].replace('.less', '');
        const arr = slash(antdProPath)
          .split('/')
          .map(a => a.replace(/([A-Z])/g, '-$1'))
          .map(a => a.toLowerCase());
        return `antd-pro${arr.join('-')}-${localName}`.replace(/--/g, '-');
      }

      return localName;
    },
  },
  manifest: {
    basePath: '/',
  }, // chainWebpack: webpackPlugin,
  // proxy: {
  //   '/server/api/': {
  //     target: 'https://preview.pro.ant.design/',
  //     changeOrigin: true,
  //     pathRewrite: { '^/server': '' },
  //   },
  // },
};
