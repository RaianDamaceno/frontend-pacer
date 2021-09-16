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
					<div class="dashboard-group-person-minify-pictures">
						<div></div>
					</div>
					<div class="dashboard-group-person-name">
						<span> John Doe </span>
					</div>
					<div class="dashboard-group-person-button">
            <card-student-rating :criterios="criterios" />
					</div>
				</div>
			</div>
			<div class="dashboard-group-myrating">
			</div>
		</div>

		<div class="dashboard-info">
			<div>
        <modal-criacao-criterios  />
			</div>
			<div>
        {{ criterios }}
			</div>
			<div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import CardStudentRating from '../components/CardStudentRating.vue'
  import axios from 'axios';

  export default Vue.extend({
    name: 'Dashboard',

    components: {
      CardStudentRating 
    },
     data: () => ({
       cards: false,
       criterios: "",
       errors: ""
     }),
     created() {
        axios.get(`https://5acce45494587a0014eda8c3.mockapi.io/estudante`)
        .then(response => {
          this.criterios = response.data[0].data[0].estudantes[0].criterios
        })
      },
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
    background: rgb(2,0,36);
    background: linear-gradient(47deg, rgba(2,0,36,1) 0%, rgba(13,44,82,1) 31%, rgba(90,26,159,1) 97%);
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
