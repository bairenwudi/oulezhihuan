import { otherRouter } from '@/router/router';
import { router } from '@/router/index';
import Util from '@/libs/util';
import Cookies from 'js-cookie';
import Vue from 'vue';

const app = {
    state: {
        cachePage: [],

        lang: '',

        isFullScreen: false,

        openedSubmenuArr: [], // 要展开的菜单数组

        menuTheme: 'dark', // 主题

        themeColor: '',

        pageOpenedList: [{
            title: '首页',
            path: '',
            name: 'home_index'
        }],

        currentPageName: '',

        currentPath: [ // 面包屑数组
            {
                title: '首页',
                path: '',
                name: 'home_index'
            }
        ],

        routers: [
            otherRouter
        ],

        messageCount: 0,

        tagsList: [],

        menuList: [],

        dontCache: []
    },
    mutations: {
        setTagsList (state, list) {
            state.tagsList.push(...list);
        },

        // 动态添加主界面路由，需要缓存
        updateAppRouter (state, routes) {
            state.routers.push(...routes);
            router.addRoutes(routes);
        },

        // 动态添加全局路由，不需要缓存
        updateDefaultRouter (state, routes) {
            router.addRoutes(routes);
        },
        
        // 删除标签
        removeTag (state, name) {
            state.pageOpenedList.map((item, index) => {
                if (item.name === name) {
                    state.pageOpenedList.splice(index, 1);
                }
            });
        },

        // 已打开页面缓存
        pageOpenedList (state, get) {
            let openedPage = state.pageOpenedList[get.index];
            if (get.argu) {
                openedPage.argu = get.argu;
            }
            if (get.query) {
                openedPage.query = get.query;
            }
            state.pageOpenedList.splice(get.index, 1, openedPage);
            localStorage.pageOpenedList = JSON.stringify(state.pageOpenedList);
        },

        // 关闭所有标签
        clearAllTags (state) {
            state.pageOpenedList.splice(1);
            state.cachePage.length = 0;
            localStorage.pageOpenedList = JSON.stringify(state.pageOpenedList);
        },

        // 关闭此页面外标签
        clearOtherTags (state, vm) {
            let currentName = vm.$route.name;
            let currentIndex = 0;
            state.pageOpenedList.forEach((item, index) => {
                if (item.name === currentName) {
                    currentIndex = index;
                }
            });
            if (currentIndex === 0) {
                state.pageOpenedList.splice(1);
            } else {
                state.pageOpenedList.splice(currentIndex + 1);
                state.pageOpenedList.splice(1, currentIndex - 1);
            }
            let newCachepage = state.cachePage.filter(item => {
                return item === currentName;
            });
            state.cachePage = newCachepage;
            localStorage.pageOpenedList = JSON.stringify(state.pageOpenedList);
        },

        // 设置打开默认页面
        setOpenedList (state) {
            state.pageOpenedList = localStorage.pageOpenedList ? JSON.parse(localStorage.pageOpenedList) : [otherRouter.children[0]];
        },

        // 设置当前路径
        setCurrentPath (state, pathArr) {
            state.currentPath = pathArr;
        },

        // 设置当前页面名
        setCurrentPageName (state, name) {
            state.currentPageName = name;
        },

        // 关闭页面
        closePage (state, name) {
            state.cachePage.forEach((item, index) => {
                if (item === name) {
                    state.cachePage.splice(index, 1);
                }
            });
        },

        addOpenSubmenu (state, name) {
            let hasThisName = false;
            let isEmpty = false;
            if (name.length === 0) {
                isEmpty = true;
            }
            if (state.openedSubmenuArr.indexOf(name) > -1) {
                hasThisName = true;
            }
            if (!hasThisName && !isEmpty) {
                state.openedSubmenuArr.push(name);
            }
        },

        increateTag (state, tagObj) {
            if (!Util.oneOf(tagObj.name, state.dontCache)) {
                state.cachePage.push(tagObj.name);
                localStorage.cachePage = JSON.stringify(state.cachePage);
            }
            state.pageOpenedList.push(tagObj);
            localStorage.pageOpenedList = JSON.stringify(state.pageOpenedList);
        },

        updateMenulist (state, routes) {
            state.menuList = routes;
        },

        changeMenuTheme (state, theme) {
            state.menuTheme = theme;
        },

        changeMainTheme (state, mainTheme) {
            state.themeColor = mainTheme;
        },
        
        initCachepage (state) {
            if (localStorage.cachePage) {
                state.cachePage = JSON.parse(localStorage.cachePage);
            }
        },

        setAvator (state, path) {
            localStorage.avatorImgPath = path;
        },

        switchLang (state, lang) {
            state.lang = lang;
            Vue.config.lang = lang;
        },

        clearOpenedSubmenu (state) {
            state.openedSubmenuArr.length = 0;
        },

        setMessageCount (state, count) {
            state.messageCount = count;
        }
    }
};

export default app;
