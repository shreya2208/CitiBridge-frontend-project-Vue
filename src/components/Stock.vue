<template>
  <div class="card-container">
    <div class="card">
      <stock-chart :symb="symbol.symbol" :data="chartData"></stock-chart>
      <div class="card-title">{{ symbol.longName }}</div>
      <div class="market-cap">Symbol: {{ symbol.symbol }}</div>
      <div class="market-cap">Market Cap Size: {{ marketCapSize }}</div>
      <div class="market-cap">Market Cap Value: {{ symbol.marketCap }}</div>
      <div class="market-cap">Regular Market Price: ${{ symbol.regularMarketPrice }}</div>
      <div class="stock-exchange">Stock Exchange: {{ symbol.exchange }}</div>
      <span v-if="save">
        <button @click="openModal"  :class="isSaved ? 'saved-button' : 'save-button'">
          {{ isSaved ? 'Saved' : 'Save' }}
        </button>
      </span>
      <span @click="deletethis" v-else>
        <button class="remove-button">Remove</button>
      </span>
   
    </div>
  </div>
  <div v-if="showModal" id="myModal" class="modal">
      <div class="modal-backdrop" @click="closeModal"></div>
      
      <div class="modal-content">
        <span class="close" @click="closeModal">&times;</span>
        <label for="quantity">Select Quantity: </label>
        <input v-model="quantity" id="quantity" name="quantity" type="number" min="1" step="1" />
        <button @click="post" class="add-button">Add</button>
       
      </div>
    </div>
    <!-- Modal -->
  <!-- <div id="myModal" v-if="showModal" class="modal">
    <div class="modal-content">
      <span class="close" @click="closeModal">&times;</span>
      <form id="quantityForm">
        <label for="quantity">Select Quantity: </label>
        <input type="number" v-model="quantity" id="quantity" name="quantity" min="1" step="1">
        <button type="button"  @click="post">Save</button>
      </form>
    </div>
  </div> -->

</template>

<script>
import StockChart from './StockChart.vue';
import axios from 'axios';

const maxRetryAttempts = 10;
function getRandomInt(min, max) {
  // Math.random() generates a random decimal between 0 (inclusive) and 1 (exclusive)
  // We multiply it by (max - min + 1) to cover the entire range, and then add the minimum value
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function makeRequestWithRetry(options, attempt = 1) {
  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 429 && attempt <= maxRetryAttempts) {
      const retryDelay = getRandomInt(1, 90);
      console.log(`Too Many Requests (429) - Retry attempt ${attempt}. Retrying after ${retryDelay}s...`);
      await delay(retryDelay*1000);
      return makeRequestWithRetry(options, attempt + 1);
    }
    throw error;
  }
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}


export default {
  data() {
    return {
      quantity: 0,
      VUE_APP_RAPIDAPI_KEY : '980dfe39a2msha7706debc2293f0p1bd058jsn3c84736f3a26',
      loading: false,
      stockData: {},
      showModal: false,
      isSaved: false,
      chartData: {},
    };
  },
  components: {
    StockChart,
  },
  props: {
    symbol: {
      type: Object,
      required: true,
    },
    save: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    marketCapSize() {
      return this.$store.getters.cap;
    },
  },
  mounted() {
    this.fetchStockData();
  },
  methods: {
    openModal() {
      console.log("open modal")
      this.showModal = true;
    },

    closeModal() {
      this.showModal = false;
      this.quantity = 1;
    },
    deletethis: async function() {
      console.log('inside delete');
      const sym = this.stockData.symbol;
      const username = this.$store.state.username;
      this.isSaved = false;
      const session_url = `/api/user/favourites?username=${username}&symbol=${sym}`;
      axios
        .delete(session_url)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    post: async function() {
      const sym = this.symbol.symbol;
      const username = this.$store.state.username;
      this.isSaved = true;
      console.log(username);
      const session_url = `/api/user/favourites?username=${username}`;
      let formData = new FormData();
      formData.append('symbol', sym);
      formData.append('current_market_price', this.symbol.regularMarketPrice);
      formData.append('qty', this.quantity)
      axios
        .post(session_url, formData)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
        this.closeModal();
    },

    fetchStockData: async function() {
      console.log('calling fetchStockData');
      const symbol = this.symbol;
      if (this.$store.state.saved.includes(symbol.symbol)) {
        this.isSaved = true;
      }
      console.log('Symbol >>', symbol.symbol);
      const q = symbol.symbol;
      const options = {
        method: 'GET',
        url: 'https://mboum-finance.p.rapidapi.com/hi/history',
        params: {
          symbol: q,
          interval: '1mo',
          diffandsplits: 'false',
        },
        headers: {
          'X-RapidAPI-Key': '2d2775a738msh47fd7ca016f2a9bp1f58bcjsn812adb87664f',
          'X-RapidAPI-Host': 'mboum-finance.p.rapidapi.com',
        },
      };
      // axios
      //   .request(options)
      //   .then((response) => {
      //     console.log(response.data);
      //     this.chartData = response.data;
      //   })
      //   .catch((error) => {
      //     console.log(error.message);
      //   });
     
      if(!localStorage.getItem(q)){
      await makeRequestWithRetry(options).then((response) => {
    
          this.chartData = response
          localStorage.setItem(q, JSON.stringify(this.chartData));
        })
        .catch((error) => {
          console.log(error.message);
        });
      }
      else{
        this.chartData = JSON.parse(localStorage.getItem(q));
      }
    },
    
  },
   getRandomInt(min, max) {
  // Math.random() generates a random decimal between 0 (inclusive) and 1 (exclusive)
  // We multiply it by (max - min + 1) to cover the entire range, and then add the minimum value
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
};
</script>

<style scoped>
/* Add any desired styles for the component here */
.card-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
}

.card {
  width: 90%;
  padding: 20px;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.card-title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
}

.market-cap {
  font-size: 14px;
  color: #888;
  margin-bottom: 5px;
}

.stock-exchange {
  font-size: 14px;
  color: #888;
  margin-bottom: 15px;
}

.modal-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  z-index: 9999;
}
.save-button,
.remove-button,
.saved-button {
  padding: 8px 16px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.save-button {
  background-color: #007bff;
  color: #fff;
}

.remove-button {
  background-color: #000000;
  color: #fff;
}

.saved-button {
  background-color: #4682b4;
  color: #fff;
}

.save-button:hover {
  background-color: #4682b4;
}
.modal {
  display: block;
      position: fixed;
      z-index: 1;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.6);
    }
    
    .modal-content {
      background-color: #fefefe;
      margin: 10% auto;
      padding: 20px;
      border: 1px solid #888;
      max-width: 400px; /* Adjust the maximum width as needed */
      width: 100%; /* Take the full width of the container */
      border-radius: 10px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
    
    .close {
      color: #aaa;
      float: right;
      font-size: 28px;
      font-weight: bold;
      cursor: pointer;
    }
    
    .close:hover {
      color: #000;
    }
    
    form {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    
    label {
      font-size: 18px;
      margin-bottom: 10px;
    }
    
    input {
      padding: 5px;
      font-size: 16px;
      border: 1px solid #ccc;
      border-radius: 5px;
      width: 50%;
      margin-bottom: 15px;
    }
    
    .add-button{
      padding: 8px 16px;
      font-size: 16px;
      border: none;
      border-radius: 5px;
      background-color: #007bff;
      color: #fff;
      cursor: pointer;
      transition: background-color 0.3s;
    }
    
    .add-button:hover {
      background-color: #4682B4;
    }
  
</style>
