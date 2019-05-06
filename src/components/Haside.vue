<template>
    <div>
        <el-aside width="200px" class="Haside">
            <el-menu
                    default-active="2"
                    class="el-menu-vertical-demo wrap">
                <el-menu-item index="2">
                    <i class="el-icon-setting"></i>
                    <span slot="title">导航三</span>
                </el-menu-item>
            </el-menu>
        </el-aside>
    </div>
</template>

<script>
    export default {
        name: "Haside"
    }
</script>

<style lang="scss" scoped>
    .wrap {
        border-right: none;
    }
</style>
