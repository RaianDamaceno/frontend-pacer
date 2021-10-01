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
                  <div class="card-rating">
                     <div v-for="criterio in criterios" :key="criterio.id">
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
               <card-toast-validation text="Avaliação enviada com sucesso"/>
            </v-card-actions>
         </v-card>
      </v-dialog>
   </v-row>
</template>

<script>
   import CardToastValidation from './CardToastValidation.vue'

   export default {
      name:'CardStudentRating',
      props: {
         criterios: Array,
         nome: String
      },
      components: {
         CardToastValidation 
      },
      data () {
         return {
            dialog: false,
            cardProps: false,
            card: false,
            snackbar: false
         }
      },
   }
</script>

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