<template>
    <div class="hmain">
        <el-row class="main-header">
            <div class="main">
                <!--<el-button type="primary">新增库存</el-button>-->
                <el-button type="success" @click=" addDialog = true">新增库存</el-button>
            </div>
        </el-row>

        <div class="main-search">
            <el-autocomplete
                    v-model="searchNameState"
                    :fetch-suggestions="querySearchAsync"
                    placeholder="请输入商品名称或者型号"
                    @select="handleSelect"
            ></el-autocomplete>
            <el-button @click="fuzzyQueryData">搜索商品</el-button>
            <el-button type="info" @click="getdata()">显示全部商品</el-button>
        </div>
        <div class="table-wrap">
            <el-table
                    :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
                    border
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
                        prop="barCode"
                        label="条形码"
                        width="160">
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
                        prop="num"
                        label="数量"
                        width="80">
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="date"
                        width="130"
                        label="入库时间">
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
                <el-table-column
                        align="center"
                        fixed="right"
                        label="操作"
                        width="250">
                    <template slot-scope="scope">
                        <el-button type="success" size="small" @click="showLibrary(scope.$index,scope.row)">查看
                        </el-button>
                        <el-button type="primary" size="small" @click=" editInventory(scope.$index,scope.row)">编辑
                        </el-button>
                        <el-button type="danger" size="small" @click="deledata(scope.$index,scope.row)">删除</el-button>
                    </template>
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

        <!--新增库存弹窗-->
        <el-dialog class="add-dialog" title="添加库存商品" :visible.sync="addDialog" :modal-append-to-body='false'>
            <el-form :model="form" class="main-dialog" :rules="rules" ref="form">
                <el-form-item label="商品条形码" :label-width="formLabelWidth">
                    <el-input v-model="form.barCode"></el-input>
                </el-form-item>
                <el-form-item label="商品名称" :label-width="formLabelWidth" prop="name">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="商品价格" :label-width="formLabelWidth" prop="price">
                    <el-input v-model.number="form.price"></el-input>
                </el-form-item>
                <el-form-item label="商品数量" :label-width="formLabelWidth" prop="num">
                    <el-input v-model.number="form.num"></el-input>
                </el-form-item>
                <el-form-item class="inlibrary-data" label="入库时间" :label-width="formLabelWidth">
                    <div class="block">
                        <el-date-picker
                                v-model="DataValue"
                                type="datetime"
                                placeholder="选择日期"
                                value-format="timestamp">
                        </el-date-picker>
                    </div>
                </el-form-item>
                <el-form-item label="商品型号" :label-width="formLabelWidth">
                    <el-input v-model="form.dec"></el-input>
                </el-form-item>
                <el-form-item label="备注" :label-width="formLabelWidth">
                    <el-input v-model="form.Remarks"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addDialog = false">取 消</el-button>
                <el-button type="primary" @click="Formpost('form')">确 定</el-button>
            </div>
        </el-dialog>


        <!--编辑库存弹窗-->
        <el-dialog class="add-dialog" title="编辑库存商品" :visible.sync="editDialog" :modal-append-to-body='false'>
            <el-form :model="rowData" class="main-dialog" :rules="rules" ref="rowData">
                <el-form-item label="商品条形码" :label-width="formLabelWidth">
                    <el-input v-model="rowData.barCode"></el-input>
                </el-form-item>
                <el-form-item label="商品名称" :label-width="formLabelWidth" prop="name">
                    <el-input v-model="rowData.name"></el-input>
                </el-form-item>
                <el-form-item label="商品价格" :label-width="formLabelWidth" prop="price">
                    <el-input v-model.number="rowData.price"></el-input>
                </el-form-item>
                <el-form-item label="商品数量" :label-width="formLabelWidth" prop="num">
                    <el-input v-model.num="rowData.num"></el-input>
                </el-form-item>
                <el-form-item class="inlibrary-data" label="入库时间" :label-width="formLabelWidth">
                    <div class="block">
                        <el-date-picker
                                v-model="rowData.date"
                                type="date"
                                placeholder="选择日期"
                                value-format="timestamp">
                        </el-date-picker>
                    </div>
                </el-form-item>
                <el-form-item label="商品型号" :label-width="formLabelWidth">
                    <el-input v-model="rowData.dec"></el-input>
                </el-form-item>
                <el-form-item label="备注" :label-width="formLabelWidth">
                    <el-input v-model="rowData.Remarks"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="editDialog = false">取 消</el-button>
                <el-button type="primary" @click="dataEdit('rowData')">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        inject: ['reload'],
        name: "Hmain",
        data() {
            return {
                user_id: '',
                addDialog: false,
                editDialog: false,
                form: {
                    name: '',
                    price: 0,
                    num: '',
                    dec: '',
                    Remarks: '',
                    barCode: ''
                },
                formLabelWidth: '100px',
                DataValue: '',
                //表格数据
                tableData: [],
                //搜索用数据
                restaurants: [],
                //搜索框数据
                searchNameState: '',
                rowData: {
                    name: '',
                    price: 0,
                    num: '',
                    dec: '',
                    Remarks: '',
                    barCode: ''
                },
                rowDataValue: '',
                isRouterAlive: true,
                //分页初始页
                currentPage: 1,
                //分页每页数据
                pagesize: 10,
                rules: {
                    name: [
                        {required: true, message: '请输入活动名称', trigger: 'blur'}
                    ],
                    price: [
                        {type: 'number', message: '价格必须为数字', trigger: 'blur'}
                    ],
                    num: [
                        {required: true, message: '数量不能为空', trigger: 'blur'},
                        {type: 'number', message: '数量必须为数字', trigger: 'blur'}
                    ]
                }

            }
        },
        methods: {
            // submitForm(form) {
            //     this.$refs[form].validate((valid) => {
            //         if (valid) {
            //             alert('submit!');
            //         } else {
            //             console.log('error submit!!');
            //             return false;
            //         }
            //     });
            // },
            // resetForm(formName) {
            //     this.$refs[formName].resetFields();
            // },


            //搜索框显示远程数据库数据
            querySearchAsync(queryString, cb) {
                let list = [];
                this.axios.post('api/product/findData', {
                    user_id: this.$store.state.user_id.user_id
                }).then((res) => {
                    let data = res.data.productList.products
                    // console.log(res);
                    for (let item of data) {
                        item.value = item.name
                    }
                    list = data;
                    let results = queryString ? list.filter(this.createStateFilter(queryString)) : list;
                    clearTimeout(this.timeout);
                    this.timeout = setTimeout(() => {
                        cb(results)
                    }, 1000 * Math.random());

                });
            },
            //搜索框过滤用函数
            createStateFilter(queryString) {
                return (state) => {
                    return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
                };
            },
            //搜索框辅助函数 暂时没啥用
            handleSelect(item) {
                console.log(item);
            },
            searchProduct() {
                this.getdata({
                    "name": this.searchState
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
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done();
                    })
                    .catch(_ => {
                    });
            },
            //查找数据
            getdata() {
                let obj = {};
                obj.user_id = this.user_id;
                this.axios.post('api/product/findData', obj).then((data) => {
                    // console.log(data);
                    this.tableData = data.data.productList.products;
                    data.data.productList.products.forEach((item, index) => {
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
                    //console.log(this.tableData)
                }).catch(() => {

                })
            },

            //商品名模糊查询
            fuzzyQueryData() {
                this.axios.post('api/product/fuzzyQueryData', {
                    'name': this.searchNameState,
                    'dec': this.searchNameState,
                    'user_id': this.$store.state.user_id.user_id,
                    'product_id': this.$store.state.user_id.user_id,

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
            },
            //提交新增数据
            Formpost(form) {

                this.$refs[form].validate((valid) => {
                    if (valid) {
                        this.form.date = this.DataValue;
                        this.form.user_id = this.user_id;
                        this.axios.post('api/product/addData',
                            this.form
                        ).then((data) => {
                            this.$message({
                                type: 'success',
                                dangerouslyUseHTMLString: true,
                                message: '<strong>添加成功</strong>'
                            });
                            this.getdata()
                        }).catch(() => {

                        });
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
                this.addDialog = false;
            },
            //删除数据
            deledata(index, row) {
                let user_id = this.$store.state.user_id.user_id;
                this.$confirm('此操作将永久删除该库存, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.axios.post('api/product/deleteData', {
                        product_id: row.product_id,
                        user_id: user_id
                    }).then(() => {
                        this.getdata()
                        // console.log('删除成功');
                    }).catch(() => {
                        //console.log('删除失败');
                    })
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                }).catch((err) => {
                    console.log(err)
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },

            //编辑库存信息
            dataEdit(rowData) {
                this.$refs[rowData].validate((valid) => {
                    if (valid) {
                        this.axios.post('api/product/updateData',
                            this.rowData
                        ).then((data) => {
                            this.editDialog = false;
                            this.$message({
                                type: 'success',
                                dangerouslyUseHTMLString: true,
                                message: '<strong>修改成功</strong>'
                            });
                            this.getdata()
                        }).catch(() => {

                        });

                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });

            },
            editInventory(index, row) {
                this.editDialog = true;
                this.axios.post('api/product/findData', {
                    user_id: this.$store.state.user_id.user_id,
                    product_id: row.product_id,
                    status: 2
                }).then((data) => {
                    this.rowData = data.data.product;
                    //console.log(data)
                })
                // this.rowData = row;
                // this.rowDataValue = new Date(row.date) ;
                // console.log(row)

            },
            //跳转到查看详情页面
            showLibrary(index, row) {
                // console.log(row)
                this.$store.commit('getProductId', row.product_id);
                this.$router.push({path: '/library'})
            }
        },
        mounted() {
            // this.restaurants = this.tableData
        },
        created() {
            this.user_id = JSON.parse(localStorage.getItem('key')).user_id
            this.getdata();

        },
        filters: {
            // currency (num) {
            //     num = num.toString().replace(/\$|\,/g,'');
            //     if(isNaN(num))
            //         num = "0";
            //     let sign = (num == (num = Math.abs(num)));
            //     num = Math.floor(num*100+0.50000000001);
            //     let cents = num%100;
            //     num = Math.floor(num/100).toString();
            //     if(cents<10)
            //         cents = "0" + cents;
            //     for (var i = 0; i < Math.floor((num.length-(1+i))/3); i++)
            //         num = num.substring(0,num.length-(4*i+3))+','+
            //             num.substring(num.length-(4*i+3));
            //     return (((sign)?'':'-') + num + '.' + cents);
            // }
        }
    }
</script>

<style lang="scss" scoped>
    .hmain {
        .main-header {
            border-top: 1px solid #eeeeee;

            .main {
                float: right;
                margin: 30px 150px 30px 0;

            }

        }

        /deep/ .main-search {
            text-align: left;
            margin: 10px 0;

            .el-input {
                width: 300px;
            }

            .el-button:nth-child(3) {
                //margin-left: 100px;
            }
        }

        .table-wrap {
            .el-table {
                td {
                    text-align: center;
                }

                th {
                    text-align: center;
                }
            }

        }

        .inlibrary-data {
            text-align: left;
        }

        .add-dialog {
            .main-dialog {
                padding: 30px 40px 30px 20px;
            }
        }

        .page {
            margin-top: 20px;
        }
    }


</style>
