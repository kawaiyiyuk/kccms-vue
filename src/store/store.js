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
        productId:localStorage.getItem("productId") || '',
    },
    mutations: {
        getProductId(state,id) {
            localStorage.setItem('productId', id);
            state.productId = id
        }
    }
})
