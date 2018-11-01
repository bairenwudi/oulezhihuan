import Main from '@/views/Main.vue';

// 不作为Main组件的子页面展示的页面单独写，如下
export const loginRouter = {
    path: '/login',
    name: 'login',
    meta: {
        title: 'Login - 登录'
    },
    component: resolve => { require(['@/views/login.vue'], resolve); }
};

export const page404 = {
    path: '/*',
    name: 'error-404',
    meta: {
        title: '404-页面不存在'
    },
    component: resolve => { require(['@/views/error-page/404.vue'], resolve); }
};

export const page403 = {
    path: '/403',
    meta: {
        title: '403-权限不足'
    },
    name: 'error-403',
    component: resolve => { require(['@//views/error-page/403.vue'], resolve); }
};

export const page500 = {
    path: '/500',
    meta: {
        title: '500-服务端错误'
    },
    name: 'error-500',
    component: resolve => { require(['@/views/error-page/500.vue'], resolve); }
};

export const locking = {
    path: '/locking',
    name: 'locking',
    component: resolve => { require(['@/views/main-components/lockscreen/components/locking-page.vue'], resolve); }
};

// 作为Main组件的子页面展示但是不在左侧菜单显示的路由写在otherRouter里
export const otherRouter = {
    path: '/',
    name: 'otherRouter',
    redirect: '/home',
    component: Main,
    children: [
        { path: 'home', title: {i18n: 'home'}, name: 'home_index', component: resolve => { require(['@/views/home/home.vue'], resolve); } },
        { path: 'ownspace', title: '个人中心', name: 'ownspace_index', component: resolve => { require(['@/views/own-space/own-space.vue'], resolve); } },
        { path: 'infoModel', title: '详情信息', name: 'infoModel', meta: { notCache: true }, component: resolve => { require(['@/views/order/info.vue'], resolve); } },
    ]
};

// 作为Main组件的子页面展示并且在左侧菜单显示的路由写在appRouter里
export const appRouter = [
    // {
    //     path: '/component',
    //     icon: 'social-buffer',
    //     name: 'component',
    //     title: '组件',
    //     component: Main,
    //     children: [
    //         {
    //             path: 'text-editor',
    //             icon: 'compose',
    //             name: 'text-editor',
    //             title: '富文本编辑器',
    //             component: resolve => { require(['@/views/my-components/text-editor/text-editor.vue'], resolve); }
    //         },
            
    //     ]
    // },
    // {
    //     path: '/table',
    //     icon: 'social-buffer',
    //     name: 'table',
    //     title: '表格',
    //     component: Main,
    //     children: [
    //         {
    //             path: 'tableModel',
    //             icon: 'compose',
    //             name: 'tableModel',
    //             title: '表格',
    //             component: resolve => { require(['@/views/table/table.vue'], resolve); }
    //         }
    //     ]
    // },
    // {
    //     path: '/form',
    //     icon: 'social-buffer',
    //     name: 'form',
    //     title: '表单',
    //     component: Main,
    //     children: [
    //         {
    //             path: 'formModel',
    //             icon: 'compose',
    //             name: 'formModel',
    //             title: '表单',
    //             component: resolve => { require(['@/views/form/form.vue'], resolve); }
    //         }
    //     ]
    // },

    // {
    //     path: '/home',
    //     icon: 'social-buffer',
    //     name: 'form',
    //     title: '首页',
    //     component: Main,
    //     children: [
    //         {
    //             path: 'homeModel',
    //             icon: 'compose',
    //             name: 'homeModel',
    //             title: '首页',
    //             component: resolve => { require(['@/views/home/home.vue'], resolve); }
    //         }
    //     ]
    // },
   
    {
        path: '/organizationalManagement',
        icon: 'social-buffer',
        name: 'organizationalManagement',
        title: '机构管理',
        component: Main,
        children: [
            {
                path: 'organizationalManagementModel',
                name: 'organizationalManagementModel',
                title: '机构管理',
                component: resolve => { require(['@/views/organizationalManagement/organizationalManagement.vue'], resolve); }
            },
            {
                path: 'baseInformationModel',
                name: 'baseInformationModel',
                title: '机构设置',
                component: resolve => { require(['@/views/organizationalManagement/baseInformation.vue'], resolve); }
            }
        ]
    },

    {
        path: '/systemManagement',
        icon: 'gear-b',
        name: 'systemManagement',
        title: '系统管理',
        component: Main,
        children: [
            {
                path: 'userManagementModel',
                name: 'userManagementModel',
                title: '用户管理',
                component: resolve => { require(['@/views/systemManagement/userManagement.vue'], resolve); }
            },
            {
                path: 'bannerManagementModel',
                name: 'bannerManagementModel',
                title: 'banner管理',
                component: resolve => { require(['@/views/systemManagement/bannerManagement.vue'], resolve); }
            },
            {
                path: 'hotCityManagementModel',
                name: 'hotCityManagementModel',
                title: '热门城市管理',
                component: resolve => { require(['@/views/systemManagement/hotCityManagement.vue'], resolve); }
            },
            {
                path: 'evaluationSettingModel',
                name: 'evaluationSettingModel',
                title: '评价设置',
                component: resolve => { require(['@/views/systemManagement/evaluationSetting.vue'], resolve); }
            },
            {
                path: 'supportingFacilitiesModel',
                name: 'supportingFacilitiesModel',
                title: '配套设施设置',
                component: resolve => { require(['@/views/systemManagement/supportingFacilities.vue'], resolve); }
            },
            {
                path: 'FeedbackManagementModel',
                name: 'FeedbackManagementModel',
                title: '意见反馈管理',
                component: resolve => { require(['@/views/systemManagement/FeedbackManagement.vue'], resolve); }
            }
        ]
    },
    {
        path: '/RoomtypeNums',
        icon: 'stats-bars',
        name: 'RoomtypeNums',
        title: '房型可预订数',
        component: Main,
        children: [
            {
                path: 'RoomtypeNumstModel',
                name: 'RoomtypeNumsModel',
                title: '房型可预订数',
                component: resolve => { require(['@/views/RoomtypeNums/RoomtypeNums.vue'], resolve); }
            }
        ]
    },

    {
        path: '/order',
        icon: 'drag',
        name: 'order',
        title: '订单管理',
        component: Main,
        children: [
            {
                path: 'appOrderModel',
                name: 'appOrderModel',
                title: 'app订单',
                component: resolve => { require(['@/views/order/appOrder.vue'], resolve); }
            },
            {
                path: 'batchReservationOrderModel',
                name: 'batchReservationOrderModel',
                title: '批量预定订单',
                component: resolve => { require(['@/views/order/batchReservationOrder.vue'], resolve); }
            },
            {
                path: 'refundListModel',
                name: 'refundListModel',
                title: '退款单',
                component: resolve => { require(['@/views/order/refundList.vue'], resolve); }
            },
            {
                path: 'checkoutListModel',
                name: 'checkoutListModel',
                title: '退房单',
                component: resolve => { require(['@/views/order/checkoutList.vue'], resolve); }
            }
            
        ]
    },
    {
        path: '/informationManagement',
        icon: 'chatboxes',
        name: 'informationManagement',
        title: '信息管理',
        component: Main,
        children: [
            {
                path: 'informationManagementModel',
                name: 'informationManagementModel',
                title: '信息管理',
                component: resolve => { require(['@/views/informationManagement/informationManagement.vue'], resolve); }
            }
        ]
    },
    {
        path: '/financialStatements',
        icon: 'social-yen-outline',
        name: 'financialStatements',
        title: '财务报表',
        component: Main,
        children: [
            {
                path: 'financialStatementsModel',
                name: 'financialStatementsModel',
                title: '财务报表',
                component: resolve => { require(['@/views/financialStatements/financialStatements.vue'], resolve); }
            }
        ]
    },
    {
        path: '/authorityManagement',
        icon: 'ios-people',
        name: 'authorityManagement',
        title: '权限管理',
        component: Main,
        children: [
            {
                path: 'authorityManagementModel',
                name: 'authorityManagementModel',
                title: '权限管理',
                component: resolve => { require(['@/views/authorityManagement/authorityManagement.vue'], resolve); }
            },
            {
                path: 'systemUserManagementModel',
                name: 'systemUserManagementModel',
                title: '系统用户管理',
                component: resolve => { require(['@/views/authorityManagement/systemUserManagement.vue'], resolve); }
            }
        ]
    }
];

// 所有上面定义的路由都要写在下面的routers里
export const routers = [
    loginRouter,
    otherRouter,
    locking,
    ...appRouter,
    page500,
    page403,
    page404
];
