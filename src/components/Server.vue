<template>
  <div class="card mb-3 shadow block-status" :style="styleObject">
    <div class="card-header name">{{ serverData.name }}</div>
    <div class="card-body status">{{ serverData.isOnline }}</div>
    <button @click="toggleStatus" class="btn btn-default action">
      {{ buttonText }}
    </button>
  </div>
</template>

<script>
export default {
  props: ['serverData'],
  computed: {
    styleObject() {
      return {
        backgroundColor: this.serverData.isOnline ? '#66bb6a' : '#ff6b6b'
      }
    },
    buttonText() {
      return this.serverData.isOnline ? 'Shut Down' : 'Start'
    }
  },
  methods: {
    toggleStatus() {
      this.serverData.isOnline = !this.serverData.isOnline
    }
  }
}
</script>

<style scoped>
.block-status {
  width: 200px;
  height: 200px;
  font-size: 1.3em;
  color: #000;
  text-align: center;
  padding: 0 20px;
  margin: 20px;
}
.status {
  display: block;
  transition: 0.3;
}
.name {
  padding: 5px;
  font-size: 0.7em;
  display: block;
  font-family: monospace;
  transition: 0.3;
}
.action {
  display: block;
  font-size: 0.7em;
  margin-top: 12px;
  transition: 0.3s;
}
</style>
