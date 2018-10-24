import Vue from 'vue';
import iView from 'iview';
import { router } from './router/index';
import { appRouter } from './router/router';
import store from './store';
import App from './app.vue';
import '@/locale';
import 'iview/dist/styles/iview.css';
import _ from 'lodash'
import VueI18n from 'vue-i18n';
import axios from 'axios'
import util from '@/libs/util';

Vue.config.productionTip = false;
Vue.prototype._ = _;

Vue.use(VueI18n);
Vue.use(iView);

new Vue({
    el: '#app',
    router: router,
    store: store,
    render: h => h(App),
    data: {
        currentPageName: ''
    },
    mounted () {
        this.currentPageName = this.$route.name;
        // 显示打开的页面的列表
        this.$store.commit('setOpenedList');
        this.$store.commit('initCachepage');
        // 权限菜单过滤相关
        this.$store.commit('updateMenulist');
        // iview-admin检查更新
        // util.checkUpdate(this);
    },
    created () {
        let tagsList = [];
        appRouter.map((item) => {
            if (item.children.length <= 1) {
                tagsList.push(item.children[0]);
            } else {
                tagsList.push(...item.children);
            }
        });
        this.$store.commit('setTagsList', tagsList);
    }
});

//POST传参序列化
axios.interceptors.request.use(
    config => {
        if (config.method === "get") {
        var querystring = require("querystring");
        config.data = querystring.encode(config.data);
        }
        if (config.method === "post") {
        var querystring = require("querystring");
        config.data = querystring.encode(config.data);
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);
