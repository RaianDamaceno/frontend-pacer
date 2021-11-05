<template>
    <v-container fluid class='body' fill-height>
        <v-row justify='center' align='center'>

            <v-col cols='4' class='inputs' v-if='login.login'>

                <v-row justify='center' align='center'>
                    <v-img
                        class="mt-16"
                        src="../assets/login.png"
                        max-height="150"
                        max-width="150"
                    ></v-img>
                </v-row>

                <v-col cols='12'>
                    <v-text-field
                        v-model='login.firstname'
                        label='Nome'
                        required
                    ></v-text-field>
                </v-col>

                <v-col cols='12'>
                     <v-text-field
                        v-model='login.ra'
                        label='RA'
                        required
                    ></v-text-field>
                </v-col>

                <v-row justify='center' align='center'>
                    <v-btn
                        color='green'
                        elevation='2'
                        class='mr-6'>
                        Entrar
                    </v-btn>

                    <v-btn
                        color='primary'
                        elevation='2'
                        class='mr-6'
                        v-on:click='login.signUp = true, login.login = false'>
                        Cadastrar
                    </v-btn>
                </v-row>
            </v-col>

            <v-col cols='4' class='inputs' v-if='login.signUp'>
                <v-col cols='12'>
                    <v-text-field
                        v-model='signUp.nome'
                        label='Nome De Usuario'
                        required
                    ></v-text-field>
                </v-col>

                <v-col cols='12'>
                    <v-text-field
                        v-model='signUp.ra'
                        label='Nome'
                        required
                    ></v-text-field>
                </v-col>
                <v-col cols='12'>
                    <v-text-field
                        v-model='signUp.document'
                        :mask="['###.###.###-##', '##.###.###/####-##']"
                        label='CPF'
                        required
                    ></v-text-field>
                </v-col>
                <v-col cols='12'>
                    <v-text-field
                        v-model='signUp.email'
                        label='E-mail Institucional'
                        required
                    ></v-text-field>
                </v-col>
              <v-col
                cols="12"
              >
              <v-select
                  v-model="selectRole"
                  :value="roles.roleName"
                  :items="roles"
                  label="Função"
                  item-text="roleName"
                  persistent-hint
                  return-object
                  single-line
                ></v-select>
              </v-col>

                <v-row justify='center' align='center'>
                    <v-btn
                        color='green'
                        elevation='2'
                        class='mr-6'
                        v-on:click='registration'>
                        Registrar
                    </v-btn>

                    <v-btn
                        color='red'
                        elevation='2'
                        class='mr-6'
                        v-on:click='login.signUp = false, login.login = true'>
                        Voltar
                    </v-btn>
                </v-row>
            </v-col>

        </v-row>
        <v-snackbar v-model='snackbar' :timeout='timeout'>
            {{ text }}
            <template v-slot:action='{ attrs }'>
                <v-btn
                    :color='colorBtn'
                    text
                    v-bind='attrs'
                    @click='snackbar = false'
                >
                    Fechar
                </v-btn>
            </template>
        </v-snackbar>
    </v-container>
</template>
<style>
    .body
    {
        background-image: url('https://www.drumangle.com/sandbox/wp/21813/wp-content/uploads/2014/01/Login-Screen-Background-Wood-4.jpg');
    }
    .inputs
    {
        background: white;
        padding: 0 50px 30px;
        border-radius: 5px;
    }
</style>
<script lang='ts'>
import router from '@/router';
import Vue from 'vue';
import api from '../services/api'

export default Vue.extend({
    data: () => ({
        login:{
            show1: false,
            login: true,
            signUp: false,
            firstname: '',
            ra: ''
        },
        signUp:{
            nome: '',
            email: '',
            document: '',
            ra: ''
        },
        selectRole: Object,
        roles: [],
        snackbar: false,
        text: '',
        colorBtn: 'green',
        timeout: 2000,
    }),
    beforeMount() {
        api.get('/role').then(response => {
            this.roles = response.data
        })
    },
    methods: {
        // validate: function(): void
        // {
        //     if(this.login.firstname.trim() === '' || this.login.ra.trim() === '')
        //     {
        //         this.snackbarShow('Ambos campos são obrigatórios', 'red');
        //         return;
        //     }

        //     else
        //     {
        //         if(this.login.firstname.trim().toString() === 'adm' && this.login.ra.trim().toString() === '12345678')
        //         {
        //             this.snackbarShow('Login realizado com sucesso', 'blue');
        //             setTimeout(() =>
        //             {
        //                 router.push('/dashboard');
        //             }, 1200)
        //         }
        //         else
        //         {
        //             this.snackbarShow('Falha no login', 'red');
        //             return;
        //         }
        //     }

        // },
        // validateRegister: function(): void
        // {
        //     if(
        //         this.signUp.nome.trim() === '' ||
        //         this.signUp.ra.trim() === '' ||
        //         this.signUp.email.trim() === '' ||
        //         this.signUp.nome.trim().length < 2 ||
        //         this.signUp.ra.trim().length < 6 ||
        //         this.signUp.email.trim().length < 7
        //     )
        //     {
        //         this.snackbarShow('Todos campos são obrigatórios e Validos, por favor preenche-los Corretamente', 'red');
        //         return;
        //     }

        //     this.registration();
        // },
        snackbarShow: function(text: string, color = 'green'): void {
            this.text = text;
            this.colorBtn = color;
            this.snackbar = true;
        },
        registration: function(): void {
            let usuarioRegistro = {
                    login: this.signUp.nome,
                    name: this.signUp.nome,
                    document: this.signUp.ra,
                    email: this.signUp.email,
                    role: this.selectRole.roleName
            }   

            api.post("user", usuarioRegistro).then(response =>{
                 if(response.status === 201) {
                        this.snackbarShow(
                            'Cadastro Realizado com sucesso, você será direcionado ao DashBoard'
                        );
                        setTimeout(() => {
                            router.push('/dashboard');
                        }, 2200);
                    }
                })
                .catch(() => {
                    this.snackbarShow(
                        'Ocorreu um erro ao realizar a operação :( por favor repita daqui a alguns instantes',
                        'red'
                    );
                })
        }
    }
});
</script>
