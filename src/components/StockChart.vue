<template>
  <div :id="chartContainerId" class="chart-container"></div>
</template>

<script>
import * as anychart from 'anychart';

export default {
  props: {
    data: {
      required: true,
      type: Object,
    },
    symb: {
      type: String,
      default: null,
    },
  },

  data() {
    return {
      chartContainerId: this.symb || this.generateRandomId(),
    };
  },

  watch: {
    data: {
      immediate: true,
      handler(newData) {
        if (newData && newData.items) {
          this.initializeChart();
        }
      },
    },
  },

  methods: {
    generateRandomId() {
      const timestamp = Date.now().toString(36);
      const randomChars = Math.random().toString(36).substr(2, 5);
      return `chart-${timestamp}-${randomChars}`;
    },

    initializeChart() {
      const cdata = Object.entries(this.data.items).map(([key, value]) => {
        const date = value['date'].split(' ')[0].split('-').reverse().join('-');
        return [date, value['open'], value['high'], value['low'], value['close'], value['volume']];
      });

      anychart.onDocumentReady(() => {
        const dataTable = anychart.data.table();
        dataTable.addData(cdata);

        const mapping = dataTable.mapAs({ value: 2 });
        const ohlcMapping = dataTable.mapAs({ open: 1, high: 2, low: 3, close: 4 });
        const columnMapping = dataTable.mapAs({ value: 3 });

        const chart = anychart.stock();
        const plot_1 = chart.plot(0);
        plot_1.column(mapping).name('Trend');

        const plot_2 = chart.plot(1);
        plot_2.ohlc(ohlcMapping).name('Price');

        const plot_3 = chart.plot(2);
        plot_3.column(columnMapping).name('Volume');

        chart.container(this.chartContainerId);
        chart.draw();
        console.log('Chart drawing complete');
      });
    },
  },
};
</script>

<style scoped>
/* Add any desired styles for your chart container */
.chart-container {
  width: 100%;
  height: 550px;
  object-fit: cover;
  border-radius: 5px;
  margin-bottom: 10px;
}
</style>
