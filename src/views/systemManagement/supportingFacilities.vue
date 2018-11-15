<style scope lang="less">
@import "./supportingFacilities.less";
</style>
 <!-- 配套设施管理 -->
<template>
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
                title="新增"
                :mask-closable="false"
                @on-ok="AddModalConfirm('addForm')"
                @on-cancel="AddModalReset('addForm')"
            >
            <Form ref="addForm" :model="addForm" :rules="addRules" :label-width="80">
                <FormItem label="设施名称" prop="facilities_name">
                    <Input v-model="addForm.facilities_name" placeholder="请输入设施名称"></Input>
                </FormItem>

                <FormItem label="设施图片" :label-width="85">
                    <el-upload
                        ref="addUpload"
                        name="upLoad"
                        :action="addActionUrl"
                        :data="addData"
                        :file-list="addFileList"
                        list-type="picture-card"
                        :auto-upload="false"
                        :on-change="onChange"
                        :on-preview="handlePictureCardPreview"
                        :on-success="uploadSuccess"
                        :on-error="uploadError"
                        :on-exceed="uploadonExceed"
                        :on-remove="handleRemove"
                        :limit="1"
                    >
                        <i class="el-icon-plus"></i>
                    </el-upload>

                    <Modal :footer-hide="true" :transfer="false" title="预览图片" v-model="visible">
                        <img :src="imgUrl" v-if="visible" style="width: 100%">
                    </Modal>
                </FormItem>
            </Form>

            <div slot="footer" align="center">
                <Button type="primary" @click="AddModalConfirm('addForm')" :loading="loading">确定</Button>
                <Button @click="AddModalReset('addForm')" style="margin-left: 8px">取消</Button>
            </div>
        </Modal>

     <!--  编辑提示框 -->
        <Modal v-model="editModal"
                title="编辑"
                :mask-closable="false"
                @on-ok="EditModalConfirm('editForm')"
                @on-cancel="EditModalReset('editForm')"
            >
            <Form ref="editForm" :model="editForm" :rules="editRules" :label-width="80">

              <FormItem label="设施名称" prop="facilities_name">
                    <Input v-model="editForm.facilities_name" placeholder="请输入设施名称"></Input>
                </FormItem>

                <FormItem label="设施图片" :label-width="85">
                    <el-upload
                        ref="editUpload"
                        name="upLoad"
                        :action="editActionUrl"
                        :data="editData"
                        :file-list="editFileList"
                        list-type="picture-card"
                        :auto-upload="false"
                        :on-change="onChange"
                        :on-preview="handlePictureCardPreview"
                        :on-success="uploadSuccess"
                        :on-error="uploadError"
                        :on-exceed="uploadonExceed"
                        :on-remove="handleRemove"
                        :limit="1"
                    >
                        <i class="el-icon-plus"></i>
                    </el-upload>

                    <Modal :footer-hide="true" :transfer="false" title="预览图片" v-model="visible">
                        <img :src="imgUrl" v-if="visible" style="width: 100%">
                    </Modal>
                </FormItem>
            </Form>
                <div slot="footer" align="center">
                    <Button type="primary" @click="EditModalConfirm('editForm')" :loading="loading">确定</Button>
                    <Button @click="EditModalReset('editForm')" style="margin-left: 8px">取消</Button>
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
  supportingFacilitiesList, //配套设施管理列表
  supportingFacilitiesAdd, //配套设施管理添加
  supportingFacilitiesEdit, //配套设施管理编辑
  supportingFacilitiesDel, //配套设施管理删除
  getBase, // 获取域名
} from "../../api/lp-systemManagement/api.js";

export default {
  name: "supportingFacilitiesModel",

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

      fileList: [],

      addForm: {              // 定义编辑表单的对象
        facilities_name: ""
      },

      editForm: {             // 定义新增表单的对象
        facilities_name: "",
      },

      addRules: {
        // 定义表单的校验规则
        facilities_name: [
          { required: true, message: "请输入设施名称", trigger: "blur" }
        ]
      },

      editRules: {
        // 定义表单的校验规则
        facilities_name: [
          { required: true, message: "请输入设施名称", trigger: "blur" }
        ]
      },

      addData: {},

      editData: {},

      editFileList: [],

      addFileList: [],

      addModal: false,

      editModal: false,

      delDilaog: false, // 控制删除弹出框

      delLoading: false, // 控制删除按钮loading

      currentPageIndex: 1, // 当前页

      imgUrl: "",

      visible: false,

      addActionUrl: "",

      editActionUrl: "",

      columns: [
        // 配套设施表头信息
        {
          type: "selection",
          width: 60,
          align: "center"
        },

        {
          title: "设施名称",
          render: (h, { row, index }) => {
            return h(
              "span",
              {},
              row.facilities_name ? row.facilities_name : `暂无${index}`
            );
          }
        },

        {
          title: "设施图片",
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
             );
          }
        },

        {
          title: "上传时间",
          render: (h, { row, index }) => {
            return h(
              "span",
              {},
              row.facilities_time ? row.facilities_time : `暂无${index}`
            );
          }
        },

        {
          title: "操作",
          key: "action",
          align: "center",
          render: (h, { row }) => {
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
                      this.editClick(row);
                    }
                  }
                },
                "编辑"
              )
            ]);
          }
        }
      ],

      userData: [], // 内容数据

      total: 0, // 总页数

      formInline: {
        // 定义表单对象
        cus_account: "",
        cus_nick_name: ""
      },

      loading: false, // 定义loading为true

      currentPage: 1, // 定义当前页
    };
  },

  methods: {
    // 上传时将图片赋到img上
    handlePictureCardPreview(file) {
        this.imgUrl = file.url;
        this.visible = true;
    },

    // 图片上传之前的钩子
    onChange(file, fileList) {
      console.log(fileList)
      this.fileList = fileList;
      this.editFileList = fileList;
    },

    // 当图片数量超出规定的数量的钩子函数
    uploadonExceed() {
      this.$Message.warning('超出图片最大限制');
    },

    // 上传成功
    uploadSuccess(response, file, fileList) {
        console.log(response, file, fileList);
        this.isUpload = true;
        this.getUser();
    },

    // 上传失败
    uploadError(err, file, fileList) {
        console.log(err, file, fileList);
        this.$Message.error('上传失败');
    },

    // 清除图片列表动作
    handleResetFile() {
      this.fileList = [];
      this.editFileList = [];
      this.addFileList = [];
    },

    // 删除图片钩子函数
    handleRemove(file, fileList) {
      this.handleResetFile();
      console.log(file, fileList);
    },

    // 重置页数
    resetTotal() {
      this.currentPage = 1;
      this.total = 1;
    },

    // 执行新增的事件
    addClick() {
      if (this.$refs["addForm"]) {
        this.$refs["addForm"].resetFields(); //清除diglog弹窗内数据
      }  
      this.addModal = true;  
    },

    // 新增点击确定按钮
    AddModalConfirm(formName) {
        this.$refs[formName].validate(valid => {
            if (valid) {
                if(!this.fileList.length) {
                  this.$Message.warning('请上传图片');
                  return
                };
                this.addData = this[formName];
                setTimeout(() => {
                  this.$refs.addUpload.submit();
                  this.$Message.success("保存成功!");
                  this.$refs.addForm.resetFields();
                  setTimeout(() =>{ 
                    this.handleResetFile();
                    this.getUser();
                  }, 200)
                  this.addModal = false;
                  this.loading = false;
                },400);
            }
        });
    },

    // 点击框取消按钮
    AddModalReset(name) {
      this.$refs[name].resetFields();
      this.handleResetFile();
      this.addModal = false;
    },

    // 编辑取消事件
    EditModalReset(formName) {
      this.$refs[formName].resetFields();
      this.handleResetFile();
      this.editModal = false;
    },

    // 编辑确定按钮
    EditModalConfirm(formName) {
      this.$refs[formName].validate((valid) => {
        if(valid) {
          // 执行
          if(!this.editFileList.length) {
            this.$Message.warning('请上传图片');
            return
          };
          this.editData = this[formName];
          console.log(this.editData)
          setTimeout(() => {
            this.$refs.editUpload.submit();
            this.$Message.success("保存成功!");
            setTimeout(() =>{ 
              this.handleResetFile();
              this.getUser();
            }, 200)
            this.editModal = false;
            this.loading = false;
          }, 400);
        }
      })
    },

    // 处理带有盘符的img路径
    imgFun(val) {
      return this.imgUrlFormat(val.facilities_pic_url, val.facilities_pic_name);
    },

    // 执行table编辑的事件
    editClick(row) {
      this.editForm = Object.assign({}, row);
      const url = this.imgUrlFormat(row.facilities_pic_url, row.facilities_pic_name);
      this.editFileList = [];
      this.editFileList.push({ url, name: url });
      this.editModal = true;
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
      for (let i in this.formInline) {
        if (this.formInline[i] !== undefined || this.formInline[i] !== "") {
          this.getUser(this.formInline, pageIndex);
          return false;
        }
      }
      this.getUser();
    },

    // 查询
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

    // 处理盘符
    imgUrlFormat(facilities_pic_url, facilities_pic_name) {
      const afterUpload = facilities_pic_url.split("static/")[1];
      var showUrl = this.base + "/" + afterUpload + "/" + facilities_pic_name;
      return showUrl;
    },

    // 配套设施管理列表
    async getUser(filter, pageIndex = 1) {
      let params = {
        pageSize: 10,
        startPos: filter ? pageIndex : this.currentPage
      };

      if (filter) {
        params = Object.assign(params, filter);
      }

      this.loading = true;
      let { data } = await supportingFacilitiesList(params);
      this.total = data[0].count;
      data.shift(0);
      this.userData = data;
      this.loading = false;
    },

    // 用来初始化一些变量值
    init() {
      this.base = getBase().base2;
      this.addActionUrl = `${this.base}/Facilities_managementController/save`;
      this.editActionUrl = `${this.base}/Facilities_managementController/updateById`;
    }
  },
  mounted() {
    this.getUser();
    this.init();
  }
};
</script>

