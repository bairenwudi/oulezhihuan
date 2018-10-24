<style lang="less" scope>
    @import './form.less';
</style>

<template>
    <div>
        <Modal title="View Image" v-model="visible">
            <img :src="'https://o5wwk8baw.qnssl.com/' + imgName + '/large'" v-if="visible" style="width: 100%">
        </Modal>

        <Button type="primary" @click="openClick">打开form表单</Button>
         <DatePicker type="datetimerange" placeholder="Select date and time" style="width: 300px"></DatePicker>
            <Modal
                v-model="Modal"
                title="Common Modal dialog box title"
                :mask-closable="false"
                @on-ok="ModalConfirm('formValidate')"
                @on-cancel="ModalCancel('formValidate')"
            >
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                <FormItem label="Name" prop="name">
                    <Input v-model="formValidate.name" placeholder="Enter your name"></Input>
                </FormItem>

                <FormItem label="City" prop="city">
                    <Select v-model="formValidate.city" placeholder="Select your city">
                        <Option value="beijing">New York</Option>
                        <Option value="shanghai">London</Option>
                        <Option value="shenzhen">Sydney</Option>
                    </Select>
                </FormItem>

                <FormItem label="Date" prop="Date">
                    <DatePicker @on-change="getFormatterTime" format="yyyy-MM-dd hh:ss:mm" v-model="formValidate.Date" type="datetimerange" placeholder="Select date and time" style="width: 300px"></DatePicker>
                </FormItem>

                <FormItem label="Gender" prop="gender">
                    <RadioGroup v-model="formValidate.gender">
                        <Radio label="male">Male</Radio>
                        <Radio label="female">Female</Radio>
                    </RadioGroup>
                </FormItem>

                <FormItem label="Hobby" prop="interest">
                    <CheckboxGroup v-model="formValidate.interest">
                        <Checkbox label="Eat"></Checkbox>
                        <Checkbox label="Sleep"></Checkbox>
                        <Checkbox label="Run"></Checkbox>
                        <Checkbox label="Movie"></Checkbox>
                    </CheckboxGroup>
                </FormItem>

                <FormItem label="Desc" prop="desc">
                    <Input v-model="formValidate.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter something..."></Input>
                </FormItem>
            </Form>
                <div slot="footer" align="center">
                    <Button type="primary" @click="ModalConfirm('formValidate')" :loading="loading">提交</Button>
                    <Button @click="ModalCancel('formValidate')" style="margin-left: 8px">重置</Button>
                </div>
        </Modal>
    </div>
</template>

<script>
export default {
    name: 'formModel',

    data() {
        var DateValdate = (rule, value, callback) => {
            if (value[0] === '') {
                return callback(new Error('请填写完整'));
            } else {
                callback();
            }
        };

        return {
            loading: false,

            Modal: false,       // 控制表单的显示

            defaultList: [],    // 缺省的图片
            
            imgName: '',

            visible: false,

            uploadList: [],

            formValidate: {     // 定义表单的对象
                name: '',
                city: '',
                gender: '',
                interest: [],
                Date: [],
                time: '',
                desc: ''
            },

            ruleValidate: {     // 定义表单的校验规则
                name: [
                    { required: true, message: 'The name cannot be empty', trigger: 'blur' }
                ],

                city: [
                    { required: true, message: 'Please select the city', trigger: 'change' }
                ],

                gender: [
                    { required: true, message: 'Please select gender', trigger: 'change' }
                ],

                interest: [
                    { required: true, type: 'array', min: 1, message: 'Choose at least one hobby', trigger: 'change' },
                    { type: 'array', max: 2, message: 'Choose two hobbies at best', trigger: 'change' }
                ],

                Date: [
                    { validator: DateValdate, trigger: 'change' }
                ],

                time: [
                    { required: true, type: 'string', message: 'Please select time', trigger: 'change' }
                ],

                desc: [
                    { required: true, message: 'Please enter a personal introduction', trigger: 'blur' },
                    { type: 'string', min: 20, message: 'Introduce no less than 20 words', trigger: 'blur' }
                ]
            }
        }
    },

    methods: {
        // 删除
        del() {
            console.log(123);
        },

        // 获取时间
        getFormatterTime(val) {
            console.log(val);
        },

        // 点击改变子组件中form的显示
        openClick() {
            this.Modal = true;
        },

        // 点击确定按钮
        ModalConfirm(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.loading = true;
                    setTimeout(() => {
                        this.$Message.success('Success!');
                        this.Modal = false;
                        this.loading = false;
                    }, 1000)
                } else {
                    this.$Message.error('Fail!');
                }
            })
        },

        // 点击框取消按钮
        ModalCancel(name) {
            this.$Message.info("Clicked ok");
            this.$refs[name].resetFields();
        }
    },

    mounted() {
    }
}
</script>
