<template>
  <div class="dashboard">
    <v-btn
      color="red darken-5" dark small fab v-if="!teacher" v-on:click="teacher = true">
      <v-icon dark left >
        mdi-arrow-left
      </v-icon>
    </v-btn>

    <v-row align="center" justify="space-around">
      <v-btn color="primary" v-if="!teacher && !this.haveSM" v-on:click="update2SM">
        Tornar-se Scrum Master
        <v-icon dark right>
          mdi-crown
        </v-icon>
      </v-btn>
    </v-row>

    <div class="dashboard-group">
      <div class="dashboard-group-person" v-if="teacher">
        <v-slide-group
          class="pa-4"
          center-active
          show-arrows
          >
          <v-slide-item
            v-for="team in teams"
            :key="team.idTeam"
            >
            <v-card
              class="ma-4"
              height="200"
              width="180"
              >
              <div class="dashboard-group-person-minify">
                <div class="dashboard-group-person-name" v-on:click="getUserFromTeam(team.idTeam)" >
                  <span> {{ team.teamName}} </span>
                </div>
                <div class="dashboard-group-person-button">
                  <card-float-button :team="team.idTeam"/>
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
        <card-create-equipe :projetos="projetos" :estudantes="allEstudantes"/>
      </div>
      <div class="dashboard-group-person" v-if="!teacher">
        <v-slide-group
          class="pa-4"
          center-active
          show-arrows
          >
          <v-slide-item
            v-for="estudante in estudantes"
            :key="estudante.idUser"
            >
            <v-card
              class="ma-4"
              height="200"
              width="190"
              >
              <div class="dashboard-group-person-minify" >
                <div class="dashboard-group-person-minify-pictures">
                  <div></div>
                </div>
                <div class="dashboard-group-person-name">
                  <span> {{ estudante.user.name }} </span>
                </div>
                <div class="dashboard-group-person-button" v-if="activeSprint">
                  <card-student-rating 
                    :criterios="criterios" 
                    :nome="estudante.user.name"
                    :estudanteID="estudante.idUser"
                    :sprintID="sprintSelected"
                    :notasFeitas="notasFeitas"
                    />
                </div>
                <div class="dashboard-group-person-button" v-else>
                  <card-toast-sprint text="Sprint finalizada"/>
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
    </div>
    <div class="dashboard-info">
      <div v-for="sprint in sprints" :key="sprint.idSprint">
        <button 
          :value="sprint.idSprint"
          v-on:click="checkSprintAtiva(sprint)">
          <p> Sprint</p>
          <p> Data Inicial: {{ sprint.initialDate }} </p>
          <p> Data Final: {{ sprint.finalDate }} </p>
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import CardStudentRating from '../components/CardStudentRating.vue'
  import CardCreateEquipe from '../components/CardCreateEquipe.vue'
  import CardFloatButton from '../components/CardFloatButton.vue'
  import CardToastSprint from '../components/CardToastSprint.vue'
  import api from '../services/api'

  export default Vue.extend({
    name: 'Dashboard',

    components: {
      CardStudentRating,
      CardCreateEquipe,
      CardFloatButton,
      CardToastSprint
    },
     data: () => ({
       cards: false,
       criterios: [],
       estudantes: [],
       allEstudantes: [],
       errors: "",
       teacher: true,
       grupo: "",
       grupos: "",
       projetos: [],
       teams: "",
       sprints: "",
       sprintSelected: "",
       activeSprint: true,
       snackbar: false,
       notasFeitas: [],
       novoCriterio: [],
       user_id: '9288a850-588d-4a18-86ff-77b6d21a8464',
       haveSM: false,
       idteam: ""
     }),
     beforeMount() {
        api.get('user').then(response => {
          this.allEstudantes = response.data
        })
        api.get('criteria').then(response => {
            this.criterios = response.data
        })
        api.get('project').then(response => {
            this.projetos = response.data
        })
        api.get('team').then(response => {
            this.teams = response.data
        })
        api.get('sprint').then(response => {
            this.sprints = response.data
        })
        api.get('notes-store').then(response => {
          this.notasFeitas = response.data
        })
      },
      methods: {
        showCard: function() {
            this.cards = true
        },
        getUserFromTeam(teamID) {
          api.get(`user-team?idTeam=${teamID}`).then(response => {
            this.idteam = teamID
            this.estudantes = response.data
            this.teacher = false
            for (let i = 0; i < this.estudantes.length; i++) {
              if(!this.estudantes[i].isScrumMaster){
                this.haveSM = false
              }else{
                this.haveSM = true
              }
            }
          })
        },
        update2SM: async function() {
          let payload = {
            "isScrumMaster": true
          }
          await api.patch(`user-team?idUser=${this.user_id}&idTeam=${this.idteam}`, payload)
          .then(response => {
            if(response.status == 200){
              alert('Parabéns, agora você é Scrum Master!')
            }
          })
          .catch(error=>{
            console.log(error)
          })
        },
        checkSprintAtiva: function(teste) {
          let today = new Date();
          let dd = String(today.getDate()).padStart(2, '0');
          let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
          let yyyy = today.getFullYear();
          let hoje = yyyy + '-' + mm  + '-' + dd

          var d1 = hoje.split("/");
          var d2 = teste.initialDate.split("/");
          var c = teste.finalDate.split("/");

          if(d1 > d2 && d1 < c) {
            this.activeSprint = true
            this.sprintSelected = teste.idSprint
          } else {
            this.activeSprint = false
          }
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

  .dashboard-group {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    height: 45%;
  }

  .dashboard-group-person {
    width: 60.5%;
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
    align-items: end;
  }

  button {
      background: rgba(86,116,186,1);
      width: 300px;
      color: #fff;
      border-radius: 100px;
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
