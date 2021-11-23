<template>
    <div class="dashboard">
        <div class="dashboard-nav"> 
            <nav-drawer :userLogged="userLogged" 
            :estudantes="allEstudantes" 
            :projetos="this.projetos"
            />
        </div>   
        <div class="dashboard-content">
        <div class="dashboard-content-graficos">
            <div>
                <graph-spider
                    v-if="notasFeitas.length !== 0"
                    :notas="notasFeitas"
                    :sprintSelected="sprintSelected"
                    :user="userLogged"
                    :criterios="criterios"
                />
            </div>
        </div>
        <div class="dashboard-content-projeto">
            <projetos 
                :Projetos="this.projetos" 
                :Teams="this.userTeam"
                :Estudantes="allEstudantes"
                :userLogged="userLogged"
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
    </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import GraphSpider from "../components/GraphSpider.vue";
  import { UserTeam } from '../model/user-team'
  import NavDrawer from "../components/nav/NavDrawer.vue";
  import api from '../services/api'
  import Projetos from "../components/Projetos.vue";

export default Vue.extend({
    name: "Dashboard",
    components: {
        GraphSpider,
        NavDrawer,
        Projetos
    },
     data: () => ({
       criterios: [],
       estudantes: [] as UserTeam[],
       allEstudantes: [],
       grupoAtivo: "",
       grupos: "",
       projetos: [],
       teams: [],
       sprints: "",
       sprintSelected: "",
       activeSprint: true,
       notasFeitas: [],
       token: '',
       userLogged: '',
       projectGrupos: '',
       haveSM: false,
       idteam: "",
       isAluno: false,
       showButtonScrum: false,
       minhaAvaliação:[],
       UserLoggedTeam: '',
       userTeam: '',
       userProjeto:[]
     }),
     beforeMount() {
        api.get('user').then(response => {
            this.allEstudantes = response.data.filter(function(el) {
              return el.role == "USR";
            });

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
        this.getUserTeam(this.userLogged)
    },
    methods: {
        getGruposFromProject(projectID) {
            api.get(`project/${projectID}`).then((response) => {
                this.projectGrupos = response.data.teams;
            });
        },
        update2SM: async function() {
            let payload = {
                isScrumMaster: true,
            };
            await api.patch(`user-team?idUser=${this.userLogged}&idTeam=${this.idteam}`,
                    payload
                ).then(() => {
                    this.showButtonScrum = false;
                    alert("Parabéns, agora você é Scrum Master!");
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
        getUserTeam(user) {
            api.get('user-team').then(response => {
                 this.userTeam = response.data.filter(function(el) {
                     return el.idUser == user;
                });
            })
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
    .dashboard {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        height: 100%;
        width: 100%;
        background-image: url('../../public/img/bg_login.jpg');
    }

    .dashboard-nav {
        display: flex;
        height: 100%;
        width: 18%;
    }

    .dashboard-content {
        display: flex;
        height: 100%;
        width: 82%;
        flex-direction: column;
        justify-content: space-around;
    }

    .dashboard-content-graficos {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        height: 35%;
        width: 100%; 
    }

    .dashboard-content-graficos div {
        height: 100%;
        width: 48%;
        padding: 5px;
    }

    .dashboard-info {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        height: 30%;
    }

    button {
        background: rgba(86, 116, 186, 1);
        width: 300px;
        color: #fff;
        border-radius: 100px;
    }
</style>