<script lang="js">
import axios from 'axios'
import Stock from './Stock.vue';
import Sidebar from './Sidebar.vue';


export default{
    data() {
        return {
            savedStocks: [],
     }
    },
    mounted() {
        this.fetchSavedStocks();
    },
    methods : {
        marketCapCategory(marketCap){
       
        if(marketCap < 2000000000.00){
return "small"
        }
        if(marketCap < 10000000000.00){
          return "medium"
        }
        return "large"

      
  
},
        arrayToString : function(array){
let s = ''
for(let i = 0; i < array.length; i++){
    s+=array[i]
    if(i<array.length-1){
        s+=','
    }
}
return s
        },
fetchSavedStocks(){
//fetch symbols from backend
let username = localStorage.getItem('username')
let session_url = "/api/user/favourites?username="+username

axios.get(session_url).then((response) =>{
console.log(new Array(...response.data));
let parameters = this.arrayToString((new Array(...response.data)).map((obj)=> obj.symbol));

console.log(parameters)
const options = {
  method: 'GET',
  url: '/stocks/qu/quote',
  params: {
    symbol: parameters
  },
  headers: {
    'X-RapidAPI-Key': '2d2775a738msh47fd7ca016f2a9bp1f58bcjsn812adb87664f',
    'X-RapidAPI-Host': 'mboum-finance.p.rapidapi.com'
  }
};

axios.request(options).then((res)=>{
const response = res.data
console.log(response)
for(let stock of response){
    this.savedStocks.push(stock)
}
}).catch((err)=>{console.log(err)});

}).catch((error) =>{ console.log(error) })
//fetch data from mboum


}
},
components: { Stock, Sidebar }
}

</script>
<style scoped>
  body {
     
      margin: 0;
      padding: 0;
      background: linear-gradient(to bottom, #fff, #e6f2ff);
    }
    .page-content {
      padding: 20px;
    }
    
</style>
<template>
    <Sidebar/>
    <h1  style="text-align: center; margin-top: 2%;">Your Saved Stocks</h1> 
    <div class="page-content">
   <div class="row align-items-stretch">
  <div class="col-md-4" v-for="symb in savedStocks" :key="symb">
    <Stock :symbol="symb" />
  </div>
</div></div>



</template>