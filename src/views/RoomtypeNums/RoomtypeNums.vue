<style scope lang="less">
    @import './RoomtypeNums.less';
</style>

<template>
    <div class="formView">
        <Form ref="formInline" :model="formInline" inline>

            <FormItem prop="room_name" label="房型名称" :label-width="60">
               <Select v-model="model8" clearable style="width:200px">
                 <Option v-for="item in roomStatus" :value="item.value" :key="item.value">{{ item.label }}</Option>
               </Select>
            </FormItem>

            <FormItem prop="cus_nick_name" label="起止时间" :label-width="60">              
             <DatePicker type="datetimerange" placeholder="请选择时间" style="width: 300px"></DatePicker>
            </FormItem>

            <FormItem>
                <Button type="primary" @click.stop="searchClick(formInline)">查询</Button>
            </FormItem>

             <FormItem>
                <Button type="primary" @click="addClick">批量增加</Button>
            </FormItem>

            <!-- <FormItem>
                <i-switch v-model="loading"></i-switch>
                &nbsp;&nbsp;切换loading
            </FormItem> -->

        </Form>

        <TableM :columns="columns" :data="userData" :loading="loading" :current.async="currentPageIndex" :total="total" @pageChange="pageChange"></TableM>
         <!-- 新增提示框 -->
        <Modal v-model="addModal"
                title="新增"
                :mask-closable="false"
                @on-ok="ModalConfirm('formValidate')"
                @on-cancel="ModalCancel('formValidate')"
            >
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                <FormItem label="使用房型" prop="module"> 
                    <CheckboxGroup v-model="room">
                        <Checkbox label="大床房"></Checkbox>
                        <Checkbox label="标准房"></Checkbox>
                        <Checkbox label="豪华房"></Checkbox>
                    </CheckboxGroup>
                </FormItem>

                <FormItem label="日期范围" prop="module"> 
                    <DatePicker type="datetimerange" placeholder="请选择时间" style="width: 300px"></DatePicker>
                </FormItem>
                
                <FormItem label="明细" prop="module"> 
                    
                </FormItem>

            </Form>
                <div slot="footer" align="center">
                    <Button type="primary" @click="ModalConfirm('formValidate')" :loading="loading">确定</Button>
                    <Button @click="ModalCancel('formValidate')" style="margin-left: 8px">重置</Button>
                </div>
        </Modal>
    </div>
</template>

<script>

import TableM from "../../common/table/table.vue";
import {
    roomtypeNumsList, //房型可预订数列表
    roomtypeNumsSearch, //房型可预订数模糊查询
    
} from '../../api/lp-RoomtypeNums/api.js'

export default {
  name: "RoomtypeNumsModel",

  components: {
    TableM
  }, 
  data() {
    return {
        formValidate: {     // 定义新增表单的对象
                module: '',
                banner_title: '',
                upLoad: '',
                sort: [],
            },
        ruleValidate: {     // 定义表单的校验规则
                banner_title: [
                    { required: true, message: '请输入预订人', trigger: 'blur' }
                ],

                module: [
                    { required: true, type: 'array', min: 1, message: '所属模块选择', trigger: 'change' },
                    { type: 'array', max: 1, message: '至多选择一个', trigger: 'change' }
                ],

                sort: [
                    { required: true, message: '请输入排序', trigger: 'blur' },
                    { type: 'string', min: 20, message: 'Introduce no less than 20 words', trigger: 'blur' }
                ]
            },

        addModal: false,

        roomStatus:[
                    {
                        value: '乐满地',
                        label: '乐满地'
                    },
                    {
                        value: '海南',
                        label: '海南'
                    },                  
                ],
                model8:'',

        currentPageIndex: 1,    // 当前页

        columns: [    // 房型可预订数表头信息
            {
                title: "房型名称",
               render: (h, {row, index}) => {
                    return h('span', {
                    }, row.room_name ? row.room_name : `暂无${index}`)
                }
            },

            {
                title: "日期",
                render: (h, {row, index}) => {
                    return h('span', {
                    }, row.reserver_time ? row.reserver_time : `暂无${index}`)
                }
            },

            {
                title: "剩余数量",
                render: (h, {row, index}) => {
                    return h('span', {
                    }, 
                    row.number ? row.number : `暂无${index}`)     
                }
            },

        ],

        userData: [],   // 内容数据

        total: 0,   // 总页数

        formInline: {   // 定义表单对象
            cus_account: '', 
            cus_nick_name: '',
            p_system: ''
        },

        ruleInline: {   // 定义规则对象
            cus_account: [
                { required: true, message: '请输入账号', trigger: 'blur' }
            ],
            cus_nick_name: [
                { required: true, message: '请输入昵称', trigger: 'blur' }
                // { type: 'string', min: 11, message: '电话最多为11位', trigger: 'blur' }
            ]
        },

        loading: false,  // 定义loading为true

        currentPage: 1   // 定义当前页
    };
  },

  methods: {

    resetTotal() {
        this.currentPage = 1;
        this.total = 1;
    },

     // 执行新增的事件
    addClick() {
            this.addModal = true;
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
        },

    // 改变分页触发的事件
    pageChange(pageIndex) {
        // 改变当前页
        this.currentPage = pageIndex;
        for (let i in this.formInline) {
            if (this.formInline[i] !== undefined || this.formInline[i] !== '') {
                this.getUser(this.formInline);  
                return false;
            }
        };
        this.getUser();
    },

    searchClick(filter) {
        this.resetTotal();
        if (filter) {
            for (let i in filter) {
                if (filter[i] === undefined || filter[i] === '') {
                    delete filter[i];
                }
            };
        };
        this.getUser(filter);
    },

    // 为了解决异步问题
    async getUser(filter) {
        let params = {
            pageSize: 10,
            startPos: filter ? 1 : this.currentPage
        };

        if (filter) {
            params = Object.assign(params, filter);
        };

        this.loading = true;
        let { data } = await roomtypeNumsList(params);
        console.log(data)
        this.total = data.count;
        console.log(this.total)
        data.data.shift(0);
        this.userData = data.data;
        this.loading = false;
        console.log(data.data.shift(0));
    }
  },
  mounted() {
    this.getUser();
  }
};
</script>

