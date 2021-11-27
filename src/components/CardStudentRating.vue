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
                     <div class="card-person-image">
                     </div>
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
                              color="deep-orange accent-3"
                              v-on:change="vChange(criterio.idCriteria, criterio.rating)"
                              dense
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
                              color="deep-orange accent-3"
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
import api from "../services/api";

export default {
    name: "CardStudentRating",
    props: {
        criterios: Array,
        nome: String,
        estudanteID: String,
        sprintID: String,
        notasFeitas: Array,
        idEvaluator: String,
        idGroup: String,
    },
    components: {},
    data() {
        return {
            dialog: false,
            cardProps: false,
            card: false,
            snackbar: false,
            note: null,
            idSelectedCriteria: null,
            teste: [],
            update: [],
            rating: {},
            flagRating: false,
            notasFeitasAvaliador: [],
        };
    },
    created() {
        for (let i = 0; i < this.notasFeitas.length; i++) {
            if (
                this.notasFeitas[i].idEvaluator == this.idEvaluator &&
                this.notasFeitas[i].idEvaluated == this.estudanteID &&
                this.notasFeitas[i].idGroup === this.idGroup
            ) {
                this.flagRating = true;
                this.notasFeitasAvaliador.push(this.notasFeitas[i]);
            } else {
                this.flagRating == false;
            }
        }

        api.post("notes-store", payload).then(response => {
            this.$store.dispatch("messageSuccess", "Nota Cadastrada Com sucesso");
        }).catch(error => {
          this.$store.dispatch("messageError", "Ocorreu um erro ao realizar o cadastro das Notas");
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
            this.$store.dispatch("messageSuccess", "Nota Atualizada Com sucesso");
          }
        }).catch(error => {
          this.$store.dispatch("messageError", "Ocorreu um erro ao realizar a atualização das Notas");
        });
      }
    }
  }
} 
</script>

<style>
   span {
      color: #fff;
   }
   #slider {
      background-color: #fff !important;
   }
   .card {
    background: rgb(52,66,252);
    background: linear-gradient(38deg, rgba(52,66,252,1) 0%, rgba(99,203,246,1) 100%);
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
        background-image: url('../../public/img/avatar.jpg');
    }

.card-rating {
    min-height: 300px;
    width: 100%;
}

.color__text {
    color: #fff;
}
</style>
