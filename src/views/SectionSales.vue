<template>
  <div class="section-container">
    <div class="row-fluid cards">
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
    <div class="row-fluid cards">
      <div class="card shadow card-theme card-bottom">
        <div class="card-header card-header-theme">
          <h5>Monthly Sales by Product</h5>
        </div>
        <div class="card-body">
          <LineChart
            class="chart"
            :chart-data="lineDataCollection"
            :options="lineOptions"
            :styles="lineStyles"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import moment from 'moment'
import BarChart from '@/components/charts/BarChart.vue'
import PieChart from '@/components/charts/PieChart.vue'
import LineChart from '@/components/charts/LineChart.vue'

export default {
  components: {
    BarChart,
    PieChart,
    LineChart
  },
  data() {
    return {
      barDataCollection: null,
      pieDataCollection: null,
      lineDataCollection: null,
      lineStyles: {
        height: '90%',
        width: '100%'
      },
      lineOptions: {
        responsive: true,
        maintainAspectRatio: false
      },
      options: {
        responsive: true
      }
    }
  },
  computed: {
    ...mapState(['orders'])
  },
  mounted() {
    this.$store.dispatch('getOrders', { page: 1, perPage: 10 }).then(() => {
      this.setBarChartData()
    })
  },
  methods: {
    setBarChartData() {
      const formattedOrders = this.orders.reduce((r, e) => {
        r.push([moment(e.placed).format('YY-MM-DD'), e.total])
        return r
      }, [])

      const p = []

      const chartData = formattedOrders.reduce((r, e) => {
        const label = e[0]
        if (!p[label]) {
          p[label] = e
          r.push(p[label])
        } else {
          p[label][1] += e[1]
        }
        return r
      }, [])

      this.barDataCollection = {
        labels: chartData.map(l => l[0]).reverse(),
        datasets: [
          {
            data: chartData.map(d => d[1]),
            label: 'Sales',
            backgroundColor: '#f87979'
          }
        ]
      }
    },
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
      this.lineDataCollection = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
          {
            label: 'Sentiment Analysis',
            data: [32, 14, 46, 23, 38, 54],
            backgroundColor: 'rgba(6, 214, 160, 0.2)',
            borderColor: 'rgba(0, 200, 140, 0.5)',
            pointBackgroundColor: '#000',
            pointHoverBackgroundColor: '#555',
            pointHoverBorderColor: '#555'
          },
          {
            label: 'Image Recognition',
            data: [12, 18, 46, 13, 28, 44],
            backgroundColor: 'rgba(255, 209, 102, 0.2)',
            borderColor: 'rgba(240, 180, 89, 0.5)',
            pointBackgroundColor: '#000',
            pointHoverBackgroundColor: '#555',
            pointHoverBorderColor: '#555'
          },
          {
            label: 'Forecasting',
            data: [52, 34, 49, 53, 68, 62],
            backgroundColor: 'rgba(15, 78, 133, 0.2)',
            borderColor: 'rgba(3, 64, 128, 0.5)',
            pointBackgroundColor: '#000',
            pointHoverBackgroundColor: '#555',
            pointHoverBorderColor: '#555'
          }
        ]
      }
    }
  }
}
</script>

<style>
.card-bottom {
  height: 50vh;
}
</style>
