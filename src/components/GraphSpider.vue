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
Vue.prototype.total = [];
Vue.prototype.sprint = [];
Vue.prototype.maxNote = 0;
Vue.prototype.aux = [];
export default Vue.extend({
    name: "GraphSpider",
    props: {
        criterios: Array,
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


                //Data Mock. Wait call to backend with data;
                series: [
                    {
                        name: "Media da Sala",
                        data: [87, 95, 45, 7, 50 ],
                        color: 'blue'
                    },
                    {
                        name: "Notas dos Colegas",
                        data: [94, 30, 82, 6, 20 ],
                        color: 'green'
                    },
                ],
            },
        };
    },
});
</script>
