<template>
  <div class="app">
    <router-view></router-view>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';
export default{
  async mounted(){
    this.$store.dispatch('fetchTasks')
  },

  computed: mapGetters(['allTasks']),
}
</script>

<style scoped>
</style>