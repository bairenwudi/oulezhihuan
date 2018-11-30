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

export const registerRouter = {
    path: '/register',
    name: 'register',
    meta: {
        title: 'Register - 注册'
    },
    component: resolve => { require(['@/views/register.vue'], resolve); }
};

export const forgetRouter = {
    path: '/forget',
    name: 'forget',
    meta: {
        title: 'Forget - 忘记密码'
    },
    component: resolve => { require(['@/views/forget.vue'], resolve); }
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
        { path: 'AppOrderinfoModel', title: 'App详情', name: 'AppOrderinfoModel', meta: { notCache: true }, component: resolve => { require(['@/views/order/AppOrderinfo.vue'], resolve); } },
        { path: 'RefundListinfoModel', title: '退款单详情', name: 'RefundListinfoModel', meta: { notCache: true }, component: resolve => { require(['@/views/order/RefundListinfo.vue'], resolve); } },
        { path: 'CheckoutListinfoModel', title: '退房单详情', name: 'CheckoutListinfoModel', meta: { notCache: true }, component: resolve => { require(['@/views/order/CheckoutListinfo.vue'], resolve); } },        
        {
            path: '/order/batchOrderDeal',
            name: 'batchOrderDeal',
            title: '处理后',
            component: resolve => { require(['@/views/order/batchOrderDeal.vue'], resolve); }
        },
        {
            path: '/order/applyDeal',
            name: 'applyDeal',
            title: '申请受理',
            component: resolve => { require(['@/views/order/applyDeal.vue'], resolve); }
        },
    ]
};

// 作为Main组件的子页面展示并且在左侧菜单显示的路由写在appRouter里
export const appRouter = [
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
                path: 'evaluationManagementModel',
                name: 'evaluationManagementModel',
                title: '评价管理',
                component: resolve => { require(['@/views/systemManagement/evaluationManagement.vue'], resolve); }
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
                title: '批量预定',
                component: resolve => { require(['@/views/order/batchReservationOrder.vue'], resolve); }
            },
            {
                path: 'batchAuditModel',
                name: 'batchAuditModel',
                title: '批量审核',
                component: resolve => { require(['@/views/order/batchAudit.vue'], resolve); }
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
                path: 'routerManagementModel',
                name: 'routerManagementModel',
                title: '路由管理',
                component: resolve => { require(['@/views/authorityManagement/rights.vue'], resolve); }
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
    registerRouter,
    forgetRouter,
    otherRouter,
    locking,
    ...appRouter,
    page500,
    page403,
    page404,
    // hotCity,
    // bannerMana,
    // facilities
];