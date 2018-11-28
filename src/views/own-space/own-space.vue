<style lang="less">
    @import './own-space.less';
</style>

<template>
    <div>
        <Card>
            <p slot="title">
                <Icon type="person"></Icon>
                个人信息
            </p>
            <div>
                <Form 
                    ref="userForm"
                    :model="userForm" 
                    :label-width="100" 
                    label-position="right"
                    :rules="inforValidate"
                >
                    <FormItem label="登录账号：" prop="adm_account">
                        <div style="display:inline-block;width:300px;">
                            <Input v-model="userForm.adm_account" ></Input>
                        </div>
                    </FormItem>

                    <FormItem label="密码：" prop="adm_passwd" >
                        <div style="display:inline-block;width:204px;">
                            <Input type="password" v-model="userForm.adm_passwd" @on-keydown="hasChangePhone"></Input>
                        </div>
                    </FormItem>

                    <FormItem label="真实姓名：" prop="org_name" >
                        <div style="display:inline-block;width:204px;">
                            <Input v-model="userForm.org_name" @on-keydown="hasChangePhone"></Input>
                        </div>
                    </FormItem>

                    <FormItem label="手机号：" prop="adm_phonenum" >
                        <div style="display:inline-block;width:204px;">
                            <Input v-model="userForm.adm_phonenum" @on-keydown="hasChangePhone"></Input>
                        </div>
                    </FormItem>

                    <FormItem label="邮箱地址：" prop="adm_mail" >
                        <div style="display:inline-block;width:204px;">
                            <Input v-model="userForm.adm_mail" @on-keydown="hasChangePhone"></Input>
                        </div>
                    </FormItem>

                    <div>
                        <Button type="text" style="width: 100px;" @click="cancelEditUserInfor">取消</Button>
                        <Button type="primary" style="width: 100px;" :loading="save_loading" @click="saveEdit">保存</Button>
                    </div>
                </Form>
            </div>
        </Card>
    </div>
</template>

<script>
// 引入api
import {
    updateAdminUser
} from '@/api/lp-login/api.js'

export default {
    name: 'ownspace_index',
    data () {
        const validePhone = (rule, value, callback) => {
            var re = /^1[0-9]{10}$/;
            if (!re.test(value)) {
                callback(new Error('请输入正确格式的手机号'));
            } else {
                callback();
            }
        };

        return {
            userForm: {
                name: '',
                cellphone: '',
                company: '',
                department: ''
            },
            uid: '', // 登录用户的userId
            securityCode: '', // 验证码
            phoneHasChanged: false, // 是否编辑了手机
            save_loading: false,
            savePassLoading: false,
            oldPassError: '',
            inforValidate: {},
            editPasswordForm: {
                oldPass: '',
                newPass: '',
                rePass: ''
            },
            inputCodeVisible: false, // 显示填写验证码box
            initPhone: '',
            gettingIdentifyCodeBtnContent: '获取验证码' // “获取验证码”按钮的文字
        };
    },
    methods: {

        getIdentifyCode () {
            this.hasGetIdentifyCode = true;
            this.$refs['userForm'].validate((valid) => {
                if (valid) {
                    this.canGetIdentifyCode = true;
                    let timeLast = 60;
                    let timer = setInterval(() => {
                        if (timeLast >= 0) {
                            this.gettingIdentifyCodeBtnContent = timeLast + '秒后重试';
                            timeLast -= 1;
                        } else {
                            clearInterval(timer);
                            this.gettingIdentifyCodeBtnContent = '获取验证码';
                            this.canGetIdentifyCode = false;
                        }
                    }, 1000);
                    this.inputCodeVisible = true;
                    // you can write ajax request here
                }
            });
        },

        showEditPassword () {
            this.editPasswordModal = true;
        },

        cancelEditUserInfor () {
            this.$store.commit('removeTag', 'ownspace_index');
            localStorage.pageOpenedList = JSON.stringify(this.$store.state.app.pageOpenedList);
            let lastPageName = '';
            if (this.$store.state.app.pageOpenedList.length > 1) {
                lastPageName = this.$store.state.app.pageOpenedList[1].name;
            } else {
                lastPageName = this.$store.state.app.pageOpenedList[0].name;
            }
            this.$router.push({
                name: lastPageName
            });
        },

        saveEdit () {
            this.$refs['userForm'].validate((valid) => {
                if (valid) {
                    this.save_loading = true;
                    let userForm = this.userForm;
                    let params = {
                        adm_account: userForm.adm_account,
                        org_name: userForm.org_name,
                        adm_passwd: userForm.adm_passwd,
                        adm_phonenum: userForm.adm_phonenum,
                        adm_mail: userForm.adm_mail,
                        org_id: userForm.org_id,
                        adm_user_id: userForm.adm_user_id
                    }
                    updateAdminUser(params).then(res => {
                        console.log(res);
                        if(res.data.code === 'success') {
                            this.$Message.success('成功');
                            this.$router.push({
                                name: 'home_index'
                            });
                        } else {
                            this.$Message.error(`${res.data.content.msg}`);
                        }
                        this.save_loading = false;
                    })
                }
            });
        },

        cancelEditPass () {
            this.editPasswordModal = false;
        },

        saveEditPass () {
            this.$refs['editPasswordForm'].validate((valid) => {
                if (valid) {
                    this.savePassLoading = true;
                    this.$Message.success('保存成功');
                }
            });
        },

        init () {
            this.userForm = JSON.parse(localStorage.user);
        },

        cancelInputCodeBox () {
            this.inputCodeVisible = false;
            this.userForm.cellphone = this.initPhone;
        },

        submitCode () {
            let vm = this;
            vm.checkIdentifyCodeLoading = true;
            if (this.securityCode.length === 0) {
                this.$Message.error('请填写短信验证码');
            } else {
                setTimeout(() => {
                    this.$Message.success('验证码正确');
                    this.inputCodeVisible = false;
                    this.checkIdentifyCodeLoading = false;
                }, 1000);
            }
        },
        hasChangePhone () {
            this.phoneHasChanged = true;
            this.hasGetIdentifyCode = false;
            this.identifyCodeRight = false;
        },
    },
    mounted () {
        this.init();
    }
};
</script>
