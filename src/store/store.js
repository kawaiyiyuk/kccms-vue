/**
 * Author: 洛奇
 * Create Time :2019-05-07 15:15
 * Description
 */
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        productId: localStorage.getItem("productId") || '',
        user_id:  JSON.parse(localStorage.getItem('key'))  || '',
        isLogin: false,
        user: JSON.parse(localStorage.getItem('key'))  || '',
    },
    getters: {
        getStorage: function (state) {
            if (!state.user) {
                state.user = JSON.parse(localStorage.getItem('key'));
                state.isLogin = localStorage.getItem('isLogin')

            }
            return state.user
        },
        getStorageUserId (state) {
            if(!state.user_id) {
                state.user_id = JSON.parse(localStorage.getItem('key'));
            }
            return state.user_id
        }
    },
    mutations: {
        getProductId(state, id) {
            localStorage.setItem('productId', id);
            state.productId = id
        },
        changeLogin(state) {
            state.isLogin = true
        },
        $_setLogin(state, value) {
            state.isLogin = value;
            localStorage.setItem('isLogin', value)
        },
        $_setStorage(state, value) {
            state.user = value;
            state.user_id = value;
            localStorage.setItem('key', JSON.stringify(value))
        },
        $_removeStorage(state) {
            state.user = null
            localStorage.removeItem('key')
        }

    }
})
