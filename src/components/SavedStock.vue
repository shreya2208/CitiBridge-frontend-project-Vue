<template>
    <div class="card">
      <div class="card-title">{{ quote.symbol }}</div>
      <div class="market-price">Current Market Price: ${{ quote.current_market_price }}</div>
      <div class="qty">Quantity: {{ quote.qty }}</div>
      <button class="remove-button" @click="removeStock">Remove</button>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      quote: {
        type: Object,
        required: true,
      },
    },
    methods: {
      removeStock() {
        // Emit an event to notify the parent component to remove this stock from the list
        this.$emit('remove', this.quote);
      },
    },
  };
  </script>
  
  <style scoped>
  /* Add any desired styles for the component here */
  .card {
    width: 90%;
    padding: 20px;
    border-radius: 10px;
    background-color: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    margin-bottom: 10px;
  }
  
  .card-title {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 10px;
  }
  
  .market-price {
    font-size: 14px;
    color: #888;
    margin-bottom: 5px;
  }
  
  .qty {
    font-size: 14px;
    color: #888;
    margin-bottom: 15px;
  }
  
  .remove-button {
    padding: 8px 16px;
    font-size: 16px;
    border: none;
    border-radius: 5px;
    background-color: #000000;
    color: #fff;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .remove-button:hover {
    background-color: #4682b4;
  }
  </style>
  