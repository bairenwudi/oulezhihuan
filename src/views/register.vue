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
                                <Option :value="1 + ''" label="基地"></Option>
                                <Option :value="2 + ''" label="个人"></Option>
                                <Option :value="3 + ''" label="旅行社"></Option>
                            </Select>
                        </FormItem>

                        <FormItem prop="org_name" label="机构标题：">
                            <Input v-model="registerForm.org_name" clearable size="large" placeholder="请输入机构标题"></Input>
                        </FormItem>

                        <FormItem prop="adm_province_code" label="省份：">
                            <Select @on-change="provinceChange" v-model="registerForm.adm_province_code">
                                <Option v-for="(item, index) in provinceList" :key="index" :value="item.code + ''" :label="item.name"></Option>
                            </Select>
                        </FormItem>

                        <FormItem prop="adm_city_code" label="城市：">
                            <Select v-model="registerForm.adm_city_code">
                                <Option v-for="(item, index) in cityList" :key="index" :value="item.code + ''" :label="item.name"></Option>
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

        <Modal
            v-model="RegisteredSuccessfully"
            title="提示"
            :loading="loading"
            @on-ok="RegisteredSuccessfullyOK"
            @on-cancel="RegisteredSuccessfullyCancel"
        >
            <p class="successful">
                <Icon type="checkmark-circled" class="icon-color"></Icon>
                注册成功
            </p>
            
            <p class="center successDesc">
                你的账户：{{ registerForm.adm_account }} 注册成功
            </p>

            <Button type="primary" long @click="LoginClick">登陆</Button>
            <div slot="footer"></div>
        </Modal>
    </div>
</template>

<script>
// 引入api
import {
    registerSave,
    findAllCity,
    findAllProvince,
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
            } else if(value !== this.registerForm.adm_passwd) {
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

            RegisteredSuccessfully: false,

            registerForm: {

            },

            registerRules: {
                adm_account: [{ required: true, message: '请填写完整', trigger: 'blur' }],
                adm_passwd: [
                    { required: true, message: '请填写完整', trigger: 'blur' },
                    { validator: passwordValid, trigger: 'blur' }
                ],
                confirm_passwd: [
                    { validator: confirmValid, trigger: 'blur' },

                ],
                adm_user_type: [{ required: true, message: '请填写完整', trigger: 'change' }],
                org_name: [{ required: true, message: '请填写完整', trigger: 'blur' }],
                adm_province_code: [{ required: true, message: '请填写完整', trigger: 'change' }],
                adm_city_code: [{ required: true, message: '请填写完整', trigger: 'change' }],
                adm_phonenum: [{ validator: validePhone, trigger: 'blur' }],
                phoneCode: [{ required: true, message: '请填写完整', trigger: 'blur' }],
            },

            codeDesc: '获取验证码',

            number: 10,

            t: null,

            setIntervaled: true,

            codeDisabled: false,

            phoneReg: /^1[0-9]{10}$/,

            provinceList: [],    // 省市列表

            cityList: [],   // 市级列表

            codeId: 0,  // 获取验证码返回的id
        };
    },

    methods: {

        // 获取所有的省
        async getAllProvince() {
            const { data } = await findAllProvince();
            console.log(data);
            this.provinceList = data;
        },

        // 初始化
        init() {
            this.getAllProvince();
        },

        // 点击注册保存确定按钮
        handleRegisterClick(formName) {
            this.$refs[formName].validate((valid) => {
                if(valid) {
                    // 
                    let params = {
                        code: this[formName].phoneCode,
                        msgId: this.codeId
                    };
                    validCode(params).then(res => {
                        if(res.data.code === 'success') {
                            registerSave(this[formName]).then(res => {
                                console.log(res);
                                if(res.data.code === 'success') {
                                    this.$Message.success('成功');
                                    this.RegisteredSuccessfully = true;
                                } else {
                                    this.$Message.error(`${res.data.content.msg}`);
                                }
                            })
                        } else {
                            this.$Message.error(`${res.data.content.msg}`);
                        }
                    })
                }
            })
        },

        // 改变省重新获取下面的市
        provinceChange() {
            this.cityList = [];
            let params = {
                p_code: this.registerForm.adm_province_code
            }
            findAllCity(params).then(({ data }) => {
                this.cityList = data;
            })
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
                    adm_phonenum: this.registerForm.adm_phonenum
                };
                getCode(params).then(res => {
                    this.codeId = res.data;
                })
            }
        },

        // 点击去登陆
        LoginClick() {
            this.$router.push({
                name: 'login'
            })
        },

        // 点击取消清空表单
        RegisteredSuccessfullyCancel() {
            this.RegisteredSuccessfully = false;
            this.registerForm = {};
        },
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

    .successful {
        font-size: 31px;
        text-align: center;
        .icon-color {
            color: chartreuse;
        }
    }

    .successDesc {
        margin: 50px;
        font-size: 15px;
    }

</style>

