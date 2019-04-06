<template>
  <div id="app">
    <Navbar/>
    <div class="container-fluid">
      <div class="row" id="mainContent">
        <Sidebar class="col-sm-3"/>
        <div class="col-sm-9 ml-sm-auto col-md-10 pt-3" id="dashboard">
          <router-view/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'
import Sidebar from './components/Sidebar.vue'

export default {
  components: {
    Navbar,
    Sidebar
  }
}
</script>

<style lang="scss">
#dashboard {
  margin-top: 60px;
}
</style>
