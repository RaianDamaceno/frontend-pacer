<template>
    <div>
        <h2> Meus Projetos </h2>
        <br>
        <v-expansion-panels focusable>
            <v-expansion-panel
                v-for="Projeto in Projetos"
                :key="Projeto.idProject"
            >
            <v-expansion-panel-header> <h3>{{ Projeto.description}} </h3></v-expansion-panel-header>
            <v-expansion-panel-content>

            <v-expansion-panels focusable>
                <br>  
                <v-expansion-panel
                    v-for="Team in Teams"
                    :key="Team.idTeam"
                >
                                 
                <v-expansion-panel-header> 
                      <h3>  Grupo: {{ Team.teamName }} </h3> 
                    </v-expansion-panel-header>
                <v-expansion-panel-content>
                    <div>
                        <v-slide-group class="pa-4" center-active show-arrows>
                        <v-slide-item
                            v-for="estudante in Estudantes"
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
                                        <span> {{ estudante.name }} </span>
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

<script lang="ts">
  import Vue from 'vue'
  import api from '../services/api'

  export default Vue.extend({
    name: 'Projetos',
    props: {
        Projetos: Array,
        Teams: Array,
        Estudantes: Array,
        notasFeitas: Array,
        userLogged: String
    },
    data: () => ({
        myTeams: [],
        activeSprint: ''
    }),
    methods: {
        checkUserTeam: function() {
            // api.get('user-team').then(response => {
            //     this.myTeams = response.data.filter(function(el) {
            //         return el.idUser == this.userLogged;
            //     });
            // })

            console.log(this.myTeams)
        }
    }
  })
</script>

<style scoped lang="scss">

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