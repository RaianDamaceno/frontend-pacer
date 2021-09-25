<template>
    <v-container fluid class='body' fill-height>
        <v-row justify='center' align='center'>

            <v-col cols='4' class='inputs' v-if='login.login'>
                <v-col cols='12'>
                    <v-text-field
                        v-model='login.firstname'
                        :rules='login.nameRules'
                        label='RA'
                        required
                    ></v-text-field>
                </v-col>

                <v-col cols='12'>
                    <v-text-field
                        v-model='login.password'
                        :append-icon="login.show1 ? 'mdi-eye' : 'mdi-eye-off'"
                        :rules='login.passwordRules'
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
                        :rules='signUp.nameRules'
                        label='Nome'
                        required
                    ></v-text-field>
                </v-col>

                <v-col cols='12'>
                    <v-text-field
                        v-model='signUp.ra'
                        :rules='signUp.nameRules'
                        label='RA'
                        required
                    ></v-text-field>
                </v-col>

                <v-col cols='12'>
                    <v-text-field
                        v-model='signUp.email'
                        :rules='signUp.emailRules'
                        label='E-mail Institucional'
                        required
                    ></v-text-field>
                </v-col>

                <v-col cols='12'>
                    <v-text-field
                        v-model='signUp.password'
                        :rules='signUp.passwordRules'
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
        background: #b1b1b1;
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
export default {
    data: () => ({

        login:{
            show1: false,
            login: true,
            signUp: false,
            firstname: '',
            nameRules: [(v: any) => !!v || 'RA is required'],
            password: '',
            passwordRules: [
                (v: any) => !!v || 'Password is required',
                (v: any) => v.length >= 8 || 'Min 8 characters',
            ]
        },
        signUp:{
            nome: '',
            ra: '',
            email: '',
            emailRules: [(v: any) => /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v) || 'E-mail invalido'],
            password: '',
            nameRules: [(v: any) => !!v || 'RA is required'],
            passwordRules: [
                (v: any) => !!v || 'Password is required',
                (v: any) => v.length >= 8 || 'Min 8 characters',
            ],
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
                this.validateRulesRegister()
            )
            {
                this.snackbarShow('Todos campos são obrigatórios e Validos, por favor preenche-los Corretamente', 'red');
                return;
            }

            router.push('/dashboard');
        },
        validateRulesRegister(): boolean
        {
            if(this.signUp.emailRules)
            {
                return true;
            }
            else if(this.signUp.nameRules)
            {
                return true;
            }
            else if(this.signUp.passwordRules)
            {
                return true;
            }
            return false;
        },
        snackbarShow: function(text: string, color = 'green'): void
        {
            this.text = text;
            this.colorBtn = color;
            this.snackbar = true;
        }
    }
};
</script>
