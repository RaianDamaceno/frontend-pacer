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
           Projetos Cadastrados
        </v-btn>
      </template>
      

        <v-card>
            <v-card-title>
            <span class="text-h5">Projetos Cadastrados</span>
            </v-card-title>
            <v-card-text>
                <v-list
                three-line
                subheader
                >
                  <v-subheader>Lista de Projetos Cadastrados</v-subheader>
                  <v-data-table editable="true" :headers="headers" :items="teste" :items-per-page="10" class="elevation-1">
                    
                    <template v-slot:item.description="description">
                      <v-edit-dialog
                        :return-value.sync="description.item.description"
                        @cancel="cancel"
                        @open="open"
                        @close="close"
                      >
                        {{ description.item.description }}
                        <template v-slot:input>
                          <v-text-field
                            v-model="description.item.description"
                            label="Edit"
                            single-line
                            counter
                          ></v-text-field>
                        </template>
                      </v-edit-dialog> 
                    </template>

                    <template v-slot:item.openingDate="openingDate">
                      <v-edit-dialog
                        :return-value.sync="openingDate.item.openingDate"
                        @save="save"
                        @cancel="cancel"
                        @open="open"
                        @close="close"
                      >
                        {{ openingDate.item.openingDate }}
                        <template v-slot:input>
                          <v-text-field
                            v-model="openingDate.item.openingDate"
                            label="Edit"
                            single-line
                            counter
                          ></v-text-field>
                        </template>
                      </v-edit-dialog>
                    </template>

                    <template v-slot:item.closeDate="closeDate">
                      <v-edit-dialog
                        :return-value.sync="closeDate.item.closeDate"
                        @save="save"
                        @cancel="cancel"
                        @open="open"
                        @close="close"
                      >
                        {{ closeDate.item.closeDate }}
                        <template v-slot:input>
                          <v-text-field
                            v-model="closeDate.item.closeDate"
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
        teste: null,
        headers: [
          {
            align: 'start',
            sortable: false,
          },
          { text: 'Nome', value: 'description' },
          { text: 'Data Inicial', value: 'openingDate' },
          { text: 'Data Final', value: 'closeDate' },
          { text: 'Actions', value: 'actions', sortable: false },
        ],
      }
    },
    methods: {
        async submitForm(){
          var errorObj = null;
          this.teste.forEach(async item => {
            const updateProject = {
              'openingDate':  item.openingDate,
              'closeDate':    item.closeDate,
              'description':    item.description
              
            }
            console.log(updateProject);
            await api.patch(`project/${item.idProject}`, updateProject).then((response) => {
                console.log(response);
              }, (error) => {
                console.log(error);
                errorObj = error
              });
          })
          if(!errorObj){
            this.$store.dispatch("messageSuccess", "Alteração realizada com sucesso");
          }else{
            this.$store.dispatch("messageError", "Erro na Atualização");
          }
          },
       async deleteItem(item){
            const updateUser = {
              'id': item.idProject
            }
            console.log(updateUser);
          await api.delete(`project/${item.idProject}`, updateUser).then((response) => {
                this.$store.dispatch("messageSuccess", "Delete feito com sucesso");
              }, (error) => {
                this.$store.dispatch("messageError", "Erro no delete");
              });
      }
    },
    beforeMount() {
      api.get('project').then(response => {
        this.teste = response.data
        
        console.log(this.teste)
      })
    }
  }
</script>

<style scoped lang="scss">
  span {
    color: black !important;
  }
</style>