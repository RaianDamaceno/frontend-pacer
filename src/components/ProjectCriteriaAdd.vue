<template>
  <div>
    <v-row style="padding-top: 16%">
      <v-dialog v-model="dialog" scrollable max-width="600px">
        <template v-slot:activator="{ on, attrs }">
          <div class="text-xs-center">
            <v-btn fab dark small color="primary" v-bind="attrs" v-on="on">
              <v-icon> mdi-microsoft-teams </v-icon>
            </v-btn>
          </div>
        </template>

        <v-card>
          <v-card-title v-if="this.formId === ''">
            <span class="text-h5">Adicionar Critério ao Projeto</span>
          </v-card-title>
          <v-card-title v-else>
            <span class="text-h5">Alteração de Critério do Projeto</span>
          </v-card-title>

          <v-card-text>
            <v-container>
              <v-form ref="form">
                <!-- PROJETO -->
                <v-row>
                  <v-col>
                    <v-autocomplete
                      label="Projeto"
                      v-model="formProject"
                      :items="this.projects"
                      required
                      dense
                      id="project"
                      item-text="description"
                      item-value="idProject"
                      :disabled="true"
                      row-height="6"
                    ></v-autocomplete>
                  </v-col>
                </v-row>

                <!-- CRITERIO -->
                <v-row>
                  <v-col>
                    <v-autocomplete
                      :items="this.criterias"
                      label="Critério *"
                      required
                      dense
                      id="criteria"
                      item-text="descCriteria"
                      item-value="idCriteria"
                      v-model="formCriteria"
                      row-height="6"
                    ></v-autocomplete>
                  </v-col>
                </v-row>

                <!-- NOTAS E PESO -->
                <v-row>
                  <v-col cols="4">
                    <v-text-field
                      label="Nota Mínima"
                      type="number"
                      required
                      id="notaMinima"
                      v-model="formNotaMinima"
                      :min="0"
                      :max="9"
                      row-height="6"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="4">
                    <v-text-field
                      label="Nota Máxima"
                      type="number"
                      required
                      id="notaMaxima"
                      v-model="formNotaMaxima"
                      :min="1"
                      :max="10"
                      row-height="6"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="4">
                    <v-text-field
                      label="Peso"
                      type="number"
                      required
                      id="pesoCriterio"
                      v-model="formPesoNota"
                      :min="1"
                      :max="10"
                      row-height="6"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-checkbox
                  v-if="this.formId !== ''"
                  label="Inativo"
                  color="primary"
                  v-model="formInactive"
                  dense
                  row-height="1"
                >
                </v-checkbox>
                <small dense>* Campos obrigatorios</small>
              </v-form>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="close()"> Fechar </v-btn>
            <v-btn color="blue darken-1" text @click="validate()">
              Salvar
            </v-btn>
          </v-card-actions>

          <v-divider></v-divider>

          <v-card-text>
            <v-container>
              <table v-if="this.formProjectCriterias.length > 0">
                <thead>
                  <th width="200px" style="text-align: left">Critérios</th>
                  <th width="100px" style="text-align: center">Notas (Peso)</th>
                  <th width="120px" style="text-align: center">Situação</th>
                  <th width="090px" style="text-align: center"></th>
                </thead>
                <tbody>
                  <tr
                    v-for="crit in this.formProjectCriterias"
                    :key="crit.criteria.descCriteria"
                  >
                    <td style="text-align: left">
                      {{ crit.criteria.descCriteria }}
                    </td>
                    <td style="text-align: center">
                      {{ crit.minGrade }} a {{ crit.maxGrade }} (
                      {{ crit.gradeWeight }} )
                    </td>
                    <td
                      v-if="crit.snActivated == 'S'"
                      style="text-align: center"
                    >
                      ativo
                    </td>
                    <td v-else style="text-align: center; color: red">
                      inativo
                    </td>
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
    </v-row>
  </div>
</template>

<script>
import api from "@/services/api";

export default {
  name: "project-criteria",
  props: {
    formProject: String,
  },
  data: () => ({
    dialog: false,
    projects: [],
    criterias: [],
    /** Variables to inputs */
    formId: "",
    formCriteria: "",
    formNotaMinima: "",
    formNotaMaxima: "",
    formPesoNota: "",
    formInactive: false,
    /** Projects´s criterias list */
    formProjectCriterias: [],
  }),
  methods: {
    resetValues() {
      this.formId = "";
      this.formCriteria = "";
      this.formNotaMinima = "0";
      this.formNotaMaxima = "3";
      this.formPesoNota = "1";
      this.formInactive = false;
      this.fetchProjectCriterias();
      this.getCriterias();
    },
    async getProjects() {
      await api.get("project").then(
        (response) => {
          this.projects = response.data;
        },
        (error) => {
          console.log(error);
        }
      );
    },
    async getCriterias() {
      await api.get("criteria").then(
        (response) => {
          this.criterias = response.data;
        },
        (error) => {
          console.log(error);
        }
      );
    },
    // Validação dos dados
    validate() {
      //Projeto preenchido
      if (this.formProject.replaceAll(" ", "").length === 0) {
        this.$store.dispatch("messageError", "Informe um projeto !");
        document.getElementById("project").focus();
        return;
      }

      //Critério preenchido
      if (this.formCriteria.replaceAll(" ", "").length === 0) {
        this.$store.dispatch("messageError", "Informe um critério !");
        document.getElementById("criteria").focus();
        return;
      }

      //Faixa de Nota Mínima
      if (this.formNotaMinima % 1 !== 0) {
        this.$store.dispatch(
          "messageError",
          "Nota mínima tem que ser inteira!"
        );
        this.formNotaMinima = "";
        document.getElementById("notaMinima").focus();
        return;
      }

      if (this.formNotaMinima < 0 || this.formNotaMinima > 9) {
        this.$store.dispatch(
          "messageError",
          "Nota mínima tem que estar na faixa de 0 a 9 !"
        );
        this.noformNotaMinimataMinima = "";
        document.getElementById("notaMinima").focus();
        return;
      }

      //Faixa de Nota Máxima
      if (this.formNotaMaxima % 1 !== 0) {
        this.$store.dispatch(
          "messageError",
          "Nota máxima tem que ser inteira!"
        );
        this.formNotaMaxima = "";
        document.getElementById("notaMaxima").focus();
        return;
      }

      if (this.formNotaMaxima < 1 || this.formNotaMaxima > 10) {
        this.$store.dispatch(
          "messageError",
          "Nota mínima tem que estar na faixa de 0 a 9 !"
        );
        this.formNotaMaxima = "";
        document.getElementById("notaMaxima").focus();
        return;
      }

      //Nota Mínima < Nota Máxima
      if (this.formNotaMaxima < this.formNotaMinima) {
        this.$store.dispatch(
          "messageError",
          "Nota máxima menor que a nota mínima !"
        );
        this.formNotaMaxima = "";
        this.formNotaMinima = "";
        document.getElementById("notaMinima").focus();
        return;
      }

      //Faixa de Peso
      if (this.formPesoNota % 1 !== 0) {
        this.$store.dispatch(
          "messageError",
          "Peso da Nota tem que ser inteiro !"
        );
        this.formPesoNota = "";
        document.getElementById("pesoCriterio").focus();
        return;
      }

      if (this.formPesoNota < 1) {
        this.$store.dispatch(
          "messageError",
          "Peso da Nota tem que ser no mínimo 1 !"
        );
        this.formNotaMaxima = "";
        document.getElementById("notaMaxima").focus();
        return;
      }

      //Salvando...
      this.$store.dispatch("messageAlert", "Salvando critério no projeto...");
      this.saveProjectCriteria();
    },
    fetchProjectCriterias() {
      this.formProjectCriterias = null;
      api
        .get(`criteria-project/${this.formProject}`)
        .then((response) => {
          this.formProjectCriterias = response.data;
        })
        .catch((error) => {
          console.log(error.response.data.message);
          this.formProjectCriterias = [];
        });
      if (!this.formProjectCriterias) this.formProjectCriterias = [];
    },
    close() {
      this.resetValues();
      this.dialog = false;
    },
    saveProjectCriteria() {
      let associateCriteria = {
        idProject: this.formProject,
        idCriteria: this.formCriteria,
        minGrade: parseInt(this.formNotaMinima, 10),
        maxGrade: parseInt(this.formNotaMaxima, 10),
        gradeWeight: parseInt(this.formPesoNota, 10),
        snActivated: "S",
      };

      if (this.formId === "") {
        api
          .post("criteria-project", associateCriteria)
          .then(() => {
            this.resetValues();
            this.$store.dispatch(
              "messageSuccessFast",
              "Novo critério salvo com sucesso!"
            );
          })
          .catch((error) => {
            this.resetValues();
            this.$store.dispatch("messageError", error.response.data.message);
          });
      } else {
        associateCriteria.snActivated = this.formInactive ? "N" : "S";
        api
          .patch("criteria-project", associateCriteria)
          .then(() => {
            this.resetValues();
            this.$store.dispatch(
              "messageSuccessFast",
              "Critério alterado com sucesso!"
            );
          })
          .catch((error) => {
            this.resetValues();
            this.$store.dispatch("messageError", error.response.data.message);
          });
      }
    },
    deleteCriteria(criteria) {
      if (criteria.idCriteria && criteria.idProject) {
        this.$store.dispatch(
          "messageAlert",
          "Aguarde a exclusão do critério..."
        );
        api
          .delete(
            `criteria-project?project=${criteria.idProject}&criteria=${criteria.idCriteria}`
          )
          .then(() => {
            this.fetchProjectCriterias();
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
    editCriteria(crit) {
      if (this.formProject === crit.idProject) {
        this.formId = "1";
        this.formCriteria = crit.idCriteria;
        this.formNotaMinima = crit.minGrade.toString(10);
        this.formNotaMaxima = crit.maxGrade.toString(10);
        this.formPesoNota = crit.gradeWeight.toString(10);
        this.formInactive = crit.snActivated !== "S";
        this.getCriterias();
        this.fetchProjectCriterias();
      } else {
        this.$store.dispatch(
          "messageError",
          "Regisro exibido inválido em conflito com o projeto corrente!"
        );
      }
    },
  },
  beforeMount() {
    this.resetValues();
    this.getProjects();
  },
};
</script>

<style scoped lang="scss">
.card {
  width: 100%;
  height: 100%;
}
.container {
  width: 100%;
  height: 100%;
}
</style>
