

<template>
  <Sidebar/>
<div class="page-content">
    <h1 style="margin-bottom: 90px; font-size: 50px; line-height: 50px; font-weight: 500;">Select a cap size</h1>
    <div class="radio-container">
      <div v-for="ch in cap">
      <input class="form-check-input" :id="ch" :value="ch" type="radio" name="cap-size">
      <label class="" :for="ch">{{ ch }} cap</label>
      </div>
    </div>
    <button @click="viewstocks" class="view-stocks-button">View Stocks</button>
  </div>



</template>

<script lang="js">
import Sidebar from './Sidebar.vue'
 export default {
 data(){
    return { cap : ['small', 'medium', 'large'] } 
 },
 methods : {
  viewstocks : function(){
    var ele = document.getElementsByName('cap-size');
    for (let i = 0; i < ele.length; i++) {
     if (ele[i].checked){
        this.$store.commit('setCap', ele[i].value);
        break;
     }
    }
    this.$router.push('/trending')
  }
 },
 components: { Sidebar}
 
 }
</script>
<style scoped>

.page-content {
      text-align: center;
      margin-top: 100px;
      padding: 20px;
      border-radius: 10px;
    }
    
    .page-content h1 {
      font-size: 36px;
      margin-bottom: 20px;
    }
    
    .radio-container {
      display: flex;
      justify-content: center;
      margin-top: 40px;
      border-radius: 50%;
    }
    
    .radio-container input[type="radio"] {
      display: none;
    }
    
    .radio-container label {
      display: inline-block;
      background-color: #5B8DB0;
      color: #fff;
      padding: 30px 50px;
      font-size: 23px;
      margin: 0 30px;
      border-radius: 50%;
      cursor: pointer;
    }
    
    .radio-container input[type="radio"]:checked + label {
      background-color: #0B2447;
      color: #fff;
    }
    
    .view-stocks-button {
      margin-top: 100px;
      padding: 15px 30px;
      font-size: 23px;
      border: none;
      border-radius: 5px;
      background-color: #007bff;
      color: #fff;
      cursor: pointer;
      transition: background-color 0.3s;
    }
    
    .view-stocks-button:hover {
      background-color: #4682B4;
    }
    body{
   
   /* background-image: url("src\assets\bgsvg.svg"), url("src\assets\bgsvgleft.svg") !important; */
   font-family: 'Roboto', sans-serif !important;
   /* background-position: bottom right, bottom left !important;
   background-repeat: no-repeat !important;
   background-size: 370px !important; */
}
</style>