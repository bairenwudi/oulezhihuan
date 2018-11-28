<template>
    <div class="forget">
        <h1 class="center h1-title">重置密码</h1>

        <div class="forget-con">
            <Card :bordered="false">
                <div class="form-con">
                    <Form ref="forgetForm" :model="forgetForm" :rules="forgetRules" :label-width="80">
                        <FormItem prop="adm_phonenum" label="手机号码：">
                            <Input v-model="forgetForm.adm_phonenum" clearable size="large" placeholder="请输入手机号码"></Input>
                        </FormItem>

                        <FormItem prop="phoneCode" label="验证码：">
                            <Input v-model="forgetForm.phoneCode" placeholder="请输入验证码"></Input>
                            <Button type="primary" class="phone-btn" size="large" :disabled="codeDisabled || !phoneReg.test(forgetForm.adm_phonenum)" @click="getCodeClick">{{ codeDesc }}</Button>
                        </FormItem>

                        <FormItem prop="adm_passwd" label="密码：">
                            <Input type="password" v-model="forgetForm.adm_passwd" autocomplete="off" clearable size="large" placeholder="请输入6-20位数字或字母"></Input>
                        </FormItem>

                        <FormItem prop="confirm_passwd" label="确认密码：">
                            <Input type="password" v-model="forgetForm.confirm_passwd" autocomplete="off" clearable size="large" placeholder="请输入6-20位数字或字母"></Input>
                        </FormItem>

                        <FormItem>
                            <Button @click="handleSubmit('forgetForm')" type="primary" long :loading="loading">重置密码</Button>
                        </FormItem>
                    </Form>
                </div>
            </Card>
        </div>
    </div>
</template>

<script>
// 引入api
import {
    isExistPhonenum,
    validCode,
    getCode,
} from '@/api/lp-login/api.js'
export default {
    data () {
        const passwordValid = (rule, value, callback) => {
            if(!value) {
                return callback(new Error('请填写完整'));
            } else if(value.length < 6 || value.length > 20) {
                return callback(new Error('密码为6到20位'));
            } else {
                callback();
            }
        };

        const confirmValid = (rule, value, callback) => {
            if(!value) {
                return callback(new Error('请填写完整'));
            } else if(value !== this.forgetForm.adm_passwd) {
                return callback(new Error('两次密码输入不一样'));
            } else {
                callback();
            }
        };

        const validePhone = (rule, value, callback) => {
            var re = /^1[0-9]{10}$/;
            if (!re.test(value)) {
                callback(new Error('请输入正确格式的手机号'));
            } else {
                callback();
            }
        };

        return {

            loading: false,

            forgetForm: {

            },

            codeDesc: '获取验证码',

            number: 10,

            t: null,

            setIntervaled: true,

            codeDisabled: false,

            phoneReg: /^1[0-9]{10}$/,

            codeId: 0,

            forgetRules: {
                adm_phonenum: [{ validator: validePhone, trigger: 'blur' }],

                adm_passwd: [
                    { required: true, message: '请填写完整', trigger: 'blur' },
                    { validator: passwordValid, trigger: 'blur' }
                ],

                confirm_passwd: [
                    { validator: confirmValid, trigger: 'blur' },
                ],
                phoneCode: [{ required: true, message: '请填写完整', trigger: 'blur' }],
            },
        };
    },

    methods: {
        init() {

        },

        // 点击获取验证码
        getCodeClick() {
            if(this.setIntervaled) {
                this.codeDisabled = true;
                this.setIntervaled = false;
                this.t = setInterval(() => {
                    if(this.number === 0) {
                        clearInterval(this.t);
                        this.number = 10;
                        this.codeDisabled = false;
                        this.codeDesc = `获取验证码`;
                        this.setIntervaled = true;
                        return
                    };
                    this.number --;
                    this.codeDesc = `重新获取(${this.number})`;
                }, 1000);

                let params = {
                    adm_phonenum: this.forgetForm.adm_phonenum
                };
                getCode(params).then(res => {
                    this.codeId = res.data;
                })
            }
        },

        // 重置密码确定按钮
        handleSubmit(formName) {
            this.$refs[formName].validate((valid) => {
                if(valid) {
                    // 成功
                    let params = {
                        code: this[formName].phoneCode,
                        msgId: this.codeId
                    };
                    validCode(params).then(res => {
                        if(res.data.code === 'success') {
                            isExistPhonenum(this[formName]).then(res => {
                                console.log(res);
                                if(res.data.code === 'success') {
                                    this.$Message.success('成功');
                                    this.$router.push({
                                        name: 'login'
                                    })
                                } else {
                                    this.$Message.error(`${res.data.content.msg}`);
                                }
                            })
                        } else {
                            this.$Message.error(`${res.data.content.msg}`);
                        }
                    })
                    console.log(this[formName])
                    console.log('我成功了');
                }
            })
        },
    },

    mounted() {
        this.init();
    }
};
</script>

<style scoped lang="less">
    .forget {
        width: 100%;
        height: 100%;
        background: #fff;
    }

    .center {
        text-align: center;
    }

    .h1-title {
        padding-top: 30px;
    }

    .form-con {
        width: 30%;
        margin: 30px auto;
    }

    .phone-btn {
        position: absolute;
        top: 0;
        right: -2px;
    }
</style>