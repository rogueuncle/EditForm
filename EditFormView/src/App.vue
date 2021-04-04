<template>
    <div id="app">
        <div style="border: red 1px solid">
            <EditForm
                :mainTableColumns="columns"
                mainTableName="test"
                :headerButtons="[]"
            ></EditForm>
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
    data() {
        return {
            columns: [
                {
                    title: "Name",
                    dataIndex: "name",
                    key: "name",
                    ellipsis: true, // 自动缩略
                    filterDropdownVisible: true,
                    filterMultiple: true,
                    scopedSlots: { customRender: "name" },
                },
                {
                    title: "Age",
                    dataIndex: "age",
                    key: "age",
                    width: 150,
                    filters: [
                        // 筛选的选择值
                        {
                            text: "London",
                            value: "London",
                        },
                        {
                            text: "New York",
                            value: "New York",
                        },
                    ],
                    filterMultiple: true, // 筛选是否允许多选
                    onFilter: (value, record) =>record.age === value,
                    sorter: (a, b) => a.age - b.age,
                    sortDirections: ["descend", "ascend"],
                },
            ],
        };
    },
};
</script>

<style scoped>
</style>