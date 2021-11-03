<template>
  <div class="login">
    <div class="login-display">
      <div class="login-display-form" v-if="!telaCadastro">
        <div>
          <img src='../../public/img/fatecsj.png' alt="FatecLogo" width="200" height="100">
        </div>
        <div>
          <input class="form_field" placeholder="Usuario, E-mail ou CPF" v-model="login.login"/>
          <input class="form_field" placeholder="Senha" v-model="login.password"/>
        </div>
        <div>
          <button @click="createLogin"> LogIn </button>
          <button @click="telaCadastro = true"> Registre-se </button>
        </div>
      </div>

      <div class="login-display-form" v-if="telaCadastro">
         <h3> Quem Sou eu </h3>
        <div class="login-role-avatares">
          <div>
            <v-avatar
              size="100"
            >
            <img
              @click="cadastro.role='A'"
              src='../../public/img/administracao.png'
              alt="John"
            >
            </v-avatar>
         </div>
          <div>
            <v-avatar
              size="100"
            > 
            <img
              src='../../public/img/professores.png'
              alt="John"
              @click="cadastro.role='P'"
            >
            </v-avatar>
            </div>
          <div>    
            <v-avatar
              size="100"
            >
            <img
              src='../../public/img/aluna.png'
              @click="cadastro.role='E'"
              alt="John"
            >
            </v-avatar>
          </div>
        </div>
        <div>
          <input class="form_field" placeholder="Usuario" v-model="cadastro.login"/>
          <input class="form_field" placeholder="Nome" v-model="cadastro.name"/>
          <input class="form_field" placeholder="CPF" v-model="cadastro.document"/>
          <input class="form_field" placeholder="E-mail" v-model="cadastro.email"/>
          <input class="form_field" placeholder="Senha" v-model="cadastro.password"/>
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
     data: () => ({
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
    }),
    methods: {
        goToDashboard(){
            this.$router.push('/dashboard'); 
        },
        createRegister() {
            api.post('/user', this.cadastro).then(response =>{
              response.status == 201 ? this.$router.push('/login'):alert("Erro ao realizar cadastro"); 
            })
        },
        createLogin() {
          api.post('/auth/login', this.login).then(response => {
            response.status == 201 ? this.$router.push('/dashboard') :alert("Erro ao realizar Login"); 
          })
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
</style>

