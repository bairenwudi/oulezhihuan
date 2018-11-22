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
                :transfer="false"
                @on-ok="add('formValidate')"
                @on-cancel="ModalCancel('formValidate')"
            >
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
                <FormItem label="banner名称" prop="banner_title">
                    <Input v-model="formValidate.banner_title" placeholder="请输入banner名称"></Input>
                </FormItem>
                <form :action="actionUrl" id="addForm" method="post" target="posthere" enctype="multipart/form-data"></form>
                <iframe name="posthere" height="0" width="0"></iframe>


                <FormItem label="所属模块选择" prop="module" :label-width="100">
                    <Select v-model="formValidate.module" placeholder="请选择">
                        <Option value="zhfw">置换-房屋</Option>
                    </Select>
                </FormItem>

                <FormItem label="banner图" prop="upLoad" width='50' class="uploadImg">
                    <el-upload
                        ref="addUpload"
                        name="upLoad"
                        :action="actionUrl"
                        :data="addData"
                        :file-list="imgList"
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
                    <Modal :footer-hide="true" title="预览图片" v-model="visible">
                        <img :src="imgUrl" v-if="visible" style="width: 100%">
                    </Modal>
                </FormItem>

                <FormItem label="上传H5" prop="upLoad" class="uploadH5">
                    <el-upload
                        ref="H5Upload"
                        name="upLoad"
                        :action="actionUrl"
                        :data="addData"
                        :file-list="h5List"
                        list-type="picture-card"
                        :auto-upload="false"
                        :on-change="onChangeH5"
                        :show-file-list="false"
                        :on-success="uploadSuccess"
                        :on-error="uploadErrorH5"
                        :on-exceed="uploadonExceedH5"
                        :on-remove="handleRemoveH5"
                    >
                        <!-- <i class="el-qwe">上传H5</i> -->
                        <span class="h5">{{ H5fileName ? H5fileName : "上传h5" }}</span>
                    </el-upload>
                    <Modal :footer-hide="true" :transfer="false" title="预览图片" v-model="visible">
                        <!-- <img :src="imgUrl" v-if="visible" style="width: 100%"> -->
                        
                    </Modal>
                </FormItem>

                <FormItem label="第三方地址" prop="third_url">
                    <Input v-model="formValidate.third_url" placeholder="请输入第三方地址"></Input>
                </FormItem>

                <FormItem label="轮播顺序" prop="sort">
                    <Input v-model="formValidate.sort" placeholder="请输入轮播顺序"></Input>
                </FormItem>

            </Form>
                <div slot="footer" align="center">
                    <Button type="primary" @click="add('formValidate')" :loading="loading">确定</Button>
                    <Button @click="ModalCancel('formValidate')" style="margin-left: 8px">重置</Button>
                </div>
        </Modal>

     <!--  编辑提示框 -->
        <Modal v-model="editModal"
                title="编辑"
                :mask-closable="false"
                @on-ok="edit('editForm')"
                @on-cancel="ModalCancel('editForm')"
            >
            <Form ref="editForm" :model="editForm" :rules="ruleValidate" :label-width="100">
                <FormItem label="banner名称" prop="banner_title">
                    <Input v-model="editForm.banner_title" placeholder="请输入banner名称"></Input>
                </FormItem>

                <FormItem label="所属模块选择" prop="module" :label-width="100">
                    <Select v-model="editForm.module" placeholder="请选择">
                       <Option value="zhfw">置换-房屋</Option>
                    </Select>
                </FormItem>
                <form :action="editUrl" id="editForm" method="post" target="posthere" enctype="multipart/form-data"></form>
                <iframe name="posthere" height="0" width="0"></iframe>
                <FormItem label="banner图" prop="upLoad" width='100' class="uploadImg">
                    <el-upload
                        ref="editUpload"
                        name="upLoad"
                        :action="editUrl"
                        :data="editData"
                        list-type="picture-card"
                        :auto-upload="false"
                        :file-list="editFileList"
                        accept="image"
                        :on-change="onChangeEdit"
                        :on-preview="handlePictureCardPreviewEdit"
                        :on-success="uploadSuccessEdit"
                        :on-error="uploadErrorEdit"
                        :on-exceed="uploadonExceedEdit"
                        :on-remove="handleRemoveEdit"
                        :limit="1"
                    >
                        <i class="el-icon-plus"></i>
                    </el-upload>
                    <Modal :footer-hide="true" title="预览图片" v-model="visible">
                        <img :src="imgUrl" v-if="visible" style="width: 100%">
                    </Modal>
                </FormItem>

                <FormItem label="上传H5" prop="upLoad" class="uploadH5">
                    <el-upload
                        ref="H5Upload"
                        name="upLoad"
                        :action="editUrl"
                        :data="addData"
                        :file-list="editFileList"
                        list-type="picture-card"
                        :auto-upload="false"
                        :on-change="onChangeH5"
                        :show-file-list="false"
                        :on-success="uploadSuccessH5"
                        :on-error="uploadErrorH5"
                        :on-exceed="uploadonExceedH5"
                        :on-remove="handleRemoveH5"
                        :limit="1"
                    >
                        <!-- <i class="el-qwe">上传H5</i> -->
                        <span class="h5">{{ H5fileName ? H5fileName : "上传h5" }}</span>
                    </el-upload>
                    <Modal :footer-hide="true" :transfer="false" title="预览图片" v-model="visible">
                        <!-- <img :src="imgUrl" v-if="visible" style="width: 100%"> -->
                    </Modal>
                </FormItem>

                <FormItem label="第三方地址" prop="third_url">
                    <Input v-model="editForm.third_url" placeholder="请输入第三方地址"></Input>
                </FormItem>

                <FormItem label="轮播顺序" prop="sort">
                    <Input v-model="editForm.sort" placeholder="请输入轮播顺序"></Input>
                </FormItem>

            </Form>
            </Form>
                <div slot="footer" align="center">
                    <Button type="primary" @click="edit('editForm')" :loading="loading">确定</Button>
                    <Button @click="ModalCancel('editForm')" style="margin-left: 8px">重置</Button>
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
    var emptyValidbanner_title = (rule, value, callback) => {
      if(!value) {
        return callback(new Error("banner名称不能为空"));
      } else {
        callback();
      }
    };
    var emptyValidmodule = (rule, value, callback) => {
      if(!value) {
        return callback(new Error("所属模块不能为空"));
      } else {
        callback();
      }
    };
    // var emptyValidupLoad = (rule, value, callback) => {
    //   // var dd = /^(.*\.html)$/
    //   console.log(value);
      
    //   if(!value) {
    //     return callback(new Error("banner图片不能为空"));
    //   } else {
    //     callback();
    //   }
    // };
    var emptyValidsort = (rule, value, callback) => {
      if(!value) {
        return callback(new Error("轮播排序不能为空"));
      } else {
        callback();
      }
    };

    return {
      imgList: [],
      h5List:[],
      editFileList:[],
      formValidate: {
        // 定义新增表单的对象
        module: "",
        banner_title: "",
        // upLoad: "",
        sort: ""
      },
      editForm: {
        module: "",
        banner_title: "",
        // upLoad: "",
        sort: ""
      },
      ruleValidate: {
        // 定义表单的校验规则
        banner_title: [
          { required: true, validator: emptyValidbanner_title, trigger:"blur" }
        ],
        module: [
          { required: true, validator: emptyValidmodule, trigger:"change" }
        ],
        // upLoad : [
        //   { required: true,validator: emptyValidupLoad, trigger:"change" }
        // ],
        sort: [
          { required: true, validator: emptyValidsort, trigger:"blur" }
        ]
      },
      picSrc: "",
      file: null,

      delbannerId: "",

      addData: {},

      editData: {},

      h5List: [],

      imgList:[],

      addModal: false,

      editModal: false,

      visible: false,

      delDilaog: false, // 控制删除弹出框

      delLoading: false, // 控制删除按钮loading

      currentPageIndex: 1, // 当前页

      imgUrl: "",

      H5fileName:"",

      visible: false,

      actionUrl: "",
      editUrl:"",

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
                  padding: "12px"
                }
              },
              ""
            );
          }
        },
        {
          title: "H5地址",
          render: (h, { row, index }) => {
            return h("span", {}, this.h5fun(row));
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
    handlePictureCardPreview(file) {
      this.imgUrl = file.url;
      this.visible = true;
    },

    handlePictureCardPreviewEdit(file) {
      this.imgUrl = file.url;
      this.visible = true;
    },
    // 图片上传之前的钩子
    onChange(file, fileList) {
      this.fileList = [];
      console.log(file,fileList);
      this.imgList = [];
      this.imgList = fileList;
    },

    onChangeEdit(file, fileList) {
      this.imgList = fileList;
    },
    // 当图片数量超出规定的数量的钩子函数
    uploadonExceed() {
      this.$Message.warning("数量超出最大限制");
    },
    uploadonExceedEdit() {
      this.$Message.warning("数量超出最大限制");
    },

    // 上传成功
    uploadSuccess(response, file, fileList) {
      if(response === 1){
        this.loading = false;
        this.$Message.success("上传成功dd");
        this.addModal = false;
        this.$refs.addForm.resetFields();
        setTimeout(() => {
          this.getUser();
        }, 500);
      } else if(response === 3){
        this.$Message.error("banner顺序重复");
        this.loading = false;
      } else if(response === 4){
        this.$Message.error("banner名称重复");
        this.loading = false;
      }
    },
    uploadSuccessEdit(response, file, fileList) {
      console.log(response, file, fileList);
      // if(response === 1){
      //   this.loading = false;
      //   this.$Message.success("上传成功");
      //   this.addModal = false;
      //   this.$refs.addForm.resetFields();
      //   this.getUser();
      // } else if(response === 3){
      //   this.$Message.error("banner顺序重复");
      //   this.loading = false;
      // } else if(response === 4){
      //   this.$Message.error("banner名称重复");
      //   this.loading = false;
      // }
    },

    uploadSuccessEdit(response, file, fileList) {
      if(response === 1){
        this.loading = false;
        this.$Message.success("上传成功");
        this.addModal = false;
        this.$refs.addForm.resetFields();
        this.getUser();
      } else if(response === 3){
        this.$Message.error("banner顺序重复");
        this.loading = false;
      } else if(response === 4){
        this.$Message.error("banner名称重复");
        this.loading = false;
      }
    },
    
    // 上传失败
    uploadError(err, file, fileList) {
      console.log(err, file, fileList);
      this.$Message.error("上传失败");
    },
    
    uploadErrorEdit(err, file, fileList) {
      console.log(err, file, fileList);
      this.$Message.error("上传失败");
    },
    // 删除图片钩子函数
    handleRemove(file, fileList) {
      // console.log(file, fileList);
    },

    handleRemoveEdit(file, fileList) {
      // console.log(file, fileList);
    },

    handlePictureCardPreviewH5(file) {
      this.imgUrl = file.url;
      this.visible = true;
    },
    // 图片上传之前的钩子
    onChangeH5(file, fileList) {
<<<<<<< HEAD
      this.h5List = [];
=======
>>>>>>> 64dec45a49a2904ad9252c010f5f6211ffc57539
      this.H5fileName = file.name;
      this.h5List.push(fileList[fileList.length - 1]);
    },
    // 当图片数量超出规定的数量的钩子函数
    uploadonExceedH5() {
      this.$Message.warning("数量超出最大限制");
    },

    // 上传成功
    uploadSuccessH5(response, file, fileList) {
      this.isUpload = true;
      this.$Message.success("上传成功");
    },
    
    // 上传失败
    uploadErrorH5(err, file, fileList) {
      this.$Message.error("上传失败");
    },

    // 清除图片列表动作
    handleResetFile() {
      this.fileList = [];
      this.editFileList = [];
      this.h5List = [];
      this.imgList = [];
    },

    // 删除图片钩子函数
    handleRemoveH5(file, fileList) {
      this.handleResetFile();
    },

    // 重置页数
    resetTotal() {
      this.currentPage = 1;
      this.total = 1;
    },

    // 执行新增的事件
    addClick() {
      this.addModal = true;
    },

    // 点击确定按钮
    add(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          
          if(!this.imgList.length) {
            this.$Message.warning('请上传图片');
            return
          };
          if(!this.h5List.length) {
            this.$Message.warning('请上传H5');
            return
          };
          const _this = this;
          let formData = new FormData($("addForm")[0]);

          for(let i in this.formValidate){
            formData.append(i,this.formValidate[i]);
          }

          formData.append("upLoad", this.imgList[0].raw);
          
          formData.append("upLoad", this.h5List[0].raw);
          this.addData = this[name];
          this.loading = true;
          setTimeout(() => {
            $.ajax({
              type: "POST",
              url: `${_this.actionUrl}`,
              data: formData,
              dataType: "JSON",
              cache: false, // 不缓存
              processData: false, // jQuery不要去处理发送的数据
              contentType: false
            }).success(function(res) {
                if(res === 1) {
                    _this.$Message.success('成功');
                } else {
                    _this.$Message.error('失败');
                }
            }).error(function(err) {
                console.log(err);
            });
          }, 220);
          // setTimeout(() => {
          //   this.$Message.success("Success!");
          //   this.addModal = false;
          //   this.loading = false;
          // }, 1000);
        }else{
          this.$Message.error('你能传上去个屁')
        }
      });
    },

    edit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          
          // if(!this.imgList.length) {
          //   this.$Message.warning('请上传图片');
          //   return
          // };
          // if(!this.h5List.length) {
          //   this.$Message.warning('请上传H5');
          //   return
          // };
          const _this = this;
          let formData = new FormData($("editForm")[0]);

          for(let i in this.editForm){
            formData.append(i,this.editForm[i]);
          }
          console.log(this.imgList[0]);
          console.log(this.h5List[0]);
          
          formData.append("upLoad", this.imgList[0].raw);
          
          // formData.append("upLoad", this.h5List[0].raw);

          formData.append("banner_id",this.delbannerId);

          this.addData = this[name];
          this.loading = true;
          setTimeout(() => {
            $.ajax({
              type: "POST",
              url: `${_this.editUrl}`,
              data: formData,
              dataType: "JSON",
              cache: false, // 不缓存
              processData: false, // jQuery不要去处理发送的数据
              contentType: false
            }).success(function(res) {
                if(res === 1) {
                    _this.$Message.success('成功');
                } else {
                    _this.$Message.error('失败');
                }
            }).error(function(err) {
                console.log(err);
            });
          }, 220);
          // setTimeout(() => {
          //   this.$Message.success("Success!");
          //   this.addModal = false;
          //   this.loading = false;
          // }, 1000);
        }else{
          this.$Message.error('你能传上去个屁')
        }
      });
    },

    // 点击框取消按钮
    ModalCancel(name) {
      this.$Message.info("Clicked ok");
      this.$refs[name].resetFields();
    },
    imgFun(val) {
      return this.imgUrlFormat(val.banner_url, val.banner_name);
    },
    h5fun(val) {
      return this.imgUrlFormat(val.h5_path, val.h5_name);
    },
    // 执行table编辑的事件
    editClick(params) {
      this.editModal = true;
      this.editForm = Object.assign(this.editForm, params.row);
      this.H5fileName = params.row.h5_name;
      this.editForm.third_url = this.imgUrlFormat(params.row.h5_path,params.row.h5_name);
      const url = this.imgUrlFormat(params.row.banner_url,params.row.banner_name);
      this.editFileList = [];
      this.editFileList.push({ url, name: url });
      this.delbannerId = params.row.banner_id;
    },

    // 执行删除的事件
    delClick(params) {
      this.delDilaog = true;
      this.delbannerId = params.row.banner_id;
    },

    // 删除确定按钮
    async delConfrmClick() {
      this.delLoading = true;
      const { data } = await bannerManagementDel({banner_id:this.delbannerId});
      if(data === 1){
        this.delDilaog = false;
        this.delLoading = false;
        this.$Message.success("成功");
        this.getUser();
      }else{
        this.delDilaog = false;
        this.$Message.error("失败");
      }
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
      }

      this.loading = true;
      let { data } = await bannerManagementList(params);
      this.total = data[0].count;
      data.shift(0);
      this.userData = data;
      this.loading = false;
    }
  },
  mounted() {
    this.getUser();
    this.base = getBase().base2;
    this.actionUrl = `${this.base}/Banner_managementController/save`;
    this.editUrl = `${this.base}/Banner_managementController/updateById`;
  }
};
</script>

