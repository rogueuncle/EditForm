<template>
    <div id="app">
        <div style="border: red 1px solid">
            <EditForm></EditForm>
        </div>

        <!-- <asyncexample></asyncexample> -->
        <!-- <home></home> -->
        <!-- <component :is="currentView"></component> -->
    </div>
</template>

<script>
    import EditForm from "./components/EditForm.vue";

    // var home = { template: "<div>我是主页</div>" };
    export default {
        name: "app",
        components: {
            EditForm,
            // home,
            // asyncexample: { template: "<div>I am async!</div>" },
        },
        // computed: {
        //     currentView() {
        //         return home;
        //     },
        // },
    };
</script>

<style>
</style>