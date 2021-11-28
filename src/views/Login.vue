<template>
  <div class="login">
    <div class="login-display">
      <div class="login-display-form" v-if="!telaCadastro">
        <div>
          <img
            src="../../public/img/fatecsj.png"
            alt="FatecLogo"
            width="200"
            height="100"
          />
        </div>
        <div>

          <v-text-field
            id="usuario"
            style="width: 330px"
            placeholder="Usuario, e-mail ou RA"
            @keyup.native.enter="foco('senha')"
            v-model="login.login"
          />

          <v-text-field
            id="senha"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show1 ? 'text' : 'password'"
            @click:append="changePass()"
            placeholder="Senha"
            @keyup.native.enter="createLogin"
            v-model="login.password"
          />

        </div>
        <div>
          <!-- Botão Login -->
          <button @click="createLogin">LogIn</button>
          <!-- Botão Registre-se -->
          <button @click="wipeData(), (telaCadastro = true)">
            Registre-se
          </button>
        </div>
      </div>

      <div class="login-display-form" v-if="telaCadastro">
        <h3>Quem sou eu</h3>

        <div class="login-role-avatares">
          <!-- Avatar Administrador -->
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <div :class="{ yellow: admSelected }">
                <v-avatar size="100" v-bind="attrs" v-on="on">
                  <img
                    @click="(cadastro.role = 'ADM'), selectedRole('ADM')"
                    src="../../public/img/administracao.png"
                    alt="John"
                  />
                </v-avatar>
              </div>
            </template>
            <span>Administrador</span>
          </v-tooltip>

          <!-- Avatar Professor -->
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <div :class="{ yellow: professorSelected }">
                <v-avatar size="100" v-bind="attrs" v-on="on">
                  <img
                    src="../../public/img/professores.png"
                    alt="John"
                    @click="(cadastro.role = 'TCH'), selectedRole('TCH')"
                  />
                </v-avatar>
              </div>
            </template>
            <span>Professor</span>
          </v-tooltip>

          <!-- Avatar Aluno -->
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <div :class="{ yellow: alunoSelected }">
                <v-avatar size="100" v-bind="attrs" v-on="on">
                  <img
                    src="../../public/img/aluna.png"
                    @click="(cadastro.role = 'USR'), selectedRole('USR')"
                    alt="John"
                  />
                </v-avatar>
              </div>
            </template>
            <span>Aluno</span>
          </v-tooltip>
        </div>

        <div v-if="this.cadastro.role">
          <v-form ref="form" v-model="valid" lazy-validation>

            <!-- Usuário -->
            <v-text-field
              id="cad_usuario"
              v-on:change="onChangeRegister"
              style="width: 330px"
              placeholder="Usuario"
              v-model="cadastro.login"
              @keyup.native.enter="foco('cad_nome','cad_usuario')"
              :rules="[(v) => !!v || 'Usuario é obrigatorio']"
            />

            <!-- Nome -->
            <v-text-field
              id="cad_nome"
              v-if="this.cadastro.role == 'USR'"
              v-on:change="onChangeRegister"
              placeholder="Nome"
              v-model="cadastro.name"
              @keyup.native.enter="foco('cad_documento','cad_nome')"
              :rules="[(v) => !!v || 'Nome é obrigatorio']"
            />
            <v-text-field
              id="cad_nome"
              v-else
              v-on:change="onChangeRegister"
              placeholder="Nome"
              v-model="cadastro.name"
              @keyup.native.enter="foco('cad_email','cad_nome')"
              :rules="[(v) => !!v || 'Nome é obrigatorio']"
            />

            <v-text-field
              id="cad_documento"
              v-if="this.cadastro.role == 'USR'"
              v-on:change="onChangeRegister"
              placeholder="RA"
              v-model="cadastro.document"
              @keyup.native.enter="foco('cad_email','cad_documento')"
              :rules="[(v) => !!v || 'RA é obrigatorio']"
            />

            <v-text-field
              id="cad_email"
              v-on:change="onChangeRegister"
              placeholder="E-mail"
              v-model="cadastro.email"
              @keyup.native.enter="foco('cad_senha','cad_email')"
              :rules="emailRules"
            />
            <v-text-field
              id="cad_senha"
              v-on:change="onChangeRegister"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show1 ? 'text' : 'password'"
              @click:append="changePass()"
              placeholder="Senha"
              v-model="cadastro.password"
              @keyup.native.enter="createRegister"
              :rules="[(v) => !!v || 'Senha é obrigatoria']"
            />
          </v-form>
        </div>
        <div>
          <button v-if="this.cadastro.role" @click="createRegister">Enviar Cadastro</button>
          <button @click="telaCadastro = false">Voltar</button>
        </div>
      </div>

      <div class="login-display-form-carrousel">
        <v-carousel height="100%">
          <v-carousel-item
            v-for="(item, i) in items"
            :key="i"
            :src="item.src"
            reverse-transition="fade-transition"
            transition="fade-transition"
          ></v-carousel-item>
        </v-carousel>
      </div>
    </div>
  </div>
</template>

<script>
import api from "../services/api";
export default {
  name: "Home",
  components: {},
  data: () => ({
    admSelected: false,
    alunoSelected: false,
    professorSelected: false,
    password: "Password",
    show1: false,
    valid: true,
    roles: [],
    users: [],
    login: {
      login: "",
      password: "",
    },
    cadastro: {
      login: "",
      name: "",
      document: "",
      email: "",
      password: "",
      role: "",
    },
    model: 0,
    telaCadastro: false,
    items: [
      {
        src: "http://blog.feedbackmanager.com.br/wp-content/uploads/2017/08/aprimore.jpg",
      },
      {
        src: "https://c.pxhere.com/images/de/c3/f9e9974b176510264173ebd4a8fc-1584093.jpg!d",
      },
    ],
    emailRules: [
      (v) => !!v || "E-mail é Obrigatorio",
      (v) => /.+@.+\..+/.test(v) || "E-mail precisa ser valido",
    ],
  }),
  methods: {
    goToDashboard() {
      this.$router.push("/dashboard");
    },
    changePass(){
      this.show1 = !this.show1;
      setTimeout(()=>{this.show1 = false;},10000);
    },
    createRegister() {
      if (this.cadastro.role == "") {
        this.$store.dispatch(
          "messageError",
          "Clique nos ícones de Administrador, Professor ou Aluno para se identificar"
        );
      } else {
        this.$store.dispatch("messageAlert", "Enviando dados...");
        api
          .post("/user", this.cadastro)
          .then(() => {
            this.telaCadastro = false;
            this.$store.dispatch(
              "messageSuccess",
              "Usuário cadastrado com sucesso!"
            );
          })
          .catch((error) => {
            this.$store.dispatch("messageError", error.response.data.message);
          });
      }
    },
    createLogin() {
      if (this.login.login.replace(" ", "").length === 0) {
        this.$store.dispatch("messageError", "Você não informou um usuário!");
        return;
      }
      if (this.login.password.replace(" ", "").length === 0) {
        this.$store.dispatch("messageError", "Você não informou uma senha!");
        return;
      }

      this.$store.dispatch(
        "messageSuccess",
        "Aguarde! Autenticando..."
      );
      api
        .post("/auth/login", this.login)
        .then((response) => {
          this.$store.dispatch("setToken", response.data.token);
          this.$store.dispatch("setUserId", response.data.sub);
          this.$router.push({ path: "/dashboard" });
        })
        .catch((error) => {
          this.$store.dispatch("messageError", error.response.data.message);
        });
    },
    /** 
     * Muda o foco para o próximo componente
     * @param: next_id
     * @param: cur_id - Se este parâmetro for passado só continua se tiver conteúdo
     * */
    foco(next_id, cur_id) {
      if ( cur_id 
           && document.getElementById(cur_id).value.replace(" ","").length === 0
         ){
        this.$store.dispatch("messageErrorFast", "Campo obrigatório!");
        return;
      }
      document.getElementById(next_id).focus()
    },
    onChangeRegister() {
      this.$refs.form.validate();
    },
    wipeData() {
      this.cadastro = {
        login: "",
        name: "",
        document: "",
        email: "",
        password: "",
        role: "",
      };
      this.roles = [];
      this.users = [];
    },
    selectedRole(role) {
      this.admSelected = false;
      this.alunoSelected = false;
      this.professorSelected = false;

      if (role == "ADM") {
        this.admSelected = true;
        this.cadastro.document = "";
      } else if (role == "USR") {
        this.alunoSelected = true;
      } else if (role == "TCH") {
        this.cadastro.document = "";
        this.professorSelected = true;
      }
      //Coloca o foco de digitação no campo de usuário
      setTimeout(() => {
        this.foco("cad_usuario");
      }, 500);
    },
  },
  mounted() {
    document.getElementById("usuario").focus();
    this.roles = api.get("role");
    this.users = api.get("user");
  },
};
</script>

<style scoped lang="scss">
.login {
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url("../../public/img/bg_login.jpg");
}

.login-display {
  height: 65%;
  width: 70%;
  border: solid 1px #dcdcdc;
  display: flex;
  flex-direction: row;
}

.login-display-form {
  height: 100%;
  width: 35%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
}

.login-display-form-carrousel {
  height: 100%;
  width: 65%;
}

button {
  width: 330px;
  height: 45px;
  border: solid 1px black;
  border-radius: 30px;
  margin-top: 10px;
}

.form_field {
  font-family: inherit;
  width: 330px;
  border: 0;
  border-bottom: 2px solid gray;
  font-size: 1.3rem;
  color: black;
  padding: 7px 0;
  background: transparent;
  transition: border-color 0.2s;
  margin-top: 10px;
}

.login-display-form div {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-content: space-between;
}

.login-role-avatares {
  display: flex;
  justify-content: space-between !important;
  flex-direction: row !important;
}

.login-role-avatares div {
  padding: 10px;
}

.login-role-avatares img {
  -webkit-box-shadow: 3px 27px 34px 5px rgba(0, 0, 0, 0.53);
  box-shadow: 3px 27px 34px 5px rgba(0, 0, 0, 0.53);
}

.yellow {
  background-color: yellow;
}
</style>
