import Vue from 'vue';
import Vuex from 'vuex';

// 一些主要的状态
import app from './modules/app';
import user from './modules/user';

// 自己定义的状态
import oberserverUser from './oberserver/user';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        //
    },
    mutations: {
        //
    },
    actions: {

    },
    modules: {
        app,
        user,
        oberserverUser,
    }
});

export default store;
