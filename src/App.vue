<template>
  <v-app>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'App',
  data: () => ({
    //
  }),
  methods: {
    goHome() {
      this.$router.push({ path: 'dashboard' })
    }
  }
});
</script>

<style>
  .title {
    cursor: pointer; 
  }
</style>
