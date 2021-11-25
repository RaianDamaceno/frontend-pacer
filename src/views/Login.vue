<template>
  <div class="login">
    <div class="login-display">
      <div class="login-display-form" v-if="!telaCadastro">
        <div>
          <img src='../../public/img/fatecsj.png' alt="FatecLogo" width="200" height="100">
        </div>
        <div>
          <v-text-field style="width:330px" placeholder="Usuario, E-mail ou CPF" v-model="login.login"/>
          <v-text-field               
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" 
              :type="show1 ? 'text' : 'password'"
              @click:append="show1 = !show1"  placeholder="Senha" v-model="login.password"/>
        </div>
        <div>
          <button @click="createLogin"> LogIn </button>
          <button @click="telaCadastro = true"> Registre-se </button>
        </div>
      </div>

      <div class="login-display-form" v-if="telaCadastro">
         <h3> Quem Sou eu </h3>
        <div class="login-role-avatares">
          <div :class="{ yellow : admSelected }">
            <v-avatar
              size="100"
            >
            <img
              @click="cadastro.role='ADM', selectedRole('ADM')"
              src='../../public/img/administracao.png'
              alt="John"
            >
            </v-avatar>
         </div>
          <div :class="{ yellow : professorSelected }">
            <v-avatar
              size="100"
            > 
            <img
              src='../../public/img/professores.png'
              alt="John"
              @click="cadastro.role='TCH', selectedRole('TCH')"
            >
            </v-avatar>
            </div>
          <div :class="{ yellow : alunoSelected }">   
            <v-avatar
              size="100"
            >
            <img
              src='../../public/img/aluna.png'
              @click="cadastro.role='USR', selectedRole('USR')"
              alt="John"
            >
            </v-avatar>
          </div>
        </div>
        <div>
          <v-form 
            ref="form"
            v-model="valid" 
            lazy-validation
            >
            <v-text-field  v-on:change="onChangeRegister" style="width:330px" placeholder="Usuario" v-model="cadastro.login" :rules="[v => !!v || 'Usuario é obrigatorio']"/>
            <v-text-field  v-on:change="onChangeRegister" placeholder="Nome" v-model="cadastro.name" :rules="[v => !!v || 'Nome é obrigatorio']" />
            <v-text-field  v-if="this.cadastro.role=='USR'" v-on:change="onChangeRegister" placeholder="R.A" v-model="cadastro.document" :rules="[v => !!v || 'R.A é obrigatorio']"/>
            <v-text-field  v-on:change="onChangeRegister" placeholder="E-mail" v-model="cadastro.email" :rules="emailRules"/>
            <v-text-field  
              v-on:change="onChangeRegister" 
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" 
              :type="show1 ? 'text' : 'password'"
              @click:append="show1 = !show1" 
              placeholder="Senha" 
              v-model="cadastro.password" 
              :rules="[v => !!v || 'Senha é obrigatorio']"/>
          </v-form>
        </div>
        <div>
          <button @click="createRegister"> Enviar Cadastro </button>
        </div>
      </div>

      <div class="login-display-form-carrousel">
            <v-carousel height="100%">
                <v-carousel-item
                v-for="(item,i) in items"
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
  import api from '../services/api'
  export default {
    name: 'Home',
    components: {
    },
     data: () => ({
       admSelected: false,
       alunoSelected: false,
       professorSelected: false,
       password: 'Password',
       show1: false,
       valid: true,
       login: {
         login: '',
         password: ''
       },
      cadastro: {
          login: '',
          name: '',
          document: '',
          email: '',
          password: '',
          role: ''
      },
      model: 0,
      telaCadastro:false,
      items: [ {
          src: 'http://blog.feedbackmanager.com.br/wp-content/uploads/2017/08/aprimore.jpg'
        },
        {
          src: 'https://c.pxhere.com/images/de/c3/f9e9974b176510264173ebd4a8fc-1584093.jpg!d'
        }       
      ],
      emailRules: [
        v => !!v || 'E-mail é Obrigatorio',
        v => /.+@.+\..+/.test(v) || 'E-mail precisa ser valido',
      ],
    }),
    methods: {
        goToDashboard(){
            this.$router.push('/dashboard'); 
        },
        createRegister() {
          if(this.cadastro.role == '') {
            alert("Clique nos icones de Admin, Professor ou aluno para se identificar")
          } else {
            api.post('/user', this.cadastro).then(response =>{
                this.telaCadastro = false;
                this.$store.dispatch("messageSuccess", "Usuário cadastrado com sucesso!")               
            }).catch(function () { 
               this.$store.dispatch("messageError", "Erro ao realizar cadastro")
            })
          }
        },
        createLogin() {
          api.post('/auth/login', this.login).then(response => {
            let token = response.data.token
            this.$store.dispatch('setToken', token);
            this.$router.push({ path: '/dashboard'})
          }).catch(function (error) {
            this.$store.dispatch("messageError", "Senha e/ou Email invalidos")
          })
        },
        onChangeRegister(){
          this.$refs.form.validate()
        },
        selectedRole(role) {
          if(role == 'ADM') {
            this.admSelected = true;
            this.alunoSelected = false;
            this.professorSelected = false;
          } else if(role == 'USR') {
            this.admSelected = false;
            this.alunoSelected = true;
            this.professorSelected = false;
          } else {
            this.admSelected = false;
            this.alunoSelected = false;
            this.professorSelected = true;
          }
        }
    }
  }
</script>

<style scoped lang="scss">

  .login {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-image: url('../../public/img/bg_login.jpg');

  }

  .login-display {
    height: 65%;
    width: 70%;
    border: solid 1px #DCDCDC;
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
    -webkit-box-shadow: 3px 27px 34px 5px rgba(0,0,0,0.53); 
    box-shadow: 3px 27px 34px 5px rgba(0,0,0,0.53);
  }

  .yellow {
   background-color: yellow;
  }
</style>
