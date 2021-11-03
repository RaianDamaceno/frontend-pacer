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
export default Vue.extend({
    name: "GraphSpider",
    props: {
        notas: [],
    },
    beforeMount() {
        this.notas
            .filter((not) => not.idEvaluated === "33" && not.idSprint === '1')
            .map((nt) => console.log(nt));
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
                    categories: [],
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
                    title: {
                        text: "Tempo de Sprint",
                    },
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
                        name: "teste",
                        data: [1, 2, 3, 4, 5, 6],
                        pointPlacement: "on",
                    },
                ],
            },
        };
    },
});
</script>
