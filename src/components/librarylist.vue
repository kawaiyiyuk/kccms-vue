<template>
    <div class="library-list">
        <Hheader></Hheader>
        <div class="library-list-main">
            <ul class="overview">
                <li>
                    <h2>本月出库总额:{{outpricetotle|currency}}</h2>
                </li>
                <li>
                    <h2>本月入库总额:{{inpricetotle | currency}}</h2>
                </li>
                <li>
                    <h2>本月收益:{{income | currency}}</h2>
                </li>
            </ul>
        </div>
        <!--<div class="library-list-table">-->
            <!--<el-table-->
                    <!--:data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"-->
                    <!--border-->
                    <!--class="main-table"-->
                    <!--style="width: 100%">&lt;!&ndash;:data 是分页的重点&ndash;&gt;-->
                <!--<el-table-column-->
                        <!--align="center"-->
                        <!--label="序号"-->
                        <!--width="60">-->
                    <!--<template slot-scope="scope"><span>{{scope.$index+1}} </span></template>-->
                <!--</el-table-column>-->
                <!--<el-table-column-->
                        <!--align="center"-->
                        <!--prop="name"-->
                        <!--label="商品名称"-->
                        <!--width="240">-->
                    <!--<template slot-scope="scope">-->
                        <!--&lt;!&ndash;<i class="el-icon-time"></i>&ndash;&gt;-->
                        <!--<span style="margin-left: 10px">{{ scope.row.name }}</span>-->
                    <!--</template>-->
                <!--</el-table-column>-->
                <!--<el-table-column-->
                        <!--align="center"-->
                        <!--prop="num"-->
                        <!--label="数量"-->
                        <!--width="80">-->
                <!--</el-table-column>-->
                <!--<el-table-column-->
                        <!--align="center"-->
                        <!--prop="date"-->
                        <!--width="130"-->
                        <!--label="时间">-->
                <!--</el-table-column>-->
                <!--<el-table-column-->
                        <!--align="center"-->
                        <!--prop="price"-->
                        <!--width="120"-->
                        <!--label="商品价格">-->
                    <!--<template slot-scope="scope">{{ scope.row.price | currency}}</template>-->
                <!--</el-table-column>-->
                <!--<el-table-column-->
                        <!--align="center"-->
                        <!--prop="dec"-->
                        <!--label="商品型号">-->
                <!--</el-table-column>-->
                <!--<el-table-column-->
                        <!--align="center"-->
                        <!--prop="Remarks"-->
                        <!--label="备注">-->
                <!--</el-table-column>-->
            <!--</el-table>-->
        <!--</div>-->
    </div>
</template>

<script>
    import Hheader from '@/components/Hheader'
    import filter from '@/assets/js/filters'

    export default {
        name: "librarylist",
        data() {
            return {
                inpricetotle: null,
                outpricetotle: null,
                tableData: [],
            }
        },
        computed:{
            income() {
                return (this.inpricetotle - this.outpricetotle)
            }
        },
        methods: {
            getOverview() {
                this.axios.post('/api/librarylist/overview', {
                    'user_id': this.$store.state.user_id.user_id
                })
                    .then((data) => {
                        this.inpricetotle = data.data.inpricetotle;
                        this.outpricetotle = data.data.outpricetotle;
                        console.log(data)
                    })
                    .catch(() => {
                    })
            }
        },
        components: {
            Hheader
        },
        mounted() {
            this.getOverview()
        }
    }
</script>

<style lang="scss" scoped>
    .library-list {

        .library-list-table{
            width: 80%;
            margin: 0 auto;
        }
        .library-list-main {
            margin-top: 80px;

            .overview {

                li {
                    width: 25%;
                    height: 100px;
                    line-height: 100px;
                    display: inline-block;
                    background-color: #cccccc;
                    text-align: left;
                    padding-left: 20px;
                    box-sizing: border-box;
                    margin-right: 20px;

                    h2 {
                        margin: 0;
                    }
                }
            }
        }
    }

</style>
