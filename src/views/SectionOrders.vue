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
  </div>
</template>

<script>
export default {
  data: () => ({
    orders: [
      {
        id: 1,
        customer: {
          id: 1,
          name: 'XYZ Logics',
          state: 'FL',
          email: 'sales@example.com'
        },
        total: 230,
        placed: new Date(2017, 12, 1),
        fulfilled: new Date(2017, 12, 3)
      },
      {
        id: 2,
        customer: {
          id: 2,
          name: 'XYZ Logics',
          state: 'FL',
          email: 'sales@example.com'
        },
        total: 230,
        placed: new Date(2017, 12, 1),
        fulfilled: new Date(2017, 12, 3)
      },
      {
        id: 3,
        customer: {
          id: 3,
          name: 'XYZ Logics',
          state: 'FL',
          email: 'sales@example.com'
        },
        total: 230,
        placed: new Date(2017, 12, 1),
        fulfilled: new Date(2017, 12, 3)
      },
      {
        id: 4,
        customer: {
          id: 4,
          name: 'XYZ Logics',
          state: 'FL',
          email: 'sales@example.com'
        },
        total: 230,
        placed: new Date(2017, 12, 1),
        fulfilled: new Date(2017, 12, 3)
      },
      {
        id: 5,
        customer: {
          id: 5,
          name: 'XYZ Logics',
          state: 'FL',
          email: 'sales@example.com'
        },
        total: 230,
        placed: new Date(2017, 12, 1),
        fulfilled: new Date(2017, 12, 3)
      }
    ]
  })
}
</script>

<style scoped></style>
