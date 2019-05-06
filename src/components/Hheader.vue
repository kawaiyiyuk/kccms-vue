<template>
    <div class="Hhome">
        <el-header class="Hheader" >
            <el-row class="">
                <el-col :span="3">
                    <div class="row-logo">
                        logo
                    </div>
                </el-col>
                <el-col :span="21">
                    <el-menu
                            :default-active="activeIndex2"
                            class="el-menu-demo"
                            mode="horizontal"
                            @select="handleSelect">
                        <el-menu-item index="1">库存概览</el-menu-item>
                        <!--<el-submenu index="2">-->
                        <!--<template slot="title">我的工作台</template>-->
                        <!--<el-menu-item index="2-1">选项1</el-menu-item>-->
                        <!--<el-menu-item index="2-2">选项2</el-menu-item>-->
                        <!--<el-menu-item index="2-3">选项3</el-menu-item>-->
                        <!--</el-submenu>-->
                        <!--<el-menu-item index="3"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>-->
                    </el-menu>
                </el-col>
            </el-row>
        </el-header>
    </div>
</template>

<script>
    export default {
        name: "Hheader",
        data() {
            return {
                activeIndex: '1',
                activeIndex2: '1'
            }
        },
        methods: {
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
            }
        }
    }
</script>

<style lang="scss" scoped>
    .Hhome {
        padding: 0;
        border-bottom: 1px solid #eeeeee;
        .Hheader {
            width: 100%;
            position: fixed;
            top: 0px;
            padding: 0;
            border-bottom: 1px solid #eeeeee;
            z-index: 2;

            .row-logo {
                height: 60px;
                line-height: 60px;
                background-color: #ffffff;
            }

            .el-menu-demo {
                border-bottom: none;
            }
        }

    }
</style>
