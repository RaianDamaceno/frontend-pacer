<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="800px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          v-bind="attrs"
          v-on="on"
          width="100%"
          class="light-blue darken-2"
          elevation="0"
          x-large
        >
          <v-icon>>mdi-view-dashboard</v-icon>
          Minha Conta
        </v-btn>
      </template>

      <v-card>
        <v-card-title>
          <span class="text-h5">Atualização de Usuário</span>
        </v-card-title>
        <v-card-text>
          <v-list three-line subheader>
            <v-container>
              <v-form ref="form">
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      :value="user.name"
                      label="Nome"
                      readonly
                      disabled
                    ></v-text-field>
                    <v-text-field
                      :value="user.document"
                      label="Documentos"
                      readonly
                      disabled
                    ></v-text-field>
                    <v-text-field
                      :value="user.login"
                      label="Usuário"
                      readonly
                      disabled
                    ></v-text-field>
                    <v-text-field
                      label="Alterar senha"
                      type="String"
                      v-model="password"
                      outlined
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-form>
            </v-container>
            <small>*Campos obrigatorios</small>
          </v-list>
        </v-card-text>

        <v-card-actions>
          <remove-user-data />
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">
            Fechar
          </v-btn>
          <v-btn color="blue darken-1" text @click="submitForm"> Salvar </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import api from "../../services/api";
import RemoveUserData from "../RemoveUserData.vue";

export default {
  components: { RemoveUserData },
  data() {
    return {
      dialogEdit: false,
      dialog: false,
      widgets: false,
      password: "",
      user: "",
      userID: "",
    };
  },
  mounted() {
    let userId = this.$store.getters.getUserId;
    api.get(`user/${userId}`).then((response) => {
      this.user = response.data;
    });
  },
  methods: {
    submitForm: function () {
      let userId = this.$store.getters.getUserId;
      const updatePassword = {
        password: this.password,
      };
      api
        .patch(`user/${userId}`, updatePassword)
        .then(() => {
          this.$store.dispatch("messageSuccess", "Nota Atualizada Com sucesso");
        })
        .catch((error) => {
          this.$store.dispatch("messageError", error.response.data.message);
        });
    },
  },
};
</script>
