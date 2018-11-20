<style scope lang="less">
@import "./baseInformation.less";
</style>

<template>
      <Tabs type="card">
          <!-- 基地信息 -->
        <TabPane label="基地信息">
             <Form ref="baseInfoList" :model="baseInfoList" :rules="baseInfoListRule" :label-width="80" >
                <Row>
                    <Col span="6">
                        <FormItem label="机构标题" prop="org_name" inline>
                            <Select v-model="baseInfoList.org_name" placeholder="请选择">
                                <Option v-for="(item, index) in InstitutionalTitle" :value="item.org_name" :key="index">{{ item.org_name }}</Option>
                            </Select>
                        </FormItem>
                    </Col>

                    <Col span="6">
                        <FormItem label="省份" prop="province_name">
                            <Select v-model="baseInfoList.adm_province_code - 0" @on-change="provinceChange" clearable style="width:200px">
                                <Option v-for="item in ProvinceTitle" :value="item.code" :key="item.id">{{ item.name }}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                    
                    <Col span="6">
                        <FormItem label="城市" prop="city_name">
                            <Select v-model="baseInfoList.adm_city_code - 0" clearable style="width:200px">
                                <Option v-for="item in CityTitle" :value="item.code" :key="item.id">{{ item.name }}</Option>
                            </Select>
                        </FormItem>
                    </Col>

                    <Col span="4">  
                        <FormItem label="标签" prop="adm_user_type">
                            <Input v-model="baseInfoList.adm_user_type" placeholder="" disabled></Input>
                        </FormItem>
                    </Col>
                </Row>

                <Row>
                    <Col span="12"> 
                        <FormItem label="机构地址" prop="org_addr">
                            <Input v-model="baseInfoList.org_addr" placeholder="请输入机构地址"></Input>
                        </FormItem>
                    </Col>
                    <Col span="10">
                        <FormItem label="手机号码" prop="adm_phonenum">
                            <Input v-model="baseInfoList.adm_phonenum" placeholder="" disabled></Input>
                        </FormItem>
                    </Col>

                    <form :action="actionUrl" id="form1" method="post" target="posthere" enctype="multipart/form-data"></form>
                    <iframe name="posthere" height="0" width="0"></iframe>

                </Row>
                    <FormItem label="机构介绍" prop="org_introduction">
                        <vue-editor v-model="baseInfoList.org_introduction"></vue-editor>
                    </FormItem>

                    <FormItem label="机构设施" prop="org_facilities">
                        <div class="institutionalFacilities">
                            <CheckboxGroup v-model="social">
                                <Checkbox v-for="(item, index) in facilitiesList" :key="index" :label="item.facilities_name">
                                    <img src="https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=1676807226,2726748277&fm=173&app=25&f=JPEG?w=640&h=412&s=5EDDA944C6F17D9E2B37D19A0300909B" width="120" height="120">
                                    <span class="institutionalFacilities_span">{{ item.facilities_name }}</span>
                                </Checkbox>
                            </CheckboxGroup>
                            
                        </div>
                    </FormItem>

                    <FormItem label="其他设施" prop="org_other_facilities">
                        <Input v-model="baseInfoList.org_other_facilities" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入其他设施"></Input>
                    </FormItem>

                    <FormItem label="机构特色" prop="room_type_sort">
                        <vue-editor v-model="baseInfoList.org_featrue"></vue-editor>
                    </FormItem>
                    
                    <FormItem label="机构封面" prop="org_cover">
                        <el-upload
                            ref="coverUpload"
                            :action="actionUrl"
                            list-type="picture-card"
                            :file-list="defaultImageList"
                            :auto-upload="false"
                            :on-preview="handlePictureCardPreview"
                            :on-success="uploadSuccess"
                            :on-error="uploadError"
                            :on-exceed="uploadonExceed"
                            :on-change="onChangeCover"
                            :limit="1"
                        >
                            <i class="el-icon-plus"></i>
                        </el-upload>

                        <Modal :footer-hide="true" title="预览图片" v-model="visible">
                            <img :src="imgUrl" v-if="visible" style="width: 100%">
                        </Modal>
                    </FormItem>

                    <FormItem label="机构图片" prop="org_pic_name">
                        <el-upload
                            ref="imgsUpload"
                            :action="actionUrl"
                            list-type="picture-card"
                            :file-list="org_imags"
                            :auto-upload="false"
                            :on-preview="handlePictureCardPreview"
                            :on-success="uploadSuccess"
                            :on-error="uploadError"
                            :on-exceed="uploadonExceed"
                            :on-change="onChangeImgs"
                            :limit="9"
                        >
                            <i class="el-icon-plus"></i>
                        </el-upload>

                        <Modal :footer-hide="true" title="预览图片" v-model="visible">
                            <img :src="imgUrl" v-if="visible" style="width: 100%">
                        </Modal>
                    </FormItem>

                    <FormItem align="center">
                        <Button type="primary" @click="handleSubmit('baseInfoList')" :loading="loading">提交</Button>
                        <Button @click="handleReset('baseInfoList')" style="margin-left: 8px">取消</Button>
                    </FormItem>
             </Form>
         
        </TabPane>
        <!-- 房间管理 -->
        <TabPane label="房间类型">
          <div class="formView">
            <Form inline align="right">
                <FormItem>
                    <Button type="primary" icon="ios-plus-outline" @click="roomTypeAddClick">新增</Button>
                    <Icon type="md-add-circle" />
                </FormItem>

                <FormItem>
                    <Button type="error" icon="ios-trash-outline" @click="roomTypeDelClick">删除</Button>
                </FormItem>
            </Form>

        <TableM
            :columns="roomTypeColumns"
            :data="roomTypeUserData"
            :loading="loading"
            :current.async="roomTypeCurrentPageIndex"
            :total="roomTypeTotal"
            @pageChange="roomTypePageChange"
        >
        </TableM>
        <!-- 房间管理新增提示框 -->
        <Modal v-model="roomTypeAddModal"
                title="添加房型"
                :mask-closable="false"
                @on-ok="ModalConfirm('roomTypeAddForm')"
                @on-cancel="ModalCancel('roomTypeAddForm')"
            >
            <Form ref="roomTypeAddForm" :model="roomTypeAddForm" :rules="roomTypeRule" :label-width="80">
            
                <FormItem label="房型分类" prop="reserve_destination">
                    <Select v-model="roomTypeAddForm.reserve_destination" placeholder="请选择">
                        <Option value="标准间">标准间</Option>
                        <Option value="大庄房">大庄房</Option>
                    </Select>
                </FormItem>

                <FormItem label="房型名称" prop="room_name">
                    <Input v-model="roomTypeAddForm.room_name" placeholder="请输入名称"></Input>
                </FormItem>

                <FormItem label="排序" prop="room_type_sort">
                    <Input v-model="roomTypeAddForm.room_type_sort" placeholder="请输入排序"></Input>
                </FormItem>

            </Form>
                <div slot="footer" align="center">
                    <Button type="primary" @click="ModalConfirm('roomTypeForm')" :loading="loading">保存</Button>
                    <Button @click="ModalCancel('roomTypeForm')" style="margin-left: 8px">取消</Button>
                </div>
        </Modal>

        <!--  房间管理编辑提示框 -->
        <Modal v-model="roomTypeEditModal"
                title="编辑房型"
                :mask-closable="false"
                @on-ok="ModalConfirm('roomTypeEditForm')"
                @on-cancel="ModalCancel('roomTypeEditForm')"
            >
            <Form ref="roomTypeEditForm" :model="roomTypeEditForm" :rules="roomTypeRule" :label-width="80">
            
                <FormItem label="房型分类" prop="reserve_destination">
                    <Select v-model="roomTypeEditForm.reserve_destination" placeholder="请选择">
                        <Option value="标准间">标准间</Option>
                        <Option value="大庄房">大庄房</Option>
                    </Select>
                </FormItem>

                <FormItem label="房型名称" prop="room_name">
                    <Input v-model="roomTypeEditForm.room_name" placeholder="请输入名称"></Input>
                </FormItem>

                <FormItem label="排序" prop="room_type_sort">
                    <Input v-model="roomTypeEditForm.room_type_sort" placeholder="请输入排序"></Input>
                </FormItem>

            </Form>
                <div slot="footer" align="center">
                    <Button type="primary" @click="ModalConfirm('roomTypeEditForm')" :loading="loading">保存</Button>
                    <Button @click="ModalCancel('roomTypeEditForm')" style="margin-left: 8px">取消</Button>
                </div>
        </Modal>

        <!-- 删除提示框 -->
        <Modal v-model="delPromptDilaog" width="360">
            <p slot="header" style="color:#f60;text-align:center">
                <Icon type="ios-information-circle"></Icon>
                <span>提示</span>
            </p>
            <div style="text-align:center">
                <p>确定要删除吗？</p>
            </div>
            <div slot="footer">
                <Button type="error" size="large" long :loading="loading" @click="delConfrmClick">删除</Button>
            </div>
        </Modal>

    </div>

    </TabPane>

    <TabPane label="区域管理">标签三的内容</TabPane>

    <TabPane label="价格设置">标签二的内容</TabPane>

    <TabPane label="默认价格">
        <!-- <TableM :columns="columns1" :data="userData" :loading="loading" :current.async="currentPageIndex" :total="total" @pageChange="pageChange"></TableM> -->
    </TabPane>

</Tabs>
 
</Row>
</template>

<script>
import tinymce from "tinymce";
import TableM from "@/common/table/table.vue";
import { VueEditor } from "vue2-editor";

// 引入api接口
import {
  baseInformationList,
  selectOrgByObj,
  InstitutionalTitleList,
  ProvinceTitleList,
  CityTitleList,
  selectFacilitiesByArray,
  updateById,
  getBase
} from "@/api/lp-organizational/api.js";

export default {
  name: "baseInformation",

  components: {
    TableM,
    VueEditor
  },

  data() {
    return {
      social: [], // 多选框机构设施

      baseInfoList: {}, // 基地信息

      baseInfoListRule: {}, // 基地详情规则

      roomTypeAddForm: {}, // 房间类型新增表单

      roomTypeEditForm: {}, // 房间类型编辑表单

      roomTypeRule: {}, // 房间类型规则

      roomTypeEditModal: false, // 房间类型编辑modal

      roomTypeAddModal: false, // 房间类型新增modal

      loading: false, // 控制执行的loading

      InstitutionalTitle: [], // 机构标题

      ProvinceTitle: [],

      CityTitle: [],

      defaultImageList: [], // 默认图片列表

      roomTypeColumns: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "房型分类",
          key: "ord_id"
        },

        {
          title: "房型名称",
          key: "ord_id"
        },

        {
          title: "排序",
          key: "ord_id"
        },

        {
          title: "操作",
          align: "center",
          render: (h, { row, index }) => {
            return h(
              "Button",
              {
                props: {
                  type: "primary",
                  icon: "edit"
                }
              },
              "编辑"
            );
          }
        }
      ], // 房间类型表头

      visible: false, // 控制放大图片的显示

      roomTypeUserData: [{}], // 房间类型数据

      roomTypeCurrentPageIndex: 1, // 房间类型分页(当前第几页)

      roomTypeTotal: 0, // 房间类型分页(总页数)

      delPromptDilaog: false, // 删除提示dialog

      facilitiesList: [], // 机构设施列表

      base: [],

      org_imags: [], // 机构图片

      actionUrl: "", // 提交表单的地址

      baseInfoFormData: {}, // 上传需要冲入额外的参数

      ImgsfileList: [], // 9涨图片列表

      CoverfileList: [] // 封面列表
    };
  },

  methods: {
    /**
     * @param 基地信息
     */

    // 处理盘符
    handleDrive(base, facilities_pic_url, facilities_pic_name) {
      return util.handleDrive(base, facilities_pic_url, facilities_pic_name);
    },

    // 初始化多个富文本传值
    init() {
      this.base = getBase().base2;
      console.log(this.base);
      this.actionUrl = `${this.base}/organ/updateById`;
    },


    //省下拉框 选择触发
    provinceChange(p_code) {
      console.log(p_code);
      this.CityTitle = [];
      this.baseInfoList.adm_city_code = "";
      this.CityTitleListFun(p_code);
    },

    typeFilter(type) {
      switch (type) {
        case 1:
          return "基地";
          break;
        case 2:
          return "个人";
          break;
        case 3:
          return "旅行社";
          break;
        default:
          return "";
          break;
      }
    },

    // 获取基地设置列表
    async selectOrgByObjFun() {
      let local = JSON.parse(localStorage.user);
      let params = {
        org_id: local.org_id
      };
      const { data } = await selectOrgByObj(params);
      this.baseInfoList = data;

      let org_imags = JSON.parse(this.baseInfoList.org_imags);

      this.org_imags = [];
      for (let i of org_imags) {
        this.org_imags.push({ url: i.images });
      }

      this.defaultImageList = [{ url: this.baseInfoList.cover }];
      // 根据获取基地信息的机构设施字段来获取机构设施图片集合
      let params2 = {
        org_facilities: this.InstitutionalTitle.org_facilities
      };
      console.log(this.baseInfoList.org_facilities);
      const res = await selectFacilitiesByArray({
        org_facilities: this.baseInfoList.org_facilities
      });
      console.log(res);
      this.facilitiesList = res.data;
      console.log(this.facilitiesList);
    },

    // 渲染机构标题下拉列表
    async InstitutionalTitleListFun() {
      const { data } = await InstitutionalTitleList();
      data.shift(0);
      this.InstitutionalTitle = data;
    },

    // 渲染省份下拉列表
    async ProvinceTitleListFun() {
      const { data } = await ProvinceTitleList();
      this.ProvinceTitle = data;
    },

    // 渲染城市下拉列表
    async CityTitleListFun(p_code) {
      const { data } = await CityTitleList({ p_code });
      this.CityTitle = data;
    },

    // 当图片数量超出规定的数量的钩子函数
    uploadonExceed() {
      this.$Message.warning("超出图片最大限制");
    },

    // 机构设置保存按钮
    handleSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const _this = this;
          let formData = new FormData($("form1")[0]);

          for (let i in this.baseInfoList) {
            formData.append(i, this.baseInfoList[i]);
          }

          let social = [];
          for (let i of this.social) {
            social.push(
              this.facilitiesList.find(item => item.facilities_name === i)
            );
          }

          formData.append("org_facilities", social); // 多选过滤掉其他 覆盖之前的属性

          if (this.CoverfileList.length >= 1) {
            formData.append("file", this.CoverfileList[0].raw);
          }

          if (this.ImgsfileList.length >= 1) {
            for (let i of this.ImgsfileList) {
              if (i.raw) {
                formData.append("files_s", i.raw);
              }
            }
          }

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
                if(res.code === 'success') {
                    _this.$Message.success('成功');
                } else {
                    _this.$Message.error('失败');
                }
            }).error(function(err) {
                console.log(err);
            });
          }, 200);

        }
      });
    },

    // 上传成功
    uploadSuccess(response, file, fileList) {
      console.log(response, file, fileList);
      // this.getUser();
    },

    // 上传时将图片赋到img上
    handlePictureCardPreview(file) {
      this.imgUrl = file.url;
      this.visible = true;
    },

    // 图片上传之前的钩子
    onChangeImgs(file, fileList) {
      this.ImgsfileList = fileList;
      console.log(fileList);
    },

    onChangeCover(file, fileList) {
      this.CoverfileList = fileList;
      console.log(fileList);
    },

    // 上传失败
    uploadError(err, file, fileList) {
      console.log(err, file, fileList);
      this.$Message.error("上传失败");
    },

    /**
     * @param 房间类型
     */

    // 添加
    roomTypeAddClick() {},

    // 删除
    roomTypeDelClick() {},

    // 改变分页事件
    roomTypePageChange(val) {
      console.log(val);
    },

    // 删除确定
    delConfrmClick() {}
  },

  created() {
    this.InstitutionalTitleListFun();
    this.ProvinceTitleListFun();
    this.CityTitleListFun();
  },

  mounted() {
    this.init();
    this.selectOrgByObjFun();
  }
};
</script>
