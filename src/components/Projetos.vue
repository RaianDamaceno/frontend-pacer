<template>
    <div>
        <h2> Meus Projetos </h2>
        <br>
        <v-expansion-panels focusable>
            <v-expansion-panel
                v-for="Projeto in Projetos"
                :key="Projeto.idProject"
            >
            <v-expansion-panel-header> <h3>{{ Projeto.description}} </h3>
            </v-expansion-panel-header>
            <v-expansion-panel-content>

            <v-expansion-panels focusable>
                <br>  
                <v-expansion-panel
                    v-for="Team in Teams"
                    :key="Team.idTeam"
                    @click="getUserFromTeam(Team.idTeam)"
                >           
                <v-expansion-panel-header v-if="isAluno"> 
                      <h3>  Time: {{ Team.team.teamName }} </h3> 
                    </v-expansion-panel-header>
                    <v-expansion-panel-header v-else> 
                        <div class="team-title"> 
                            <div> 
                                <h3>Time: {{ Team.teamName }} </h3>
                            </div>
                            <div> 
                                <card-float-button :team="Team.idTeam"/>
                            </div>
                        </div>
                      
                    </v-expansion-panel-header>
                <v-expansion-panel-content>
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
                </v-expansion-panel-content>
                </v-expansion-panel>
             </v-expansion-panels>
            </v-expansion-panel-content>
            </v-expansion-panel>
        </v-expansion-panels>
    </div>
</template>

<script>
  import Vue from 'vue'
  import api from '../services/api'
  import CardStudentRating from '../components/CardStudentRating.vue'
  import CardFloatButton from '../components/CardFloatButton.vue'

  export default Vue.extend({
    name: 'Projetos',
    props: {
        Projetos: Array,
        Teams: Array,
        Estudantes: Array,
        notasFeitas: Array,
        userLogged: String,
        criterios: Array,
        sprintSelected: String,
        isAluno: Boolean,
        
    },
    components: {
        CardStudentRating,
        CardFloatButton
    },
    data: () => ({
        myTeams: [],
        estudantes: '',
        idteam: '',
        activeSprint: true,
        grupoAtivo: '',
        loading: false,
        loader: null,
    }),
     watch: {
      loader () {
        const l = this.loader
        this[l] = !this[l]

        setTimeout(() => (this[l] = false), 3000)
      },
    },
    methods: {
        getUserFromTeam(teamID) {
            this.grupoAtivo = teamID;
            api.get(`user-team?idTeam=${teamID}`).then((response) => {
                this.idteam = teamID;
                this.estudantes = response.data;
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
    }
  })
</script>

<style>
    .team-title {
        display: flex;
        flex-direction: row;
        justify-content:space-between;
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

    span {
        color: #fff;
    }
</style>