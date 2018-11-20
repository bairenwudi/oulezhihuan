<style lang="less">
    @import './login.less';
</style>

<template>
    <div class="login" @keydown.enter="handleSubmit">
        <div class="login-con">
            <Card :bordered="false">
                <p slot="title">
                    <Icon type="log-in"></Icon>
                    欢迎登录
                </p>
                <div class="form-con">
                    <Form ref="loginForm" :model="form" :rules="rules">
                        <FormItem prop="adm_account">
                            <Input v-model="form.adm_account" size="large" placeholder="请输入用户名">
                                <span slot="prepend">
                                    <Icon :size="16" type="person"></Icon>
                                </span>
                            </Input>
                        </FormItem>
                        <FormItem prop="adm_passwd">
                            <Input type="password" autocomplete="off" size="large" v-model="form.adm_passwd" placeholder="请输入密码">
                                <span slot="prepend">
                                    <Icon :size="14" type="locked"></Icon>
                                </span>
                            </Input>
                        </FormItem>

                        <FormItem prop="verification">
                            <Input size="large" v-model="form.verification" placeholder="验证码">
                                <span slot="prepend">
                                    <Icon :size="14" type="help-buoy"></Icon>
                                </span>
                            </Input>
                            <img :src="authUrl" @click.navtive="changeCodeClick" class="verif_img">
                        </FormItem>

                        <FormItem>
                            <Button @click="handleSubmit" type="primary" long :loading="loading">登录</Button>
                        </FormItem>
                    </Form>
                    <p class="login-tip">输入任意用户名和密码即可</p>
                </div>
            </Card>
        </div>
    </div>
</template>

<script>
import Cookies from 'js-cookie';

import { 
    getUuid,
    comparison,
    selectAdmin,
    getSessionAdminUser,
} from '@/api/lp-login/api'

import { getBase } from '@/api/lp-login/api';

export default {
    data () {
        return {
            form: {
                adm_account: 'admins',
                adm_passwd: ''
            },

            loading: false,

            rules: {
                adm_account: [
                    { required: true, message: '账号不能为空', trigger: 'blur' }
                ],
                adm_passwd: [
                    { required: true, message: '密码不能为空', trigger: 'blur' }
                ],
                verification: [
                    { required: true, message: '验证码不能为空', trigger: 'blur' }
                ]
            },

            authUrl: '',

            base: '',

            password: ''
        };
    },
    methods: {

        // 自定义获取四位随机数
        getUuid() {
            let s = [];
            let brwd;
            let hexDigits = "0123456789abcdef";
            for (let i = 0; i < 36; i++) {
                s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
            }
            s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
            s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
            s[8] = s[13] = s[18] = s[23] = "-";

            let uuid = s.join("");
            brwd = uuid;
            return brwd;
        },

        // 调取获取图片接口
        getAutoImageFun() {
            this.uuid = this.getUuid();
            this.authUrl = this.base + "/auth/image?uuid=" + this.uuid;
        },

        // 点击图片改变
        changeCodeClick() {
            this.getAutoImageFun();
        },

        // 登陆按钮
        handleSubmit () {
            this.$refs.loginForm.validate((valid) => {
                if (valid) {
                    this.loading = true;
                    let params = {
                        uuid: this.uuid,
                        comparison: this.form.verification
                    };
                    // 验证输入验证码和图片验证码是否吻合
                    comparison(params).then(res1 => {
                        if (res1.data) {
                            let params = {
                                adm_account: this.form.adm_account,
                                adm_passwd: this.form.adm_passwd,
                            }
                            selectAdmin(params).then(res2 => {
                                // 存储token请求用户信息接口
                                localStorage.token = res2.data.token;
                                getSessionAdminUser({ token: res2.data.token })
                                .then(res3 => {
                                    if (res3.data === "") {
                                        // 否则提示账号或密码错误
                                        this.$Message.error("账号或密码错误");
                                        this.getAutoImageFun();
                                        this.loading = false;
                                    } else {
                                        // 存储用户的信息
                                        localStorage.user = JSON.stringify(res3.data);
                                        Cookies.set('user', this.form.adm_account);
                                        this.$Message.success('登陆成功');
                                        this.$router.push({
                                            name: 'home_index'
                                        });
                                    }
                                });
                            })
                        } else {
                            this.$Message.warning("验证码错误，请重新输入");
                            this.getAutoImageFun();
                            this.loading = false;
                        }
                    })
                }
            });
        },

        init() {
            this.$nextTick(() => {
                this.base = getBase().base2;
                this.getAutoImageFun();
            });
        },
    },

    mounted() {
        this.init();
    }
};
</script>

<style>

</style>
