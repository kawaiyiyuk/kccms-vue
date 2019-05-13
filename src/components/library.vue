<template>
    <div class="library">
        <Hheader></Hheader>

        <div class="library-main">
            <div>
                <div class="library-main-header" v-if="tableData">
                    <el-row :gutter="20">
                        <el-col :span="8">
                            <div class="grid-content bg-purple">
                                商品名称 : {{tableData.name}}
                            </div>
                        </el-col>
                        <el-col :span="8">
                            <div class="grid-content bg-purple">
                                条形码:{{tableData.barCode}}
                            </div>
                        </el-col>
                        <el-col :span="8">
                            <div class="grid-content bg-purple">
                                剩余库存:{{tableData.num}}
                            </div>
                        </el-col>
                        <el-col :span="8">
                            <div class="grid-content bg-purple">
                                商品单价:{{tableData.price|currency}}
                            </div>
                        </el-col>
                        <el-col :span="8">
                            <div class="grid-content bg-purple">
                                入库时间:{{tableData.date}}
                            </div>
                        </el-col>
                        <el-col :span="8">
                            <div class="grid-content bg-purple">
                                商品型号:{{tableData.dec}}
                            </div>
                        </el-col>
                        <el-col :span="8">
                            <div class="grid-content bg-purple">
                                <el-button type="success" @click="inlibraryDialog =true">新增入库</el-button>
                                <el-button type="success" @click="outlibraryDialog =true">新增出库</el-button>
                            </div>
                        </el-col>
                    </el-row>
                </div>

                <el-tabs v-model="activeName" type="card" @tab-click="handleClick" class="change-tip">
                    <el-tab-pane label="入库管理" name="first">

                        <div class="library-main-table">
                            <el-table
                                    :data="libraryData.slice((currentPagein-1)*pagesizein,currentPagein*pagesizein)"
                                    border
                                    height="450"
                                    class="main-table"
                                    align="center"><!--:data 是分页的重点-->
                                <el-table-column
                                        align="center"
                                        label="序号"
                                        width="60">
                                    <template slot-scope="scope">
                                        <span>{{scope.$index+(currentPagein - 1) * pagesizein + 1}} </span>
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
                                        label="备注信息">
                                </el-table-column>
                                <el-table-column
                                        align="center"
                                        fixed="right"
                                        label="操作"
                                        width="250">
                                    <template slot-scope="scope">
                                        <!--<el-button type="primary" size="small"-->
                                                   <!--@click=" editinLibrary(scope.$index,scope.row)">编辑-->
                                        <!--</el-button>-->
                                        <el-button type="danger" size="small" @click="deledata(scope.$index,scope.row)">
                                            删除
                                        </el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>

                        <!--分页-->
                        <div class="page">
                            <el-pagination
                                    background
                                    layout="total, sizes, prev, pager, next, jumper"
                                    :total="libraryData.length"
                                    :page-sizes="[5, 10, 20, 40]"
                                    :page-size="pagesizein"
                                    @current-change="handleCurrentChange"
                                    @size-change="handleSizeChange">
                            </el-pagination>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="出库管理" name="second">
                        <div class="library-main-table">
                            <el-table
                                    :data="libraryoutData.slice((currentPageout-1)*pagesizeout,currentPageout*pagesizeout)"
                                    height="450"
                                    border
                                    class="main-table"
                                    align="center"><!--:data 是分页的重点-->
                                <el-table-column
                                        align="center"
                                        label="序号"
                                        width="60">
                                    <template slot-scope="scope">
                                        <span>{{scope.$index+(currentPageout - 1) * pagesizeout + 1}} </span>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        align="center"
                                        prop="date"
                                        label="出库时间"
                                        width="240">
                                    <!--<template slot-scope="scope">-->
                                    <!--&lt;!&ndash;<i class="el-icon-time"></i>&ndash;&gt;-->
                                    <!--<span style="margin-left: 10px">{{ new Date(scope.row.date) }}</span>-->
                                    <!--</template>-->
                                </el-table-column>
                                <el-table-column
                                        align="center"
                                        prop="num"
                                        label="出库数量"
                                        width="80">
                                </el-table-column>
                                <el-table-column
                                        align="center"
                                        prop="price"
                                        width="120"
                                        label="出库价格">
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
                                        label="备注信息">
                                </el-table-column>
                                <el-table-column
                                        align="center"
                                        fixed="right"
                                        label="操作"
                                        width="250">
                                    <template slot-scope="scope">
                                        <!--<el-button type="primary" size="small"-->
                                                   <!--@click=" editInventory(scope.$index,scope.row)">编辑-->
                                        <!--</el-button>-->
                                        <el-button type="danger" size="small"
                                                   @click="deleoutdata(scope.$index,scope.row)">
                                            删除
                                        </el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>

                        <!--分页-->
                        <div class="page">
                            <el-pagination
                                    background
                                    layout="total, sizes, prev, pager, next, jumper"
                                    :total="libraryoutData.length"
                                    :page-sizes="[5, 10, 20, 40]"
                                    :page-size="pagesizeout"
                                    @current-change="handleCurrentChangeout"
                                    @size-change="handleSizeChangeout">
                            </el-pagination>
                        </div>
                    </el-tab-pane>
                </el-tabs>
            </div>

        </div>
        <!--入库弹窗-->
        <el-dialog class="add-dialog" title="添加入库商品" :visible.sync="inlibraryDialog" :modal-append-to-body='false'>
            <el-form :model="forminlibrary" class="main-dialog">

                <el-form-item label="商品价格" :label-width="formLabelWidth">
                    <el-input v-model="forminlibrary.price"></el-input>
                </el-form-item>
                <el-form-item label="商品数量" :label-width="formLabelWidth">
                    <el-input v-model="forminlibrary.num"></el-input>
                </el-form-item>
                <el-form-item class="inlibrary-data" label="入库时间" :label-width="formLabelWidth">
                    <div class="block">
                        <el-date-picker
                                v-model="DataValueInli"
                                type="datetime"
                                placeholder="选择日期"
                                value-format="timestamp">
                        </el-date-picker>
                    </div>
                </el-form-item>
                <el-form-item label="商品型号" :label-width="formLabelWidth">
                    <el-input v-model="forminlibrary.dec"></el-input>
                </el-form-item>
                <el-form-item label="备注" :label-width="formLabelWidth">
                    <el-input v-model="forminlibrary.Remarks"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="inlibraryDialog = false">取 消</el-button>
                <el-button type="primary" @click="InFormpost">确 定</el-button>
            </div>
        </el-dialog>

        <!--出库弹窗-->
        <el-dialog class="add-dialog" title="添加出库商品" :visible.sync="outlibraryDialog" :modal-append-to-body='false'>
            <el-form :model="formoutlibrary" class="main-dialog">

                <el-form-item label="商品价格" :label-width="formLabelWidth">
                    <el-input v-model="formoutlibrary.price"></el-input>
                </el-form-item>
                <el-form-item label="商品数量" :label-width="formLabelWidth">
                    <el-input v-model="formoutlibrary.num"></el-input>
                </el-form-item>
                <el-form-item class="inlibrary-data" label="出库时间" :label-width="formLabelWidth">
                    <div class="block">
                        <el-date-picker
                                v-model="DataValueOutli"
                                type="datetime"
                                placeholder="选择日期"
                                value-format="timestamp">
                        </el-date-picker>
                    </div>
                </el-form-item>
                <el-form-item label="商品型号" :label-width="formLabelWidth">
                    <el-input v-model="formoutlibrary.dec"></el-input>
                </el-form-item>
                <el-form-item label="备注" :label-width="formLabelWidth">
                    <el-input v-model="formoutlibrary.Remarks"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="outlibraryDialog = false">取 消</el-button>
                <el-button type="primary" @click="OutFormpost">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import Hheader from '@/components/Hheader';
    import filter from '@/assets/js/filters'

    export default {
        name: "library",
        data() {
            return {
                user_id: '',
                library: 111,
                //入库分页初始页
                currentPagein: 1,
                //入库分页每页数据
                pagesizein: 10,
                //出库分页初始页
                currentPageout: 1,
                //出库分页每页数据
                pagesizeout: 10,
                //入库表格数据
                libraryData: [],
                //出库表格数据
                libraryoutData: [],
                //商品信息
                tableData: null,
                //选显卡默认显示第一个
                activeName: 'first',
                //入库弹窗
                inlibraryDialog: false,
                //入库弹窗数据
                forminlibrary: {
                    price: '',
                    num: '',
                    dec: '',
                    Remarks: '',
                },
                formLabelWidth: '100px',
                //入库弹窗日期
                DataValueInli: '',
                //出库弹窗
                outlibraryDialog: false,
                //出库弹窗数据
                formoutlibrary: {
                    price: '',
                    num: '',
                    dec: '',
                    Remarks: '',
                },
                //入库弹窗日期
                DataValueOutli: ''
            }
        },
        computed: {},
        methods: {
            //入库分页切换页码
            handleCurrentChange(currentPage) {
                this.currentPagein = currentPage;
            },
            //入库分页每页显示的数量
            handleSizeChange(size) {
                this.pagesizein = size
            },

            //出库分页切换页码
            handleCurrentChangeout(currentPage) {
                this.currentPageout = currentPage;
            },
            //出库分页每页显示的数量
            handleSizeChangeout(size) {
                this.pagesizeout = size
            },

            //卡片切换事件
            handleClick(tab, event) {
                //console.log(tab, event);
            },
            //获取出入库数据
            getData() {
                //获取商品数据库
                let obj = {};
                obj.user_id = this.user_id;
                // console.log(this.$store.state.productId)
                this.axios.post('api/product/findLibrData', {
                    product_id: this.$store.state.productId
                }).then((data) => {
                    this.tableData = data.data.item;
                    if (data.data.item.date) {
                        let date = new Date(parseInt(data.data.item.date));
                        let Y = date.getFullYear() + '-';
                        let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
                        let D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
                        let h = date.getHours() + ':';
                        let m = date.getMinutes() + ':';
                        let s = date.getSeconds();
                        data.data.item.date = Y + M + D;
                    }
                }).catch((error) => {
                    console.log(error)
                })

                this.axios.post('api/library/findData', {
                    user_id: this.user_id,
                    product_id: this.$store.state.productId
                }).then((data) => {
                    // console.log(data)
                    this.libraryData = data.data.item.inlibrary;
                    data.data.item.inlibrary.forEach((item, index) => {
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

                    this.libraryoutData = data.data.item.outlibrary;
                    data.data.item.outlibrary.forEach((item, index) => {
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
            deledata(index, row) {
                //入库数据的 id
                console.log(row)
                let libry_id = row.libry_id;
                //商品的 id
                let product_id = this.$store.state.productId;
                let user_id = this.$store.state.user_id.user_id;
                let num = row.num;
                this.$confirm('此操作将永久删除该库存, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.axios.post('http://127.0.0.1:3000/library/deleteinlibrary', {
                        user_id:user_id,
                        product_id: product_id,
                        libry_id: libry_id,
                        num: num
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

            },

            //删除出库数据
            deleoutdata(index, row) {

                let libry_id = row.libry_id;
                //商品的 id
                let product_id = this.$store.state.productId;
                let user_id = this.$store.state.user_id.user_id;
                let num = row.num;
                this.$confirm('此操作将永久删除该库存, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.axios.post('http://127.0.0.1:3000/library/deleteoutlibrary', {
                        libry_id: libry_id,
                        product_id: product_id,
                        user_id:user_id,
                        num: num
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

            },

            //编辑入库信息
            editinLibrary (index ,row) {
                console.log(row)
                let libry_id = row.libry_id;
                //商品的 id
                let product_id = this.$store.state.productId;
                let user_id = this.$store.state.user_id.user_id;
                let num = row.num;
                this.axios.post('/api/library/editinlibrart',{
                    product_id:product_id,
                    user_id:user_id,
                    data:row
                }).then(() => {

                }).catch ((err) => {
                    console.log(err)
                })
            },

            //新增入库
            InFormpost(type) {
                this.forminlibrary.date = this.DataValueInli;
                this.forminlibrary.product_id = this.$store.state.productId;
                this.forminlibrary.user_id = this.$store.state.user_id.user_id;
                this.axios.post('api/library/addData',
                    this.forminlibrary
                ).then((data) => {
                    // console.log( this.forminlibrary)
                    this.$message({
                        type: 'success',
                        dangerouslyUseHTMLString: true,
                        message: '<strong>添加成功</strong>'
                    });
                    this.getData()
                }).catch(() => {

                });
                this.inlibraryDialog = false;
                //location.reload();
            },
            //新增出库
            OutFormpost() {
                this.formoutlibrary.date = this.DataValueOutli;
                this.formoutlibrary.product_id = this.$store.state.productId;
                this.formoutlibrary.user_id = this.$store.state.user.user_id;
                this.axios.post('api/library/outData',
                    this.formoutlibrary
                ).then((data) => {
                    this.$message({
                        type: 'success',
                        dangerouslyUseHTMLString: true,
                        message: '<strong>添加成功</strong>'
                    });
                    this.getData()
                }).catch(() => {

                });
                this.outlibraryDialog = false;
                //location.reload();
            }
        },
        components: {
            Hheader
        },
        mounted() {
            //this.$store.commit('getProductId',)
        },
        created() {
            this.user_id = JSON.parse(localStorage.getItem('key')).user_id
            this.getData()
        },
        filters: {}
    }
</script>

<style lang="scss" scoped>
    .library {
        .el-tabs__nav-scroll {
            width: 1200px;
        }

        .library-main {
            margin-top: 80px;

            /deep/ .library-btn-group {
                position: absolute;
                top: -30px;
                right: 0;
                z-index: 10;
            }

            .library-main-header {
                width: 1200px;
                margin: 0 auto 20px;
                text-align: left;

                .grid-content {
                    height: 60px;
                    line-height: 60px;
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

    .add-dialog {
        .main-dialog {
            padding: 30px 40px 30px 20px;
        }

        .inlibrary-data {
            text-align: left;
        }
    }

    /deep/ .change-tip {
        width: 1200px;
        margin: 0 auto 0;
        position: relative;

        .el-tabs__header {
            margin-bottom: 1px;
            border-bottom: none;
        }


    }

</style>
