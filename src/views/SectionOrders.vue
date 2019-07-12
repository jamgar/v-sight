<template>
  <div class="section-container">
    <h2>Latest Orders</h2>
    <table class="table table-inverse table-hover">
      <thead class="thead-dark">
        <tr>
          <th>ID</th>
          <th>Customer</th>
          <th>Amount</th>
          <th>Order Placed</th>
          <th>Order Fulfilled</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in orders" :key="order.id">
          <td>{{ order.id }}</td>
          <td>{{ order.customer.name }}</td>
          <td>{{ order.total }}</td>
          <td>{{ order.placed | formatDate }}</td>
          <td>{{ order.fulfilled | formatDate }}</td>
          <td>Status</td>
        </tr>
      </tbody>
    </table>
    <Pagination
      :total="total"
      :totalPages="totalPages"
      :perPage="perPage"
      :currentPage="page"
      @pageChanged="onPageChanged"
    />
  </div>
</template>

<script>
import axios from 'axios'
import Pagination from '@/components/Pagination'
// import { log } from 'util'

export default {
  components: {
    Pagination
  },
  data: () => ({
    orders: [],
    total: 0,
    totalPages: 0,
    page: 1,
    perPage: 10,
    loading: false
  }),
  mounted() {
    this.getOrders(this.page, this.perPage)
  },
  methods: {
    getOrders(page, perPage) {
      this.loading = true

      axios
        .get(`https://localhost:5001/api/order/${page}/${perPage}`)
        .then(response => {
          this.total = response.data.page.total
          this.totalPages = response.data.totalPages
          this.orders = response.data.page.data
        })

      this.loading = false
    },
    onPageChanged(page) {
      this.page = page
      this.getOrders(this.page, this.perPage)
    }
  }
}
</script>

<style scoped></style>
