<template>
  <index />
</template>

<script lang="ts">
  import Vue from 'vue'
  import Index from '../components/Index.vue'
  export default Vue.extend({
    name: 'Home',
    components: {
      Index,
    },
  })
</script>
