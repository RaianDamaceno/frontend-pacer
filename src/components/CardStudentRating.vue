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
               color="accent"
               small                 
               fab
               v-bind="attrs"
               v-on="on"
               @click="showCard"
               >
               <v-icon>mdi-plus</v-icon>
            </v-btn>
         </template>
         <v-card class="card">
            <v-card-title class="text-h5">
               John Doe
            </v-card-title> 
            <div>
               <div>
                  <div class="card-person">
                     <div class="card-person-image"></div>
                  </div>
                  <div class="card-rating">
                     <div>
                        <v-slider
                           v-model="time"
                           :tick-labels="labels"
                           always-dirty
                           class="mx-5"
                           min="0"
                           max="100"
                           thumb-label="always"
                           label="Proatividade"
                           color="green darken-1"
                           />

                    </div>
                     <div>
                        <v-slider
                           v-model="time"
                           :tick-labels="labels"
                           always-dirty
                           class="mx-5"
                           min="0"
                           max="100"
                           thumb-label="always"
                           label="Execução"
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
               <v-btn
                  color="green darken-1"
                  text
                  @click="dialog = false"
                  >
                  Salvar
               </v-btn>
            </v-card-actions>
         </v-card>
      </v-dialog>
   </v-row>
</template>
<script>
  export default {
    data () {
      return {
        dialog: false,
        cardProps: false,
        card: false,
        snackbar: false
      }
    },
    methods: {
        showCard: function() {
            this.card = true
        },
        hideCard: function() {
                this.card = false;
        },
        showSnackbar: function() {
            this.snackbar = true
            this.card = false
        }
    }
  }
</script>

<style scoped lang="scss">
   .card {
      background: rgb(2,0,36);
      background: linear-gradient(47deg, rgba(2,0,36,1) 0%, rgba(13,44,82,1) 31%, rgba(90,26,159,1) 97%);
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
</style>