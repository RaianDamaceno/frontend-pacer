<template>
  <div>
    <v-row style="padding-top: 16%; padding-left: 90%">
      <v-dialog v-model="dialog" max-width="500px">
        <template v-slot:activator="{ on, attrs }">
          <div class="text-xs-center">
            <v-btn fab dark small color="primary" v-bind="attrs" v-on="on">
              <v-icon> mdi-redhat </v-icon>
            </v-btn>
          </div>
        </template>

        <v-card>
          <v-card-title v-if="!this.alteracao">
            <span class="text-h5">Adicionar Professor Avaliador</span>
          </v-card-title>
          <v-card-title v-else>
            <span class="text-h5">Alteração de Professor Avaliador</span>
          </v-card-title>

          <v-card-text>
            <v-container>
              <v-form ref="form">
                <!-- PROJETO -->
                <v-col>
                  <v-autocomplete
                    label="Projeto"
                    v-model="projetoId"
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

                <!-- PROFESSOR -->
                <v-col>
                  <v-select
                    v-model="professorSelecionado"
                    :items="teachers"
                    item-text="name"
                    return-object
                    dense
                    :menu-props="{ maxHeight: '400' }"
                    label="Professor(a)"
                    row-height="6"
                  ></v-select>
                </v-col>

                <!-- INATIVO -->
                <v-col>
                  <v-checkbox
                    v-if="this.alteracao"
                    label="Inativo"
                    color="primary"
                    v-model="inativo"
                    dense
                    row-height="1"
                  >
                  </v-checkbox>
                </v-col>
              </v-form>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="close()"> Fechar </v-btn>
            <v-btn color="blue darken-1" text @click="showTeacherName">
              Salvar
            </v-btn>
          </v-card-actions>

          <!-- LISTA DE PROFESSORES -->
          <v-card-text>
            <v-container>
              <table v-if="this.listaProfessoresDoProjeto.length > 0">
                <thead>
                  <th width="200px" style="text-align: left">Professor(a)</th>
                  <th width="200px" style="text-align: center">Situação</th>
                  <th width="200px" style="text-align: center"></th>
                </thead>
                <tbody>
                  <tr
                    v-for="prof in listaProfessoresDoProjeto"
                    :key="prof.user.name"
                  >
                    <td style="text-align: left">
                      {{ prof.user.name }}
                    </td>
                    <td
                      v-if="prof.snActivated === 'S'"
                      style="text-align: center"
                    >
                      ativo
                    </td>
                    <td v-else style="text-align: center; color: red">
                      inativo
                    </td>
                    <td>
                      <button @click="editProfessor(prof)" class="btn_editar">
                        <i>editar</i>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </v-container>
          </v-card-text>
          <!-- LISTA DE PROFESSORES -->
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>

<script>
import api from "../services/api";
export default {
  props: {
    projetoId: String,
  },
  data: () => ({
    dialog: false,
    projects: [],
    teachers: [],
    listaProfessoresDoProjeto: [],
    alteracao: false,
    /** Variables to inputs */
    professorSelecionado: null,
    inativo: false,
  }),
  methods: {
    resetValues() {
      this.professorSelecionado = null;
      this.inativo = false;
      this.alteracao = false;
      this.getProjects();
      this.getTeachers();
      this.getProjectProfessores();
    },
    editProfessor(prof) {
      this.alteracao = true;
      this.professorSelecionado = prof.user;
      this.inativo = prof.snActivated !== "S";
    },
    close() {
      this.resetValues();
      this.dialog = false;
    },
    getProjectProfessores() {
      api
        .get(`project-user/idproject/${this.projetoId}`)
        .then((response) => {
          this.listaProfessoresDoProjeto = response.data;
        })
        .catch((error) => {
          this.$store.dispatch("messageError", error.response.data.message);
        });
    },
    getTeachers() {
      api.get("user").then((response) => {
        this.teachers = response.data.filter(function (el) {
          return el.role == "TCH";
        });
      });
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
    async showTeacherName() {
      //Projeto preenchido
      if (this.projetoId.replaceAll(" ", "").length === 0) {
        this.$store.dispatch("messageError", "Informe um projeto !");
        return;
      }
      
      let payload = {
        idProject: this.projetoId,
        idUser: this.professorSelecionado.idUser,
        optional: true,
        snActivated: this.inativo ? "N" : "S",
      };
      if (this.alteracao) {
        await api
          .patch("project-user", payload)
          .then(() => {
            this.resetValues();
            this.getProjectProfessores();
            this.$store.dispatch(
              "messageSuccessFast",
              "Professor alterado com sucesso!"
            );
          })
          .catch((error) => {
            this.$store.dispatch("messageError", error.response.data.message);
          });
      } else {
        payload.snActivated = "S";
        await api
          .post("project-user", payload)
          .then(() => {
            this.resetValues();
            this.getProjectProfessores();
            this.$store.dispatch(
              "messageSuccess",
              "Professor adicionado com sucesso!"
            );
          })
          .catch((error) => {
            this.$store.dispatch("messageError", error.response.data.message);
          });
      }
      this.resetValues();
    },
  },
  mounted() {
    this.resetValues();
    this.getProjectProfessores();
  },
};
</script>
