<template>
    <div class="register">
        <h1 class="center h1-title">注册账号</h1>

        <div class="register-con">
            <Card :bordered="false">
                <div class="form-con">
                    <Form ref="registerForm" :model="registerForm" :rules="registerRules" :label-width="80">
                        <FormItem prop="adm_account" label="用户名：">
                            <Input v-model="registerForm.adm_account" clearable size="large" placeholder="请输入用户名"></Input>
                        </FormItem>

                        <FormItem prop="adm_passwd" label="密码：">
                            <Input type="password" autocomplete="off" clearable size="large" v-model="registerForm.adm_passwd" placeholder="请输入6-20位数字或字母"></Input>
                        </FormItem>

                        <FormItem prop="password" label="重复密码：">
                            <Input type="password" autocomplete="off" clearable size="large" v-model="registerForm.adm_passwd" placeholder="请输入6-20位数字或字母"></Input>
                        </FormItem>

                        <FormItem prop="类型：" label="类型：">
                            <Select v-model="registerForm.adm_passwd">
                                <Option value="value">辽宁</Option>
                            </Select>
                        </FormItem>

                        <FormItem prop="" label="机构标题：">
                            <Input v-model="registerForm.adm_passwd" clearable size="large" placeholder="请输入房间数量"></Input>
                        </FormItem>

                        <FormItem prop="" label="省份：">
                            <Select v-model="registerForm.adm_passwd">
                                <Option value="value">辽宁</Option>
                            </Select>
                        </FormItem>

                        <FormItem prop="" label="城市：">
                            <Select v-model="registerForm.adm_passwd">
                                <Option value="value">沈阳</Option>
                            </Select>
                        </FormItem>

                        <FormItem prop="adm_phonenum" label="手机号码：">
                            <Input v-model="registerForm.adm_phonenum" clearable size="large" placeholder="请输入手机号码"></Input>
                        </FormItem>

                        <FormItem prop="" label="验证码：">
                            <Col span="18" style="margin-right: 20px">
                                <Input v-model="registerForm.adm_account" clearable size="large" placeholder="请输入验证码"></Input>
                            </Col>

                            <Col span="5">
                                <Button type="primary" size="large">{{ codeDesc }}</Button>
                            </Col>
                        </FormItem>

                        <FormItem>
                            <Button @click="handleSubmit" type="primary" long :loading="loading">立即申请</Button>
                        </FormItem>
                    </Form>

                    <p class="login-tip sparator-right center" @click.navtive="goToRegisterClick">点击“立即申请”即表示您同意并愿意遵守《家世界养老云平台服务协议》</p>
                    
                </div>
            </Card>
        </div>
    </div>
</template>

<script>
// 引入api
import {
    registerSave
} from '@/api/lp-login/api.js'

export default {
    data () {
        return {
            registerForm: {

            },

            registerRules: {

            },

            codeDesc: '获取验证码'
        };
    },

    methods: {
        init() {

        }
    },

    mounted() {
        this.init();
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
</style>