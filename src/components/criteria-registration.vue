<template>
    <v-row justify="center">
        <v-dialog v-model="dialog" scrollable max-width="300px">
            <template v-slot:activator="{ on, attrs }">
                <v-btn class="black--text" color="white" dark v-bind="attrs" v-on="on">
                    Cadastrar Critério
                </v-btn>
            </template>
            <v-card>
                <v-card-title>Registro de Critério</v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                    <div class="d-flex justify-center">
                        <v-text-field
                            label="Descrição"
                            v-model="descriptionInput"
                        >
                        </v-text-field>
                    </div>

                    <div class="d-flex justify-center">
                        <v-col>
                            <v-spacer></v-spacer>

                            <v-row align="center" class="ml-1">
                                <v-btn
                                    elevation="2"
                                    class="mr-4"
                                    v-on:click="validate"
                                >
                                    Salvar
                                </v-btn>
                                <v-checkbox
                                    label="Inativo"
                                    color="primary"
                                    v-model="inactive"
                                >
                                </v-checkbox>
                            </v-row>
                        </v-col>
                    </div>
                </v-card-text>
            </v-card>
        </v-dialog>
        <v-snackbar v-model="snackbar" :timeout="timeout">
            {{ text }}
            <template v-slot:action="{ attrs }">
                <v-btn
                    :color="colorBtn"
                    text
                    v-bind="attrs"
                    @click="snackbar = false"
                >
                    Fechar
                </v-btn>
            </template>
        </v-snackbar>
    </v-row>
</template>
<script lang="ts">
import Vue from 'vue';
import axios from 'axios';

export default Vue.extend({
    name: 'CriteriaRegis',
    data: () => ({
        dialog: false,
        /**Variables to inputs */
        descriptionInput: '',
        inactive: false,
        /**Variables to Snackbar */
        snackbar: false,
        text: '',
        colorBtn: 'green',
        timeout: 2000,
    }),
    methods: {
        validate: function(): void
        {
            if(this.descriptionInput.replaceAll(' ', '').length === 0)
            {
                this.snackbarShow('Campo de Descrição é obrigatório', 'blue');
                return;
            }

            this.saveCriteria();
        },
        saveCriteria: function(): void {
            axios
                .post('http://localhost:3000/criteria', {
                    descCriteria: this.descriptionInput,
                    snAtivo: this.inactive ? '1' : '0',
                })
                .then((response) => {
                    if (response.status === 201) {
                        this.snackbarShow('Criteiro Salvo com Sucesso na Base de Dados')
                        setTimeout(() => {
                            this.dialog = false;
                            this.resetValues();
                        }, 1000);
                    }
                })
                .catch((error) => {
                    this.snackbarShow(
                        'Ocorreu um erro ao realizar a operação :( por favor repita daqui a alguns instantes',
                        'red'
                    );
                    console.error('Ocorreu um erro ao realizar a operação :( por favor repita daqui instantes', error)
                    setTimeout(() => {this.dialog = false}, 1000);
                });
        },
        resetValues: function(): void
        {
            this.descriptionInput = '';
            this.inactive = false;
        },
        snackbarShow: function(text: string, color = 'green'): void
        {
            this.text = text;
            this.colorBtn = color;
            this.snackbar = true;
        }
    },
});
</script>
