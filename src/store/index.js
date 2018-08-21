import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export const store = new Vuex.Store({
    state:{
        login:false
    },
    getters:{
        login:state=>{
            return state.login;
        }
    },
    mutations:{
        checkLogin:(state,payload)=>{
            state.login = payload;
        },
        changeLogin:(state)=>{
            state.login= false
        }
    },
    actions:{
        checkLogin:({commit},payload)=>{
            commit('checkLogin',payload);
        },
        changeLogin:({commit})=>{
            commit('changeLogin');
        }
    },
    plugins: [createPersistedState({ storage: window.sessionStorage })]
})