<template>
    <div :class="['editFormDiv', editFormClass]">
        <a-row style="height: 100%">
            <a-col :span="24" style="height: 100%">
                <a-button-group ref="button_group">
                    <a-button
                        v-for="item in header_Buttons"
                        v-show="_checkAuthority(item.authority, 'show')"
                        :disabled="!_checkAuthority(item.authority, 'enabled')"
                        :key="item.title"
                        :icon="item.icon"
                        :style="item.style"
                        v-on:click="item.click"
                        >{{ item.title }}</a-button
                    >
                    <!-- v-auth:show="_checkAuthority(item.authority, 'show')"
                        v-auth:enabled="_checkAuthority(item.authority, 'enabled')" -->
                </a-button-group>

                <a-divider style="margin: 8px 0" />
                <div :style="elementStyles.BodyHeight">
                    <div id="SplitPane_1" style="overflow: auto">
                        <a-table
                            bordered
                            size="small"
                            :columns="mainTableColumns"
                            :data-source="mainTableData"
                            style=""
                            :pagination="{ hideOnSinglePage: false }"
                        >
                            <!-- <a slot="name" slot-scope="int">{{ int }}</a> -->
                        </a-table>
                    </div>
                    <div id="SplitPane_2">1231231</div>
                </div>
            </a-col>
        </a-row>
    </div>
</template>

<script>
import Split from "split.js";

export default {
    name: "EditForm",
    props: {
        // 组件的类名
        editFormClass: String,
        // 主表名称
        mainTableName: {
            type: String,
            required: true,
        },
        // 主表列
        mainTableColumns: Array,
        // 从表属性
        subTable: {
            // [{tableName:Str,Cols:Str,Id:Str}]
            type: Array,
            default: () => [],
        },
        // 工具栏按钮组，相同id则替换
        headerButtons: {
            type: Array,
            default: () => [],
        },
        // 权限列表
        authoritys: {
            type: Set || Array,
            default: () => new Set(),
        },
    },
    created() {
        this._initHeaderButtons(); // 更新工具栏按钮组
    },
    mounted() {
        if (this.mainTableColumns == null) {
            console.log("col is null");
        }
        this._initSplitPane(); // 更新分割面板
    },
    computed: {},
    data() {
        return {
            // 本地元素集合的样式
            elementStyles: {
                BodyHeight: {
                    height: "calc(100% - 60px)",
                },
            },
            //工具栏按钮组
            header_Buttons: [
                {
                    id: "search", // 按钮id
                    title: "查询", // 按钮标题
                    icon: "search", // 图标
                    click: this.Search, // 触发函数
                    index: 0, // 显示顺序
                    style: {}, // style对象
                    authority: { show: -1, enabled: -1 }, // 权限id  -1 表示权限不生效
                },
                {
                    id: "reload",
                    title: "刷新",
                    icon: "reload",
                    click: this.Refear,
                    index: 1,
                    authority: { show: -1, enabled: -1 },
                },
                {
                    id: "append",
                    title: "新增",
                    icon: "plus",
                    click: this.Refear,
                    index: 2,
                },
                {
                    id: "update",
                    title: "修改",
                    icon: "edit",
                    click: this.Refear,
                    index: 3,
                },
                {
                    id: "delete",
                    title: "删除",
                    icon: "delete",
                    click: this.Refear,
                    index: 4,
                },
            ],
            // 主表数据
            mainTableData: [
                {
                    key: "1",
                    name: "John Brown",
                    age: 32,
                    address:
                        "New York No. 1 Lake Park, New York No. 1 Lake Park",
                    tags: ["nice", "developer"],
                },
                {
                    key: "2",
                    name: "Jim Green",
                    age: 42,
                    address: "London No. 2 Lake Park, London No. 2 Lake Park",
                    tags: ["loser"],
                },
                {
                    key: "3",
                    name: "Joe Black",
                    age: 32,
                    address: "Sidney No. 1 Lake Park, Sidney No. 1 Lake Park",
                    tags: ["cool", "teacher"],
                },
            ],
        };
    },
    methods: {
        _initHeaderButtons: function () {
            // 初始化工具栏按钮，根据传入的按钮数组通过id比较来更新默认工具栏后再根据index字段进行排序
            if (this.headerButtons.length > 0) {
                this.headerButtons.forEach((item) => {
                    // 遍历 工具栏按钮组
                    let button_id = item["id"];
                    let _hasbutton = false;
                    for (
                        let index = 0;
                        index < this.header_Buttons.length;
                        index++
                    ) {
                        // 遍历默认按钮组
                        const element = this.header_Buttons[index];
                        if (element["id"] === button_id) {
                            this.header_Buttons[index] = item;
                            _hasbutton = true;
                            break;
                        }
                    }
                    if (_hasbutton === false) this.header_Buttons.push(item); // 遍历的button不存在于默认按钮列表则追加
                });
                this.header_Buttons.sort(function (a, b) {
                    return a["index"] - b["index"];
                });
            }
        },
        _initSplitPane: function () {
            this.elementStyles.BodyHeight.height =
                "calc(100% - " +
                this.$refs.button_group.$el.offsetHeight -
                17 +
                "px)"; // 计算Splite.js组件的父组件的高度  -1是计算分割线的高度

            Split(["#SplitPane_1", "#SplitPane_2"], {
                sizes: [75, 25], // 尺寸比例
                direction: "vertical", // 显示方式
                minSize: [200, 100], // 最小尺寸
                snapOffset: 5, // 吸附的最小像素距离
                onDragEnd: function (size) {
                    console.log(size);
                },
            });
        },

        _checkAuthority(value, property) {
            // 验证元素权限  为null 或 underfined 或 -1 则表示为设置权限，默认为允许  存在于权限列表则允许否则禁止
            if (
                value === null ||
                value === undefined ||
                value.hasOwnProperty(property) === false
            ) {
                return true;
            } else {
                if (value[property] === -1) return true;

                if (
                    this.authoritys.hasOwnProperty("has") &&
                    this.authoritys.has(value[property])
                ) {
                    // 验证this.authoritys 是Set的情况下
                    return true;
                }

                if (
                    this.authoritys.hasOwnProperty("indexOf") &&
                    this.authoritys.indexOf(value[property]) != -1
                ) {
                    // 验证this.authoritys 是Array的情况下
                    return true;
                }

                return false;
            }
        },
        Refear: function () {
            console.log(11);
        },
        Search() {
            console.log(1111);
        },
    },
    directives: {
        auth: {
            inserted: function (el, binding) {
                // value为true or false
                if (binding.arg === "show") {
                    if (binding.hasOwnProperty("value")) {
                        el.style.display = binding.value ? "" : "none";    // 可视
                    } else {
                        el.style.display = "";
                    }
                    return;
                }

                if (binding.arg === "enabled") {
                    if (binding.hasOwnProperty("value")) {
                        debugger
                        el.disabled = binding.value ? false : true;    // 禁止
                        
                    } else {
                        el.disabled = true;
                    }
                    return;
                }
            },
        },
    },
};
</script>

<style>
</style>
<style scoped>
.editFormDiv {
    height: 500px;
    /* width: 800px; */
    margin-left: 5px;
    margin-top: 5px;
}
.editFormDiv >>> .gutter {
    background-color: #eee;

    background-repeat: no-repeat;
    background-position: 50%;

    cursor: move;
    cursor: grab;
    cursor: -moz-grab;
    cursor: -webkit-grab;
}

.editFormDiv >>> .gutter:active {
    cursor: grabbing;
    cursor: -moz-grabbing;
    cursor: -webkit-grabbing;
}

.editFormDiv >>> .gutter.gutter-horizontal {
    background-image: url("../assets/vertical.png");
}

.editFormDiv >>> .gutter.gutter-vertical {
    background-image: url("../assets/horizontal.png");
}
</style>