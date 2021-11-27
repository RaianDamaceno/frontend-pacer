/* eslint-disable vue/require-prop-type-constructor */
<template>
    <div  style="width:100%">
        <highcharts class="hc" :options="chartOptions"></highcharts>
    </div>
</template>

<style>
.hc {
    height: 100%;
    width: 50%;
}
</style>

<script>
import Vue from "vue";
import api from "../services/api";
Vue.prototype.$total = [];
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

            this.$total.push(
                {
                    name: "Media da Sala",
                    data: this.notesTeam,
                },
                {
                    name: "Notas dos Colegas",
                    data: this.notesSelf,
                }
            );
        });
    },
    data() {
        return {
            chartOptions: {
                chart: {
                    type: "line",
                    polar: true,
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
                    tickmarkPlacement: "on",
                    lineWidth: 0,
                },

                yAxis: {
                    gridLineInterpolation: "polygon",
                    min: 0,
                    max: 100,
                    tickInterval: 10,
                },

                legend: {
                    align: "center",
                    verticalAlign: "bottom",
                    layout: "vertical",
                },

                tooltip: {
                    shared: false,
                    valueSuffix: " Pontos",
                },

                series: this.$total || [],
            },
        };
    },
});
</script>
