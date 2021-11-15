<template>
  <v-dialog v-model="dialog" scrollable max-width="500px" >
    <template v-slot:activator="{ on, attrs }">
      <v-btn class="black--text" color="white" dark v-bind="attrs" v-on="on">
        Novos Critérios
      </v-btn>
    </template>
    <v-card>
      <v-card-title>Cadastrar Novo Critério de Avaliação</v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <div class="d-flex justify-center">
          <v-text-field label="Descrição" v-model="descriptionInput">
          </v-text-field>
        </div>

        <div class="d-flex justify-center">
          <v-col>
            <v-spacer></v-spacer>
            <v-row align="center" class="ml-1">
              <v-btn elevation="2" class="mr-4" v-on:click="validate">
                Salvar
              </v-btn>
              <v-checkbox label="Inativo" color="primary" v-model="inactive">
              </v-checkbox>
            </v-row>
          </v-col>
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
<script lang="ts">
import api from "@/services/api";
import Vue from "vue";
import { mapActions } from "vuex";

export default Vue.extend({
  name: "CriteriaRegis",
  data: () => ({
    dialog: false,
    /**Variables to inputs */
    descriptionInput: "",
    inactive: false,
    /**Criteria List */
    listCriteria: [],
  }),
  methods: {
    validate: function (): void {
      if (this.descriptionInput.replaceAll(" ", "").length === 0) {
        this.$store.dispatch("messageError", "Informe uma descrição!");  
        return;
      }
      this.$store.dispatch("messageAlert", "Aguarde o envio dos dados...");
      this.saveCriteria();
    },
    saveCriteria: function (): void {
      api
        .post("criteria", {
          descCriteria: this.descriptionInput,
          snAtivo: this.inactive ? "1" : "0",
        })
        .then((response) => {
          this.$store.dispatch("messageSuccess","Novo critério salvo com sucesso!");
        })
        .catch((error) => {
          this.$store.dispatch("messageError","Ocorreu um erro ao salvar este critério!");
        });
    },
    resetValues: function (): void {
      this.descriptionInput = "";
      this.inactive = false;
    },
  },
});
</script>
