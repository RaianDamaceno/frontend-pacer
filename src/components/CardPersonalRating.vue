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
				<button v-on:click="showCard">Salvar</button>
			</div>
		</div>
		<div class="snackbar">
			<div class="text-center">
				<v-snackbar
					v-model="snackbar"
					:timeout="timeout"
                    type="success"
                    >
					Avaliação enviada com sucesso! 
				</v-snackbar>
			</div> 
		</div>
		<div class="confirmation" v-if="card">
			<div class="text-center">
				<v-sheet
					class="px-7 pt-7 pb-4 mx-auto text-center d-inline-block"
					color="blue-grey darken-3"
					dark
					>
					<div class="grey--text text--lighten-1 text-body-2 mb-4">
						Deseja confirmar a inserção da classificação do seu colega ?
					</div>
					<v-btn
						class="ma-1"
						color="grey"
						plain
                        v-on:click="hideCard"
						>
						Cancel
					</v-btn>
					<v-btn
						class="ma-1"
						color="error"
						plain
						v-on:click="showSnackbar"
						>
						Confirmar
					</v-btn>
				</v-sheet>
			</div>
		</div>
	</v-container>
</template>

<script lang="ts">
  import Vue from 'vue'

  export default Vue.extend({
    name: 'CardPersonalRating',
    data: () => ({
        cardProps: false,
        card: false,
        snackbar: false
    }),
    methods: {
        showCard: function() {
            this.card = true
        },
        hideCard: function() {
             this.card = false;
        },
        showSnackbar: function() {
            this.snackbar = true
            this.card = false
        }
    }
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
        position: absolute;
        float: right;
		justify-content: center;
		align-items: center;
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

	.confirmation {
		display: flex;

		justify-content: flex-end;
	}
	
</style>