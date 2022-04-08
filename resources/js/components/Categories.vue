<template>
    <div>
        <h1>Categories</h1>
       <table class="table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Category</th>
                    <th>Type</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="category in categories" v-bind:key="category.id">
                    <td>{{ category.id }}</td>
                    <td>{{ category.category }}</td>
                    <td>{{ category.type }}</td>
                    <td><button type="button" @click="deleteCategory(category.id)" >Delete</button></td>
                </tr>
            </tbody>
        </table>
        <nav aria-label="Page navigation example">
        <ul class="pagination">
            <li v-bind:class="[{ disabled : !pagination.prev_page_url }]" class="page-item"><a class="page-link" href="#" @click="fetchCategories(pagination.prev_page_url)">Previous</a></li>
            <li class="page-item disabled"><a class="page-link text-dark" href="#">Page {{ pagination.current_page}} of {{ pagination.last_page}}</a></li>
            <li v-bind:class="[{ disabled: !pagination.next_page_url }]" class="page-item"><a class="page-link" href="#" @click="fetchCategories(pagination.next_page_url)">Next</a></li>
        </ul>
        </nav>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                categories:[],
                category:{
                    id:'',
                    category:'',
                    type:''
                },
                id:'',
                pagination:{}
            }
        },
        created(){
            this.fetchCategories();
        },
        mounted() {
            console.log('Component mounted.')
        },
        methods:{
            fetchCategories(url){
                let vm = this;
                url = url || '/api/category'
                fetch(url)
                .then( res => res.json())
                .then(res => {
                    this.categories = res.data.data;
                    vm.makePagination(res.data);


                })
                .catch( err => console.log(err));
            },
            makePagination(data){
                let pagination = {
                    current_page:data.current_page,
                    last_page:data.last_page,
                    next_page_url:data.next_page_url,
                    prev_page_url:data.prev_page_url,
                }

                this.pagination = pagination;
                console.log("this.pagination"+JSON.stringify(this.pagination));

            },
            deleteCategory(id){
                if(confirm("Are You Sure Want to Remove")){
                    fetch(`api/category/${id}`,{
                        method:'delete'
                    })
                    .then(res => res.json())
                    .then(data => {
                        alert('Category Removed');
                        this.fetchCategories();
                    })
                    .catch(err => console.log(err))
                }
            }
        },
    }
</script>
