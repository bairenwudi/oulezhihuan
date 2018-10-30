<style scope lang="less">
    @import './baseInformation.less';
</style>

<template>
      <Tabs type="card">
        <TabPane label="基地信息">
             <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                
                <FormItem label="机构标题" prop="org_name">
                  <Col span="12">  
                    <Select v-model="formValidate.org_name" placeholder="请选择" style="width:150px">
                        <Option value="乐满地">乐满地</Option>
                        <Option value="黄山">黄山</Option>
                        <Option value="山东">山东</Option>
                    </Select>
                  </Col>
                </FormItem>

                <FormItem label="省份" prop="province_name">
                  <col span="12">
                    <Select v-model="formValidate.province_name" placeholder="请选择" style="width:150px">
                        <Option value="乐满地">乐满地</Option>
                        <Option value="黄山">黄山</Option>
                        <Option value="山东">山东</Option>
                    </Select>
                    </col>
                </FormItem>

                <FormItem label="城市" prop="city_name">
                    <Select v-model="formValidate.city_name" placeholder="请选择" style="width:150px">
                        <Option value="乐满地">乐满地</Option>
                        <Option value="黄山">黄山</Option>
                        <Option value="山东">山东</Option>
                    </Select>
                </FormItem>
                   
                <FormItem label="标签" prop="adm_user_type">
                    <Input v-model="formValidate.adm_user_type" placeholder="" disabled style="width:150px"></Input>
                </FormItem>

                <FormItem label="机构地址" prop="org_addr">
                    <Input v-model="formValidate.org_addr" placeholder="请输入机构地址" style="width:240px"></Input>
                </FormItem>

                <FormItem label="手机号码" prop="adm_phonenum">
                    <Input v-model="formValidate.adm_phonenum" placeholder="" disabled style="width:150px"></Input>
                </FormItem>
                
                <FormItem label="Date">
                    <Row>
                        <Col span="11">
                            <FormItem prop="date">
                                <DatePicker type="date" placeholder="Select date" v-model="formValidate.date"></DatePicker>
                            </FormItem>
                        </Col>
                        <Col span="2" style="text-align: center">-</Col>
                        <Col span="11">
                            <FormItem prop="time">
                                <TimePicker type="time" placeholder="Select time" v-model="formValidate.time"></TimePicker>
                            </FormItem>
                        </Col>
                    </Row>
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
                <FormItem>
                    <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
                    <Button @click="handleReset('formValidate')" style="margin-left: 8px">取消</Button>
                </FormItem>
             </Form>
         
        </TabPane>
        <TabPane label="房间类型">
          <div class="formView">

           <Form ref="formInline" :model="formInline" inline>

            <FormItem>
                <Button type="primary" @click="addClick">新增</Button>
            </FormItem>

            <FormItem>
                <Button type="primary" @click="delClick">删除</Button>
            </FormItem>

        </Form>

        <TableM :columns="columns" :data="userData" :loading="loading" :current.async="currentPageIndex" :total="total" @pageChange="pageChange"></TableM>
     <!-- 新增提示框 -->
        <Modal v-model="addModal"
                title="添加房型"
                :mask-closable="false"
                @on-ok="ModalConfirm('formValidate')"
                @on-cancel="ModalCancel('formValidate')"
            >
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
            
                <FormItem label="房型分类" prop="reserve_destination">
                    <Select v-model="formValidate.reserve_destination" placeholder="请选择">
                        <Option value="标准间">标准间</Option>
                        <Option value="大庄房">大庄房</Option>
                    </Select>
                </FormItem>

                <FormItem label="房型名称" prop="room_name">
                    <Input v-model="formValidate.room_name" placeholder="请输入名称"></Input>
                </FormItem>

                <FormItem label="排序" prop="room_type_sort">
                    <Input v-model="formValidate.room_type_sort" placeholder="请输入排序"></Input>
                </FormItem>

            </Form>
                <div slot="footer" align="center">
                    <Button type="primary" @click="ModalConfirm('formValidate')" :loading="loading">保存</Button>
                    <Button @click="ModalCancel('formValidate')" style="margin-left: 8px">取消</Button>
                </div>
        </Modal>

    <!--  编辑提示框 -->
        <Modal v-model="editModal"
                title="编辑房型"
                :mask-closable="false"
                @on-ok="ModalConfirm('formValidate')"
                @on-cancel="ModalCancel('formValidate')"
            >
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
            
                <FormItem label="房型分类" prop="reserve_destination">
                    <Select v-model="formValidate.reserve_destination" placeholder="请选择">
                        <Option value="标准间">标准间</Option>
                        <Option value="大庄房">大庄房</Option>
                    </Select>
                </FormItem>

                <FormItem label="房型名称" prop="room_name">
                    <Input v-model="formValidate.room_name" placeholder="请输入名称"></Input>
                </FormItem>

                <FormItem label="排序" prop="room_type_sort">
                    <Input v-model="formValidate.room_type_sort" placeholder="请输入排序"></Input>
                </FormItem>

            </Form>
                <div slot="footer" align="center">
                    <Button type="primary" @click="ModalConfirm('formValidate')" :loading="loading">保存</Button>
                    <Button @click="ModalCancel('formValidate')" style="margin-left: 8px">取消</Button>
                </div>
        </Modal>

    <!-- 删除提示框 -->
    <Modal v-model="delDilaog" width="360">
        <p slot="header" style="color:#f60;text-align:center">
            <Icon type="ios-information-circle"></Icon>
            <span>提示</span>
        </p>
        <div style="text-align:center">
            <p>您确定要删除吗？</p>
        </div>
        <div slot="footer">
            <Button type="error" size="large" long :loading="delLoading" @click="delConfrmClick">删除</Button>
        </div>
    </Modal>
    
    </div>
        </TabPane>
        <TabPane label="区域管理">标签三的内容</TabPane>
        <TabPane label="价格设置">标签二的内容</TabPane>
        <TabPane label="默认价格">标签三的内容</TabPane>
      </Tabs>
 
  
</Row>
</template>
<script>
    export default {
        
    }
</script>

<script>

import TableM from "../../common/table/table.vue";
import {
    roomtypeList
} from '../../api/lp-organizational/api.js'

export default {
  name: "baseInformation",

  components: {
    TableM
  }, 
  data() {
    return {
        addModal: false,

        editModal:false,

        formValidate: {
                    org_addr: '',//机构地址
                    org_name: '',//机构标题
                   
                },
                ruleValidate: {
                    org_addr: [
                        { required: true, message: '机构地址不能为空', trigger: 'blur' }
                    ],
                    org_name: [
                        { required: true, message: '请选择机构标题', trigger: 'change' }
                    ],
                    province_name: [
                        { required: true, message: '请选择省份', trigger: 'change' }
                    ],
                    city_name: [
                        { required: true, message: '请选择城市', trigger: 'change' }
                    ],
                    gender: [
                        { required: true, message: 'Please select gender', trigger: 'change' }
                    ],
                    interest: [
                        { required: true, type: 'array', min: 1, message: 'Choose at least one hobby', trigger: 'change' },
                        { type: 'array', max: 2, message: 'Choose two hobbies at best', trigger: 'change' }
                    ],
                    date: [
                        { required: true, type: 'date', message: 'Please select the date', trigger: 'change' }
                    ],
                    time: [
                        { required: true, type: 'string', message: 'Please select time', trigger: 'change' }
                    ],
                    desc: [
                        { required: true, message: 'Please enter a personal introduction', trigger: 'blur' },
                        { type: 'string', min: 20, message: 'Introduce no less than 20 words', trigger: 'blur' }
                    ]
                },
        orderStatus: [
                    {
                        value: '申请退房',
                        label: '申请退房'
                    },
                    {
                        value: '退房中',
                        label: '退房中'
                    },
                    {
                        value: '退房完成',
                        label: '退房完成'
                    },                  
                ],
        institutionTitle:[
                    {
                        value: '退房完成',
                        label: '退房完成'
                    },
                ],
        roomType: [
                    {
                        value: 'New York',
                        label: 'New York'
                    },
                    {
                        value: 'London',
                        label: 'London'
                    },
                    {
                        value: 'Sydney',
                        label: 'Sydney'
                    },
                    {
                        value: 'Ottawa',
                        label: 'Ottawa'
                    },                   
                ],
                model8:'',
        delDilaog: false,   // 控制删除弹出框
        
        delLoading: false,   // 控制删除按钮loading

        currentPageIndex: 1,    // 当前页

        columns: [    // 表头信息
            {
                title: "房型分类",
                render: (h, {row, index}) => {
                    return h('span', {
                    }, row.reserve_destination ? row.reserve_destination : `暂无${index}`)
                }
            },
  
            {
                title: "房型名称",
                render: (h, {row, index}) => {
                    return h('span', {
                    }, row.room_name ? row.room_name : `暂无${index}`)
                }
            },

            {
                title: "排序",
                render: (h, {row, index}) => {
                    return h('span', {
                    }, row.room_type_sort ? row.room_type_sort : `暂无${index}`)
                }
            },

            {
                title: "操作",
                key: "action",
                align: "center",
                render: (h, params) => {
                    return h("div", [
                    h(
                        "Button",
                        {
                        props: {
                            type: "primary",
                            size: "small"
                        },
                        style: {
                            marginRight: "5px"
                        },
                        on: {
                            click: () => {
                                this.editClick(params);
                                // this.goToInfo(params);
                            }
                        }
                        },
                        "编辑"
                    ),
                    // h(
                    //     "Button",
                    //     {
                    //     props: {
                    //         type: "primary",
                    //         size: "small"
                    //     },
                    //     style: {
                    //         marginRight: "5px"
                    //     },
                    //     on: {
                    //         click: () => {
                    //             this.onlineClick(params);
                    //         }
                    //     }
                    //     },
                    //     "删除"
                    // ),
                    ]);
                }
            }
        ],

        userData: [],   // 内容数据

        total: 0,   // 总页数

        formInline: {   // 定义表单对象
            cus_account: '',
            cus_nick_name: ''
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

    handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$Message.success('Success!');
                    } else {
                        this.$Message.error('Fail!');
                    }
                })
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            },

    // 进入编辑详情
    goToEditInfo(params) {
        this.$router.push({
            path: '/infoModel',
            data: params 
        })
    },

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

    // 执行table编辑的事件
    editClick(params) {
        this.editModal = true;
        console.log(params);
    },

    // 执行删除的事件
    delClick(params) {
        console.log(params);
        this.delDilaog = true;
    },

    // 删除确定按钮
    delConfrmClick() {
        this.delLoading = true;
        setTimeout(() => {
            this.delDilaog = false;
            this.$Message.success('成功');
            console.log('我滚了');
        }, 1000)
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
        let { data } = await roomtypeList(params);
        this.total = data[0].count;
        console.log(this.total)
        data.shift(0);
        this.userData = data;
        this.loading = false;
        console.log(data);
    }
  },
  mounted() {
    this.getUser();
  }
};
</script>

