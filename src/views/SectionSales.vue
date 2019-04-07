<template>
  <div class="section-container">
    <div class="cards">
      <div class="card mb-3 shadow card-theme">
        <div class="card-header card-header-theme">
          <h5>Daily Orders</h5>
        </div>
        <div class="card-body">
          <BarChart
            class="chart"
            :chart-data="dataCollection"
            :options="options"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BarChart from '@/components/charts/BarChart.vue'

export default {
  components: {
    BarChart
  },
  data() {
    return {
      dataCollection: null,
      options: {
        responsive: true
      }
    }
  },
  mounted() {
    this.fillData()
  },
  methods: {
    fillData() {
      this.dataCollection = {
        labels: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7'],
        datasets: [
          {
            label: 'Q3 Sales',
            backgroundColor: '#f87979',
            data: [65, 59, 80, 81, 56, 54, 30]
          },
          {
            label: 'Q4 Sales',
            backgroundColor: '#A5CC82',
            data: [25, 39, 60, 91, 36, 59, 80]
          }
        ]
      }
    }
  }
}
</script>

<style scoped></style>
