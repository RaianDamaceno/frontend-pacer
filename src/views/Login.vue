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
                        label='RA'
                        required
                    ></v-text-field>
                </v-col>

                <v-col cols='12'>
                    <v-text-field
                        v-model='login.password'
                        :append-icon="login.show1 ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="login.show1 ? 'text' : 'password'"
                        name='input-10-1'
                        label='Senha'
                        hint='At least 8 characters'
                        counter
                        @click:append='login.show1 = !login.show1'
                    ></v-text-field>
                </v-col>

                <v-row justify='center' align='center'>
                    <v-btn
                        color='green'
                        elevation='2'
                        class='mr-6'
                        v-on:click='validate'>
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
                        label='Nome'
                        required
                    ></v-text-field>
                </v-col>

                <v-col cols='12'>
                    <v-text-field
                        v-model='signUp.ra'
                        label='RA'
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

                <v-col cols='12'>
                    <v-text-field
                        type='password'
                        v-model='signUp.password'
                        label='Password'
                        required
                    ></v-text-field>
                </v-col>

                    <v-radio-group v-model="signUp.radioGroup">
                        <v-row class="radios mb-6" justify='center' align='center'>
                            <v-radio
                                :label="'Aluno'"
                                :value="'Aluno'"
                            ></v-radio>

                            <v-radio
                                :label="'Professor'"
                                :value="'Professor'"
                            ></v-radio>

                            <v-radio
                                :label="'Admin'"
                                :value="'Admin'"
                            ></v-radio>
                        </v-row>
                    </v-radio-group>

                <v-row justify='center' align='center'>
                    <v-btn
                        color='green'
                        elevation='2'
                        class='mr-6'
                        v-on:click='validateRegister'>
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
        width: 100%;
    }
    .inputs
    {
        background: white;
        padding: 0 50px 30px;
        border-radius: 5px;
    }

    .radios
    {
        display: flex;
        gap: 10px;
    }
</style>
<script lang='ts'>
import router from '@/router';
import Vue from 'vue';
import axios from 'axios';

export default Vue.extend({
    data: () => ({
        login:{
            show1: false,
            login: true,
            signUp: false,
            firstname: '',
            password: ''
        },
        signUp:{
            nome: '',
            ra: '',
            email: '',
            password: '',
            radioGroup: 'Aluno'
        },
        snackbar: false,
        text: '',
        colorBtn: 'green',
        timeout: 2000,
    }),
    methods: {
        validate: function(): void
        {
            if(this.login.firstname.trim() === '' || this.login.password.trim() === '')
            {
                this.snackbarShow('Ambos campos são obrigatórios', 'red');
                return;
            }
            router.push('/dashboard');
        },
        validateRegister: function(): void
        {
            if(
                this.signUp.nome.trim() === '' ||
                this.signUp.ra.trim() === '' ||
                this.signUp.email.trim() === '' ||
                this.signUp.password.trim() === '' ||
                this.signUp.nome.trim().length < 2 ||
                this.signUp.ra.trim().length < 6||
                this.signUp.email.trim().length < 7||
                this.signUp.password.trim().length < 7
            )
            {
                this.snackbarShow('Todos campos são obrigatórios e Validos, por favor preenche-los Corretamente', 'red');
                return;
            }

            this.registration();
        },
        snackbarShow: function(text: string, color = 'green'): void
        {
            this.text = text;
            this.colorBtn = color;
            this.snackbar = true;
        },
        registration: function(): void
        {
            console.log(
                this.signUp.nome,
                this.signUp.ra,
                this.signUp.email,
                this.signUp.radioGroup
            );
            axios
                .post('http://localhost:3000/user', {
                    login: this.signUp.nome,
                    name: this.signUp.nome,
                    document: this.signUp.ra,
                    email: this.signUp.email,
                    rule: this.signUp.radioGroup,
                    snAtivo: '1'
                })
                .then((response) => {
                    console.log('Success ',response);
                    // router.push('/dashboard');
                })
                .catch((error) => {
                    this.snackbarShow(
                        'Ocorreu um erro ao realizar a operação :( por favor repita daqui a alguns instantes',
                        'red'
                    );
                    console.error('Ocorreu um erro ao realizar a operação :( por favor repita daqui instantes', error)
                });
        }
    }
});
</script>
