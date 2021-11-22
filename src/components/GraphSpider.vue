/* eslint-disable vue/require-prop-type-constructor */
<template>
    <div  style="width:100%">
        <highcharts class="hc" :options="chartOptions"></highcharts>
    </div>
</template>

<style>
.hc {
    height: 100%;
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
    },
    created() {
        setTimeout(() => {
            this.notas
                .filter(
                    (data) =>
                        data.evaluated.idUser === this.user &&
                        data.idSprint === this.sprintSelected
                )
                .map((nt) => {
                    if (this.sprint.length === 0) {
                        this.sprint.push(
                            nt.sprint.initialDate + " | " + nt.sprint.finalDate
                        );
                    }
                });

            this.criterios.map((cri) => {
                this.aux.push(
                    this.notas
                        .filter(
                            (data) =>
                                data.criterio.descCriteria === cri.descCriteria
                        )
                        .filter(
                            (data) =>
                                data.evaluated.idUser === this.user &&
                                data.idSprint === this.sprintSelected
                        )
                );
            });

            this.aux.map((data) => {
                this.total.push(
                    data
                        .map((dat) => {
                            return dat.note;
                        })
                        .reduce((accum, curr) => accum + curr) /
                        data.map((dat) => {
                            return dat;
                        }).length
                );
            });

            this.maxNote = this.total.reduce(function (a, b) {
                return Math.max(a, b);
            });
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
                    text: "Grafico para acompanhamento",
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
                    max: this.maxNote || 100,
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
