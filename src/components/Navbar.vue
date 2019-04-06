<template>
  <div id="navbar" class="navbar navbar-dark fixed-top bg-dark">
    <a href="#" class="navbar-brand">
      <span class="logo logo-left">v-</span>
      <span class="logo logo-right">Sight</span>
    </a>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
#navbar {
  background-color: #161a1e !important;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2), 0 3px 6px rgba(0, 0, 0, 0.25);
}
.logo {
  color: #fff;
  font-weight: bold;
  font-size: 1.4em;
}
.logo-left {
  background-color: #42b883;
  padding: 3px 3px 3px 8px;
  border-radius: 4px;
}
.logo-right {
  padding: 3px 8px 3px 3px;
  margin-left: -2px;
}
</style>
