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
Vue.prototype.totalNotes = [];
Vue.prototype.sprint = [];
Vue.prototype.group = [];
Vue.prototype.users = [];
export default Vue.extend({
    name: "GraphSpider2",
    props: {
        notas: Array,
        sprintSelected: String,
        user: String,
        criterios: Array,
    },
    created() {
        setTimeout(() => {
            const groupBy = this.groupBy("idEvaluator");
            this.group = groupBy(
                this.notas.filter(
                    (data) =>
                        data.evaluated.idUser === this.user &&
                        data.idSprint === this.sprintSelected
                )
            );

            this.notas
                .filter(
                    (data) =>
                        data.evaluated.idUser === this.user &&
                        data.idSprint === this.sprintSelected
                )
                .map((data) => this.users.push(data.idEvaluator));

            this.users = this.users.filter(
                (este, i) => this.users.indexOf(este) === i
            );

            this.users.map((data) => {
                this.totalNotes.push({
                    name: "",
                    data: this.group[data],
                });
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
                    text: "Notas Separadas",
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
                    enabled: false
                },

                tooltip: {
                    shared: false,
                    valueSuffix: " Pontos",
                },

                series: this.totalNotes || [{ data: [] }],
            },
        };
    },
    methods: {
        groupBy(key) {
            return function group(array) {
                return array.reduce((acc, obj) => {
                    const property = obj[key];
                    acc[property] = acc[property] || [];
                    acc[property].push(obj.note);
                    return acc;
                }, {});
            };
        },
    },
});
</script>
