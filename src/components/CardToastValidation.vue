<template>
  <div class="text-center">
    <v-btn
        color="green darken-1"
        text
      @click="snackbar = true"
    >
      Salvar
    </v-btn>

    <v-snackbar
      v-model="snackbar"
      :timeout="timeout"
      sucess
    >
      {{ text }}

      <template v-slot:action="{ attrs }">
        <v-btn
          color="blue"
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>


<script>
  export default {
    props: {
        snackbar: Boolean,
        text: String
    },
    data: () => ({
      timeout: 2000
    }),
  }
</script>