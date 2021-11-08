<template>
   <v-row justify="center" color="primary" >
       
      <v-dialog
         v-model="dialog"
         persistent
         max-width="400"
         overlay-color: red
         >
         <template v-slot:activator="{ on, attrs }">
            <v-btn
               color="red accent-2"
               small                 
               fab
               v-bind="attrs"
               v-on="on"
               @click="card = true"
               right 
               bottom
               absolute
               
               >
               <v-icon>mdi-plus</v-icon>
            </v-btn>
         </template>
         <v-card class="card">
            <v-card-title class="text-h5">
               <span> {{ nome }} </span>
            </v-card-title> 
            <div>
               <div>
                  <div class="card-person">
                     <div class="card-person-image"></div>
                  </div>
                  <div class="card-rating" v-if="!flagRating" >
                     <div
                        v-for="criterio in criterios" 
                        :key="criterio.idCriteria">
                           <v-slider
                              v-model="criterio.rating"
                              always-dirty
                              class="mx-5"
                              id="slider"
                              min="0"
                              max="100"
                              thumb-label="always"
                              :label="criterio.descCriteria"
                              color="green darken-1"
                              v-on:change="vChange(criterio.idCriteria, criterio.rating)"
                              />
                    </div>
                  </div>
                  <div class="card-rating" v-if="flagRating" >
                     <div
                        v-for="nota in notasFeitasAvaliador" 
                        :key="nota.idEvaluation">
                           <v-slider
                              v-model="nota.note"
                              always-dirty
                              class="mx-5"
                              id="slider"
                              min="0"
                              max="100"
                              thumb-label="always"
                              :label="nota.criterio.descCriteria"
                              color="green darken-1"
                              v-on:change="vChangeUpdate(nota.idEvaluation, nota.criterio.idCriteria, nota.note)"
                              />
                    </div>
                  </div>
               </div>
            </div>
            <v-card-actions>
               <v-spacer></v-spacer>
               <v-btn
                  color="green darken-1"
                  text
                  @click="dialog = false"
                  >
                  Fechar
               </v-btn>
               <v-btn
                  color="green darken-1"
                  text
                  @click="ratingEstudant"
                  v-if="!flagRating"
               >
                  Salvar
               </v-btn>
               <v-btn
                  color="green darken-1"
                  text
                  @click="updateRating"
                  v-if="flagRating"
               >
                  Salvar
               </v-btn>
            </v-card-actions>
         </v-card>
      </v-dialog>
   </v-row>
</template>

<script>
import api from '../services/api'

export default {
  name: 'CardStudentRating',
  props: {
    criterios: Array,
    nome: String,
    estudanteID: String,
    sprintID: String,
    notasFeitas: Array
  },
  components: {},
  data() {
    return {
      dialog: false,
      cardProps: false,
      card: false,
      snackbar: false,
      idEvaluator: "e61aaa2c-5cae-4394-b915-3f9fae0e7bc9",
      idGroup: "6aa52af7-7672-48e1-8539-aa72e83c8663",
      note: null,
      idSelectedCriteria: null,
      teste: [],
      update: [],
      rating: {},
      flagRating: false,
      notasFeitasAvaliador: []
    }
  },
  created() {
    for (let i = 0; i < this.notasFeitas.length; i++) {
      if (this.notasFeitas[i].idEvaluator == this.idEvaluator && this.notasFeitas[i].idEvaluated == this.estudanteID) {
        this.flagRating = true
        this.notasFeitasAvaliador.push(this.notasFeitas[i])
      } else {
        this.flagRating == false
      }
    }
  },
  methods: {
    vChange: function (id, rating) {
      this.rating = {
        "id": id,
        "rating": rating
      }
      for (let i = 0; i < this.teste.length; i++) {
        if (this.teste[i].id == id) {
          this.teste.splice(i, 1)
        }
      }
      this.teste.push(this.rating)
    },
    vChangeUpdate: function (idRating, idCriteira, nota) {
      this.rating = {
        "id": idRating,
        "idCriteria": idCriteira,
        "nota": nota
      }
      for (let i = 0; i < this.update.length; i++) {
        if (this.update[i].id == idRating) {
          this.update.splice(i, 1)
        }
      }
      this.update.push(this.rating)
      console.log(this.update)
    },
    ratingEstudant: function () {
      console.log(this.idGroup)
      for (let i = 0; i < this.teste.length; i++) {
        let payload = {
          "idEvaluator": this.idEvaluator,
          "idEvaluated": this.estudanteID,
          "idGroup": this.idGroup,
          "idCriteria": this.teste[i].id,
          "idSprint": this.sprintID,
          "note": this.teste[i].rating,
          "obs": "Teste"
        }
        api.post("notes-store", payload).then(response => {
          if (response.status === 201) {
            alert("Nota Cadastrada Com sucesso")
          } else {
            alert("Ocorreu um erro ao realizar o cadastro das Notas")
          }
        }).catch(error => {
          console.log(error.response);
        });
      }
    },
    updateRating: function () {
      for (let i = 0; i < this.update.length; i++) {
        let payload = {
          "note": this.update[i].nota,
        }
        api.put(`notes-store/${this.update[i].id}`, payload).then(response => {
          if (response.status === 200) {
            alert("Nota Atualiza Com sucesso")
          } else {
            alert("Ocorreu um erro ao realizar a atualização das Notas")
          }
        })
      }
    }
  }
} </script>

<style scoped lang="scss">
   span {
      color: #fff;
   }
   #slider {
      background-color: #fff !important;
   }
   .card {
      background: rgb(226,225,237);
      background: linear-gradient(38deg, rgba(226,225,237,1) 0%,
         rgba(86,116,186,1) 17%, rgba(37,68,117,1) 39%, rgba(24,55,98,1) 45%, 
         rgba(13,44,82,1) 55%, rgba(85,27,154,1) 85%, rgba(90,26,159,1) 97%);
   }
    .card-person {
        height: 200px;
        width: auto;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 10px;
    }

    .card-person-image {
        height: 100%;
        width: 55%;
        border-radius: 50%;
        border: dashed 5px yellow;
        background-color: #fff;
    }

    .card-rating {
        min-height: 300px;
        width: 100%;
    }

    .color__text {
       color: #fff,
    }
</style>