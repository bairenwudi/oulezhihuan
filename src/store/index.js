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
        avatorPath: 'https://img2.woyaogexing.com/2018/10/21/c51fe45206f24611b010f82645b0fd4a!400x400.jpeg'
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
