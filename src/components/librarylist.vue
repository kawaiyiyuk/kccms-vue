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
        <div class="change-btn">
            <el-button @click="getall">显示全部信息</el-button>
            <el-button @click="getinlibrary">只显示入库信息</el-button>
            <el-button @click="getoutlibrary">只显示出库信息</el-button>
        </div>
        <div class="library-list-table">
            <el-table
                    :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
                    border
                    height="430"
                    class="main-table"
                    style="width: 100%"><!--:data 是分页的重点-->
                <el-table-column
                        align="center"
                        label="序号"
                        width="60">
                    <template slot-scope="scope"><span>{{scope.$index+1}} </span></template>
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="name"
                        label="商品名称"
                        width="240">
                    <template slot-scope="scope">
                        <!--<i class="el-icon-time"></i>-->
                        <span style="margin-left: 10px">{{ scope.row.name }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="name"
                        label="类型"
                        width="120">
                    <template slot-scope="scope">
                        <!--<i class="el-icon-time"></i>-->
                        <span v-if="scope.row.status == 0" style="margin-left: 10px">入库</span>
                        <span v-if="scope.row.status == 1" style="margin-left: 10px">出库</span>
                    </template>
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="num"
                        label="数量"
                        width="80">
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="date"
                        width="130"
                        label="时间">
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="price"
                        width="120"
                        label="商品价格">
                    <template slot-scope="scope">{{ scope.row.price | currency}}</template>
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="dec"
                        label="商品型号">
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="Remarks"
                        label="备注">
                </el-table-column>
            </el-table>
        </div>
        <!--分页-->
        <div class="page">
            <el-pagination
                    background
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="tableData.length"
                    :page-sizes="[5, 10, 20, 40]"
                    :page-size="pagesize"
                    @current-change="handleCurrentChange"
                    @size-change="handleSizeChange">
            </el-pagination>
        </div>
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
                copetableData: [],
                //分页初始页
                currentPage: 1,
                //分页每页数据
                pagesize: 10,
            }
        },
        computed:{
            income() {
                return (this.outpricetotle - this.inpricetotle)
            }
        },
        methods: {
            //获取本月出入库数据统计
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
            },
            //获取出入库详细列表
            getlibrarylist () {
                this.axios.post('/api/librarylist/librarylist',{
                    "user_id":this.$store.state.user_id.user_id
                }).then((data) => {
                    data.data.librarylist.forEach((item, index) => {
                        if(item.date) {
                            let date = new Date(parseInt(item.date));
                            let Y = date.getFullYear() + '-';
                            let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
                            let D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
                            let h = date.getHours() + ':';
                            let m = date.getMinutes() + ':';
                            let s = date.getSeconds();
                            item.date = Y + M + D;
                        }
                    })
                    this.tableData = data.data.librarylist;
                    this.copetableData = data.data.librarylist;
                    // console.log(data)
                }).catch((error) => {
                    console.log(error)
                })
            },
            //分页切换页码
            handleCurrentChange(currentPage) {
                this.currentPage = currentPage;
            },
            //分页每页显示的数量
            handleSizeChange(size) {
                this.pagesize = size
            },
            //只显示入库信息
            getinlibrary () {
                let newtableData = [];
                this.copetableData.forEach((item, index) => {
                    if(item.status == 0) {
                        newtableData.push(item)
                    }
                });
                this.tableData = newtableData
            },

            //只显示出库信息
            getoutlibrary () {
                let newtableData = [];
                this.copetableData.forEach((item, index) => {
                    if(item.status == 1) {
                        newtableData.push(item)
                    }
                });
                this.tableData = newtableData
            },

            //显示全部库存信息
            getall() {
                this.tableData = this.copetableData
            }

        },
        components: {
            Hheader
        },
        mounted() {
            this.getOverview();
            this.getlibrarylist();
        },
        created(){

        }
    }
</script>

<style lang="scss" scoped>
    .library-list {

        .library-list-table{
            width: 90%;
            margin: 30px auto 30px;
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
        .page {
            margin-top: 20px;
        }
        .change-btn {
            text-align: left;
            width: 90%;
            margin: 50px auto 0;
        }
    }

</style>
