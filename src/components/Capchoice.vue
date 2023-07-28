<template>
  <Sidebar />
  <div class="page-content">
    <h2 class="title">
       Select a Cap Size
    </h2>
    <div class="radio-container">
      <div v-for="ch in cap" :key="ch">
        <input class="form-check-input" :id="ch" :value="ch" type="radio" name="cap-size" />
        <label :for="ch" class="radio-label">
          {{ ch }} cap <i class="fas fa-chart-bar"></i>
        </label>
      </div>
    </div>
    <button @click="viewstocks" class="view-stocks-button">
      View Stocks <i class="fas fa-eye"></i>
    </button>
  </div>
</template>

<script lang="js">
import Sidebar from './Sidebar.vue';

export default {
  data() {
    return {
      cap: ['small', 'medium', 'large'],
    };
  },
  methods: {
    viewstocks() {
      var ele = document.getElementsByName('cap-size');
      for (let i = 0; i < ele.length; i++) {
        if (ele[i].checked) {
          this.$store.commit('setCap', ele[i].value);
          break;
        }
      }
      this.$router.push('/trending');
    },
  },
  components: { Sidebar },
};
</script>







<style scoped>
body{
  background: linear-gradient(to bottom, #e0f2ff, #b8d8f7);
}
.page-content {
  text-align: center;
  margin-top: 50px;
  padding: 20px;
  border-radius: 10px;
  
}
.title {
  font-size: 24px;
  margin-bottom: 20px;
  
}

.radio-container label {
  display: inline-block;
  background-color: #5b8db0; /* Light blue color */
  color: #fff;
  padding: 20px 37px;
  font-size: 20px;
  margin: 0 30px;
  cursor: pointer;
}

.radio-container input[type='radio']:checked + label {
  background-color: #0b2447; /* Dark blue color */
}

.view-stocks-button {
  margin-top: 40px;
  padding: 10px 20px;
  font-size: 20px;
  border: none;
  border-radius: 5px;
  background-color: #007bff; /* Blue color */
  color: #fff;
  cursor: pointer;
  transition: background-color 0.3s;
}

.view-stocks-button:hover {
  background-color: #4682b4; /* Slightly darker blue color on hover */
}

.radio-container {
  display: flex;
  justify-content: center;
  margin-top: 50px;
}

.radio-container input[type="radio"] {
  display: none;
}

.radio-container label {
  display: inline-block;
  background-color: #5b8db0;
  color: #fff;
  padding: 20px 37px;
  font-size: 20px;
  margin: 0 30px;
  cursor: pointer;
  border-radius: 5px;
}

.radio-container input[type="radio"]:checked + label {
  background-color: #0b2447;
}

.view-stocks-button {
  margin-top: 50px;
  padding: 15px 30px;
  font-size: 20px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: #fff;
  cursor: pointer;
  transition: background-color 0.3s;
}

.view-stocks-button:hover {
  background-color: #4682b4;
}

body {
  font-family: 'Roboto', sans-serif;
}
</style>
