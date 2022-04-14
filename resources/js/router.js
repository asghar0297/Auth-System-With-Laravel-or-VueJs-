import Vue from  'vue'
import Router from 'vue-router'
import Home from './pages/Home.vue'
import Login from './pages/Login.vue'
import Register from './pages/Register.vue'
import Category from './components/Categories.vue'
import { record } from 'laravel-mix/src/HotReloading'
import store from './store'


Vue.use(Router)

const router = new Router({
    mode:'history',
    routes:[

             {
                path:'',
                name:'home',
                component:Home,
                meta:{requireAuth: true}
             },
             {
                path:'/login',
                name:'login',
                component:Login,
                meta:{guest: true}
             },
             {
                path:'/register',
                name:'register',
                component:Register,
                meta:{guest: true}

             },
             {
                path:'/category',
                name:'category',
                component:Category,
                meta:{requireAuth: true}

             }

            ]
})


router.beforeEach((to,from,next) => {
    if(to.matched.some((record) => record.meta.requireAuth)){
        if(store.getters.isLoggedIn){
            next();
            return;
        }
        next('/login')
    }else{
        next();
    }

})


export default router;
