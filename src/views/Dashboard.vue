<template>
    <div>
        <card-personal-rating />
        <CardConfirmation msg="Deseja confirmar a sua avaliação ?"/>
    </div>
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
