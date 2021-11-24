<template>
    <v-btn
      depressed
      color="error"
      @click="DeleteUserData"
    >
      Apagar informações sensíveis
    </v-btn>
</template>

<script>
  import api from '../services/api'
  export default {
    data: () => ({
        idUser: '',
    }),
    methods: {
        async DeleteUserData(){
            await api.post(`user/wipe-data/${this.idUser}`).then(response => {
            alert("Informações removidas com sucesso");
            window.location.reload(true);
            }).catch(error =>{
                alert("Erro ao remover informações");
            })
        }
    },
    mounted() {
        this.idUser = this.$store.getters.getUserId;
    },
  }
</script>
