/* eslint-disable vue/require-prop-type-constructor */
<template>
    <highcharts class="hc" :options="chartOptions"></highcharts>
</template>

<style>
.hc {
    height: 100%;
}
</style>

<script>
import Vue from "vue";
Vue.prototype.total = [];
Vue.prototype.criterios = [];
Vue.prototype.sprint = [];
export default Vue.extend({
    name: "GraphSpider",
    props: {
        notas: Array,
        sprintClicked: String,
    },
    beforeMount() {
        this.notas
            .filter((not) => not.idEvaluated === "33" && not.idSprint === "1")
            .map((nt) => {
                this.criterios.push(nt.criterio.descCriteria);
                this.total.push(nt.note === null ? 0 : nt.note);
                if (this.sprint.length === 0) {
                    this.sprint.push(
                        nt.sprint.initialDate + " | " + nt.sprint.finalDate
                    );
                }
            });
    },
    data() {
        return {
            notasGraph: [],
            chartOptions: {
                chart: {
                    type: "line",
                    polar: true,
                },

                credits: {
                    enabled: false,
                },

                title: {
                    text: "Grafico para acompanhamento",
                },

                xAxis: {
                    categories: this.criterios || [],
                    tickmarkPlacement: "on",
                    lineWidth: 0,
                },

                yAxis: {
                    gridLineInterpolation: "polygon",
                    min: 0,
                    max: 10,
                    tickInterval: 2,
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

                series: [
                    {
                        name: this.sprint || "",
                        data: this.total || [],
                        pointPlacement: "on",
                    },
                ],
            },
        };
    },
});
</script>
