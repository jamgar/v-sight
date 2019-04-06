<template>
  <div id="sidebar" class="col-sm-3 col-md-2 d-none d-sm-block sidebar">
    <ul class="nav nav-pills flex-column">
      <li class="nav-item">
        <a href="#" class="nav-link">Sales Volume</a>
      </li>
      <li class="nav-item">
        <a href="#" class="nav-link">Latest Orders</a>
      </li>
      <li class="nav-item">
        <a href="#" class="nav-link">System Health</a>
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
