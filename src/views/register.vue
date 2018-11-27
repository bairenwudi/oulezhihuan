<template>
    <div class="register">
        <h1 class="center h1-title">注册账号</h1>

        <div class="register-con">
            <Card :bordered="false">
                <div class="form-con">
                    <Form ref="registerForm" :model="registerForm" :rules="registerRules" :label-width="90">
                        <FormItem prop="adm_account" label="用户名：">
                            <Input v-model="registerForm.adm_account" clearable size="large" placeholder="请输入用户名"></Input>
                        </FormItem>

                        <FormItem prop="adm_passwd" label="密码：">
                            <Input type="password" v-model="registerForm.adm_passwd" autocomplete="off" clearable size="large" placeholder="请输入6-20位数字或字母"></Input>
                        </FormItem>

                        <FormItem prop="confirm_passwd" label="重复密码：">
                            <Input type="password" v-model="registerForm.confirm_passwd" autocomplete="off" clearable size="large" placeholder="请输入6-20位数字或字母"></Input>
                        </FormItem>

                        <FormItem prop="adm_user_type" label="类型：">
                            <Select v-model="registerForm.adm_user_type">
                                <Option value="value">辽宁</Option>
                            </Select>
                        </FormItem>

                        <FormItem prop="org_name" label="机构标题：">
                            <Input v-model="registerForm.org_name" clearable size="large" placeholder="请输入房间数量"></Input>
                        </FormItem>

                        <FormItem prop="adm_province_code" label="省份：">
                            <Select v-model="registerForm.adm_province_code">
                                <Option value="value">辽宁</Option>
                            </Select>
                        </FormItem>

                        <FormItem prop="adm_city_code" label="城市：">
                            <Select v-model="registerForm.adm_city_code">
                                <Option value="value">沈阳</Option>
                            </Select>
                        </FormItem>

                        <FormItem prop="adm_phonenum" label="手机号码：">
                            <Input v-model="registerForm.adm_phonenum" clearable size="large" placeholder="请输入手机号码"></Input>
                        </FormItem>

                        <FormItem prop="phoneCode" label="验证码：">
                            <Input v-model="registerForm.phoneCode" placeholder="请输入验证码"></Input>
                            <Button type="primary" class="phone-btn" size="large" :disabled="codeDisabled || !phoneReg.test(registerForm.adm_phonenum)" @click="getCodeClick">{{ codeDesc }}</Button>
                        </FormItem>

                        <FormItem>
                            <Button @click="handleRegisterClick('registerForm')" type="primary" long :loading="loading">立即申请</Button>
                        </FormItem>
                    </Form>

                    <p class="login-tip sparator-right center indent" @click.navtive="goToRegisterClick">点击“立即申请”即表示您同意并愿意遵守《家世界养老云平台服务协议》</p>
                    
                </div>
            </Card>
        </div>
    </div>
</template>

<script>
// 引入api
import {
    registerSave,
    getCode,
} from '@/api/lp-login/api.js'

export default {
    data () {
        return {
            loading: false,

            registerForm: {

            },

            registerRules: {
                adm_account: [{ required: true, message: '请填写完整', trigger: 'blur' }],
                adm_passwd: [{ required: true, message: '请填写完整', trigger: 'blur' }],
                confirm_passwd: [{ required: true, message: '请填写完整', trigger: 'blur' }],
                adm_user_type: [{ required: true, message: '请填写完整', trigger: 'change' }],
                org_name: [{ required: true, message: '请填写完整', trigger: 'blur' }],
                adm_province_code: [{ required: true, message: '请填写完整', trigger: 'change' }],
                adm_city_code: [{ required: true, message: '请填写完整', trigger: 'change' }],
                adm_phonenum: [{ required: true, message: '请填写完整', trigger: 'blur' }],
                phoneCode: [{ required: true, message: '请填写完整', trigger: 'blur' }],
            },

            codeDesc: '获取验证码',

            number: 10,

            t: null,

            setIntervaled: true,

            codeDisabled: false,

            phoneReg: /^1[0-9]{10}$/,
        };
    },

    methods: {
        init() {

        },

        handleRegisterClick(formName) {
            this.$refs[formName].validate((valid) => {
                if(valid) {
                    // 
                    console.log('我成功了');
                }
            })
        },

        // 点击获取验证码
        getCodeClick() {
            console.log(this.$refs['registerForm'])
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
                    adm_phonenum: this.registerForm.adm_phonenum
                };
                getCode(params).then(res => {
                    console.log(res);
                })
            }
        }
    },

    mounted() {
        this.init();

        console.log(this.phoneReg.test(this.registerForm.adm_phonenum))
    }
};
</script>

<style scoped lang="less">
    .register {
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

    .indent {
        text-indent: 93px;
    }
</style>

