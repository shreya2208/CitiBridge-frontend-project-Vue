<template>
  <Sidebar />
  <h2 style="text-align: center; margin-top: 2%;">Top 5 Best Performing Stocks </h2>

<div class="page-content">
  <div class="row align-items-stretch">
    <div class="col-md-4" v-for="symb in bestPerformingStocks" :key="symb">
      <!-- Display best performing stocks -->
      <Stock :symbol="symb" :save="true" />
    </div>
  </div>
</div>

<h2 style="text-align: center; margin-top: 2%;">Top 5 Worst Performing Stocks</h2>

<div class="page-content">
  <div class="row align-items-stretch">
    <div class="col-md-4" v-for="symb in worstPerformingStocks" :key="symb">
      <!-- Display worst performing stocks -->
      <Stock :symbol="symb" :save="true" />
    </div>
  </div>
</div>

</template>
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
<script lang="js">

import Stock from './Stock.vue';
import Sidebar from './Sidebar.vue';
import axios from 'axios';

const maxRetryAttempts = 5;
const initialRetryDelay = 1000; // 1 second (adjust as needed)
const maxRetryDelay = 16000; // 16 seconds (adjust as needed)

async function makeRequestWithRetry(options, attempt = 1) {
  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 429 && attempt <= maxRetryAttempts) {
      const retryDelay = Math.min(initialRetryDelay * 2 ** (attempt - 1), maxRetryDelay);
      console.log(`Too Many Requests (429) - Retry attempt ${attempt}. Retrying after ${retryDelay} ms...`);
      await delay(retryDelay);
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
      selectedStocks: [],
      bestPerformingStocks: [],
      worstPerformingStocks: [],
      smallCapStocks: [],
      midCapStocks: [],
      largeCapStocks: [],
    };
  },
  mounted() {
    this.fetchStockData();
  },
  methods: {
    marketCapCategory(marketCap) {
      if (marketCap < 2000000000.0) {
        return 'small';
      } else if (marketCap < 10000000000.0) {
        return 'medium';
      } else {
        return 'large';
      }
    },
    async fetchStockData() {
      const options = {
        method: 'GET',
        url: 'https://mboum-finance.p.rapidapi.com/tr/trending',
        headers: {
          'X-RapidAPI-Key': '2d2775a738msh47fd7ca016f2a9bp1f58bcjsn812adb87664f',
          'X-RapidAPI-Host': 'mboum-finance.p.rapidapi.com',
        },
      };

      try {
       
        // const data2 =await (makeRequestWithRetry(options))[0].quotes.slice(0, 100).join(',');
const data2 = await makeRequestWithRetry(options)
console.log(data2[0].quotes)
let quotes = data2[0].quotes.slice(0, 100).join(',');
        const options2 = {
          method: 'GET',
          url: 'https://mboum-finance.p.rapidapi.com/qu/quote',
          params: {
            symbol: quotes,
          },
          headers: {
            'X-RapidAPI-Key': '2d2775a738msh47fd7ca016f2a9bp1f58bcjsn812adb87664f',
            'X-RapidAPI-Host': 'mboum-finance.p.rapidapi.com',
          },
        };

        
        const data =await makeRequestWithRetry(options2)
        console.log(data);
        // Check if data is valid and iterable
        if (data && Array.isArray(data)) {
          for (const q of data) {
            const marketCap = q.marketCap;
            const regularMarketPreviousClose = parseFloat(q.regularMarketPreviousClose);
            const regularMarketPrice = parseFloat(q.regularMarketPrice);
            const performance = ((regularMarketPrice - regularMarketPreviousClose) / regularMarketPreviousClose) * 100;
            q.performance = performance;
            const marketCapCategory = this.marketCapCategory(marketCap);
            q.marketCapCategory = marketCapCategory;
            
            switch (marketCapCategory) {
              case 'small':
                this.smallCapStocks.push(q);
                break;
              case 'medium':
                this.midCapStocks.push(q);
                break;
              case 'large':
                this.largeCapStocks.push(q);
                break;
              default:
                console.log(marketCapCategory);
            }
          }

          // Cache the data in local storage
          localStorage.setItem('stockData', JSON.stringify(data));

          const selectedCap = localStorage.getItem('cap');
          switch (selectedCap) {
            case 'small':
              this.smallCapStocks.sort((a, b) => b.performance - a.performance);
              this.bestPerformingStocks = this.smallCapStocks.slice(0, 5);
              this.worstPerformingStocks = this.smallCapStocks.slice(this.smallCapStocks.length - 5);
              break;
            case 'medium':
              this.midCapStocks.sort((a, b) => b.performance - a.performance);
              this.bestPerformingStocks = this.midCapStocks.slice(0, 5);
              this.worstPerformingStocks = this.midCapStocks.slice(this.midCapStocks.length - 5);
             
              break;
            case 'large':
            this.largeCapStocks.sort((a, b) => b.performance - a.performance);
              this.bestPerformingStocks = this.largeCapStocks.slice(0, 5);
              this.worstPerformingStocks = this.largeCapStocks.slice(this.largeCapStocks.length - 5);
             
              break;
            default:
              break;
          }

          console.log('Selected stocks', this.selectedStocks);
        } else {
          console.error('Invalid data format');
        }
      } catch (error) {
        console.error(error);
        // Handle error if necessary
      }
    },
  },
  components: { Stock, Sidebar },
};
</script>
