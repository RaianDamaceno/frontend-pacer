<template>
    <div>
        <h2> Meus Projetos </h2>
        <br>
        <v-expansion-panels focusable>
            <v-expansion-panel
                v-for="Projeto in Projetos"
                :key="Projeto.idProject"
                @click="getGruposFromProject(Projeto.idProject)"
            >
            <v-expansion-panel-header>
                <div class="team-title">
                    <div>
                         <h3>{{ Projeto.description}}</h3>
                    </div>
                    <div style="margin-right: 30px" v-if="!isAluno" >
                        <add-teacher :projetoId="Projeto.idProject" />
                    </div>
                </div>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
            <v-expansion-panels focusable>
                <br>
                <v-expansion-panel
                    v-for="Team in projectGrupos"
                    :key="Team.idTeam"
                    @click="getUserFromTeam(Team.idTeam)"
                >
                    <v-expansion-panel-header>
                        <div class="team-title">
                            <div>
                                <h3>Time: {{ Team.teamName }} </h3>
                            </div>
                            <div>
                                <card-float-button
                                    :team="Team.idTeam"
                                    :isAluno="isAluno"
                                    :isGrupoDoUsuario="isGrupoDoUsuario"
                                />
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
                                        v-if="!isAluno && isSprintAtiva"
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
                                        v-if="isAluno && isSprintAtiva && isGrupoDoUsuario"
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
  import AddTeacher from '../components/AddTeacher.vue'
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
        isSprintAtiva: Boolean
    },
    components: {
        CardStudentRating,
        CardFloatButton,
        AddTeacher
    },
    data: () => ({
        myTeams: [],
        estudantes: '',
        idteam: '',
        activeSprint: true,
        grupoAtivo: '',
        loading: false,
        loader: null,
        projectGrupos: '',
        isGrupoDoUsuario: true,
        showButtonScrum: ''
    }),
     watch: {
      loader () {
        const l = this.loader
        this[l] = !this[l]

        setTimeout(() => (this[l] = false), 3000)
      },
    },
    methods: {
        getGruposFromProject(projectID) {
            api.get(`project/${projectID}`).then((response) => {
                this.projectGrupos = response.data.teams;
            });

            this.$emit('select-project', projectID);
        },
        getUserFromTeam(teamID) {
            this.grupoAtivo = teamID;
            api.get(`user-team?idTeam=${teamID}`).then((response) => {
                this.idteam = teamID;
                this.estudantes = response.data;
                this.isGrupoDoUsuario = false;
                for (let i = 0; i < this.estudantes.length; i++) {
                    if(this.userLogged == this.estudantes[i].idUser && teamID == this.estudantes[i].idTeam) {
                        this.isGrupoDoUsuario = true;
                    }
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
        background: rgb(21,36,228);
        background: linear-gradient(38deg, rgba(21,36,228,1) 0%, rgba(45,192,253,1) 100%);
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
        background-image: url('../../public/img/avatar.jpg');
         background-size: cover;
    }

    span {
        color: #000;
        font-weight: bold;
    }
</style>