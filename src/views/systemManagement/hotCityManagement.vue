<style scope lang="less">
@import "./hotCityManagement.less";
</style>
<!-- 热门城市管理 -->
<template>
    <div class="formView">
        <Form ref="formInline" :model="formInline" inline>

             <FormItem>
                <Button type="primary" @click="addClick">新增</Button>
            </FormItem>
        </Form>

        <TableM :columns="columns" :data="userData" :loading="loading" :current.async="currentPageIndex" :total="total" @pageChange="pageChange"></TableM>
        <!-- 新增提示框 -->
        <Modal v-model="addModal"
                title="新增"
                :mask-closable="false"
                @on-ok="add('formValidate')"
                @on-cancel="addModalCancel('formValidate')"
            >
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">

                <FormItem label="省份" prop="p_name">
                    <Select v-model="formValidate.p_name" @on-change="provinceChange" placeholder="请选择">
                        <Option v-for="(item, index) in pList" :value="item.code" :label="item.name" :key="`p_name_${index}`"></Option>
                    </Select>
                </FormItem>

                <!-- <FormItem label="城市" prop="c_name">
                    <Select v-model="formValidate.c_name" placehFormItemolder="请选择">
                        <Option v-for="item in cList" :value="item.code" :key="item.id">{{ item.name }}</Option>
                    </Select>
                </FormItem> -->

                <FormItem label="城市" prop="c_name">
                    <Select v-model="formValidate.c_name" placeholder="请选择">
                        <Option v-for="(item, index) in cList" :value="item.code" :label="item.name" :key="`c_name_${index}`"></Option>
                    </Select>
                </FormItem>

                <FormItem label="排序" prop="hcm_sort">
                    <Input v-model="formValidate.hcm_sort" placeholder="请输入排序"></Input>
                </FormItem>

            </Form>
                <div slot="footer" align="center">
                    <Button type="primary" @click="add('formValidate')" :loading="loading">确定</Button>
                    <Button @click="addModalCancel('formValidate')" style="margin-left: 8px">取消</Button>
                </div>
        </Modal>

     <!--  编辑提示框 -->
        <Modal v-model="editModal"
                title="编辑"
                :mask-closable="false"
                @on-ok="edit('editFormValidate')"
                @on-cancel="editModalCancel('editFormValidate')"
            >
            <Form ref="editFormValidate" :model="editFormValidate" :rules="ruleValidate" :label-width="80">
                <FormItem label="省份" prop="p_name" :label-width="85">
                    <Select v-model="editFormValidate.p_name" @on-change="provinceChange" placeholder="请选择">
                        <Option v-for="(item, index) in pList" :value="item.code" :label="item.name" :key="`p_name_${index}`"></Option>
                    </Select>
                </FormItem>

                <FormItem label="城市" prop="c_name" :label-width="85">
                    <Select v-model="editFormValidate.c_name" placeholder="请选择">
                        <Option v-for="(item, index) in cList" :value="item.code" :label="item.name" :key="`c_name_${index}`"></Option>
                    </Select>
                </FormItem>

                <FormItem label="排序" prop="hcm_sort">
                    <Input v-model="editFormValidate.hcm_sort" placeholder="请输入排序"></Input>
                </FormItem>

            </Form>
                <div slot="footer" align="center">
                    <Button type="primary" @click="edit('editFormValidate')" :loading="loading">确定</Button>
                    <Button @click="editModalCancel('editFormValidate')" style="margin-left: 8px">取消</Button>
                </div>
        </Modal>

    <!-- 删除提示框 -->
    <Modal v-model="delDilaog" width="360">
        <p slot="header" style="color:#f60;text-align:center">
            <Icon type="ios-information-circle"></Icon>
            <span>提示</span>
        </p>
        <div style="text-align:center">
            <p>确定要删除吗？</p>
        </div>
        <div slot="footer">
            <Button type="error" size="large" long :loading="delLoading" @click="delConfrmClick">删除</Button>
        </div>
    </Modal>

    </div>
</template>

<script>
import TableM from "../../common/table/table.vue";
import {
  hotCityManagementList, //热门城市管理列表
  hotCityManagementAdd, //热门城市管理添加
  hotCityManagementEdit, //热门城市管理编辑
  hotCityManagementDel, //热门城市管理删除
  hotCityPList,
  hotCityCList,
  hotCityGetEditMessage//热门城市管理点击编辑获取信息
} from "../../api/lp-systemManagement/api.js";

export default {
  name: "hotCityManagementModel",

  components: {
    TableM
  },
  data() {
    var DateValdate = (rule, value, callback) => {
      if (value[0] === "") {
        return callback(new Error("请填写完整"));
      } else {
        callback();
      }
    };
    
    var emptyValidP_name = (rule, value, callback) => {
      if(value === ''){
        return callback(new Error("请填写完整"));
      } else if(!value) {
        return callback(new Error("请填写完整1"));
      } else {
        callback();
      }
    };
    var emptyValidC_name = (rule, value, callback) => {
      console.log(rule);
      console.log(value);
      console.log(callback);
      if(!value){
        return callback(new Error("请填写完整"));

      }
      if(value === '') {
        return callback(new Error("请填写完整2"));
      } else {
        callback();
      }
    };
    var emptyValid = (rule, value, callback) => {
      console.log(value);

      if(!value) {
        return callback(new Error("请填写完整"));
      } else {
        callback();
      }
    };
    var emptyValidPChange = (rule,value,callback) => {
      console.log(value);
      
      // if(!value){

      // }
    };

    return {
      formValidate: {
        // 定义新增表单的对象
        p_name: "",
        c_name: "",
        hcm_sort: ""
      },
      editFormValidate: {
        // 定义新增表单的对象
        p_name: "",
        c_name: "",
        hcm_sort: ""
      },

      ruleValidate: {
        // 定义表单的校验规则
        p_name: [
          { validator: emptyValidP_name, trigger:"change" }
          // { required: true, message:"请选择省" , trigger:"change" }
        ],
        c_name: [
          { validator: emptyValidC_name, trigger:"change" }
          // { required: true, message:"请选择市" , trigger:"change" }

        ],
        hcm_sort: [
          { validator: emptyValid, trigger: "blur" }
          // { required: true, message:"请选择序号" , trigger:"blur" }
        ]
      },

      addModal: false,

      editModal: false,

      visible: false,

      deleteHcm_id:"",//删除需要的hcm_id

      delDilaog: false, // 控制删除弹出框

      delLoading: false, // 控制删除按钮loading

      currentPageIndex: 1, // 当前页

      columns: [
        // 表头信息
        {
          title: "省份",
          render: (h, { row, index }) => {
            return h("span", {}, row.p_name ? row.p_name : `暂无${index}`);
          }
        },

        {
          title: "城市",
          render: (h, { row, index }) => {
            return h("span", {}, row.c_name ? row.c_name : `暂无${index}`);
          }
        },

        {
          title: "排序",
          render: (h, { row, index }) => {
            return h("span", {}, row.hcm_sort ? row.hcm_sort : `暂无${index}`);
          }
        },

        {
          title: "创建时间",
          render: (h, { row, index }) => {
            return h(
              "span",
              {},
              row.create_date ? row.create_date : `暂无${index}`
            );
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
                    }
                  }
                },
                "编辑"
              ),
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
                      this.delClick(params);
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ],
      pList: [],

      cList:[],
      // pList:"",

      userData: [], // 内容数据

      total: 0, // 总页数

      formInline: {
        // 定义表单对象
        p_name: "",
        c_name: "",
        hcm_sort: ""
      },

      loading: false, // 定义loading为true

      currentPage: 1 // 定义当前页
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
      this.formValidate.p_name = '';
      this.formValidate.c_name = '';
      this.formValidate.hcm_sort = '';
      this.deleteHcm_id = '';
    },

    // // 点击确定按钮
    // ModalConfirm(name) {
    //   this.$refs[name].validate(valid => {
    //     if (valid) {
    //       this.loading = true;
    //       setTimeout(() => {
    //         this.$Message.success("Success!");
    //         this.Modal = false;
    //         this.loading = false;
    //       }, 1000);
    //     } else {
    //       this.$Message.error("Fail!");
    //     }
    //   });
    // },
    add(name) {

      this.$refs[name].validate(valid => {
        console.log(valid);
        
        if (valid) {
          this.loading = true;
          let params = {
            hcm_provice_code:this.formValidate.p_name,
            hcm_city_code:this.formValidate.c_name,
            hcm_sort:this.formValidate.hcm_sort,
          }
          hotCityManagementAdd(params).then(res => {
            console.log(res);
            if(res.data === 1){

              this.$Message.success("Success!");
              this.getUser();
              this.addModal = false;

            }else{
              this.$Message.error("Fail!");
            }
            this.loading = false;
          })
          console.log(data);
          
          // setTimeout(() => {
          
          // }, 1000);
        }
      });
    },
    edit(name) {
      this.$refs[name].validate(valid => {
        console.log(valid);
        
        if (valid) {
          this.loading = true;
          let params = {
            hcm_provice_code:this.editFormValidate.p_name,
            hcm_city_code:this.editFormValidate.c_name,
            hcm_sort:this.editFormValidate.hcm_sort,
            hcm_id:this.deleteHcm_id
          }
          hotCityManagementEdit(params).then(res => {
            console.log(res);
            if(res.data === 1){
              this.$Message.success("Success!");
              this.editModal = false;
              this.getUser();
            }else{
              this.$Message.error("Fail!");
            }
            this.loading = false;
          })
        }
      });
    },

    // 点击框取消按钮
    editModalCancel(name) {
      this.$Message.info("Clicked ok");
      this.$refs[name].resetFields();
      this.editModal = false;
    },
    addModalCancel(name) {
      this.$Message.info("Clicked ok");
      this.$refs[name].resetFields();
      this.addModal = false;

    },
    // 执行table编辑的事件
    async editClick(params) {
      this.editModal = true;
      this.deleteHcm_id = params.row.hcm_id;
      const { data } = await hotCityGetEditMessage({hcm_id:this.deleteHcm_id});
      console.log(data);
      this.editFormValidate.p_name = data.hcm_provice_code - 0 // hcm_provice_code 是字符串类型 - 0  转化为数字类型
      // alert(this.editFormValidate.p_name)
      this.getClist(this.editFormValidate.p_name)
      this.editFormValidate.c_name = data.hcm_city_code - 0
      this.editFormValidate.hcm_sort = data.hcm_sort;
    },

    // 执行删除的事件
    delClick(params) {
      this.deleteHcm_id = params.row.hcm_id;
      this.delDilaog = true;
    },

    // 删除确定按钮
    async delConfrmClick() {
      this.delLoading = true;
      let params = {
        hcm_id:this.deleteHcm_id
      }
      const { data } = await hotCityManagementDel(params);
      console.log(data);
      if(data === 1){
        this.$Message.success("Success!");
        this.delDilaog = false;
        this.getUser();
      }else{
        this.$Message.error("fail!");
      }
      this.delLoading = false;
    },

    // 获取时间
    getFormatterTime(val) {
      console.log(val);
    },

    // 改变分页触发的事件
    pageChange(pageIndex) {
      // 改变当前页
      // this.currentPage = pageIndex;
      for (let i in this.formInline) {
        if (this.formInline[i] !== undefined || this.formInline[i] !== "") {
          this.getUser(this.formInline, pageIndex);
          return false;
        }
      }
      this.getUser();
    },

    searchClick(filter) {
      this.resetTotal();
      if (filter) {
        for (let i in filter) {
          if (filter[i] === undefined || filter[i] === "") {
            delete filter[i];
          }
        }
      }
      this.getUser(filter);
    },
    async getPlist() {
      let params = {};
      let { data } = await hotCityPList(); 
      this.pList = data;
    },
    provinceChange(val){
      this.editFormValidate.c_name = "";
      this.getClist(val);
    },
    async getClist(p_code){
      console.log(p_code);
      
      let { data } = await hotCityCList({p_code});
      this.cList = data;
    },

    //热门城市管理列表
    // 为了解决异步问题
    async getUser(filter, pageIndex = 1) {
      let params = {
        pageSize: 10,
        startPos: filter ? pageIndex : this.currentPage
      };

      if (filter) {
        params = Object.assign(params, filter);
      }

      this.loading = true;
      let { data } = await hotCityManagementList(params);
      console.log(data);
      this.total = data[0].count;
      console.log(this.total);
      data.shift(0);
      this.userData = data;
      this.loading = false;
    }
  },
  mounted() {
    this.getUser();
    this.getPlist();
  }
};
</script>

