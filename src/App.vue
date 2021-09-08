<template>
  <v-app>
    <v-navigation-drawer         
        permanent
        app>
    </v-navigation-drawer>
    <v-main class="teste">
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
});
</script>

<style>
.teste {
  background-color: #DCE6EB;
}
</style>

