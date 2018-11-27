<template>
    <div class="forget">
        <h1 class="center h1-title">找回密码</h1>

        <div class="forget-con">
            <Card :bordered="false">
                <div class="form-con">
                    <Form ref="forgetForm" :model="forgetForm" :rules="forgetRules" :label-width="80">
                        <FormItem prop="" label="手机号码：">
                            <Input v-model="forgetForm.adm_account" clearable size="large" placeholder="请输入手机号码"></Input>
                        </FormItem>

                        <FormItem prop="" label="验证码：">
                            <Col span="18" style="margin-right: 20px">
                                <Input v-model="forgetForm.adm_account" clearable size="large" placeholder="请输入验证码"></Input>
                            </Col>

                            <Col span="5">
                                <Button type="primary" style="width: 100px" size="large" :disabled="codeDisabled" @click="getCodeClick">{{ codeDesc }}</Button>
                            </Col>
                        </FormItem>

                        <FormItem prop="password" label="密码：">
                            <Input type="password" autocomplete="off" clearable size="large" v-model="forgetForm.adm_passwd" placeholder="请输入6-20位数字或字母"></Input>
                        </FormItem>

                        <FormItem prop="password" label="确认密码：">
                            <Input type="password" autocomplete="off" clearable size="large" v-model="forgetForm.adm_passwd" placeholder="请输入6-20位数字或字母"></Input>
                        </FormItem>

                        <FormItem>
                            <Button @click="handleSubmit" type="primary" long :loading="loading">重置密码</Button>
                        </FormItem>
                    </Form>
                </div>
            </Card>
        </div>
    </div>
</template>

<script>

export default {
    data () {
        return {
            forgetForm: {

            },

            forgetRules: {

            },

            codeDesc: '获取验证码',

            number: 10,

            t: null,

            setIntervaled: true,
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
                    this.codeDisabled = true;
                }, 1000);
            }
        }
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
</style>