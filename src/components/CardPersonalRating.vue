<template>
    <v-container>
        <div class="card">
            <div class="card-person">
                <div class="card-person-image">

                </div>
            </div>

            <div class="card-rating">
                <div>
                    <label> Proatividade </label>

                    <v-slider
                        v-model="time"
                        :tick-labels="labels"
                        always-dirty
                        class="mx-5"
                        min="0"
                        max="100"
                        thumb-label="always"
                        inverse-label
                        label="100"
                        step="10"
                    />
                </div>
                <div>
                    <label> Proatividade </label>
                    <v-slider
                        v-model="time"
                        :tick-labels="labels"
                        always-dirty
                        class="mx-5"
                        min="0"
                        max="100"
                        thumb-label="always"
                        inverse-label
                        label="100"
                    />
                </div>
                <div>
                    <label> Entregas </label>
                    <v-slider
                        v-model="time"
                        :tick-labels="labels"
                        always-dirty
                        class="mx-5"
                        min="0"
                        max="100"
                        thumb-label="always"
                        inverse-label
                        label="100"
                    />
                </div>
                <div>
                    <label> Resultado </label>
                    <v-slider
                        v-model="time"
                        :tick-labels="labels"
                        always-dirty
                        class="mx-5"
                        min="0"
                        max="100"
                        thumb-label="always"
                        inverse-label
                        label="100"
                    />
                </div>
            </div>
            <div class="card-save">
                <button>Salvar</button>
            </div>
        </div>
    </v-container>
</template>

<script lang="ts">
  import Vue from 'vue'

  export default Vue.extend({
    name: 'CardPersonalRating',
  })
</script>

<style scoped lang="scss">
    .card {
        display: flex;
        flex-direction: column;
        height: 600px;
        width: 400px;
        padding: 10px;
        border: solid 1px black;
        background: rgb(2,0,36);
        background: linear-gradient(47deg, rgba(2,0,36,1) 0%, rgba(13,44,82,1) 31%, rgba(90,26,159,1) 97%);
        color: #fff;
    }

    .card-person {
        height: 35%;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 10px;
    }

    .card-person-image {
        height: 100%;
        width: 55%;
        border-radius: 50%;
        border: dashed 5px yellow;
        background-color: #fff;
    }

    .card-rating {
        height: 60%;
        width: 100%;
    }
    .card-save {
        display: flex;
        height: 3%;
        width: 100%;
        justify-content: flex-end;
    }
</style>