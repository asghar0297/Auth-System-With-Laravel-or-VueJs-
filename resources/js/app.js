require('./bootstrap')

import Vue from 'vue'
import VueRouter from 'vue-router'
import router from './router'
import App from './layouts/app'
import store from './store'

window.Vue = require('vue').default;


// Vue.component('example-component', require('./components/ExampleComponent.vue').default);
// Vue.component('navbar-component', require('./components/Navbar.vue').default);
// Vue.component('categories-component', require('./components/Categories.vue').default);


const app = new Vue({
    store,
    el: '#app',
    components:{App},
    router
});
