import Vue from 'vue';
import iView from 'iview';
import { router } from './router/index';
import hasPermission from '@/libs/hasPermission.js';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import store from './store';
import App from './app.vue';
import '@/locale';
import 'iview/dist/styles/iview.css';
import '@/styles/iconfont.css';
import _ from 'lodash';
import VueI18n from 'vue-i18n';
import axios from 'axios';
import util from '@/libs/util';
import $ from 'jquery';
import VueQuillEditor from 'vue-quill-editor';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';

Vue.config.productionTip = false;
Vue.prototype._ = _;

Vue.use(VueI18n);
Vue.use(iView);
Vue.use(ElementUI);
Vue.use(VueQuillEditor);
Vue.use(hasPermission);

new Vue({
    el: '#app',
    router: router,
    store: store,
    render: h => h(App),
    data: {
        currentPageName: ''
    },
    mounted () {
        setTimeout(() => {
            let currentPathName = this.$route.path;
            if (
                currentPathName === '/login' ||
                currentPathName === '/register' ||
                currentPathName === '/forget'
            ) {
                return false;
            } else {
                console.log('我操')
                // 调用方法，动态生成路由
                util.initRouter(this);
            }
        }, 100);
    }
});

// POST传参序列化
axios.interceptors.request.use(
    config => {
        if (config.method === 'get') {
            let querystring = require('querystring');
            config.data = querystring.encode(config.data);
        }
        if (config.method === 'post') {
            let querystring = require('querystring');
            config.data = querystring.encode(config.data);
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);
