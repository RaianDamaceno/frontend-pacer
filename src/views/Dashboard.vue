<template>
	<div class="dashboard">
		<div class="card-rating" v-if="cards">
			<card-personal-rating/>
		</div>
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
					<div class="dashboard-group-person-minify-pictures">
						<div></div>
					</div>
					<div class="dashboard-group-person-name">
						<span> John Doe </span>
					</div>
					<div class="dashboard-group-person-button">
						<v-btn
							color="accent"
							small                 
							fab
							@click="showCard"
							>
							<v-icon>mdi-plus</v-icon>
						</v-btn>
					</div>
				</div>
			</div>
			<div class="dashboard-group-myrating">
			</div>
		</div>

		<div class="dashboard-info">
			<div>
        <modal-criacao-criterios />
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
  import CardPersonalRating from '../components/CardPersonalRating.vue'

  export default Vue.extend({
    name: 'Dashboard',

    components: {
      CardPersonalRating,
    },
     data: () => ({
       cards: false
     }),
      methods: {
        showCard: function() {
            this.cards = true
        },
    }
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
		background-color: white;
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
    align-items: center;
    justify-content: space-around;
		background-color: white;
		
  }

  .dashboard-group-myrating {
    width: 30%;
    border: solid 1px;
    border-radius: 10px;
				background-color: white;
  }

  .dashboard-group-person-minify {
    width: 16%;
    height: 70%;
    border: solid 1px black;
    border-radius: 5px;
    text-align: center;
		
  }

  .dashboard-group-person-minify div {
    display: flex;
    height: 40%;

  }

  .dashboard-group-person-minify-pictures, .dashboard-group-person-name {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .dashboard-group-person-minify-pictures div {
    border: solid 1px;
    border-radius: 50%;
    height: 70%;
    width: 40%;
  }
  
  .dashboard-group-person-button {
    display: flex;
    justify-content: end;
  }
</style>
