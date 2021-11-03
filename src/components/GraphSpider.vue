<template>
    <highcharts class="hc" :options="chartOptions"></highcharts>
</template>

<style>
.hc {
    height: 150%;
}
</style>

<script>
import Vue from "vue";
Vue.prototype.total = [];
export default Vue.extend({
    name: "GraphSpider",
    props: {
        criterios: {
            type: Array,
            default: () => [],
        },
        sprints: {
            type: Array,
            default: () => [],
        },
        notas: {
            type: Array,
            default: () => [],
        },
    },
    beforeMount() {
        this.notas.map((not) => {
            this.criterios
                .filter((cr) => cr.idCriteria === not.criterio.idCriteria)
                .map((crit) => {
                    this.notasGraph.push({
                        nome: crit.descCriteria,
                        nota: not.note === null ? 0 : not.note,
                    });
                });
        });

        this.criterios.map((crit) => {
            this.total.push(
                this.notasGraph
                    .filter((nt) => nt.nome === crit.descCriteria)
                    .reduce(function(total, numero) {
                        return total + numero.nota;
                    }, 0)
            );
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
                    categories: this.criterios.map((data) => {
                        return data.descCriteria;
                    }),
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
                        text: 'Tempo de Sprint'
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
                        name: `${this.sprints[0].initialDate} | ${this.sprints[0].finalDate}`,
                        data: this.total,
                        pointPlacement: "on",
                    },
                ],
            },
        };
    },
});
</script>
