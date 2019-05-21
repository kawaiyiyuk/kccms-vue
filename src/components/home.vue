<template>
    <div class="home">
        <el-container>
            <el-container class="Hwarp">
                    <Hheader></Hheader>
                <el-container class="Hmain">
                        <!--<Haside></Haside>-->
                    <el-main>
                        <Hmain></Hmain>
                    </el-main>
                </el-container>
                <el-footer class="Hfooter">
                    <Hfooter></Hfooter>
                </el-footer>
            </el-container>
        </el-container>
    </div>
</template>

<script>
    import Hheader from './Hheader';
    import Haside from './Haside';
    import Hmain from './Hmain';
    import Hfooter from './Hfooter';
    export default {
        name: "home",
        data() {
            return {}
        },
        components: {
            Hheader,
            Haside,
            Hmain,
            Hfooter
        }
    }
</script>

<style scoped lang="scss">
    .Hwarp {
        position: relative;


        .Haside {
            height: 600px;
            border-right: 1px solid #eeeeee;
        }
        .Hmain {
            margin-top: 60px;
            margin-bottom: 80px;
            z-index: 1;
        }
        .Hfooter {
            width: 100%;
            background-color: cadetblue;
            position: fixed;
            bottom: 0px;
            z-index: 2;
        }
    }

</style>
