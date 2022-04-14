import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import Vueaxios from 'vue-axios'



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
                axios({
                    url :'auth/login',
                    method:'post',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    data: JSON.stringify(user)
                })
                .then(response => {


                    const token = 'Bearer '+ response.data.result.token
                    const user = response.data.result.user
                    localStorage.setItem('token',token)
                    axios.defaults.headers.common['Authorization'] = token
                    commit('auth_success',token)
                    commit('set_user',user)
                    commit('handle_error','')
                    resolve(response)
                })
                .catch(error =>{
                    localStorage.removeItem('token')
                    reject(error)
                })
            })
        },
        logout({commit}){
            return new Promise((resolve,reject)=>{
                axios({
                    url:'/auth/logout',
                    method:'POST'
                }).then(res => {

                    commit('logout')
                    localStorage.removeItem('token')
                    delete axios.defaults.headers.common['Authorization']
                    resolve()
                }).catch( err =>{
                    reject(err);
                })

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
