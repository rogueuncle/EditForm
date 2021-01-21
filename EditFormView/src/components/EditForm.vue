<template>
    <div>
        <div :class="editFormClass">
            <a-row>
                <a-col :span="24">
                    <a-button-group>
                        <a-button v-for="item in header_Buttons" :key="item.title" 
                        :icon="item.icon" v-on:click="item.click">{{ item.title }}</a-button>
                    </a-button-group>
                    <a-divider style="margin: 8px 0" />
                </a-col>
            </a-row>
        </div>
    </div>
</template>

<script>
export default {
    name: "EditForm",
    props: {
        editFormClass: {
            //组件的类名
            type: String,
            default: "editForm_Class",
        },
        msg: String,
    },
    data(){
        return{
            header_Buttons:[
                {title:"查询",icon:"search",click:this.Search},
                {title:"刷新",icon:"search",click:this.Refear},
                {title:"新增",icon:"plus",click:this.Refear},
                {title:"修改",icon:"edit",click:this.Refear},
                {title:"删除",icon:"delete",click:this.Refear},
            ]
        }
    },
    methods:{
        Refear:function(){
            console.log(11)
        },
        Search(){

            console.log(1111)
        }
    }
};
</script>

<style>
.editForm_Class {
    max-width: 800px;
    margin-left: 5px;
    margin-top: 5px;
}
</style>