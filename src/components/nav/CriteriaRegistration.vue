<template>
  <v-dialog v-model="dialog" width="100%">
    <template v-slot:activator="{ on, attrs }">
        <v-btn
            v-bind="attrs"
            v-on="on"
            width="100%"
            class="light-blue darken-3"
            elevation="0"
            x-large
            >
            Criterios
        </v-btn>
    </template>
    <v-card>
      <v-card-title v-if="this.id === ''">Cadastrar Novo Critério de Avaliação</v-card-title>
      <v-card-title v-else               >Alterar Critério de Avaliação</v-card-title>
      <v-divider></v-divider>

      <v-card-text>

        <div class="d-flex justify-left" id="descCriteria">
          <v-text-field label="Descrição" 
                        v-model="descriptionInput" 
                        hint="Descrição breve do critério" 
                        counter="30" 
                        @keyup.native.enter="validate">
          </v-text-field>
        </div>

        <div class="d-flex justify-left" id="obs">
          <v-textarea label="Explicação" v-model="obs"
           auto-grow 
           dense 
           clearable
           hint="Explicação sobre a que este critério se refere" 
           counter="500" 
           row-height="6">
          </v-textarea>
        </div>

        <div v-if="this.id !== ''" class="d-flex justify-left">
          <v-checkbox label="Inativo" color="primary" v-model="inactive" dense>
          </v-checkbox>
        </div>

      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text v-on:click="validate">Salvar</v-btn>
        <v-btn color="blue darken-1" text @click="close()">Fechar</v-btn>
      </v-card-actions>

      <v-divider></v-divider>

      <v-card-text>
        <v-container>
          <table v-if="this.listCriteria.length > 0">
            <thead>
              <th width="200px" style="text-align: center">Critério</th>
              <th width="80px" style="text-align: center">Situação</th>
              <th width="120px" style="text-align: center"></th>
            </thead>
            <tbody>
              <tr v-for="crit in listCriteria" :key="crit.descCriteria">
                <td style="text-align: center">{{ crit.descCriteria }}</td>
                <td v-if="crit.snAtivo == 'S'" style="text-align: center">
                  ativo
                </td>
                <td v-else style="text-align: center; color: red">inativo</td>
                <td>
                  <button @click="editCriteria(crit)" class="btn_editar">
                    <i>editar</i>
                  </button>
                  <span> </span>
                  <button @click="deleteCriteria(crit)" class="btn_excluir">
                    <i>&nbsp;excluir</i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </v-container>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
<script lang="ts">
import api from "@/services/api";
import Vue from "vue";

export default Vue.extend({
  name: "CriteriaRegis",
  data: () => ({
    dialog: false,
    /**Variables to inputs */
    id: "",
    descriptionInput: "",
    obs: "",
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
      if (this.id === "") {
        api
          .post("criteria", {
            descCriteria: this.descriptionInput,
            obs: this.obs,
            snAtivo: "S",
          })
          .then(() => {
            this.fetchCriterias();
            this.resetValues();
            this.$store.dispatch(
              "messageSuccess",
              "Novo critério salvo com sucesso!"
            );
            document.getElementById("descCriteria")?.focus();
          })
          .catch((error) => {
            this.$store.dispatch("messageError",error.response.data.message);
          });
      } else {
        api
          .put("criteria/" + this.id, {"descCriteria": this.descriptionInput,
                                       "obs": this.obs,
                                       "snAtivo": this.inactive ? "N" : "S"} )
          .then(() => {
            this.fetchCriterias();
            this.resetValues();
            this.$store.dispatch(
              "messageSuccess",
              "Critério alterado com sucesso!"
            );
            document.getElementById("descCriteria")?.focus();
          })
          .catch((error) => {
            this.$store.dispatch("messageError",error.response.data.message);
          });
      }
    },
    deleteCriteria(criteria) {
      this.$store.dispatch("messageAlert", "Aguarde a exclusão do critério...");
      if (criteria.idCriteria) {
        api
          .delete("criteria/" + criteria.idCriteria)
          .then(() => {
            this.fetchCriterias();
            this.$store.dispatch(
              "messageSuccess",
              "Critério excluído com sucesso!"
            );
            this.resetValues();
          })
          .catch((error) => {
            this.$store.dispatch("messageError", error.response.data.message);
          });
      } else {
        this.$store.dispatch("messageError", "Nenhum registro foi excluído!");
      }
    },
    editCriteria(criteria) {
      this.id = criteria.idCriteria;
      this.descriptionInput = criteria.descCriteria;
      this.obs = criteria.obs;
      this.inactive = criteria.snAtivo !== "S";
      document.getElementById("descCriteria")?.focus();
    },
    resetValues: function (): void {
      this.id = "";
      this.descriptionInput = "";
      this.obs = "";
      this.inactive = false;
    },
    fetchCriterias() {
      api
        .get("criteria")
        .then((response) => {
          this.listCriteria = response.data;
        })
        .catch((error) => {
          this.$store.dispatch("messageError", error.response.data.message);
        });
    },
    close() {
      this.resetValues();
      this.dialog = false;
    },
  },
  beforeMount() {
    this.fetchCriterias();
  },
  mounted() {
    // let self = this;
    // window.addEventListener("keyup", function (event) {
    //   if (event.keyCode === 13) {
    //     self.saveCriteria();
    //   }
    // });
  },
});
</script>

<style>
.btn_editar {
  float: left;
  color: rgb(48, 116, 21);
}

.btn_editar:hover {
  font-weight: bold;
}

.btn_excluir {
  float: right;
  color: rgb(167, 49, 40);
}

.btn_excluir:hover {
  font-weight: bold;
}
</style>
