<template>
    <v-row justify="center">
        <v-dialog v-model="dialog" scrollable max-width="300px">
            <template v-slot:activator="{ on, attrs }">
                <v-btn color="primary" dark v-bind="attrs" v-on="on">
                    Cadastrar Criterio
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
    </v-row>
</template>
<script lang="ts">
import Vue from "vue";
import axios from "axios";

export default Vue.extend({
    name: "CriteriaRegis",
    data: () => ({
        /**Variables to inputs */
        descriptionInput: "",
        inactive: false,
        dialogm1: "",
        dialog: true,
        data: {},
    })
});
</script>
