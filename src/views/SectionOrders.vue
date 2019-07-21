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
        <div class="text-center" v-if="loading">Loading Orders...</div>
        <tr v-for="order in orders" :key="order.id">
          <td>{{ order.id }}</td>
          <td>{{ order.customer.name }}</td>
          <td>{{ order.total }}</td>
          <td>{{ order.placed | formatDate }}</td>
          <td>{{ order.completed | formatDate }}</td>
          <td>Status</td>
        </tr>
      </tbody>
    </table>
    <div>{{ getMin }} through {{ getMax }} of {{ total }} orders</div>
    <div class="pb-2">Total Pages: {{ totalPages }}</div>
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
import { mapState } from 'vuex'
import Pagination from '@/components/Pagination'

export default {
  components: {
    Pagination
  },
  data: () => ({
    page: 1,
    perPage: 10
  }),
  computed: {
    ...mapState(['orders', 'total', 'totalPages', 'loading']),
    getMin() {
      return this.perPage * this.page - this.perPage + 1
    },
    getMax() {
      let max = this.perPage * this.page
      if (max > this.total) {
        max = this.total
      }
      return max
    }
  },
  mounted() {
    this.getOrders(this.page, this.perPage)
  },
  methods: {
    getOrders(page, perPage) {
      this.$store.dispatch('getOrders', { page, perPage })
    },
    onPageChanged(page) {
      this.page = page
      this.getOrders(this.page, this.perPage)
    }
  }
}
</script>

<style scoped></style>
