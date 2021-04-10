<template>
  <div id="app">
    <div v-if="!isAuthenticated">
      <input v-model="username" placeholder="Username">
      <input v-model="password" placeholder="Password">
      <button @click="login">login</button>
    </div>
    <div v-else>
      {{userdata}}
      <button @click="logout">log out</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'App',
  components: {

  },
  data(){
    return{
      username:"",
      password:"",
      data:"",
      csrfToken:"",
      isAuthenticated:false,
      userdata:{},
    }
  },
  mounted(){
    axios({
      method: "get",
      url:this.$api+"/getsession",
      withCredentials: true
      })
      .then(response=>{
        if (response.data.login == true) {
          this.isAuthenticated = true;
          this.getUserData()
        } else {
          this.isAuthenticated = false;
          this.csrf();
          //console.log("no session")
        }
      })
      .catch((error)=>{
          console.log(error)
      })
  },
  methods:{
    csrf(){
      axios({
      method: "get",
      url:this.$api+"/getcsrf",
      withCredentials: true
      })
      .then(response=>{
          //console.log(response)
          this.csrfToken=response.headers["x-csrftoken"]
          //console.log(this.csrfToken)
      })
      .catch((error)=>{
          console.log(error)
      })
    },
    login(){
      axios({
      method: "post",
      url:this.$api+"/login",
      withCredentials: true,
      headers: {
        'Accept': 'application/json, text/javascript, */*; q=0.01',
        "Content-Type": "application/json",
        "x-csrfToken": this.csrfToken
      },
      data:{username: this.username, password: this.password}
      }).then(response=>{
          if (response.data.login == true) {
            this.isAuthenticated = true;
            this.getUserData()
          }
          console.log(response.data)
      })
      .catch((error)=>{
          console.log(error)
      })
    },
    getUserData(){
      axios({
      method: "get",
      url:this.$api+"/data",
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        "x-csrfToken": this.csrfToken
      },
      })
      .then(response=>{
          this.userdata=response.data
      })
      .catch((error)=>{
          console.log(error)
      })
    },
    logout(){
      axios({
      method: "post",
      url:this.$api+"/logout",
      withCredentials: true,
      })
      .then(()=>{
          this.isAuthenticated=false
      })
      .catch((error)=>{
          console.log(error)
      })
    },
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
