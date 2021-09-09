<template>
    <v-container>
        <v-row class="mt-16 mb-16">
            <h1 class="description mr-16">{{ descriptionTitle }}</h1>
            <h1 class="mr-6 ml-16">{{ dateStart }}</h1>
            <h1 class="ml-6">{{ dateEnd }}</h1>
        </v-row>

        <v-card color="#f0f0f0">
            <div class="d-flex justify-center mt-16">
                <v-col cols="6">
                    <v-text-field label="Descrição" v-model="descriptionInput">
                    </v-text-field>
                </v-col>
            </div>

            <div class="d-flex justify-center">
                <v-col cols="5">
                    <v-text-field
                        label="Nota Minima"
                        type="number"
                        v-model="min"
                    >
                    </v-text-field>

                    <v-spacer></v-spacer>

                    <v-text-field
                        label="Nota Maxima"
                        type="number"
                        v-model="max"
                    >
                    </v-text-field>
                </v-col>
                <v-col cols="5">
                    <v-text-field label="Peso" type="number" v-model="weight">
                    </v-text-field>

                    <v-spacer></v-spacer>

                    <v-row align="center" class="ml-1">
                        <v-btn elevation="2" class="mr-4" @click="button()">
                            Gravar
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
        </v-card>
    </v-container>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
    data: () => ({
        /**Variables to inputs */
        descriptionInput: "",
        min: "",
        max: "",
        weight: "",
        inactive: false,

        /**Variables to usage to show on template */
        descriptionTitle: "Descrição de Projeto",
        dateStart: "Data de Inicio",
        dateEnd: "Date de Fechamento",
    }),

    methods: {
        button: function(): void {
            alert(
                "Values \n" +
                    this.descriptionInput +
                    "\n" +
                    this.min +
                    "\n" +
                    this.max +
                    "\n" +
                    this.weight +
                    "\n" +
                    this.inactive +
                    "\n"
            );
        },
    },
});
</script>
