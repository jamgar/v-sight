<template>
  <div class="section-container">
    <h2>System Health</h2>
    <div class="card-deck servers">
      <div v-for="server in servers" :key="server.id">
        <Server :serverData="server"/>
      </div>
    </div>
  </div>
</template>

<script>
import Server from '@/components/Server.vue'

export default {
  components: {
    Server
  },
  data: () => ({
    servers: [
      { id: 1, name: 'dev-web', isOnline: true },
      { id: 2, name: 'dev-mail', isOnline: false },
      { id: 3, name: 'prod-web', isOnline: true },
      { id: 4, name: 'dev-mail', isOnline: true }
    ]
  })
}
</script>

<style scoped></style>
