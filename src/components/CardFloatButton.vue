<template>
    <v-card id="create">
        <v-speed-dial
            v-model="fab"
            :top="top"
            :bottom="bottom"
            :right="right"
            :left="left"
            :direction="direction"
            :open-on-hover="hover"
            :transition="transition"
            background
        >
        <template v-slot:activator>
            <v-btn
            v-model="fab"
            color="blue darken-2"
            dark
            fab
            small
            >
            <v-icon v-if="fab">
                mdi-close
            </v-icon>
            <v-icon v-else>
                mdi-plus
            </v-icon>
            </v-btn>
        </template>
        <v-btn
            fab
            dark
            small
            color="green"
        >
            <v-icon v-on:click="insertUser">mdi-account-multiple-plus</v-icon>
        </v-btn>
        <v-btn
            fab
            dark
            small
            color="red"
        >
            <v-icon v-on:click="deleteTeam">mdi-delete</v-icon>
        </v-btn>
        </v-speed-dial>
    </v-card>
</template>

<script>
  import api from '../services/api'
  
  export default {
    props: {
         team: String,
    },
    data: () => ({
      direction: 'left',
      fab: false,
      fling: false,
      hover: false,
      tabs: null,
      top: false,
      right: false,
      bottom: false,
      left: true,
      scrumMaster: false,
      user_exist: false,
      id_user: 'e56fbd82-d032-4c90-a7b8-76818c52e948',
      transition: 'slide-y-reverse-transition',
      user_team: null,
      team_values: null,
      sprint_values: null,
      strint_started: false
    }),
    watch: {
      top (val) {
        this.bottom = !val
      },
      right (val) {
        this.left = !val
      },
      bottom (val) {
        this.top = !val
      },
      left (val) {
        this.right = !val
      },
    },
    created() {
      api.get('user-team',  { params: { idTeam: this.team } }).then(response => { 
        this.user_team = response.data;
      }),
      api.get('team',  { params: { idTeam: this.team } }).then(response => { 
        this.team_values = response.data;
      }),
      api.get('sprint',  { params: { idTeam: this.idProject } }).then(response => { 
        this.sprint_values = response.data;
      })
    },
    methods: {
      deleteTeam: async function() {
        if(this.user_team.length > 0) {
          for(let i = 0; i < this.user_team.length; i++) {
            api.delete('user-team',  { params: { idTeam: this.team, idUser: this.user_team[i].idUser } })
          }
        }
        await this.sleep(3000)
        api.delete(`team/${this.team}`).then(response => { 
          response.status === 200 ? alert("Time deletado com sucesso") : alert("Erro ao deletar time")
        })
      },
      sleep: function(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
      },
      insertUser: function(){
        var full_day = ''
        let UserTeamPayload = null
        var currentDate = new Date()
        var day = currentDate.getDate()
        var month = currentDate.getMonth() + 1
        var year = currentDate.getFullYear()

        if (currentDate.getDate() < 10){
          full_day = (year + "-" + month + "-0" + day);
        }else{
          full_day = (year + "-" + month + "-" + day);
        }     

        if(this.user_team.length > 0) {
          for(let i = 0; i < this.user_team.length; i++) {
              if(this.sprint_values[i].initialDate <= full_day){
                this.strint_started = true
              }
              if(this.user_team[i].idUser == this.id_user){
                this.user_exist = true;
              }
              if(this.user_team[i].isScrumMaster == true){
                this.scrumMaster = true;
              }
            }
          }

        if(this.strint_started == false){
          if(this.user_exist == false){
            if(this.scrumMaster == false) {
                  UserTeamPayload = {
                  "idUser": this.id_user,
                  "idTeam": this.team,
                  "isScrumMaster": true, //this.selectUsuario[i].idUser == this.scrumID.idUser ? true : false,
                  "snActivated": "S"
                  }
              } else {
                  UserTeamPayload = {
                  "idUser": this.id_user,
                  "idTeam": this.team,
                  "isScrumMaster": false,
                  "snActivated": "S"
                  }
              }
            //api.post("user-team", UserTeamPayload)
          }else{
            UserTeamPayload = {
                  "idUser": this.id_user,
                  "idTeam": this.team,
                  "isScrumMaster": false,
                  "snActivated": "S"
                  }
            console.log(UserTeamPayload)
            alert("Você já faz parte desta equipe!");
          }
        }else{
          alert("Você não pode se juntar a este time, sprint ja iniciada")
        }
      }
    }
}
</script>

<style>
  .theme--light.v-sheet #create {
    background: rgb(2,0,36);
    background: linear-gradient(47deg, rgba(13,44,82,1) 31%, rgba(90,26,159,1));
  }
  #create .v-speed-dial {
    position: relative;
  }

  #create .v-btn--floating {
    position: relative;
  }
</style>