<template>
  <card-personal-rating />
</template>

<script lang="ts">
  import Vue from 'vue'
  import CardPersonalRating from '../components/CardPersonalRating.vue'

  export default Vue.extend({
    name: 'Dashboard',

    components: {
      CardPersonalRating,
    },
  })
</script>
