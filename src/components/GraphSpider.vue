/* eslint-disable vue/require-prop-type-constructor */
<template>
    <div style="width: 100%">
        <highcharts class="hc" :options="chartOptions"></highcharts>
    </div>
</template>

<style>
.hc {
    width: 60%;
}
</style>

<script>
import Vue from "vue";
import api from "../services/api";
Vue.prototype.total = [];
Vue.prototype.notesTeam = [];
Vue.prototype.notesSelf = [];
export default Vue.extend({
    name: "GraphSpider",
    props: {
        criterios: Array,
        sprintSelected: String,
        user: String,
        project: String,
    },

    beforeCreate() {
        this.notesSelf = [];
        this.notesTeam = [];
        this.total = [];
        setTimeout(() => {
            this.criterios.map((data) => {
                api.get(
                    `notes-store/sprint/${this.sprintSelected}/${this.user}/${this.project}/${data.idCriteria}`
                )
                    .then((response) => {
                        this.notesSelf.push(
                            response.data.selfNotes.selfNoteAvg
                        );
                        this.notesTeam.push(
                            response.data.teamNotes.teamNoteAvg
                        );
                    })
                    .catch((error) => {
                        alert(
                            "Ocorreu um erro ao realizar a população do grafico. Por favor tente novamente mais tarde"
                        );
                        console.log(error);
                        return;
                    });
            });

            this.total.push(
                {
                    name: "Media da Equipe",
                    data: this.notesTeam,
                    pointPlacement: "on",
                },
                {
                    name: "Minha média",
                    data: this.notesSelf,
                    pointPlacement: "on",
                }
            );
        });
    },
    data() {
        return {
            var_teste: [],
            chartOptions: {
                chart: {
                    type: "line",
                    polar: true,
                    backgroundColor: "#c7c7c7"
                },

                credits: {
                    enabled: false,
                },

                title: {
                    text: "Media de Notas",
                },

                xAxis: {
                    categories:
                        this.criterios.map((cri) => {
                            return cri.descCriteria;
                        }) || [],
                    lineWidth: 0,
                },

                yAxis: {
                    gridLineInterpolation: "polygon",
                    lineWidth: 0,
                },

                legend: {
                    align: "center",
                    verticalAlign: "bottom",
                    layout: "vertical",
                },

                tooltip: {
                    shared: true,
                    valueSuffix: " Pontos"
                },

                series: this.total || [],
            },
        };
    },
});
</script>
