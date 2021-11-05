<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      max-width="600px"
    >
     
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          class="black--text"
          color="white"
          dark
          v-bind="attrs"
          v-on="on"
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
                  <v-data-table editable="true" :headers="headers" :items="teste" :items-per-page="10" class="elevation-1">
                    
                    

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
                            :rules="[max25chars]"
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
                            :rules="[max25chars]"
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
  import axios from 'axios'
  import api from '../services/api'
 

  export default {
    data () {
      return {
        dialogEdit:false,
        dialog: false,
        widgets: false,
        teste: null,
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
          this.teste.forEach(async item => {
            this.initialDateNew = item.initialDate.replaceAll("-","/");
            this.finalDateNew = item.finalDate.replaceAll("-","/");
            const updateSprint = { 
              'idProject': item.idProject,
              'initialDate':  this.initialDateNew.split("/").reverse().join("/"),
              'finalDate':     this.finalDateNew.split("/").reverse().join("/"),
            }
            console.log(updateSprint);
            console.log(item.idSprint);
            await axios.put(`http://localhost:3000/sprint/${item.idSprint}`, updateSprint).then((response) => {
                console.log(response);
              }, (error) => {
                console.log(error);
                errorObj = error
              });
          })

          if(!errorObj){
            alert("Alteração feita com sucesso!");
          }else{
            alert("Erro na atualização!");
          }
          },

       async deleteItem(item){
            const deleteSprint = {
              'id': item.idSprint
            }
            console.log(deleteSprint);
          await axios.delete(`http://localhost:3000/sprint/${item.idSprint}`, deleteSprint).then((response) => {
                alert("Sprint deletada com sucesso");
              }, (error) => {
                console.log(error);
                alert("Erro no delete");
              });
    
      }
       
    },

    beforeMount() {
      api.get('sprint').then(response => {
        this.teste = response.data
        for(let i = 0; i< this.teste.length; i++){
            api.get(`project/${this.teste[i].idProject}`).then(response => {
                this.teste[i].description = response.data.description
            })
        }
        console.log(this.teste);
      })
    }
  }
</script>