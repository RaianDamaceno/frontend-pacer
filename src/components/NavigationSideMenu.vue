<template>
    <nav></nav>
</template>
<script lang="ts">
    import Vue from 'vue'

    export default Vue.extend({
        name: 'NavigationSideMenu',
        data: () => ({
            cardProps: false,
            card: false,
            snackbar: false
        }),
    })
</script>
<style scoped lang="scss">
    nav {
        width: 25%;
        height: 100%;
        border: solid 1px black;
        position: fixed;
        float: left;
    }
</style>