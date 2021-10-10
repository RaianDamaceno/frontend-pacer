<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="700px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" dark v-bind="attrs" v-on="on">
          Falta Pontuar
        </v-btn>
      </template>

      <v-card>
        <v-card-title>
          <span class="text-h5" id="texto-a-direita">Falta Pontuar</span>
          <v-card-actions>
            <v-btn color="blue darken-1" text @click="dialog = false">
              Fechar
            </v-btn>
          </v-card-actions>
        </v-card-title>

        <v-card-text>
          <v-container>
            <!-- <v-form ref="form">
              <v-row>
                <v-col cols="12">
                  <v-autocomplete
                    :items="this.projects"
                    label="Grupos* "
                    required
                    id="project"
                    item-text="description"
                    item-value="idProject"
                    v-model="formProject"
                  ></v-autocomplete>
                </v-col>
              </v-row>
            </v-form> -->
            <table>
              <thead>
                <!-- <th width="050">CÃ³d</th> -->
                <th width="280">Projeto/Sprint</th>
                <th width="280">Avaliado</th>
                <th width="100"></th>
              </thead>
              <tbody>
                <tr v-for="prop in proprietarios" :key="prop.id">
                  <td width="150">##NomeDoProjeto / NomeDaSprint##</td>  
                  <td width="300">##Nome do Avaliado##</td>
                  <td class="pontuar-links">
                    <button @click="editar(prop)" class="btn_editar">
                      <i>pontuar</i>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer id="texto-a-direita"></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">
            Fechar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import axios from "axios";

export default {
  data: () => ({
    dialog: false,
    projects: [],
    criterias: [],
    formProject: "",
    formCriteria: "",
    formNotaMinima: "",
    formNotaMaxima: "",
    formPesoNota: "",
    proprietarios: [1,2,3,4,5,6]
  }),

  methods: {
    async getPendencias() {
      await axios.get("project").then(
        (response) => {
          this.projects = response.data;
          console.log(response.data);
        },
        (error) => {
          console.log(error);
        }
      );
      console.log(this.projects);
    },
  },
  beforeMount() {
    this.getPendencias();
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

#texto-a-direita {
  flex-grow: 1;
}

th, tr, td {
  border: 0px;
}

th {
    text-align: left;
    padding-left: 5px;
}

td.pontuar-links {
    font-weight: bold;
    float: center;
    text-align: center;
    color: rgb(255, 255, 255);
    background-color: rgb(21, 20, 94);
    border-radius: 10px 4px 10px 4px;
}

td.pontuar-links:hover {
    color: rgb(255, 255, 255);
    background-color: #164809;
    border-radius: 4px 10px 4px 10px;
}


</style>
