<template>
  <v-container>
    {{ userID}}
  </v-container>
</template>

<script lang="ts">
  import Vue from 'vue'

  export default Vue.extend({
    name: 'UserUpdate',
    props: {
     userID: String,
    },
  })
</script>
