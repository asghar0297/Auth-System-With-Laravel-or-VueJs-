import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const base_url = 'http://larticles.net/api/'

export default new Vuex.Store({
    state:{
        status:'',
        token:localStorage.getItem('token') || '',
        user:{},
        error:''
    },
    mutations:{
        auth_request(state){
            state.status = 'loading'
        },
        auth_success(state,token){
            state.status = 'success'
            state.token = token
        },
        set_user(state,user){
            state.user = user
        },
        handle_error(state,error){
            state.error = error
        },
        logout(state){
            state.status = ''
            state.token = ''
        }
    },
    actions:{
        login({commit},user){
            return new Promise((resolve,reject) => {
                commit('auth_request')
                fetch(base_url+'auth/login',{
                    method:'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(user)
                })
                .then(response => response.json())
                .then(data => {
                    console.log(JSON.stringify(data.data.user));
                    const token = 'Bearer '+ data.data.token
                    const user = data.data.user
                    localStorage.setItem('token',token)
                    commit('auth_success',token)
                    commit('set_user',user)
                    commit('handle_error','')
                    resolve(data)
                })
                .catch(error =>{
                    localStorage.removeItem('token')
                    reject(error)
                })
            })
        },
        logout({commit}){
            return new Promise((resolve,reject)=>{
                
                commit('logout')
                localStorage.removeItem('token')
                resolve()

            })


        },
        register({commit},user){
            alert('fire');
            return new Promise((resolve,reject) => {
                commit('auth_request')
                fetch(base_url+'auth/register',{
                    method:'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(user)
                })
                .then(response => response.json())
                .then(data => {
                    resolve(data)
                })
            })
        },
    },
    getters:{
        isLoggedIn : state => !!state.token,
        authStatus : state => state.status,
        getUser : state => state.user,
        getError : state => state.error,

    }
})
