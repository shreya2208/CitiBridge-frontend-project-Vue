<template>
 <div :id="symb"></div>
  </template>
  


  <script lang="js">


  import * as anychart from 'anychart';
  
  export default {
    props: {
data:{
    required: true,
    type : Object
},
symb:{
    required: true,
    type: String
}
    },
  
    mounted() {
      this.initializeChart();
    },
  
    methods: {
generateRandomId() {
  const timestamp = Date.now().toString(36);
  const randomChars = Math.random().toString(36).substr(2, 5);
  return timestamp + randomChars;
},
      initializeChart() {
        if (!this.data) return;
        let cdata = []
        for(const [key, value] of Object.entries(this.data)){
          
          let date = value['date'].split("-").reverse().join("-");
          cdata.push([date, value['open'], value['high'], value['low'], value['close'], value['volume']])
        }
 
        console.log("cdata", cdata)
        // set container id for the chart
let symb = this.symb
anychart.onDocumentReady(function () {

// create data table on loaded data
var dataTable = anychart.data.table();
dataTable.addData(cdata);

// map loaded data
var mapping = dataTable.mapAs({'value': 2});
var ohlcMapping = dataTable.mapAs({'open': 1, 'high': 2, 'low': 3, 'close':4});
var columnMapping = dataTable.mapAs({'value': 3});
  
// create stock chart
var chart = anychart.stock();

// create first plot on the chart with column series
var plot_1 = chart.plot(0);
plot_1.column(mapping).name('Trend');

// create second plot on the chart
var plot_2 = chart.plot(1);

// create ohlc series on the second plot
plot_2.ohlc(ohlcMapping).name('Price');

// create third plot
var plot_3 = chart.plot(2);

// create column series on the third plot
plot_3.column(columnMapping).name('Volume');
if(symb){
    chart.container(symb);
// initiate chart drawing
chart.draw();
console.log("chart drawing complete");
}

});

      },
    },
  };
  </script>
  
  <style scoped>
  /* Add any desired styles for your chart container */
  div{
      width: 100%;
      height: 550px;
      object-fit: cover;
      border-radius: 5px;
      margin-bottom: 10px;
  }
  </style>
  