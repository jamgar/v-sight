<template>
  <div id="sidebar" class="col-sm-3 col-md-2 d-none d-sm-block sidebar">
    <ul class="nav nav-pills flex-column">
      <li class="nav-item">
        <router-link to="/sales" class="nav-link">Sales Volume</router-link>
      </li>
      <li class="nav-item">
        <router-link to="/orders" class="nav-link">Latest Orders</router-link>
      </li>
      <li class="nav-item">
        <router-link to="/health" class="nav-link">System Health</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
#sidebar {
  height: 100vh;
  padding-top: 80px;
  position: fixed;
  background-color: #191f26;
}
</style>
