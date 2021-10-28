<template>
    <highcharts class="hc" :options="chartOptions"></highcharts>
</template>

<style>
.hc {
    height: 300px;
}
</style>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
    name: "GraphSpider",
    data: () => ({
            chartOptions: {
                chart: {
                    type: "line",
                    polar: true,
                },

                credits: {
                    enabled: false,
                },

                title: {
                    text: "Grafico para acocmpanhamento",
                },

                xAxis: {
                    categories: [
                        "Tema1",
                        "Tema2",
                        "Tema3",
                        "Tema4",
                        "Tema5",
                        "Tema6",
                    ],
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

                series: [
                    {
                        name: "Sprint 1",
                        data: [0, 4, 6, 6, 7, 9.5],
                        pointPlacement: "on",
                    }
                ]
            }
        })
    })
</script>
