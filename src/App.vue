<template>
  <v-app>
    <v-main>
      <v-snackbar v-model="snackbar.show" :timeout="snackbar.timeout" 
      bottom
      :color="snackbar.color">
        {{ snackbar.text }}
        <v-btn flat color="white" text @click="snackbar.show = false">fechar</v-btn>
      </v-snackbar>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapState } from 'vuex'

export default Vue.extend({
  name: 'App',
  data: () => ({
    //
  }),
  computed: {
    ...mapState(['snackbar'])
  },
  methods: {
    goHome() {
      this.$router.push({ path: 'dashboard' })
    }
  },
});
</script>

<style>
  .title {
    cursor: pointer; 
  }
</style>
