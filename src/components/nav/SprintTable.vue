<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      max-width="600px"
    >
     
      <template v-slot:activator="{ on, attrs }">
        <v-btn
            v-bind="attrs"
            v-on="on"
            width="100%"
            class="light-blue darken-3"
            elevation="0"
            x-large
        >
          Sprints Cadastradas
        </v-btn>
      </template>
      

        <v-card>
            <v-card-title>
            <span class="text-h5">Sprints Cadastradas</span>
            </v-card-title>
            <v-card-text>
                <v-list
                three-line
                subheader
                >
                  <v-subheader>Lista de Sprints Cadastradas</v-subheader>
                  <v-data-table editable="true" :headers="headers" :items="sprint" :items-per-page="10" class="elevation-1">
                    
                    

                    <template v-slot:item.initialDate="initialDate">
                      <v-edit-dialog
                        :return-value.sync="initialDate.item.initialDate"
                        @save="save"
                        @cancel="cancel"
                        @open="open"
                        @close="close"
                      >
                        {{ initialDate.item.initialDate }}
                        <template v-slot:input>
                          <v-text-field
                            v-model="initialDate.item.initialDate"
                            label="Edit"
                            single-line
                            counter
                          ></v-text-field>
                        </template>
                      </v-edit-dialog>
                    </template>

                    <template v-slot:item.finalDate="finalDate">
                      <v-edit-dialog
                        :return-value.sync="finalDate.item.finalDate"
                        @save="save"
                        @cancel="cancel"
                        @open="open"
                        @close="close"
                      >
                        {{ finalDate.item.finalDate }}
                        <template v-slot:input>
                          <v-text-field
                            v-model="finalDate.item.finalDate"
                            label="Edit"
                            single-line
                            counter
                          ></v-text-field>
                        </template>
                      </v-edit-dialog>
                    </template>

                    <template v-slot:item.actions="{ item }">
                      <v-icon
                        small
                        @click="deleteItem(item)"
                      >
                        mdi-delete
                      </v-icon>
                    </template>
                  </v-data-table>
                </v-list>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
              color="blue darken-1"
              text
              @click="dialog = false"
              >
              Fechar
              </v-btn>
              <v-btn
              color="blue darken-1"
              text
              @click="submitForm"
              >
              Salvar
              </v-btn>
            </v-card-actions>
        </v-card> 
    </v-dialog>
  </v-row>
    
</template>

<script>
  import api from '../../services/api'
 
  export default {
    data () {
      return {
        dialogEdit:false,
        dialog: false,
        widgets: false,
        sprint: null,
        initialDateNew: '',
        finalDateNew: '',
        projectName: null,
        headers: [
          {
            align: 'start',
            sortable: false,
          },
          { text: 'Nome', value: 'description' },
          { text: 'Data Inicial', value: 'initialDate' },
          { text: 'Data Final', value: 'finalDate' },
          { text: 'Actions', value: 'actions', sortable: false },
        ],
      }
    },
    methods: {
        async submitForm(){
          var errorObj = null;
          this.sprint.forEach(async item => {
            this.initialDateNew = item.initialDate.replaceAll("-","/");
            this.finalDateNew = item.finalDate.replaceAll("-","/");
            const updateSprint = { 
              'idProject': item.idProject,
              'initialDate':  this.initialDateNew.split("/").reverse().join("/"),
              'finalDate':     this.finalDateNew.split("/").reverse().join("/"),
            }
              api.put(`sprint/${item.idSprint}`, updateSprint).then((response) => {
                console.log(response);
              }, (error) => {
                console.log(error);
                errorObj = error
              });
          })
          if(!errorObj){
            this.$store.dispatch("messageSuccess", "Alteração feita com sucesso!")
          }else{
            this.$store.dispatch("messageError", "Erro na atualização!")
          }
          },
       async deleteItem(item){
            const deleteSprint = {
              'id': item.idSprint
            }
            console.log(deleteSprint);
              api.delete(`sprint/${item.idSprint}`, deleteSprint).then((response) => {
                this.$store.dispatch("messageSuccess", "Alteração feita com sucesso!")
              }, (error) => {
                this.$store.dispatch("messageSuccess", "Erro ao deletar a sprint")
              });
    
      }
       
    },
    beforeMount() {
      api.get('sprint').then(response => {
        this.sprint = response.data
        for(let i = 0; i< this.sprint.length; i++){
            api.get(`project/${this.sprint[i].idProject}`).then(response => {
                this.sprint[i].description = response.data.description
            })
        }
      })
    }
  }
</script>

<style scoped lang="scss">
  span {
    color: black;
  }
</style>