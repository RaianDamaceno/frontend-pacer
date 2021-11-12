<template>
    <div class="dashboard">
            <v-app-bar
      app
      color="primary"
      dark
    >

        <div class="d-flex align-center">
          <img src='../../public/img/logo_v2.png' alt="PacerLogo" width="150" height="50">
        </div>
        <v-spacer></v-spacer>
        <v-tab >
        <v-menu offset-y >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="primary"
                dark
                v-bind="attrs"
                v-on="on"
                width="100px"
              >
                Sprint
              </v-btn>
            </template>
            <v-list>
              <v-list-item>
                <v-list-item-title> <sprintRegistration /></v-list-item-title>
              </v-list-item>
              <v-list-item>
                <v-list-item-title> <sprintTable /></v-list-item-title>
              </v-list-item>
            </v-list>
        </v-menu>
      </v-tab>

      <v-tab >
        <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="primary"
                dark
                v-bind="attrs"
                v-on="on"
                width="100px"
              >
                Criterios
              </v-btn>
            </template>
            <v-list>
              <v-list-item>
                <v-list-item-title><AdicionaCriteriosAva /></v-list-item-title>
              </v-list-item>
              <v-list-item>
              <v-list-item-title><CriteriaRegistration /></v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
      </v-tab>

      <v-tab >
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              v-bind="attrs"
              v-on="on"
              width="100px"
            >
              Projeto
            </v-btn>
          </template>
          <v-list>
            <v-list-item>
              <v-list-item-title><CreateProject /></v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-title><projectTable /></v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-tab>

      <v-tab >
            <PendingToScore />
        </v-tab>

        <v-tab>
            <UsersAprovation />
        </v-tab>
        <v-tab>
            <user-update :userID="this.userLogged" />
        </v-tab>
    </v-app-bar>
        <div class="dashboard-group">
            <div class="dashboard-group-person" v-if="Projeto">
                Projeto
                <v-slide-group class="pa-4" center-active show-arrows>
                    <v-slide-item
                        v-for="projeto in projetos"
                        :key="projeto.idProject"
                    >
                        <v-card class="ma-4" height="200" width="180">
                            <div class="dashboard-group-person-minify">
                                <div
                                    class="dashboard-group-person-name"
                                    v-on:click="
                                        getGruposFromProject(projeto.idProject)
                                    "
                                >
                                    <span> {{ projeto.description }} </span>
                                </div>
                                <div class="dashboard-group-person-button">
                                    <!-- <card-float-button :team="projeto.idProjeto"/> -->
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
                <card-create-equipe
                    :projetos="projetos"
                    :estudantes="allEstudantes"
                />
            </div>
            <div class="dashboard-group-person" v-if="Times">
                Times
                <v-slide-group class="pa-4" center-active show-arrows>
                    <v-slide-item
                        v-for="projectGrupo in projectGrupos"
                        :key="projectGrupo.idTeam"
                    >
                        <v-card class="ma-4" height="200" width="180">
                            <div class="dashboard-group-person-minify">
                                <div
                                    class="dashboard-group-person-name"
                                    v-on:click="
                                        getUserFromTeam(projectGrupo.idTeam)
                                    "
                                >
                                    <span> {{ projectGrupo.teamName }} </span>
                                </div>
                                <div class="dashboard-group-person-button">
                                    <card-float-button :team="projectGrupo.idTeam"
                                    />
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
                <card-create-equipe
                    :projetos="projetos"
                    :estudantes="allEstudantes"
                />
            </div>
            <div class="dashboard-group-person" v-if="Alunos">
                <div v-if="showButtonScrum">
                    <v-row align="center" justify="space-around">
                        <v-btn color="primary" v-on:click="update2SM">
                            Tornar-se Scrum Master
                            <v-icon dark right>
                                mdi-crown
                            </v-icon>
                        </v-btn>
                    </v-row>
                </div>
                <div>
                    <v-slide-group class="pa-4" center-active show-arrows>
                        <v-slide-item
                            v-for="estudante in estudantes"
                            :key="estudante.idUser"
                        >
                            <v-card class="ma-4" height="200" width="190">
                                <div class="dashboard-group-person-minify">
                                    <div
                                        class="dashboard-group-person-minify-pictures"
                                    >
                                        <div></div>
                                    </div>
                                    <div class="dashboard-group-person-name">
                                        <span> {{ estudante.user.name }} </span>
                                    </div>
                                    <div
                                        class="dashboard-group-person-button"
                                        v-if="activeSprint"
                                    >
                                        <card-student-rating
                                            :criterios="criterios"
                                            :nome="estudante.user.name"
                                            :estudanteID="estudante.idUser"
                                            :sprintID="sprintSelected"
                                            :notasFeitas="notasFeitas"
                                            :idEvaluator="userLogged"
                                            :idGroup="grupoAtivo"
                                        />
                                    </div>
                                    <div
                                        class="dashboard-group-person-button"
                                        v-else
                                    >
                                        <card-toast-sprint
                                            text="Sprint finalizada"
                                        />
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
            <graph-spider
                v-if="notasFeitas.length !== 0"
                :notas="notasFeitas"
                :sprintSelected="sprintSelected"
                :user="userLogged"
            />
        </div>

        <div class="dashboard-info" >
            <div v-for="sprint in sprints" :key="sprint.idSprint">
                <button
                    :value="sprint.idSprint"
                    v-on:click="checkSprintAtiva(sprint)"
                >

                    <p>Sprint</p>
                    <p>Data Inicial: {{ sprint.initialDate }}</p>
                    <p>Data Final: {{ sprint.finalDate }}</p>


                </button>
                {{ sprintSelected.idSprint}}
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
  import GraphSpider from "../components/GraphSpider.vue";
  import { UserTeam } from '../model/user-team'
  import CriteriaRegistration from '../components/criteria-registration.vue'
  import AdicionaCriteriosAva from '../components/AdicionaCriteriosAva.vue'
  import PendingToScore from '../components/PendingToScore.vue'
  import UsersAprovation      from '../components/UsersAprovation.vue'
  import SprintRegistration from '../components/SprintRegistration.vue'
  import CreateProject from '../components/CreateProject.vue'
  import projectTable from '../components/projectTable.vue'
  import sprintTable from '../components/SprintTable.vue'
  import UserUpdate from '../components/UserUpdate.vue'
  import api from '../services/api'

export default Vue.extend({
    name: "Dashboard",
    components: {
        CardStudentRating,
        CardCreateEquipe,
        CardToastSprint,
        GraphSpider,
        CardFloatButton,
        AdicionaCriteriosAva,
        CriteriaRegistration,
        PendingToScore,
        UsersAprovation,
        SprintRegistration,
        CreateProject,
        projectTable,
        sprintTable,
        UserUpdate
    },
     data: () => ({
       cards: false,
       criterios: [],
       estudantes: [] as UserTeam[],
       allEstudantes: [],
       Role: true,
       grupoAtivo: "",
       grupos: "",
       projetos: [],
       teams: "",
       sprints: "",
       sprintSelected: "",
       activeSprint: true,
       notasFeitas: [],
       novoCriterio: [],
       token: '',
       userLogged: '',
       Projeto: true,
       Times: false,
       Alunos: false,
       projectGrupos: '',
       haveSM: false,
       idteam: "",
       isAluno: false,
       showButtonScrum: false,
       minhaAvaliação:[]
     }),
     beforeMount() {
        api.get('user').then(response => {
            console.log("teste", response.data )
            this.allEstudantes = response.data.filter(function(el) {
              return el.role == "USR";
            });
            console.log("After", this.allEstudantes )

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
            for(var i = 0; i < this.sprints.length; i++) {
                this.checkSprintAtiva(this.sprints[i])
            }
        })
        api.get('notes-store').then(response => {
          this.notasFeitas = response.data
        })
      },
      mounted() {
        this.decodeToken(this.$store.getters.getToken);
        this.getUserInformation();
    },
    methods: {
        showCard: function() {
            this.cards = true;
        },
        getGruposFromProject(projectID) {
            api.get(`project/${projectID}`).then((response) => {
                this.projectGrupos = response.data.teams;
                this.Projeto = false;
                this.Times = true;
                this.Alunos = false;
            });
        },
        getUserFromTeam(teamID) {
            this.grupoAtivo = teamID;
            api.get(`user-team?idTeam=${teamID}`).then((response) => {
                this.idteam = teamID;
                this.estudantes = response.data;
                this.Projeto = false;
                this.Times = false;
                this.Alunos = true;
                for (let i = 0; i < this.estudantes.length; i++) {
                    if (this.estudantes[i].isScrumMaster) {
                        this.haveSM = true;
                        break;
                    } else {
                        this.haveSM = false;
                    }
                }
                if (this.isAluno && !this.haveSM) {
                    this.showButtonScrum = true;
                }
            });
        },
        update2SM: async function() {
            let payload = {
                isScrumMaster: true,
            };
            await api
                .patch(
                    `user-team?idUser=${this.userLogged}&idTeam=${this.idteam}`,
                    payload
                )
                .then((response) => {
                    if (response.status == 200) {
                        this.showButtonScrum = false;
                        alert("Parabéns, agora você é Scrum Master!");
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        checkSprintAtiva: function(teste) {
            let today = new Date();
            let dd = String(today.getDate()).padStart(2, "0");
            let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
            let yyyy = today.getFullYear();
            let hoje = yyyy + "-" + mm + "-" + dd;

            var d1 = hoje.split("/");
            var d2 = teste.initialDate.split("/");
            var c = teste.finalDate.split("/");

            if (d1 > d2 && d1 < c) {
                this.sprintSelected = teste.idSprint;
                this.activeSprint = true;
            } else {
                this.activeSprint = false;
            }
        },
        decodeToken: function (token: string) {
            var base64Url = token.split('.')[1];
            var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            var jsonPayload = decodeURIComponent(
                atob(base64)
                    .split('')
                    .map(function(c) {
                        return (
                            '%' +
                            ('00' + c.charCodeAt(0).toString(16)).slice(-2)
                        );
                })
                .join('')
            );

            let json = JSON.parse(jsonPayload);
            this.userLogged = json.sub
            this.$store.dispatch('setUserId', this.userLogged);
        },
        getUserInformation: function() {
            api.get(`/user/${this.userLogged}`).then((response) => {
                if (response.data.role === "USR") this.isAluno = true;
            });
        },
    },
});
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
    background-image: url('../../public/img/bg_login.jpg');
}

.ma-4 {
    background: rgb(2, 0, 36);
    background: linear-gradient(
        47deg,
        rgba(2, 0, 36, 1) 0%,
        rgba(13, 44, 82, 1) 31%,
        rgba(90, 26, 159, 1) 97%
    );
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
    flex-direction: column;
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

.dashboard-group-person-minify-pictures,
.dashboard-group-person-name {
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
    background: rgba(86, 116, 186, 1);
    width: 300px;
    color: #fff;
    border-radius: 100px;
}

.yellow {
   background-color: yellow;
}
@media (min-width: 320px) and (max-width: 640px) {
    .dashboard {
        min-height: 100%;
    }
    .dashboard-info,
    .dashboard-group {
        flex-direction: column;
        height: 800px;
        justify-content: space-around;
        padding: 20px;
    }

    .dashboard-group-myrating,
    .dashboard-info div,
    .dashboard-group-person {
        width: 100%;
        height: inherit;
        margin-top: 3%;
    }
}
</style>