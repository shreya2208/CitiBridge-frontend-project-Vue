<template>
  <nav>
  <div class="navbar">
    <div class="left">
      <a href="#" @click="favourites">Favourites</a>
    </div>
    <div class="right">
      <a href="#" @click="selectCap" >Select Cap</a>
      <a href="#" @click="logout">Logout</a>
    </div>
  </div>
</nav>

   
</template>
<script>
export default {

methods: {
    logout(){
        this.$store.commit('deleteToken')
        this.$store.commit('deleteCap')
        this.$router.push('/login')
    },
    selectCap(){
       this.$router.push('/capchoice')
    },
    trending(){
        this.$router.push('/')
    },
    favourites(){
      this.$router.push('/favourites')
    }

 
}}</script>

<style scoped>
body {
      margin: 0;
      padding: 0;
      /* background: linear-gradient(to bottom, #fff, #e6f2ff); */
    }
    
    .navbar {
      background-color: #007bff;
      color: #fff;
      display: flex;
      justify-content: space-between;
      padding: 18px;
    }
    
    .navbar a {
      color: #fff;
      text-decoration: none;
      margin: 0 15px;
      font-size: 18px;
    }
    
</style>