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
        // this.notas
        //     .filter((data) => data.idEvaluated === '22')
        //     .map((data) => {
        //         console.log(data.note);
        //     });
        // this.criterios.map((cri) => {
        //     this.notas.map((nota) => {
        //         if (cri.idCriteria === nota.criterio.idCriteria) {
        //               this.notasGraph.push(
        //                 nota.note === null
        //                 ? 0
        //                 : nota.note
        //             );
        //         }
        //     });
        // });
        this.notas.map((not) => {
            this.criterios.map((cri) => {
                if (cri.idCriteria === not.criterio.idCriteria) {
                    this.notasGraph.push({
                        nome: cri.descCriteria,
                        nota: not.note === null ? 0 : not.note,
                    });
                }
            });
        });

        console.log("Notas do Grafico - ", this.notasGraph);

        for (var i = 0; i < this.notasGraph.length - 1; i++) {
            for (var n = 0; n < this.notasGraph.length - i - 1; n++) {
                if (this.notasGraph[n].nome === this.notasGraph[n+1].nome) {
                    // console.log('teste');
                    console.log(this.notasGraph[n].nome);
                    console.log(this.notasGraph[n].nota);
                }
            }
        }
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
                        name: "Sprint 1",
                        data: [0, 4, 6, 6, 7],
                        pointPlacement: "on",
                    },
                    {
                        name: "Sprint 2",
                        data: [2, 3, 6, 8, 7],
                        pointPlacement: "on",
                    },
                    {
                        name: "Sprint 3",
                        data: [1, 4, 6, 5, 2],
                        pointPlacement: "on",
                    },
                    {
                        name: "Sprint 4",
                        data: [3, 4, 6, 3, 7],
                        pointPlacement: "on",
                    },
                ],
            },
        };
    },
});
</script>
