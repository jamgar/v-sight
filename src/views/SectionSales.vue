<template>
  <div class="section-container">
    <div class="row-fluid cards">
      <div class="card-deck">
        <div class="card mb-3 shadow card-theme">
          <div class="card-header card-header-theme">
            <h5>Daily Orders</h5>
          </div>
          <div class="card-body">
            <BarChart class="chart" :chart-data="barDataCollection" :options="options"/>
          </div>
        </div>
        <div class="card mb-3 shadow card-theme">
          <div class="card-header card-header-theme">
            <h5>Orders by Customer</h5>
          </div>
          <div class="card-body">
            <PieChart class="chart" :chart-data="pieDataCollectionByCustomer" :options="options"/>
          </div>
        </div>
        <div class="card mb-3 shadow card-theme">
          <div class="card-header card-header-theme">
            <h5>Orders by State</h5>
          </div>
          <div class="card-body">
            <PieChart class="chart" :chart-data="pieDataCollectionByState" :options="options"/>
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
import { THEME_COLORS } from '../utils/theme_colors'
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
      themeColor: 'Bright',
      topCustomers: [],
      barDataCollection: null,
      pieDataCollectionByCustomer: null,
      pieDataCollectionByState: null,
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
    ...mapState(['orders', 'ordersByCustomer', 'ordersByState']),
    themeColors() {
      const colors = THEME_COLORS.slice(0).find(
        set => set.name === this.themeColor
      ).colorSet

      return colors
    }
  },
  mounted() {
    this.$store.dispatch('getOrders', { page: 1, perPage: 100 }).then(() => {
      this.setBarChartData()
    })
    this.$store.dispatch('getOrdersByCustomer', 3).then(() => {
      this.$store.dispatch('getOrdersByState').then(() => {
        this.setPieChartData()
        this.setLineChartData()
      })
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
    setPieChartData() {
      const colors = this.themeColors

      this.pieDataCollectionByCustomer = {
        labels: this.ordersByCustomer.map(o => o.name),
        datasets: [
          {
            label: '',
            data: this.ordersByCustomer.map(d => d.total),
            backgroundColor: colors,
            borderColor: 'lightgreen'
          }
        ]
      }
      this.pieDataCollectionByState = {
        labels: this.ordersByState.map(o => o.state),
        datasets: [
          {
            label: '',
            data: this.ordersByState.map(d => d.total),
            backgroundColor: colors,
            borderColor: 'lightgreen'
          }
        ]
      }
    },
    setLineChartData() {
      this.topCustomers = this.ordersByCustomer.map(cx => cx['name'])
      const allChartData = this.topCustomers.reduce((res, i) => {
        res.push(this.getLineChartData(this.orders, i))
        return res
      }, [])

      let dates = allChartData
        .map(x => x['data'])
        .reduce((a, i) => {
          a.push(i.map(o => new Date(o[0])))
          return a
        }, [])

      dates = [].concat.apply([], dates)

      const ordersByDate = this.getCustomerOrdersByDate(allChartData, dates)[
        'data'
      ]
      this.lineDataCollection = {
        labels: ordersByDate[0]['orders'].map(o => o['date']),
        datasets: [
          {
            data: ordersByDate[0]['orders'].map(x => x['total']),
            label: ordersByDate[0]['customer'],
            backgroundColor: 'rgba(6, 214, 160, 0.2)',
            borderColor: 'rgba(0, 200, 140, 0.5)',
            pointBackgroundColor: '#000',
            pointHoverBackgroundColor: '#555',
            pointHoverBorderColor: '#555'
          },
          {
            data: ordersByDate[1]['orders'].map(x => x['total']),
            label: ordersByDate[1]['customer'],
            backgroundColor: 'rgba(255, 209, 102, 0.2)',
            borderColor: 'rgba(240, 180, 89, 0.5)',
            pointBackgroundColor: '#000',
            pointHoverBackgroundColor: '#555',
            pointHoverBorderColor: '#555'
          },
          {
            data: ordersByDate[2]['orders'].map(x => x['total']),
            label: ordersByDate[2]['customer'],
            backgroundColor: 'rgba(15, 78, 133, 0.2)',
            borderColor: 'rgba(3, 64, 128, 0.5)',
            pointBackgroundColor: '#000',
            pointHoverBackgroundColor: '#555',
            pointHoverBorderColor: '#555'
          }
        ]
      }
    },
    getLineChartData(allOrders, name) {
      const customerOrders = allOrders.filter(o => o.customer.name === name)

      const formattedOrders = customerOrders.reduce((r, e) => {
        r.push([e.placed, e.total])
        return r
      }, [])

      const result = { customer: name, data: formattedOrders }
      return result
    },
    getCustomerOrdersByDate(orders, dates) {
      const customers = this.topCustomers
      const prettyDates = dates.map(x => this.toFriendlyDate(x))
      const uniqDates = Array.from(new Set(prettyDates)).sort()

      const result = {}
      const dataSets = (result['data'] = [])

      customers.reduce((x, y, i) => {
        const customerOrders = []
        dataSets[i] = {
          customer: y,
          orders: uniqDates.reduce((r, e, j) => {
            const obj = {}
            obj['date'] = e
            obj['total'] = this.getCustomerDateTotal(e, y) //sum total orders for this customer on this date
            customerOrders.push(obj)
            return customerOrders
          })
        }
        return x
      }, [])

      return result
    },
    toFriendlyDate(date) {
      return moment(date)
        .endOf('day')
        .format('YY-MM-DD')
    },
    getCustomerDateTotal(date, customer) {
      const r = this.orders.filter(
        o =>
          o.customer.name === customer && this.toFriendlyDate(o.placed) === date
      )

      const result = r.reduce((a, b) => {
        return a + b.total
      }, 0)

      return result
    }
  }
}
</script>

<style>
.card-bottom {
  height: 50vh;
}
</style>
