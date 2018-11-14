<style scope lang="less">
    @import "./baseInformation.less";
</style>

<template>
      <Tabs type="card">
          <!-- 基地信息 -->
        <TabPane label="基地信息">
             <Form ref="baseInfoForm" :model="baseInfoForm" :rules="baseInfoFormRule" :label-width="80" >
                <Row>
                    <Col span="6">
                        <FormItem label="机构标题" prop="org_name" inline>
                         
                            <Select v-model="baseInfoForm.org_name" placeholder="请选择" style="width:150px">
                                <Option value="乐满地">乐满地</Option>
                                <Option value="黄山">黄山</Option>
                                <Option value="山东">山东</Option>
                            </Select>
                        
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem label="省份" prop="province_name">
                        
                            <Select v-model="baseInfoForm.province_name" placeholder="请选择" style="width:150px">
                                <Option value="乐满地">乐满地</Option>
                                <Option value="黄山">黄山</Option>
                                <Option value="山东">山东</Option>
                            </Select>
                        
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem label="城市" prop="city_name">
                            <Select v-model="baseInfoForm.city_name" placeholder="请选择" style="width:150px">
                                <Option value="乐满地">乐满地</Option>
                                <Option value="黄山">黄山</Option>
                                <Option value="山东">山东</Option>
                            </Select>
                        </FormItem>
                    </Col>  
                    <Col span="4">  
                        <FormItem label="标签" prop="adm_user_type">
                            <Input v-model="formValidate.adm_user_type" placeholder="" disabled style="width:150px"></Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12"> 
                        <FormItem label="机构地址" prop="org_addr">
                            <Input v-model="baseInfoForm.org_addr" placeholder="请输入机构地址" style="width:240px"></Input>
                        </FormItem>
                    </Col>
                    <Col span="10">
                        <FormItem label="手机号码" prop="adm_phonenum">
                            <Input v-model="baseInfoForm.adm_phonenum" placeholder="" disabled style="width:150px"></Input>
                        </FormItem>
                    </Col>
                </Row>        
                        <FormItem label="机构介绍" prop="org_introduction">
                            <Card shadow >
                                <textarea class='tinymce-textarea' id="tinymceEditer"></textarea>
                            </Card>
                            <Spin fix v-if="spinShow">
                                <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
                                <div>加载组件中...</div>
                            </Spin>
                        </FormItem>

                        <FormItem label="机构设施" prop="org_facilities">
                            <div class="institutionalFacilities">
                                <img src="" width="50" height="50">
                                <img src="" width="50" height="50">
                                <img src="" width="50" height="50">
                                <img src="" width="50" height="50">
                            </div>
                        </FormItem>

                        <FormItem label="其他设施" prop="org_other_facilities">
                            <Input v-model="baseInfoForm.org_other_facilities" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入其他设施"></Input>
                        </FormItem>

                        <FormItem label="机构特色" prop="room_type_sort">
                            <Card shadow>
                                <textarea class='tinymce-textarea' id="tinymceEditer2"></textarea>
                            </Card>
                            <Spin fix v-if="spinShow">
                                <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
                                <div>加载组件中...</div>
                            </Spin>
                        </FormItem>
                        
                        <FormItem label="机构封面" prop="org_cover">
                            <!-- <el-upload
                                ref="addUpload"
                                :action="actionUrl"
                                :data="addData"
                                list-type="picture-card"
                                :auto-upload="false"
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
                            </Modal> -->
                            <div class="AgencyImage_div">
                                <img src="http://pic.58pic.com/58pic/13/62/74/01G58PICgrV_1024.jpg" alt="" width="120" height="120">

                                <img src="http://pic.58pic.com/58pic/13/62/74/01G58PICgrV_1024.jpg" alt="" width="120" height="120">

                                <img src="http://pic.58pic.com/58pic/13/62/74/01G58PICgrV_1024.jpg" alt="" width="120" height="120">
                            </div>
                        </FormItem>

                        <FormItem label="机构图片" prop="org_pic_name">
                            <div class="AgencyImage_div">
                                <img src="http://pic.58pic.com/58pic/13/62/74/01G58PICgrV_1024.jpg" alt="" width="120" height="120">

                                <img src="http://pic.58pic.com/58pic/13/62/74/01G58PICgrV_1024.jpg" alt="" width="120" height="120">

                                <img src="http://pic.58pic.com/58pic/13/62/74/01G58PICgrV_1024.jpg" alt="" width="120" height="120">
                            </div>
                        </FormItem>

                        <FormItem>
                            <Button type="primary" @click="handleSubmit('baseInfoForm')">提交</Button>
                            <Button @click="handleReset('baseInfoForm')" style="margin-left: 8px">取消</Button>
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
import TableM from "@/common/table/table.vue"
export default {
  name: "baseInformation",
  
  components: {
    TableM
  },

  data() {
    return {
        formValidate: {}, 

        baseInfoForm: {}, // 基地详情表单

        spinShow: true,   // 富文本是否显示

        baseInfoFormRule: {},    // 基地详情规则

        roomTypeAddForm: {}, // 房间类型新增表单

        roomTypeEditForm: {}, // 房间类型编辑表单

        roomTypeRule: {},  // 房间类型规则

        roomTypeEditModal: false,  // 房间类型编辑modal

        roomTypeAddModal: false, // 房间类型新增modal

        loading: false,  // 控制执行的loading

        roomTypeColumns: [
            {
                type: 'selection',
                width: 60,
                align: 'center'
            },
            {
                title: "房型分类",
                key: "ord_id",
            },

            {
                title: "房型名称",
                key: "ord_id",
            },

            {
                title: "排序",
                key: "ord_id",
            },

            {
                title: "操作",
                align: 'center',
                render: (h, {row, index}) => {
                    return h('Button', {
                        props: {
                            type: 'primary',
                            icon: 'edit'
                        },
                    }, '编辑')
                }
            },
        ],  // 房间类型表头
        
        roomTypeUserData: [{}], // 房间类型数据
        
        roomTypeCurrentPageIndex: 1,  // 房间类型分页(当前第几页) 
        
        roomTypeTotal: 0,  // 房间类型分页(总页数)

        delPromptDilaog: false,  // 删除提示dialog
    };
  },

  methods: {
      /**
       * @param 基地信息
       */
    // 初始化editer富文本
    InitEditerDom($id) {
      this.$nextTick(() => {
        let vm = this;
        let height = document.body.offsetHeight - 300;
        tinymce.init({
          selector: $id,
          branding: false,
          elementpath: false,
          height: height,
          language: "zh_CN.GB2312",
          menubar: "edit insert view format table tools",
          plugins: [
            "advlist autolink lists link image charmap print preview hr anchor pagebreak imagetools",
            "searchreplace visualblocks visualchars code fullpage",
            "insertdatetime media nonbreaking save table contextmenu directionality",
            "emoticons paste textcolor colorpicker textpattern imagetools codesample"
          ],
          toolbar1:
            "newnote print preview | undo redo | insert | styleselect | forecolor backcolor bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image emoticons media codesample",
          autosave_interval: "20s",
          image_advtab: true,
          table_default_styles: {
            width: "100%",
            borderCollapse: "collapse"
          },
          setup: function(editor) {
            editor.on("init", function(e) {
              vm.spinShow = false;
            //   if (localStorage.editorContent) {
            //     tinymce.get($id).setContent(localStorage.editorContent);
            //   }
            });
            editor.on("keydown", function(e) {
                setTimeout(() => {
                    localStorage.editorContent = e.currentTarget.innerText
                }, 200)
            });
          }
        });
      });
    },

    // 初始化多个富文本传值
    init() {
      this.InitEditerDom("#tinymceEditer");
      this.InitEditerDom("#tinymceEditer2");
    },

    /**
     * @param 房间类型
     */

    // 添加
    roomTypeAddClick() {

    },
    
    // 删除
    roomTypeDelClick() {

    },

    // 改变分页事件
    roomTypePageChange(val) {
        console.log(val);
    },

    // 删除确定
    delConfrmClick() {

    }
  },

  mounted() {
    this.init();
  }
};
</script>
