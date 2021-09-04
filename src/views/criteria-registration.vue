<template>
    <div class="page">
        <div class="screen-registration">
            <h1 class="description">Descrição de Projeto</h1>
            <h1>Data de Inicio</h1>
            <h1>Date de Fechamento</h1>
        </div>
        <div class="registration">
            <input type="text" placeholder="Descrição" class="description input-style" v-model="descriptionInput">
            <div class="config">
                <input type="number" class="input-criteria input-style" placeholder="Nota Minima" v-model="min">
                <input type="number" class="input-criteria input-style" placeholder="Nota Maxima" v-model="max">
                <input type="number" class="input-criteria input-style" placeholder="Peso" v-model="weight">
                <button type="button" v-on:click="button">Gravar</button>
                <div>
                    <input type="checkbox" v-model="inactive">
                    <label>Inativo</label>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
    .page
    {
        .screen-registration
        {
            padding: 0 100px;
            gap: 20px;
            font-size: 10px;
            text-align: left;
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;

            .description
            {
                flex-grow: 1;
            }
        }

        .registration
        {
            background-color: #e0e0e0;
            padding: 30px;
            margin: 10% 15%;
            border-radius: 8px;

            .description
            {
                width: 48%;
            }

            .config
            {
                margin-top: 25px;
                display: flex;
                flex-direction: row;
                justify-content: center;
                align-items: center;
                gap: 10px;

                .input-criteria
                {
                    width: 8%;
                }

                button
                {
                   background-color: #5cff4a;
                   color: rgb(0, 0, 0);
                   height: 40px;
                   width: 80px;
                   border-radius: 10px;
                   cursor: pointer;
                }
            }
        }

        .input-style
        {
            width: 100%;
            height: 30px;
            border-radius: 8px;
            background-color: #ededed;
        }

    }
</style>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    data: () => ({
        descriptionInput: '',
        min: '',
        max: '',
        weight: '',
        inactive: false
    }),

    methods:
    {
        button: function(): void
        {
            alert('Hello \n'
                    + this.max + '\n'
                    + this.min + '\n'
                    + this.descriptionInput + '\n'
                    + this.weight + '\n'
                    + this.inactive + '\n'
            )
        }
    }
})
</script>
