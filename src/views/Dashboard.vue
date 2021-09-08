<template>
    <div class="dashboard">
        <div class="dashboard-myRating">
          <div>
          </div>
          <div>
          </div>
          <div>
          </div>
        </div>

        <div class="dashboard-group">
          <div class="dashboard-group-person">
            <div class="dashboard-group-person-minify"> 
            </div>
          </div>
          <div class="dashboard-group-myrating">
          </div>
        </div>

        <div class="dashboard-info">
          <div>
          </div>
          <div>
          </div>
          <div>
          </div>
        </div>
    </div>
    
</template>

<script lang="ts">
  import Vue from 'vue'
  // import CardPersonalRating from '../components/CardPersonalRating.vue'

  export default Vue.extend({
    name: 'Dashboard',

    components: {
      // CardPersonalRating,
    },
     data: () => ({
     })
 })
</script>

<style scoped lang="scss">
  .dashboard {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: 100%;
  }

  .dashboard-myRating, .dashboard-info {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    height: 30%;
    
  }

  .dashboard-myRating div, .dashboard-info div {
    width: 30%;
    border: solid 1px black;
    border-radius: 10px;
  }

  .dashboard-group {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    height: 30%;
  }

  .dashboard-group-person {
    width: 63.5%;
    border: solid 1px black;
    border-radius: 10px;
    display: flex;

  }

  .dashboard-group-myrating {
    width: 30%;
    border: solid 1px white;
    border-radius: 10px;
  }

  @media (min-width: 500px) {
  article {
    .dashboard-myRating, .dashboard-info, .dashboard-group { 
      display: flex;
      flex-direction: column !important;
    }
  }
}
</style>
