<template>
  <div class="section-container">
    <div class="cards">
      <div class="card-deck">
        <div class="card mb-3 shadow card-theme">
          <div class="card-header card-header-theme">
            <h5>Daily Orders</h5>
          </div>
          <div class="card-body">
            <BarChart
              class="chart"
              :chart-data="barDataCollection"
              :options="options"
            />
          </div>
        </div>
        <div class="card mb-3 shadow card-theme">
          <div class="card-header card-header-theme">
            <h5>Orders by Customer</h5>
          </div>
          <div class="card-body">
            <PieChart
              class="chart"
              :chart-data="pieDataCollection"
              :options="options"
            />
          </div>
        </div>
        <div class="card mb-3 shadow card-theme">
          <div class="card-header card-header-theme">
            <h5>Orders by State</h5>
          </div>
          <div class="card-body">
            <PieChart
              class="chart"
              :chart-data="pieDataCollection"
              :options="options"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BarChart from '@/components/charts/BarChart.vue'
import PieChart from '@/components/charts/PieChart.vue'

export default {
  components: {
    BarChart,
    PieChart
  },
  data() {
    return {
      barDataCollection: null,
      pieDataCollection: null,
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
      this.barDataCollection = {
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
      this.pieDataCollection = {
        labels: ['XYZ Logics', 'Spacely Sprockets', 'Cogwell Cog'],
        datasets: [
          {
            label: 'Q3 Sales',
            data: [165, 259, 380],
            backgroundColor: ['#26547C', '#ff6b6b', '#ffd166'],
            borderColor: 'lightgreen'
          }
        ]
      }
    }
  }
}
</script>

<style scoped></style>
