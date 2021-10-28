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
                    },
                    {
                        name: "Sprint 2",
                        data: [2, 3, 6, 8, 7, 2],
                        pointPlacement: "on",
                    },
                    {
                        name: "Sprint 3",
                        data: [1, 4, 6, 5, 2, 3],
                        pointPlacement: "on",
                    },
                    {
                        name: "Sprint 4",
                        data: [3, 4, 6, 3, 7, 8],
                        pointPlacement: "on",
                    }
                ]
            }
        })
    })
</script>
