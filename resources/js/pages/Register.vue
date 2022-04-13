<template>
    <form @submit.prevent="submit">
        <div class="container">
            <h1>Register</h1>
            <p>Please fill in this form to create an account.</p>
            <hr>

            <label for="name"><b>Name</b></label>
            <input type="text" class="form-control" placeholder="Enter Name" name="name" id="name" v-model="form.name" required>

            <label for="email"><b>Email</b></label>
            <input type="text" class="form-control" placeholder="Enter Email" name="email" v-model="form.email" required>

            <label for="psw"><b>Password</b></label>
            <input type="password" class="form-control" placeholder="Enter Password" name="psw" v-model="form.password" required>

            <label for="psw-repeat"><b>Repeat Password</b></label>
            <input type="password" class="form-control" placeholder="Repeat Password" name="psw-repeat" id="psw-repeat" v-model="form.password_confirmation" required>
            <hr>

            <p>By creating an account you agree to our <a href="#">Terms & Privacy</a>.</p>
            <button type="submit" class="btn btn-primary">Register</button>
        </div>

        <div class="container signin">
            <p>Already have an account? <router-link to="/login" >Sign in</router-link>.</p>

        </div>
    </form>
</template>

<script>

import {mapActions,mapGetters} from 'vuex'

export default{
    name:"register",
    data(){
        return{
            form:{
                name:'',
                email:'',
                password:'',
                password_confirmation:''
            },
            showError:false,
        }
    },
    computed:{
        ...mapGetters({errors:'getError'})
    },
    methods:{
        ...mapActions(["register"]),
        submit(){
            let data = {
                name:this.form.name,
                email:this.form.email,
                password:this.form.password,
                password_confirmation:this.form.password_confirmation
            }

            this.$store.dispatch('register',data)
            .then(() => this.$router.push('/category'))
            .catch( err =>{
		            this.showError = true;
		    })
        }
    }
}

</script>
