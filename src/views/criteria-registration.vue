<template>
    <div class="page">
        <div class="screen-registration">
            <h1 class="description">{{ descriptionTitle }}</h1>
            <h1>{{ dateStart }}</h1>
            <h1>{{ dateEnd }}</h1>
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
        background: linear-gradient(360deg, rgba(139,139,139,1) 20%, rgba(255,255,255,1) 100%);
        padding-bottom: 10%;
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
                width: 50%;
            }

            .config
            {
                margin-top: 25px;
                display: flex;
                flex-direction: row;
                justify-content: center;
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
            margin-bottom: 10px;
            background: rgba(65, 65, 65, 0.3);
            border: none;
            outline: none;
            padding: 10px;
            font-size: 13px;
            color: #fff;
            text-shadow: 1px 1px 1px rgba(0,0,0,0.3);
            border: 1px solid rgba(0,0,0,0.3);
            border-radius: 4px;
            box-shadow: inset 0 -5px 45px rgba(100,100,100,0.2), 0 1px 1px rgba(255,255,255,0.2);

        }

    }
</style>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    data: () => ({
        /**Variables to inputs */
        descriptionInput: '',
        min: '',
        max: '',
        weight: '',
        inactive: false,

        /**Variables to usage to show on template */
        descriptionTitle: 'Descrição de Projeto',
        dateStart: 'Data de Inicio',
        dateEnd: 'Date de Fechamento'
    }),

    methods:
    {
        button: function(): void
        {
            alert('Values \n'
                    + this.descriptionInput + '\n'
                    + this.min + '\n'
                    + this.max + '\n'
                    + this.weight + '\n'
                    + this.inactive + '\n'
            )
        }
    }
})
</script>
