<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" scrollable max-width="700px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" dark v-bind="attrs" v-on="on">
          Cadastro de Projeto
        </v-btn>
      </template>

      <v-card>
        <v-card-title>
          <span class="text-h5">Cadastro de Projeto</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-form ref="form">
              <v-row>
                <v-col cols="12" sm="6">
                  Periodo do projeto
                  <v-date-picker v-model="formDates" locale="pt-br" range>
                  </v-date-picker>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="dateRangeText"
                    label="Período"
                    prepend-icon="mdi-calendar"
                    readonly
                  ></v-text-field>
                  <v-text-field
                    label="Descrição"
                    type="text"
                    required
                    id="Description"
                    v-model="Description"
                  ></v-text-field>
                  <v-autocomplete
                    :items='this.formats'
                    label="Formato de Avaliação"
                    required
                    id="evaluationFormat"
                    item-text="evaluationFormat"
                    item-value="evaluationFormat"
                    v-model="evaluationFormat"
                  ></v-autocomplete>
                </v-col>
              </v-row>
            </v-form>
          </v-container>
          <small>*Campos obrigatorios</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">
            Fechar
          </v-btn>
          <v-btn color="blue darken-1" text @click="submitForm">
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
  data: () => ({
    dialog: false,
    formDates: [""],
    initialDate: "",
    finalDate: "",
    initialDateNew: "",
    finalDateNew: "",
    Description: "",
    evaluationFormat: "",
    formats: [],
  }),

  computed: {
    dateRangeText() {
      return this.formDates.join(" ~ ");
    },
  },

  methods: {
    async submitForm() {
      this.dialog = false;
      this.initialDateNew = this.formDates[0].replaceAll("-", "/");
      this.finalDateNew = this.formDates[1].replaceAll("-", "/");
      console.log(this.initialDateNew);
      const CreateProject = {
        openingDate: this.initialDateNew
          .split("/")
          .reverse()
          .join("/"),
        closeDate: this.finalDateNew
          .split("/")
          .reverse()
          .join("/"),
        description: this.Description,
        evaluationFormat: this.evaluationFormat.charAt(0,1), //Será T ou U.
      };
      console.log(this.initialDateNew);
      console.log(this.CreateProject);
      await api.post("project", CreateProject).then(
        (response) => {
          console.log(response.data);
          alert("Cadastro feito com sucesso");
        },
        (error) => {
          console.log(error);
          alert("Erro no cadastro");
        }
      );
      this.$refs.form.reset();
    },
  },
  beforeMount() {
    this.formats.push("Todos avaliam todos","Um colega avalia o outro");
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
