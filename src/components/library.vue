<template>
    <div class="library">
        <Hheader></Hheader>
        <div class="library-main">
            <div class="library-main-header" v-if="tableData">
                <el-row :gutter="20">
                    <el-col :span="8">
                        <div class="grid-content bg-purple">
                            商品名称 : {{tableData[0].name}}
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <div class="grid-content bg-purple">
                            条形码:{{tableData[0].barCode}}
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <div class="grid-content bg-purple">
                            剩余库存:{{tableData[0].num}}
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <div class="grid-content bg-purple">
                            商品单价:{{tableData[0].price}}
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <div class="grid-content bg-purple">
                            入库时间:{{tableData[0].date}}
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <div class="grid-content bg-purple">
                            商品备注:{{tableData[0].Remarks}}
                        </div>
                    </el-col>
                </el-row>
            </div>

            <div class="library-main-table">
                <el-table
                        :data="libraryData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
                        border
                        class="main-table"
                        style="width: 80%"
                        align="center"><!--:data 是分页的重点-->
                    <el-table-column
                            align="center"
                            label="序号"
                            width="60">
                        <template slot-scope="scope"><span>{{scope.$index+(currentPage - 1) * pagesize + 1}} </span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="date"
                            label="入库时间"
                            width="240">
                        <!--<template slot-scope="scope">-->
                        <!--&lt;!&ndash;<i class="el-icon-time"></i>&ndash;&gt;-->
                        <!--<span style="margin-left: 10px">{{ new Date(scope.row.date) }}</span>-->
                        <!--</template>-->
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="num"
                            label="入库数量"
                            width="80">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="price"
                            width="120"
                            label="入库价格">
                        <template slot-scope="scope">{{ scope.row.price}}</template>
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="dec"
                            label="商品描述">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="Remarks"
                            label="备注信息">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            fixed="right"
                            label="操作"
                            width="250">
                        <template slot-scope="scope">
                            <el-button type="primary" size="small" @click=" editInventory(scope.$index,scope.row)">编辑
                            </el-button>
                            <el-button type="danger" size="small" @click="deledata(scope.$index,scope.row)">删除
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <!--分页-->
        <div class="page">
            <el-pagination
                    background
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="libraryData.length"
                    :page-sizes="[5, 10, 20, 40]"
                    :page-size="pagesize"
                    @current-change="handleCurrentChange"
                    @size-change="handleSizeChange">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import Hheader from '@/components/Hheader';

    export default {
        name: "library",
        data() {
            return {
                library: 111,
                //分页初始页
                currentPage: 1,
                //分页每页数据
                pagesize: 10,
                libraryData: [],
                tableData: null

            }
        },
        computed: {
        },
        methods: {
            //分页切换页码
            handleCurrentChange(currentPage) {
                this.currentPage = currentPage;
            },
            //分页每页显示的数量
            handleSizeChange(size) {
                this.pagesize = size
            },
            getData() {
                // console.log(this.$store.state.productId)
                this.axios.post('api/product/findData', {
                    _id: this.$store.state.productId
                }).then((data) => {
                    this.tableData = data.data;
                    data.data.forEach((item, index) => {
                        if (item.date) {
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
                }).catch((error) => {
                    console.log(error)
                })

                this.axios.post('http://127.0.0.1:3000/library/findData', {
                    _id: '5cd113d66743c017c6eb31c9'
                }).then((data) => {
                    this.libraryData = data.data[0].inlibrary;
                    data.data[0].inlibrary.forEach((item, index) => {
                        if (item.date) {
                            let date = new Date(parseInt(item.date));
                            let Y = date.getFullYear() + '-';
                            let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
                            let D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
                            let h = date.getHours() + ':';
                            let m = date.getMinutes() + ':';
                            let s = date.getSeconds();
                            item.date = Y + M + D;
                        }
                    });
                }).catch((error) => {
                    console.log(error)
                })
            },

            //删除入库数据
            deledata (index,row) {
                //入库数据的 id
                let libid = row.libid;
                //商品的 id
                let id = this.$store.state.productId;
                this.$confirm('此操作将永久删除该库存, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.axios.post('http://127.0.0.1:3000/library/deleteinlibrary',{
                        id:'5cd113d66743c017c6eb31c8',
                        libid:libid
                    }).then(() => {
                        this.getData()
                        //console.log('删除成功');
                    }).catch(() => {
                        //console.log('删除失败');
                    })
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                })

            }
        },
        components: {
            Hheader
        },
        mounted() {
            //this.$store.commit('getProductId',)
        },
        created() {
            this.getData()
        },
        filters: {
            currency(num) {
                num = num.toString().replace(/\$|\,/g, '');
                if (isNaN(num))
                    num = "0";
                let sign = (num == (num = Math.abs(num)));
                num = Math.floor(num * 100 + 0.50000000001);
                let cents = num % 100;
                num = Math.floor(num / 100).toString();
                if (cents < 10)
                    cents = "0" + cents;
                for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++)
                    num = num.substring(0, num.length - (4 * i + 3)) + ',' +
                        num.substring(num.length - (4 * i + 3));
                return (((sign) ? '' : '-') + num + '.' + cents);
            }
        }
    }
</script>

<style lang="scss" scoped>
    .library {
        .library-main {
            margin-top: 80px;

            .library-main-header {
                width: 1200px;
                margin: 0 auto;
                text-align: left;

                .grid-content {
                    height: 80px;
                    line-height: 80px;
                }
            }

            .library-main-table {
                .main-table {
                    margin: 0 auto;
                }

            }
        }

        .page {
            margin-top: 20px;
            margin-bottom: 20px;
        }
    }

</style>
