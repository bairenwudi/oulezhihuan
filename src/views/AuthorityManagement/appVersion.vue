<template>
    <!-- app版本更新 -->
    <section class="live">
        <Form ref="filters" :model="filters" inline>
            <FormItem label="App类型" :label-width="80">
                <Select v-model="filters.app_type" clearable placeholder="请选择" style="width: 300px">
                    <Option label="鸥乐直播" :value="1"></Option>
                    <Option label="鸥乐置换" :value="2"></Option>
                </Select>
            </FormItem>

            <FormItem label="版本类型" :label-width="75">
                <Select v-model="filters.version_type" clearable placeholder="请选择" style="width: 300px">
                    <Option label="安卓" :value="1"></Option>
                    <Option label="苹果" :value="2"></Option>
                </Select>
            </FormItem>

            <FormItem label="申请时间" :label-width="75">
                <DatePicker 
                    type="datetimerange" 
                    format="yyyy-MM-dd HH:mm" 
                    placeholder="选择开始时间和结束时间" 
                    style="width: 300px"
                    @on-change="formatapplyForDate"
                    v-model="filters.applyForDate"
                    clearable
                ></DatePicker>
            </FormItem>

            <FormItem align="center">
                <span style="margin-right: 10px">
                    <Button type="primary" @click.stop="getUsersFun(filters, 1)">查询</Button>
                </span>
                <Button type="primary" @click.stop="addUserClick">新增</Button>
            </FormItem>
        </Form>

    <div class="main-continer">
        <!-- 编辑 dialog -->
        <Modal 
            v-model="editDialog"
            title="编辑App版本"
            :mask-closable="false"
        >
            <Form ref="editForm" :model="editForm" :rules="editRule" :label-width="100">
                <FormItem label="App类型" prop="app_type">
                    {{ editForm.app_type === '1' ? '鸥乐直播' : '鸥乐置换' }}
                </FormItem>

                <FormItem label="版本名：" prop="version_num">
                    {{ editForm.version_num ? editForm.version_num : '暂无' }}
                </FormItem>

                <FormItem label="版本号：" prop="version_code">
                    {{ editForm.version_code ? editForm.version_code : '暂无' }}
                </FormItem>

                <FormItem label="版本类型：" prop="version_type">
                    {{ editForm.version_type ? editForm.version_type : '暂无' }}
                </FormItem>

                <FormItem label="升级描述：" prop="version_descr">
                    {{ editForm.version_descr ? editForm.version_descr : '暂无' }}
                </FormItem>

                <FormItem label="是否强制升级：" prop="is_mandatory">
                    <RadioGroup v-model="editForm.is_mandatory">
                        <Radio :label="0" :value="0">否</Radio>
                        <Radio :label="1" :value="1">是</Radio>
                    </RadioGroup>
                </FormItem>

                <FormItem label="是否升级：" prop="is_open">
                    <RadioGroup v-model="editForm.is_open">
                        <Radio :label="0" :value="0">否</Radio>
                        <Radio :label="1" :value="1">是</Radio>
                    </RadioGroup>
                </FormItem>

               <FormItem label="URL地址：" prop="download_url">
                    <Input type="text" clearable v-model="editForm.download_url" placeholder="请输入URL地址"></Input>
                </FormItem>

                <FormItem align="center">
                    <span style="margin-right: 10px">
                        <Button type="primary" @click="editDialog = false">取 消</Button>
                    </span>

                    <Button type="primary" @click="UserBtnClick('editForm')">确 定</Button>
                </FormItem>
            </Form>
        </Modal>


        <!-- 新增 dialog -->
        <Modal 
            v-model="addDialog"
            title="新增App版本"
            :mask-closable="false"
        >
            <Form ref="addForm" :model="addForm" :rules="addRule" :label-width="100">
                <FormItem label="App类型" prop="app_type">
                    <Select v-model="addForm.app_type" placeholder="请选择">
                        <Option label="鸥乐直播" :value="1"></Option>
                        <Option label="鸥乐置换" :value="2"></Option>
                    </Select>
                </FormItem>

                <FormItem label="版本名：" prop="version_num">
                    <Input v-model="addForm.version_num" clearable type="text" placeholder="请输入版本号"></Input>
                </FormItem>

                <FormItem label="版本号：" prop="version_code">
                    <Input v-model="addForm.version_code" clearable type="text" placeholder="请输入版本号"></Input>
                </FormItem>

                <FormItem label="版本类型：" prop="version_type">
                    <Select v-model="addForm.version_type" clearable placeholder="请选择">
                        <Option label="安卓" :value="1"></Option>
                        <Option label="苹果" :value="2"></Option>
                    </Select>
                </FormItem>

                <FormItem label="升级描述：" prop="version_descr">
                    <Input v-model="addForm.version_descr" clearable type="text" placeholder="请输入升级描述"></Input>
                </FormItem>

                <FormItem label="是否强制升级：" prop="is_mandatory">
                    <RadioGroup v-model="addForm.is_mandatory">
                        <Radio :label="0" :value="0">否</Radio>
                        <Radio :label="1" :value="1">是</Radio>
                    </RadioGroup>
                </FormItem>

                <FormItem label="是否升级：" prop="is_open">
                    <RadioGroup v-model="addForm.is_open">
                        <Radio :label="0" :value="0">否</Radio>
                        <Radio :label="1" :value="1">是</Radio>
                    </RadioGroup>
                </FormItem>

               <FormItem label="URL地址：" prop="download_url">
                    <Input type="text" clearable v-model="addForm.download_url" placeholder="请输入URL地址"></Input>
                </FormItem>
            </Form>

            <div slot="footer" align="center">
                <span style="margin-right: 10px">
                    <Button @click="addDialog = false">取 消</Button>
                </span>

                <Button type="primary" @click="UserBtnClick('addForm')">确 定</Button>
            </div>
        </Modal>


        <div class="tableView">
            <!-- 调取table模板例子 -->
            <TableM
                  :columns="appVersionColumns"
                  :data="appVersionList"
                  :loading="listLoading"
                  :total="total"
                  @pageChange="handleCurrentChange"
              >
            </TableM>
        </div>
    </div>
        
	</section>
</template>


<script>
import {
    Appsave,
    selectVersion,
    updateVersion,
    deleteVersion,
} from "@/api/lp-authorityManagement/api.js";
// 引入固定表头的table
import TableM from "@/common/table/table.vue";
// 补充时间格式 不够10 补充 0
import { formatTime } from "@/common/date/formatTime.js";

export default {
  data() {
    let isEmpty = (rule, value, callback) => {
        if (value === undefined || value === '') {
            return callback(new Error('请填写完整'));
        } else {
            callback();
        }
    };

    // 验证手机号
    let isPhoneEmpty = (rule, value, callback) => {
        let reg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
        if (!value) {
            return callback(new Error('请填写完整'));
        } else if (!reg.test(value)) {
            return callback(new Error('手机号格式错误'));
        } else {
            callback();
        }
    };

    return {
        listLoading: false,

        total: 0,

        Apppage: 1,

        filters: {
            app_type: '',
            version_type: '',
            applyForDate: []
        },

        editDialog: false,

        addDialog: false,

        associatedDialog: false,

        editForm: {
            app_type: 1,
            version_num: '',
            version_code: '',
            version_type: 1,
            version_descr: '',
            is_mandatory: 0,
            is_open: 0,
            download_url: ''
        },

        editRule: {
            version_descr: [
                { validator: isEmpty, trigger: 'blur' }
            ],
            download_url: [
                { validator: isEmpty, trigger: 'blur' }
            ]
        },

        addForm: {
            app_type: 1,
            version_num: '',
            version_code: '',
            version_type: 1,
            version_descr: '',
            is_mandatory: 0,
            is_open: 0,
            download_url: ''
        },

        addRule: {
            version_num: [
                { required: true, message: '请您填写完整', trigger: 'blur' }
            ],

            version_code: [
                { required: true, message: '请您填写完整', trigger: 'blur' }
            ],

            version_type: [
                { validator: isEmpty, trigger: 'change' }
            ],

            version_descr: [
                { validator: isEmpty, trigger: 'blur' }
            ],

            is_mandatory: [
                { validator: isEmpty, trigger: 'blur' }
            ],

            is_open: [
                { validator: isEmpty, trigger: 'blur' }
            ],

            download_url: [
                { validator: isEmpty, trigger: 'blur' }
            ]
        },

        appVersionList: [],

        searchPage: 1,

        appVersionColumns: [
            {
                title: 'App类型',
                align: 'center',
                render: (h, { row, index }) => {
                    return (
                        <div>
                            { row.app_type ? row.app_type === '1' ? '鸥乐直播' : '鸥乐置换' : '暂无' }
                        </div>
                    )
                }
            },

            {
                title: '版本名',
                align: 'center',
                key: 'version_num',
            },

            {
                title: '版本号',
                align: 'center',
                key: 'version_code',
            },

            {
                title: '版本类型',
                align: 'center',
                render: (h, { row, index }) => {
                    return (
                        <div>
                            { row.version_type == '1' ? 'Android' : 'IOS' }
                        </div>
                    )
                }
            },

            {
                title: '升级描述',
                align: 'center',
                key: 'version_descr'
            },

            {
                title: '是否强制升级',
                align: 'center',
                render: (h, { row, index }) => {
                    return (
                        <div>
                            { row.is_mandatory ? row.is_mandatory === '0' ? '不强制' : '强制' : '暂无' }
                        </div>
                    )
                }
            },

            {
                title: '是否升级',
                align: 'center',
                render: (h, { row, index }) => {
                    return (
                        <div>
                            { row.is_open ? row.is_open === '0' ? '不开放' : '开放' : '暂无' }
                        </div>
                    )
                }
            },
            
            {
                title: 'URL地址',
                align: 'center',
                key: 'download_url'
            },

            {
                title: '创建时间',
                align: 'center',
                render: (h, { row, index }) => {
                    return (
                        <div>
                            { row.create_time ? this.dataFormat(row.create_time.time) : '暂无' }
                        </div>
                    )
                }
            },

            {
                title: '操作',
                align: 'center',
                render: (h, { row, index }) => {
                    return (
                        <div>
                            <i-button type="primary" onClick={ this.editClick.bind(this, row) }>编辑</i-button>
                        </div>
                    )
                }
            }
        ]
    };
  },

  computed: {},

  methods: {
    // 转化时间
    dataFormat(time) {
      return formatTime(time);
    },

    // 格式化时间change事件
    formatapplyForDate(applyForDate) {
        this.filters.applyForDate = applyForDate;
    },
    
    // 点击新增或者编辑确定按钮
    UserBtnClick(formName) {
        if(formName === 'addForm') {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this[formName].version_num = '' + this[formName].version_num;
                    Appsave(this[formName]).then(res => {
                        if (res.data > 0) {
                            this.$message.success('成功');
                            this.getUsersFun();
                            this.addDialog = false;
                        } else if (res.data === -1) {
                            this.$message.warning('版本号重复');
                        } else {
                            this.$message.error(`${res.data.msg}`);
                        }
                        this.getUsersFun();
                    });
                };
            })
        } else {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    delete this[formName].create_time;
                    updateVersion(this[formName]).then(res => {
                        if (res.data > 0) {
                            this.$message.success('成功');
                            this.getUsersFun();
                            this.editDialog = false;
                        } else if (res.data === -1) {
                            this.$message.warning('版本号重复');
                        } else {
                            this.$message.error(`${res.data.msg}`);
                        }
                    })
                }
            });
            
        }
    },
    
    // 新增用户按钮点击
    addUserClick() {
        this.addDialog = true;
        if (this.$refs['addForm']) {
            this.$refs['addForm'].resetFields();
        };
    },

    // 编辑进行保存按钮
    saveBtn() {
        updateAdminUser(this.editForm).then(res => {
            console.log(res);
            if (res.data > 0) {
                this.$message.success('成功');
                this.getUsersFun();
                this.editDialog = false;
            } else {
                this.$message.error(`${res.data.msg}`);
            }
        })
    },

    // 编辑
    editClick(row) {
        this.editForm = Object.assign({}, row);
        console.log(this.editForm);
        this.editDialog = true;
        if (this.$refs['editForm']) {
            this.$refs['editForm'].resetFields();
        };
        this.editForm.is_open = row.is_open - 0;
        this.editForm.is_mandatory = row.is_mandatory - 0;
        this.editForm.id = row.id;
    },

    // 改变分页事件
    handleCurrentChange(val) {
      this.Apppage = val;
      this.getUsersFun();
    },

    // 改变关联角色分页事件
    handleCurrentChange2(val) {

    },

    //获取用户列表
    getUsersFun(filters, type) {
        let filter = filters || '';
        let params = {
            startPos: type ? this.searchPage : this.Apppage
        };
        if (filters) {
            if (filter.applyForDate[0] != '') {
                filter.start_time = filter.applyForDate[0];
                filter.end_time = filter.applyForDate[1];
            } else {
                filter.start_time = '';
                filter.end_time = '';
            }
        };
        for (let i in filter) {
            if (filter[i] === '' || filter[i] === undefined) {
                delete filter[i]
            }
        };
        params = Object.assign(filter, params);
        selectVersion(params).then(res => {
            this.appVersionList = res.data.data;
            this.total = res.data.count;
        })
    },

    // 关联确定按钮 
    associatedBtnClick() {
        if (this.currentAssList.length < 1) {
            this.$message.warning('请选择角色名称');
            return false;
        };
        let arr = [];
        for (let i of this.currentAssList) {
            arr.push(i.adm_role_id);
        };
        arr = arr.join(',');
        let params = {
            adm_role_ids: arr,
            adm_user_id: this.currentAssRow.adm_user_id
        };
        updateUserOfRole(params).then(res => {
            console.log(res);
            if (res.data > 0) {
                this.$message.success('成功');
                this.getUsersFun();
                this.associatedDialog = false;
            } else {
                this.$message.error(`${res.data}`);
            }
        });
    },

  },
  mounted() {
      this.getUsersFun();
  },
  components: {
    TableM,
  }
};
</script>

<style scoped lang="less">
.associateView {
  display: flex;
  flex-flow: row;
  width: 100%;
  .ztreeView {
    width: 60%;
    height: auto;
    overflow-x: hidden;
    border: 1px solid #dcdfe6;
    border-right: 0px solid;
  }
  .tableView {
    width: 100%;
  }
}
</style>