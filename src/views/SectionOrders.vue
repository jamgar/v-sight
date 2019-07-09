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
      :perPage="perPage"
      :currentPage="page"
      @pageChanged="onPageChanged"
    />
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'

export default {
  components: {
    Pagination
  },
  data: () => ({
    orders: [],
    total: 0,
    page: 1,
    perPage: 10,
    loading: false
  }),
  methods: {
    onPageChanged(page) {
      console.log('Prev button clicked!', page)
    }
  }
}
</script>

<style scoped></style>
