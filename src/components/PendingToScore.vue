<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" scrollable max-width="700px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" dark v-bind="attrs" v-on="on">
          Avaliações Pendentes
        </v-btn>
      </template>

      <v-card>
        <v-card-title>
          <span class="text-h5" id="texto-a-direita">Avaliações Pendentes</span>
        </v-card-title>

        <v-btn v-if="this.sprints.length == 0" @click="this.fetchSprints">
          Buscar Sprints
        </v-btn>

        <v-card-text>
          <v-container>
            <v-row v-if="this.sprints.length > 0">
              <div v-for="(item,i) in this.sprints" :key="i">
                <v-col>
                  <v-btn @click="selectSprint(item)">
                    {{maskData(item.initialDate)}} ~ {{maskData(item.finalDate)}}
                  </v-btn>
                </v-col>
              </div>
            </v-row>
            
            <table
              v-if="this.erro"
              border="1px"
              width="500"
              style="color:white; background-color:red"
            >
              <tbody>
                <tr>
                  <td>
                    <strong>{{ this.erro }}</strong>
                  </td>
                </tr>
              </tbody>
            </table>
            <table
              v-if="this.sprintId"
              border="1px"
              width="500"
              style="color:white; background-color:green"
            >
              <tbody>
                <tr>
                  <td>
                    <strong>{{ this.msg }}</strong>
                  </td>
                </tr>
              </tbody>
            </table>
            <table v-if="this.listaResumida.length > 0">
              <thead>
                <th width="200px">Projeto/Sprint</th>
                <th width="30px"></th>
                <th width="390px">Avaliado</th>
                <th width="100px%"></th>
              </thead>
              <tbody>
                <tr v-for="pend in listaResumida" :key="pend.id">
                  <td>{{ maskData(pend.initialDate) }} ~ {{maskData(pend.finalDate) }}</td>
                  <td></td>
                  <td>{{pend.name}}</td>
                  <td class="pontuar-links">
                    <button @click="btnPontuar(pend.completo)">
                      <i> pontuar </i>
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
    listaResumida: [],
    idEvaluator: '',
    sprintId: null,
    erro: null,
    msg: null,
    sprints: [],
  }),
  methods: {
    async selectSprint(sprint) {
      this.sprintId = sprint.idSprint;
      this.getPendencias();
    },
    async fetchSprints() {
      await axios.get(`sprint`)
        .then( response => {
          this.sprints = response.data;
        });
      // this.sprintId = "782274b5-d979-45ec-a8e5-8db9b9ddacbe";
    },
    async getPendencias() {
      await axios.get(`notes-store/pending/${this.idEvaluator}/${this.sprintId}`).then(
        (response) => {
          console.log(`Response pendencias ${response}`);
          this.pendencias = response.data;

          if (this.pendencias && this.pendencias.length > 0) {                      
            let aluno;
            this.pendencias.forEach(element => {
              aluno = {
                name: element.evaluated.name,
                initialDate: element.sprint.initialDate,
                finalDate: element.sprint.finalDate,
                completo: element
              };
              if(this.listaResumida.findIndex( array => array.name === aluno.name ) == -1){
                this.listaResumida.push(aluno);
              }
            });            
          } else {
            this.mostraMsg("Você não tem pendências neste momento!");
          }
        }
      ).catch(error => {
        if (error.response.data.statusCode === 404) {
          this.mostraMsg("Você não possui pendências neste momento.");
        } else {
          this.mostraErro(error.response.data.message,10);
        }
      });

      if (this.pendencias.length == 0) {
        this.mostraMsg("Você não possui pendências neste momento.");
      }
    },
    mostraErro(texto, segundos) {
      this.erro = texto;
      if (texto) {
        if (segundos) {
          setTimeout(() => {
            this.erro = null;
          }, segundos * 1000);
        }
      }
    },
    mostraMsg(texto, segundos) {
      this.msg = texto;
      console.log(texto);
      if (texto) {
        if (segundos) {
          setTimeout(() => {
            this.msg = null;
          }, segundos * 1000);
        }
      }
    },
    maskData(data) {
      return data.substring(8,10) + "." + data.substring(5,7) + "." + data.substring(0,4);
    },
    btnPontuar(aluno){
      this.mostraMsg("Atalho para pontuação não resolvido para esta Sprint! Nome do Aluno: " + aluno.evaluated.name,3);
    },
  },
  mounted() {
    this.idEvaluator = this.$store.state.userId;
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

th,
tr,
td {
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
  border-radius: 4px 10px 4px 10px;
}

td.pontuar-links:hover {
  color: rgb(255, 255, 255);
  background-color: #164809;
  border-radius: 10px 4px 10px 4px;
}
</style>
