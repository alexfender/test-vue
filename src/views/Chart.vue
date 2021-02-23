<template>

  <div>
	<h1>Продажи</h1>

  <canvas id="myChart"></canvas>

  </div>
</template>

<script>
  import { getChart } from '@/api/server';
  import Chart from 'chart.js';
  export default {
		data() {
      return {
				labels: [],
				data: []
      }    
    },
    created() {

      console.log('created');

      this.getChart().then((responce) => {
				this.labels = responce.labels;
        this.data = responce.data;

        const ctx = document.getElementById('myChart').getContext('2d');
        const chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: this.labels,
                datasets: [{
                    label: 'Продажи за все время',
                    backgroundColor: 'rgb(110, 187, 255)',
                    borderColor: 'rgb(73, 169, 253)',
                    data: this.data
                }]
            },

            options: {}
        });
        
			}); 
    },
    methods: {
      getChart: async() => {
        let result = await getChart();
        return result;
      }
    }

  }
</script>
<style>


</style>