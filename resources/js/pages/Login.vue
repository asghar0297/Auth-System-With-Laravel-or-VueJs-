<template>
    <form method="post" @submit.prevent="submit">
        <h1>Login</h1>
        <div class="form-group">
            <label for="inputEmail">Email</label>
            <input type="email" class="form-control" id="inputEmail" placeholder="Email" v-model="form.email">
        </div>
        <div class="form-group">
            <label for="inputPassword">Password</label>
            <input type="password" class="form-control" id="inputPassword" placeholder="Password" v-model="form.password">
        </div>
        <div class="form-group">
            <label class="form-check-label"><input type="checkbox"> Remember me</label>
        </div>
        <button type="submit" class="btn btn-primary">Sign in</button>
    </form>
</template>

<script>
import { mapActions } from 'vuex'
export default{
    data(){
        return{
            form:{
                email:'',
                password:''
            }
        }
    },
    methods:{
         ...mapActions(["login"]),
        submit(){
            this.$store.dispatch('login',this.form)
            .then(() => this.$router.push('/category'))
            .catch(err => console.log(err))

        }
    }
}

</script>
