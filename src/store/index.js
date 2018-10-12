import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export const store = new Vuex.Store({
    state:{
        login:false,
        name:""
    },
    getters:{
        login:state=>{
            return state.login;
        },
        name:state=>{
            return state.name;
        }
    },
    mutations:{
        checkLogin:(state,payload)=>{
            state.login = payload;
        },
        changeLogin:(state)=>{
            state.login= false
        },
        saveName:(state,payload)=>{
            state.name = payload;
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