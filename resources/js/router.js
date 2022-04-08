import Vue from  'vue'
import Router from 'vue-router'
import Home from './pages/Home.vue'
import Login from './pages/Login.vue'
import Register from './pages/Register.vue'
import Category from './components/Categories.vue'


Vue.use(Router)

const router = new Router({
    mode:'history',
    routes:[

             {
                path:'',
                name:'home',
                component:Home
             },
             {
                path:'/login',
                name:'login',
                component:Login
             },
             {
                path:'/register',
                name:'register',
                component:Register
             },
             {
                path:'/category',
                name:'category',
                component:Category
             }

            ]
})


export default router;
