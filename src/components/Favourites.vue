<script lang="js">
import axios from 'axios';
import SavedStock from './SavedStock.vue';
import Sidebar from './Sidebar.vue';

export default {
  data() {
    return {
      savedStocks: [],
    };
  },
  mounted() {
    this.fetchSavedStocks();
  },
  methods: {
    removeStock(stock) {
      // Find the index of the stock in the array
      const index = this.savedStocks.findIndex((s) => s.symbol === stock.symbol);

      if (index !== -1) {
        // Remove the stock from the array
        this.savedStocks.splice(index, 1);

        // Make the API call to remove the stock from the backend
        const username = localStorage.getItem('username');
        const session_url = `/api/user/favourites?username=${username}&symbol=${stock.symbol}`;

        axios.delete(session_url)
          .then((response) => {
            console.log(response.data);
          })
          .catch((error) => {
            console.error(error);
            // Handle the error, e.g., show a user-friendly message
          });
      }
    },
    marketCapCategory(marketCap) {
      if (marketCap < 2000000000.00) {
        return "small";
      } else if (marketCap < 10000000000.00) {
        return "medium";
      } else {
        return "large";
      }
    },
    async fetchSavedStocks() {
      try {
        const username = localStorage.getItem('username');
        const session_url = "/api/user/favourites?username=" + username;
        const response = await axios.get(session_url);
        console.log(response.data);
        this.savedStocks = response.data;
      } catch (error) {
        console.error(error);
        // Handle the error, e.g., show a user-friendly message
      }
    },
  },
  components: { SavedStock, Sidebar },
};
</script>

<style scoped>
/* Add any desired styles for the component here */
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
  <Sidebar />
  <h2 style="text-align: center; margin-top: 2%;">Your Saved Stocks</h2>
  <div class="page-content">
    <div class="row align-items-stretch">
      <div class="col-md-4" v-for="symb in savedStocks" :key="symb">

        <SavedStock @remove="removeStock" :key="symb.symbol" :quote="symb" />
      </div>
    </div>
  </div>
</template>
