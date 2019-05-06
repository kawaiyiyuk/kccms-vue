<template>
    <div class="hmain">
        <el-row class="main-header">
            <div class="main">
                <!--<el-button type="primary">新增库存</el-button>-->
                <el-button type="success" @click=" addDialog = true">新增库存</el-button>
            </div>
        </el-row>
        <div class="table-wrap">
            <el-table
                    :data="tableData"
                    border
                    class="main-table"
                    style="width: 100%">
                <el-table-column
                        align="center"
                        prop="serialNum"
                        label="序号"
                        width="60">
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
                        label="商品描述">
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
                        <el-button type="success" size="small">查看</el-button>
                        <el-button type="primary" size="small" @click=" editInventory(scope.$index,scope.row)">编辑
                        </el-button>
                        <el-button type="danger" size="small" @click="deledata(scope.$index,scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <!--新增库存弹窗-->
        <el-dialog class="add-dialog" title="添加库存商品" :visible.sync="addDialog" :modal-append-to-body='false'>
            <el-form :model="form" class="main-dialog">
                <el-form-item label="商品条形码" :label-width="formLabelWidth">
                    <el-input v-model="form.barCode"></el-input>
                </el-form-item>
                <el-form-item label="商品名称" :label-width="formLabelWidth">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="商品价格" :label-width="formLabelWidth">
                    <el-input v-model="form.price"></el-input>
                </el-form-item>
                <el-form-item label="商品数量" :label-width="formLabelWidth">
                    <el-input v-model="form.num"></el-input>
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
                <el-form-item label="商品描述" :label-width="formLabelWidth">
                    <el-input v-model="form.dec"></el-input>
                </el-form-item>
                <el-form-item label="备注" :label-width="formLabelWidth">
                    <el-input v-model="form.Remarks"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addDialog = false">取 消</el-button>
                <el-button type="primary" @click="Formpost">确 定</el-button>
            </div>
        </el-dialog>


        <!--编辑库存弹窗-->
        <el-dialog class="add-dialog" title="编辑库存商品" :visible.sync="editDialog" :modal-append-to-body='false'>
            <el-form :model="rowData" class="main-dialog">
                <el-form-item label="商品条形码" :label-width="formLabelWidth">
                    <el-input v-model="rowData.barCode"></el-input>
                </el-form-item>
                <el-form-item label="商品名称" :label-width="formLabelWidth">
                    <el-input v-model="rowData.name"></el-input>
                </el-form-item>
                <el-form-item label="商品价格" :label-width="formLabelWidth">
                    <el-input v-model="rowData.price"></el-input>
                </el-form-item>
                <el-form-item label="商品数量" :label-width="formLabelWidth">
                    <el-input v-model="rowData.num"></el-input>
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
                <el-form-item label="商品描述" :label-width="formLabelWidth">
                    <el-input v-model="rowData.dec"></el-input>
                </el-form-item>
                <el-form-item label="备注" :label-width="formLabelWidth">
                    <el-input v-model="rowData.Remarks"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="editDialog = false">取 消</el-button>
                <el-button type="primary" @click="dataEdit()">确 定</el-button>
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
                addDialog: false,
                editDialog: false,
                form: {
                    name: '',
                    price: '',
                    num: '',
                    dec: '',
                    Remarks: '',
                    barCode:''
                },
                formLabelWidth: '100px',
                DataValue: '',
                tableData: [],
                rowData: {},
                rowDataValue: '',
                isRouterAlive: true

            }
        },
        methods: {
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
                this.axios.post('api/product/findData', {}).then((data) => {
                    this.tableData = data.data;
                    for (let i = 0; i < data.data.length; i++) {
                        this.tableData[i].serialNum = i + 1;
                    }
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
                    //console.log(this.tableData)
                }).catch(() => {

                })
            },
            //提交新增数据
            Formpost(type) {
                this.form.date = this.DataValue;
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
                this.addDialog = false;
                //location.reload();
            },
            //删除数据
            deledata(index, row) {
                this.$confirm('此操作将永久删除该库存, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.axios.post('api/product/deleteData', {
                        _id: row._id
                    }).then((data) => {
                        this.getdata()
                        console.log('删除成功');
                    }).catch(() => {
                        console.log('删除失败');
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
                });


                //console.log(index, row);

            },

            //编辑库存信息
            dataEdit() {
                this.axios.post('api/product/updateData',
                    this.rowData
                ).then((data) => {
                    //console.log(this.rowData)
                    this.$message({
                        type: 'success',
                        dangerouslyUseHTMLString: true,
                        message: '<strong>修改成功</strong>'
                    });
                }).catch(() => {

                });
                this.editDialog = false;
                // location.reload();
                this.getdata()
            },
            editInventory(index, row) {
                this.editDialog = true;
                this.axios.post('api/product/findData', {_id: row._id}).then((data) => {
                    this.rowData = data.data[0];
                    console.log(data)
                })
                // this.rowData = row;
                // this.rowDataValue = new Date(row.date) ;
                // console.log(row)

            }
        },
        mounted() {

        },
        created() {
            this.getdata()
        },
        filters: {
            currency (num) {
                num = num.toString().replace(/\$|\,/g,'');
                if(isNaN(num))
                    num = "0";
                let sign = (num == (num = Math.abs(num)));
                num = Math.floor(num*100+0.50000000001);
                let cents = num%100;
                num = Math.floor(num/100).toString();
                if(cents<10)
                    cents = "0" + cents;
                for (var i = 0; i < Math.floor((num.length-(1+i))/3); i++)
                    num = num.substring(0,num.length-(4*i+3))+','+
                        num.substring(num.length-(4*i+3));
                return (((sign)?'':'-') + num + '.' + cents);
            }
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
    }


</style>
