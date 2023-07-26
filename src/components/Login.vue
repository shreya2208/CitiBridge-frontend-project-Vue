
<template>
   <div class="navbar">
    <div class="left">
      <a href="#">Market Cap Based Trade Recommendation</a>
    </div>
  </div>
  
  <div class="page-content">
    <h1>Login</h1>
    <div class="form-container">
    <form  @submit.prevent="onSubmit" >
      <input type="text" id="username" v-model="form.username" placeholder="Enter username" required>
      <br>
      <input type="password" v-model="form.password" id="password" placeholder="Enter password" required>
      <br>
      <button class="submit-button">Submit</button></form>
    </div>
  </div>

 
</template>
<script>

import axios from 'axios'

  export default {
    components: {
  },
    data() {
      
      return {
        form: {
          username: null,
          password: null,
        },
      }
    },
    methods: {
    
        async onSubmit(event) {
        let session_url = "/api/login"
        this.form.username = event.target.elements.username.value;
        this.form.password = event.target.elements.password.value;
        if(this.form.username && this.form.password){
        axios.post(session_url, {
        username: this.form.username,
        password: this.form.password
        },{
          auth: {
            username: this.form.username,
            password: this.form.password
          }
        }).then((response)=> {
        if (response.status==201){
        console.log("token=", response.data.token)
        this.$store.commit('setToken', response.data.token)
        this.$store.commit('setUsername', this.form.username)
        this.$store.commit('setSavedSymbols')
        this.$router.push('/capchoice') 
        }
        else{
        //console.log(response.status);
        }
        }).catch((error) => {
        console.log(error) 
        });
        }
        else{
        console.log("Got no username and no password");
        }
        },  

    }
  }
</script>

  <style scoped>
  body {
    font-family: 'Roboto', sans-serif !important;
    margin: 0;
    padding: 0;
    background: linear-gradient(to bottom, #fff, #e6f2ff);
  }
  
  .navbar {
    background-color: #007bff;
    color: #fff;
    display: flex;
    justify-content: space-between;
    padding: 20px;
  }
  
  .navbar a {
    color: #fff;
    text-decoration: none;
    margin: 0 10px;
    font-size: 23px;
  }
  
  .page-content {
    text-align: center;
    margin-top: 100px;
    padding: 20px;
    border-radius: 10px;
    background-color: #fff;
  }
  
  .page-content h1 {
    font-size: 40px;
    font-weight: 550;
    line-height: 40px;
    margin-bottom: 30px;
  }
  
  .form-container {
    margin-top: 30px;
  }
  
  .form-container input[type="text"],
  .form-container input[type="password"] {
    width: 400px;
    padding: 10px 20px;
    margin-bottom: 20px;
    font-size: 20px;
  }
  
  .submit-button {
    margin-top : 10px;
    padding: 13px 25px;
    font-size: 20px;
    border: none;
    border-radius: 5px;
    background-color: #007bff;
    color: #fff;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .submit-button:hover {
    background-color: #4682B4;
  }
</style>