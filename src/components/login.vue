<template>
    <div class="login">
        <div class="login-wrap">
            <div class="el-input-group">
                <el-input v-model="name" placeholder="请输入用户名">
                    <template slot="prepend">
                        <i class="el-icon-user"></i>
                    </template>
                </el-input>
                <el-input v-model="password" type="password" placeholder="请输入密码">
                    <template slot="prepend">
                        <i class="el-icon-lock"></i>
                    </template>
                </el-input>
                <el-input v-model="verifiyCode">
                    <template slot="append" @load="verifyLoadState=true" @click="toggleVerify(e)">
                        <i @click="toggleVerify" v-html="verifiy"></i>
                    </template>
                </el-input>
                <div class="button-group">
                    <button class="el-button btn-login" @click="userlogin">登录</button>
                    <button class="el-button btn-registered">注册</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "login",
        data() {
            return {
                name: '',
                password: '',
                verifiyCode: '',
                verifiy: '123',
            }
        },
        methods: {
            toggleVerify(e) {
                this.getSvg()
            },
            userlogin() {
                if (this.name == '') {
                    this.$message.error('用户名不能为空');
                } else if (this.password == '') {
                    this.$message.error('密码不能为空');
                } else if (this.verifiyCode == '') {
                    this.$message.error('验证码不能为空');
                } else {
                    this.axios.post('/api/login?action=login', {
                        params: {
                            // 传输数据给后台
                            username: this.name,
                            password: this.password,
                            verifiy: this.verifiyCode
                        }
                    }).then((data) => {

                        if (data.data.status == 1) {
                            this.$message.error('验证码错误');
                            this.getSvg()
                        }else if (data.data.status == 2) {
                            this.$message.error('密码不正确');
                            this.getSvg()
                        }else if (data.data.status == 3) {
                            this.$message.error('账号不存在');
                            this.getSvg()
                        } else if (data.data.status == 0) {
                            this.$message({
                                type: 'success',
                                dangerouslyUseHTMLString: true,
                                message: '<strong>登录成功</strong>'
                            });
                            console.log(data.data.item[0])
                            this.$store.commit('$_setStorage', {user: data.data.item[0].username,user_id: data.data.item[0]._id});
                            this.$store.commit('$_setLogin', '1')
                            this.$router.push({name: 'Home'})
                            this.$router.push('/home')
                        }
                    }).catch((error) => {
                        console.log(error)
                    })
                }


            },
            getSvg() {
                this.axios.get('/api/svg').then((data) => {
                    if (data.status == '200') {
                        this.verifiy = data.data
                    }
                }).catch((error) => {
                    console.log(error)
                })
            },

        },
        mounted() {

        },
        created() {
            this.getSvg()
        }
    }
</script>

<style lang="scss" scoped>


    .login {
        margin: 0;
        padding-top: 100px;
        min-height: 100vh;
        background: url("../assets/images/loginbg.jpg") no-repeat;
        background-size: 100% 100%;
        box-sizing: border-box;

        /deep/ .login-wrap {
            background-color: rgba(0, 0, 0, 0.3);

            .el-input-group {
                width: 260px;
                margin-top: 60px;

                .el-input {
                    margin-top: 40px;
                    opacity: 0.8;
                    font-size: 20px;

                    .el-input__inner {
                        font-size: 16px;
                    }
                }

                .button-group {
                    transition: background .1s ease-in-out;
                    -webkit-transition: background .1s ease-in-out;
                    margin-top: 20px;

                    .btn-login {
                        background-color: #78A5F1;
                        color: #ffffff;
                        border-color: transparent;
                    }

                    .btn-login:hover {
                        background-color: #93b7f3;
                    }

                    .btn-registered {
                        background-color: #61daa5;
                        color: #ffffff;
                        border-color: transparent;
                    }

                    .btn-registered:hover {
                        background-color: #81e1b7;
                    }
                }
            }

            width: 400px;
            height: 500px;
            margin: 0 auto;
        }
    }
</style>
