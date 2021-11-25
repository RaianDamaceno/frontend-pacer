/* eslint-disable vue/require-prop-type-constructor */
<template>
    <highcharts class="hc" :options="chartOptions"></highcharts>
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
        notas: Array,
        sprintSelected: String,
        user: String,
        criterios: Array,
        grupoAtivo: String,
    },
    created() {
        setTimeout(() => {
            // this.notas.filter(
            //     (data) =>
            //         data.evaluated.idUser === this.user &&
            //         data.idSprint === this.sprintSelected &&
            //         data.idGroup === this.grupoAtivo
            // )

            //Data Mock. Wait call to backend with data;
            var values = {
                medias: [87, 95, 45, 7, 50],
                notes: [94, 30, 82, 6, 20],
            };
            this.total.push(
                {
                    name: "Media da Sala",
                    data: values.medias,
                },
                {
                    name: "Notas dos Colegas",
                    data: values.notes,
                }
            );
        }, 1000);
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

                series: this.total || [],
            },
        };
    },
});
</script>
