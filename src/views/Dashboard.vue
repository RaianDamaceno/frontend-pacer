<template>
    <div class="dashboard">
        <div class="dashboard-group">
            <div class="dashboard-group-person">
                <v-slide-group
                    v-model="model"
                    class="pa-4"
                    center-active
                    show-arrows
                    >
                    <v-slide-item
                        v-for="estudante in estudantes"
                        :key="estudante.data.id"
                        >
                        <v-card
                            class="ma-4"
                            height="200"
                            width="180"
                            >
                            <div class="dashboard-group-person-minify">
                              <div class="dashboard-group-person-minify-pictures">
                                  <div></div>
                              </div>
                              <div class="dashboard-group-person-name">
                                  <span> {{ estudante.data[0].estudantes[0].nome}} </span>
                              </div>
                              <div class="dashboard-group-person-button">
                                  <card-student-rating :criterios="criterios" :nome="estudante.data[0].estudantes[0].nome" />
                              </div>
                            </div>

                            <v-row
                                class="fill-height"
                                align="center"
                                justify="center"
                                >
                            </v-row>
                        </v-card>
                    </v-slide-item>
                </v-slide-group>
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
  // import AdicionaCriteriosAva from '../components/AdicionaCriteriosAva.vue'
  import CardStudentRating from '../components/CardStudentRating.vue'
  // import CriteriaRegistration from '../components/criteria-registration.vue'
  import axios from 'axios';

  export default Vue.extend({
    name: 'Dashboard',

    components: {
      CardStudentRating,
      // AdicionaCriteriosAva,
      // CriteriaRegistration
    },
     data: () => ({
       cards: false,
       criterios: "",
       estudantes: "",
       errors: "",
       critAva: false
     }),
     created() {
        axios.get(`https://5acce45494587a0014eda8c3.mockapi.io/estudante`)
        .then(response => {
          // this.criterios = response.data[0].data[0].estudantes[0].criterios
          this.estudantes = response.data
        })
        axios.get(`http://localhost:3000/criteria`)
          .then(response => {
            this.criterios = response.data
            console.log(this.criterios)
          })
      },
      methods: {
        showCard: function() {
            this.cards = true
        },
        showCritAva: function() {
            this.critAva = true
        }
      
    }
 })
</script>

<style scoped lang="scss">
  span {
    color: #fff;
  }
  .dashboard {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: 100%;
    width: 100%; 
  }

  .ma-4 {
    background: rgb(2,0,36);
    background: linear-gradient(47deg, rgba(2,0,36,1) 0%, rgba(13,44,82,1) 31%, rgba(90,26,159,1) 97%);
    border-radius: 5px;
    text-align: center;
  }

  .dashboard-info {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    height: 30%;
  }

  .dashboard-info div {
    width: 30%;
    border: solid 1px black;
    border-radius: 10px;
		background-color: white;
  }

  .dashboard-info div {
    width: 30%;
    height: 40%;
    border: solid 1px black;
    border-radius: 2px;
		background-color: white;

    .row{
      border-style: none !important;
      background-color: transparent !important;
    }
    
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
    height: 200px;
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
    height: 70px;
    width: 70px;
    background-color: #fff;
  }
  
  .dashboard-group-person-button {
    display: flex;
    justify-content: end;
  }

  @media (min-width: 320px) and (max-width: 640px) { 
    .dashboard {
      min-height: 100%;
    }
    .dashboard-info, .dashboard-group  {
      flex-direction: column;
      height: 800px;
      justify-content: space-around;
      padding: 20px;
    }

    .dashboard-group-myrating, .dashboard-info div, .dashboard-group-person {
      width: 100%;
      height: inherit;
      margin-top: 3%;
    } 

  }
</style>
