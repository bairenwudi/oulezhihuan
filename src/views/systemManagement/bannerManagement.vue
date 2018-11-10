<style scope lang="less">
@import "./bannerManagement.less";
</style>
 <!-- banner管理 -->
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
                @on-ok="ModalConfirm('formValidate')"
                @on-cancel="ModalCancel('formValidate')"
            >
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
                <FormItem label="banner名称" prop="banner_title">
                    <Input v-model="formValidate.banner_title" placeholder="请输入banner名称"></Input>
                </FormItem>

                <FormItem label="所属模块选择" prop="module" :label-width="100">
                    <Select v-model="formValidate.module" placeholder="请选择">
                        <Option value="zhfw">置换-房屋</Option>
                    </Select>
                </FormItem>

                <FormItem label="banner图" prop="upLoad" width='100'>
                    
                </FormItem>

                <FormItem label="上传H5" prop="upLoad">
                   
                </FormItem>

                <FormItem label="第三方地址" prop="third_url">
                    <Input v-model="formValidate.third_url" placeholder="请输入第三方地址"></Input>
                </FormItem>

                <FormItem label="轮播顺序" prop="sort">
                    <Input v-model="formValidate.sort" placeholder="请输入轮播顺序"></Input>
                </FormItem>

            </Form>
                <div slot="footer" align="center">
                    <Button type="primary" @click="ModalConfirm('formValidate')" :loading="loading">确定</Button>
                    <Button @click="ModalCancel('formValidate')" style="margin-left: 8px">重置</Button>
                </div>
        </Modal>

     <!--  编辑提示框 -->
        <Modal v-model="editModal"
                title="编辑"
                :mask-closable="false"
                @on-ok="ModalConfirm('formValidate')"
                @on-cancel="ModalCancel('formValidate')"
            >
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                <FormItem label="banner名称" prop="banner_title">
                    <Input v-model="formValidate.banner_title" placeholder="请输入banner名称"></Input>
                </FormItem>

                <FormItem label="所属模块选择" prop="module" :label-width="85">
                    <Select v-model="formValidate.module" placeholder="请选择">
                       <Option value="zhfw">置换-房屋</Option>
                    </Select>
                </FormItem>

                <FormItem label="banner图" prop="upLoad" width='100'>
                    
                </FormItem>

                <FormItem label="上传H5" prop="upLoad">
                   
                </FormItem>

                <FormItem label="第三方地址" prop="third_url">
                    <Input v-model="formValidate.third_url" placeholder="请输入第三方地址"></Input>
                </FormItem>

                <FormItem label="轮播顺序" prop="sort">
                    <Input v-model="formValidate.sort" placeholder="请输入轮播顺序"></Input>
                </FormItem>

            </Form>
            </Form>
                <div slot="footer" align="center">
                    <Button type="primary" @click="ModalConfirm('formValidate')" :loading="loading">确定</Button>
                    <Button @click="ModalCancel('formValidate')" style="margin-left: 8px">重置</Button>
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
</template>

<script>
import TableM from "../../common/table/table.vue";
import {
  bannerManagementList, //banner管理列表
  bannerManagementAdd, //banner管理添加
  bannerManagementEdit, //banner管理编辑
  bannerManagementDel, //banner管理删除
  getBase
} from "../../api/lp-systemManagement/api.js";

export default {
  name: "bannerManagementModel",

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

    return {
      formValidate: {
        // 定义新增表单的对象
        module: "",
        banner_title: "",
        upLoad: "",
        sort: []
      },
      ruleValidate: {
        // 定义表单的校验规则
        banner_title: [
          { required: true, message: "请输入预订人", trigger: "blur" }
        ],

        module: [
          {
            required: true,
            type: "array",
            min: 1,
            message: "所属模块选择",
            trigger: "change"
          },
          { type: "array", max: 1, message: "至多选择一个", trigger: "change" }
        ],

        sort: [
          { required: true, message: "请输入排序", trigger: "blur" },
          {
            type: "string",
            min: 20,
            message: "Introduce no less than 20 words",
            trigger: "blur"
          }
        ]
      },

      addModal: false,

      editModal: false,

      visible: false,

      delDilaog: false, // 控制删除弹出框

      delLoading: false, // 控制删除按钮loading

      currentPageIndex: 1, // 当前页

      columns: [
        // banner管理表头信息
        {
          title: "所属模块",
          render: (h, { row, index }) => {
            return h(
              "span",
              {
                // }, row.module ? row.module : `暂无${index}`)
              },
              row.module === "zhfw" ? "置换-房屋" : ""
            );
          }
        },

        {
          title: "Banner名称",
          render: (h, { row, index }) => {
            return h(
              "span",
              {},
              row.banner_title ? row.banner_title : `暂无${index}`
            );
          }
        },

        {
          title: "Banner图片",
          render: (h, { row, index }) => {
            return h(
              "img",
              {
                attrs: {
                  src: this.imgFun(row)
                },
                style: {
                  width: "100px",
                  height: "80px",
                  padding:"12px"
                }
              },
              ""
            );
          }
        },
        {
          title: "H5地址",
          render: (h, { row, index }) => {
            return h("span", {
                
            }, this.h5fun(row));
          }
        },

        {
          title: "轮播排序",
          render: (h, { row, index }) => {
            return h("span", {}, row.sort ? row.sort : `暂无${index}`);
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

      userData: [], // 内容数据

      total: 0, // 总页数
      base: "",
      formInline: {
        // 定义表单对象
        cus_account: "",
        cus_nick_name: ""
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
    },

    // 点击确定按钮
    ModalConfirm(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.loading = true;
          setTimeout(() => {
            this.$Message.success("Success!");
            this.Modal = false;
            this.loading = false;
          }, 1000);
        } else {
          this.$Message.error("Fail!");
        }
      });
    },

    // 点击框取消按钮
    ModalCancel(name) {
      this.$Message.info("Clicked ok");
      this.$refs[name].resetFields();
    },
    imgFun(val) {
      //http://192.168.1.39:8080/upload/upBanner/2018-10-13_16-32-00/184dc4b777e54d6785e217e296a80120/admin_bottom.png
      console.log(val);
      console.log(this.base); //http://192.168.1.39:8080
      return this.imgUrlFormat(val.banner_url, val.banner_name);
    },
    h5fun(val){
        return this.imgUrlFormat(val.h5_path,val.h5_name)
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
        this.$Message.success("成功");
        console.log("我滚了");
      }, 1000);
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
            if (this.formInline[i] !== undefined || this.formInline[i] !== '') {
                this.getUser(this.formInline, pageIndex);  
                return false;
            }
        };
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
    imgUrlFormat(banner_url, banner_name) {
      var afterUpload = banner_url.split("/");
      var newArr = afterUpload.slice(afterUpload.indexOf("upload"));
      var newImgUrl = newArr.join("/");
      var showUrl = this.base + "/" + newImgUrl + "/" + banner_name;
      return showUrl;
    },
    //Banner管理列表
    // 为了解决异步问题
    async getUser(filter, pageIndex = 1) {
        let params = {
            pageSize: 10,
            startPos: filter ? pageIndex : this.currentPage
        };

        if (filter) {
            params = Object.assign(params, filter);
        };

        this.loading = true;
        let { data } = await bannerManagementList(params);
        console.log(data)
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
    this.base = getBase().base2;
  }
};
</script>

