<style scope lang="less">
@import "./batchReservationOrder.less";
</style>
<!--批量预定订单 -->
<template>
    <div class="formView">

        <Form ref="formInline" :model="formInline" inline>

            <FormItem prop="reserve_persion_name" label="预订人" :label-width="50">
                <Input type="text" v-model="formInline.reserve_persion_name" placeholder="请输入预订人"></Input>
            </FormItem>

            <FormItem prop="reserve_persion_phone" label="预订人手机" :label-width="75">
                <Input type="text" v-model="formInline.reserve_persion_phone" placeholder="请输入预订人手机"></Input>
            </FormItem>

             <FormItem prop="order_status" label="订单状态" :label-width="60">
               <Select v-model="formInline.order_status" clearable style="width:200px">
                 <Option v-for="(item, index) in orderStatus" :key="index" :value="item.value">{{ item.label }}</Option>
               </Select>
            </FormItem>

            <FormItem prop="reserve_destination" label="目的地" :label-width="60">
              <Select v-model="formInline.reserve_destination" clearable style="width:200px">
                <Option v-for="item in destinationTitle" :value="item.org_id" :key="item.org_id">{{ item.org_name }}</Option>
              </Select>
            </FormItem>

            <FormItem prop="check_time" label="入离时间" :label-width="60">              
            	<DatePicker type="daterange" v-model="liveTimeSearch" placeholder="请选择日期" @on-change="SearchdateChange"></DatePicker>

            </FormItem>

            <FormItem>
                <Button type="primary" @click="addClick">新增</Button>
            </FormItem>

            <FormItem>
                <Button type="primary" @click.stop="searchClick(formInline)">查询</Button>
            </FormItem>

        </Form>

        <TableM 
        :columns="columns" 
        class="Table" 
        :data="userData" 
        :loading="loading" 
        :current.async="currentPageIndex" 
        :total="total" 
        @pageChange="pageChange">
        </TableM>

        <!-- 新增提示框 -->
        <Modal v-model="addModal"
                title="新增"
                @on-ok="AddModalConfirm('addForm')"
                @on-cancel="AddModalReset('addForm')"
            >
            <Form ref="addForm" :model="addForm" :rules="ruleValidate" :label-width="100">
                <FormItem label="预订人" prop="reserve_person_name">
                    <Input v-model="addForm.reserve_person_name" :label-width="100" placeholder="请输入预订人"></Input>
                </FormItem>

                <FormItem label="预订人手机" prop="reserve_persion_phone" width='100'>
                    <Input v-model="addForm.reserve_persion_phone" placeholder="请输入预订人手机"></Input>
                </FormItem>

                <FormItem label="预定机构" prop="org_name2">
                    <!-- <Input v-model="addForm.org_name" disabled></Input> -->
                    <span>
                      {{ addForm.org_name }}
                    </span>
                </FormItem>

                <FormItem label="机构手机" prop="org_name1">
                    <!-- <Input v-model="addForm.adm_phonenum" disabled></Input> -->
                    {{ addForm.adm_phonenum }}
                </FormItem>

                <FormItem label="目的地名称" prop="reserve_destination">
                  <Select v-model="addForm.reserve_destination" clearable style="width:200px">
                    <Option v-for="item in destinationTitle" :value="item.org_id" :key="item.org_id">{{ item.org_name }}</Option>
                  </Select>
                </FormItem>

                <FormItem prop="check_time" label="入离时间">              
                  <DatePicker type="daterange" placeholder="请选择日期" v-model="liveTimeadd"  @on-change="dateChange"></DatePicker>
                </FormItem>

                <FormItem label="入住天数" prop="org_name2">
                    <Input v-model="addForm.jiday" disabled placeholder=""></Input>
                </FormItem>

                <FormItem label="选择房型" prop="interest">
                    <CheckboxGroup v-model="addForm.roomCheckBox" @on-change="roomChange">
                        <Checkbox v-for="i in roomName" :label="i.room_type_id" :value="i.room_type_id" :key="i.room_type_id">{{i.room_name}}</Checkbox>
                    </CheckboxGroup>
                </FormItem>

                <FormItem prop="check_time" v-for="(i, index) in addForm.message"
                  :key="index"
                  :prop="'message.' + index + '.room_num'"
                  :rules="{
                      required: true, message: '请输入房间数量', trigger: 'blur'
                  }"
                >
                    <div class="messageBox">
                      <span class="roomName">{{ i.room_name }}</span>
                      <span>房间数量&nbsp;</span>
                      <Input 
                        v-model="i.room_num"
                        @on-blur="showPice(i.room_num,i.default_priceB)"
                        placeholder="请输入房间数量"
                        class="inputWidth"
                      >
                      </Input>
                      <span>&nbsp;房间单价  ￥{{ i.default_priceB }}</span>
                      <span class="color">您最多可预订{{ i.room_name }} 房型 {{ i.number }} 间</span>
                    </div>
                </FormItem>

                <FormItem label="订单金额" prop="ord_amount">
                    <Input v-model="addForm.ord_amount" placeholder=""></Input>
                </FormItem>

                <FormItem label="备注" prop="comments">
                    <Input v-model="addForm.comments" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入备注"></Input>
                </FormItem>
            </Form>
                <div slot="footer" align="center">
                    <Button type="primary" @click="AddModalConfirm('addForm')" >确定</Button>
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
            <Form ref="editForm" :model="editForm" :rules="ruleValidate" :label-width="100">
                <FormItem label="预订人" prop="reserve_person_name">
                    <Input v-model="editForm.reserve_person_name"　size:default placeholder="请输入预订人"></Input>
                </FormItem>

                <FormItem label="预订人手机" prop="reserve_persion_phone" width='100'>
                    <Input v-model="editForm.reserve_persion_phone" placeholder="请输入预订人手机"></Input>
                </FormItem>

                <FormItem label="预定机构" prop="org_name">
                    <!-- <Input v-model="editForm.org_name" disabled></Input> -->
                    {{ addForm.org_name }}

                </FormItem>

                <FormItem label="机构手机" prop="org_name">
                    <!-- <Input v-model="editForm.adm_phonenum" disabled></Input> -->
                    {{ addForm.adm_phonenum }}

                </FormItem>

                <FormItem label="目的地名称" prop="reserve_destination">
                    <Select v-model="editForm.reserve_destination" clearable style="width:200px">
                        <Option v-for="item in destinationTitle" :value="item.org_id" :key="item.org_id">{{ item.org_name }}</Option>
                    </Select>
                </FormItem>

                <FormItem prop="check_time" label="入离时间"> 
                  <!-- <DatePicker type="daterange" v-model="liveTime" placeholder="请选择日期" @on-change="dateChange"></DatePicker> -->
                  <DatePicker type="daterange" placeholder="请选择日期" :value="liveTime" v-model="liveTime" @on-change="editDateChange"></DatePicker>

                  <!-- <DatePicker v-model="formInline.check_time" clearable format="yyyy-MM-dd HH:mm:ss" type="datetimerange" placeholder="请选择时间" style="width: 300px"></DatePicker> -->
                </FormItem>

                <FormItem label="入住天数" prop="org_name">
                    <Input v-model="editForm.jiday" disabled placeholder=""></Input>
                </FormItem>

                <FormItem label="选择房型" prop="interest">
                    <CheckboxGroup v-model="editForm.roomCheckBox" @on-change="roomChange">
                      <Checkbox v-for="i in roomName" :label="i.room_type_id" :value="i.room_type_id" :key="i.room_type_id">{{i.room_name}}</Checkbox>
                    </CheckboxGroup>
                </FormItem>

                <FormItem v-for="(i, index) in editForm.message"
                  :key="index"
                  :prop="'message.' + index + '.room_num'"
                  :rules="{
                      required: true, message: '请输入房间数量', trigger: 'blur'
                  }"
                >
                    <div class="messageBox">
                      <span class="roomName">{{ i.room_name }}</span>
                      <span>房间数量&nbsp;</span>
                      <Input 
                        v-model="i.room_num"
                        @on-blur="showPice"
                        placeholder="请输入房间数量"
                        class="inputWidth"
                      >
                      </Input>
                      <span>&nbsp;房间单价  ￥{{ i.default_priceB }}</span>
                      <span class="color">您最多可预订{{ i.room_name }} 房型 {{ i.number }} 间</span>
                    </div>
                </FormItem>

                <FormItem label="订单金额" prop="ord_amount">
                    <Input v-model="editForm.ord_amount" placeholder=""></Input>
                </FormItem>

                <FormItem label="备注" prop="comments">
                    <Input v-model="editForm.comments" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入备注"></Input>
                </FormItem>
            </Form>
                <div slot="footer" align="center">
                    <Button type="primary" @click="EditModalConfirm('editForm')" >确定</Button>
                    <Button @click="EditModalReset('editForm')" style="margin-left: 8px">取消</Button>
                </div>
        </Modal>

        <!--  绑定提示框 -->
        <Modal v-model="bindingModal"
					title="绑定入住人"
					@on-ok="BindingModalConfirm('bindingForm')"
					@on-cancel="BindingModalReset('bindingForm')"
					class-name="bindingModal"
				>
					<template>
    <div class="formView">
        <Form ref="formInline" :model="formInline" inline class="ClickButton">
            <FormItem>
                <Button type="primary" @click="addClickBinding">新增入住人</Button>
            </FormItem>

            <FormItem>
              <Button icon='' type="primary" @click="delClickBinding">删除</Button>
            </FormItem>

            <FormItem>
                <Button type="primary" class="excel_btn">
                  下载excel模板
                  <a class="block fr excel" :href=" base + '/Occupant_infoController/downExcel'"></a>
                </Button>
            </FormItem>

            <FormItem>
                <!-- <Button type="primary" @click="uploadClick">导入Excel</Button> -->
                <Upload :action ="actionUrl" 
                      name="upExcel" 
                      :data="reserveId"
                      :on-success="excelSuccess"
                      :on-error="excelError"
                      >
                    <Button type="ghost" icon="ios-cloud-upload-outline">导入Excel</Button>
                </Upload>


            </FormItem>
        </Form>

        <TableM 
        :columns="columns1" 
        class="Table" 
        :data="customerData" 
        ref="selection"
        :loading="loading"
        @selectChange="tableChange"
        :current.async="currentPageIndex"
        :total="customerTotal"
        @pageChange="pageChange">
        </TableM>
        <!-- 绑定-新增提示框 -->
        <Modal v-model="bindingaddModal"
                title="新增入住人"
								:width="700"
								:transfer="false"
                @on-ok="bindingAddModalConfirm('bindingAddForm')"
                @on-cancel="bindingAddModalCancel('bindingAddForm')"
                class-name="addCustomerModal"
            >
            <Form ref="bindingAddForm" :model="bindingAddForm" :rules="ruleValidate1" :label-width="90">
                <FormItem label="姓名" prop="name">
                    <Input v-model="bindingAddForm.name" placeholder="请输入姓名"></Input>
                </FormItem>

                <FormItem label="身份证号码" prop="identity_card_number">
                    <Input v-model="bindingAddForm.identity_card_number" placeholder="请输入身份证号码"></Input>
                </FormItem>

                <FormItem label="证件类型" prop="certificate_type">
                    <Input v-model="bindingAddForm.certificate_type" disabled></Input>
                </FormItem>

                <FormItem label="联系电话" prop="contact_number">
                    <Input v-model="bindingAddForm.contact_number" placeholder="请输入联系电话"></Input>
                </FormItem>

            </Form>
                <div slot="footer" align="center">
                    <Button type="primary" @click="bindingAddModalConfirm('bindingAddForm')" :loading="loading">确定</Button>
                    <Button @click="bindingAddModalCancel('bindingAddForm')" style="margin-left: 8px">取消</Button>
                </div>
        </Modal>

     <!--  绑定-编辑提示框 -->
        <Modal v-model="bindingeditModal"
                title="编辑"
								:transfer="false"
                @on-ok="bindingEditModalConfirm('bindingEditForm')"
                @on-cancel="bindingEditModalCancel('bindingEditForm')"
            >
            <Form ref="bindingEditForm" :model="bindingEditForm" :rules="ruleValidate1" :label-width="90">
                <FormItem label="姓名" prop="name">
                    <Input v-model="bindingEditForm.name" placeholder="请输入姓名"></Input>
                </FormItem>

                <FormItem label="身份证号码" prop="identity_card_number">
                    <Input v-model="bindingEditForm.identity_card_number" placeholder="请输入身份证号码"></Input>
                </FormItem>

                <FormItem label="证件类型" prop="certificate_type">
                    <Input v-model="bindingEditForm.certificate_type" placeholder="请输入证件类型" disabled></Input>
                </FormItem>

                <FormItem label="联系电话" prop="contact_number">
                    <Input v-model="bindingEditForm.contact_number" placeholder="请输入联系电话"></Input>
                </FormItem>

            </Form>
                <div slot="footer" align="center">
                    <Button type="primary" @click="bindingEditModalConfirm('bindingEditForm')" :loading="loading">确定</Button>
                    <Button @click="bindingEditModalCancel('bindingEditForm')" style="margin-left: 8px">取消</Button>
                </div>
        </Modal>

        <!-- 绑定-删除提示框 -->
								
        <Modal v-model="bindingdelDilaog" :transfer="false" width="360">
          <p slot="header" style="color:#f60;text-align:center">
              <Icon type="ios-information-circle"></Icon>
              <span>提示</span>
          </p>
          <div style="text-align:center">
              <p>确定要删除吗？</p>
          </div>
          <div slot="footer">
            <Button type="error" size="large" long :loading="delLoading" @click="bindingdelConfrmClick">删除</Button>
          </div>
        </Modal>

        </div>
        <div slot="footer" align="center">
          <Button type="primary" @click="BindingModalConfirm('bindingForm')" :loading="loading">保存</Button>
          <Button @click="BindingModalReset('bindingForm')" style="margin-left: 8px">取消</Button>
        </div>
      </template>
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
  batchReservationOrderList, //批量预定订单列表
  destinationTitleList, // 批量预定订单模糊查询-目的地下拉列表渲染
  destinationCheckbox,
  addCustomer, //批量预定   点击绑定
  addOccupant, //批量预定   新增入住人
  editOccupant,
  delOccupant,
  submit, //批量预定   提交按钮
  addReserve,
  delReserve,
  editReserve, //批量审核   编辑
  roomTypeChange, //批量预定   房型checkboxChange
  roomTypeNum, //批量预定   房型checkboxChange 查询房间数量
  getEditMsgReserve //批量预定   点击编辑获取id num
} from "../../api/lp-order/api.js";
import { getBase } from "../../api/lp-order/api.js";

export default {
  name: "batchReservationOrderModel",

  components: {
    TableM
  },
  data() {
    const valiContact_number = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("联系电话不能为空"));
      } else {
        var ph = /^1[3|5|7|8|][0-9]{9}$/; //手机号正则
        if (!ph.test(value)) {
          return callback(new Error("您输入手机号码有误"));
        } else {
          callback();
        }
      }
    };

    const valiIdCard = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("身份证号码不能为空"));
      } else {
        var ph = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/; //手机号正则
        if (!ph.test(value)) {
          // this.$Message.error("您输入身份证号码有误");
          return callback(new Error("您输入身份证号码有误"));
        } else {
          callback();
        }
      }
    };
    const sss = (rule, value, callback) => {
      console.log(value);
      if (!value) {
        return callback(new Error("房间数量不能为空"));
      } else {
        callback();
      }
    };

    return {
      addModal: false,

      editModal: false,

      delDilaog: false,

      bindingModal: false,

      bindingaddModal: false,

      bindingeditModal: false,

      bindingdelDilaog: false,

      multiForm: {},

      multiRuleValidate: {
        room_num: ""
      },

      addForm: {
        // 定义新增表单的对象
        reserve_persion_name: "",
        reserve_persion_phone: "",
        reserve_destination: "",
        ord_status: "",
        org_name: "",
        ord_amount: 0,
        adm_phonenum: "",
        check_time: "",
        jiday: "",
        roomCheckBox: [],
        message: []
        // begin_time:""    default_priceB
        // end_time     room_type_id    room_num
      },

      editForm: {
        // 定义编辑表单的对象
        reserve_person_name: "",
        reserve_persion_phone: "",
        reserve_destination: "",
        ord_status: "",
        org_name: "",
        adm_phonenum: "",
        check_time: "",
        jiday: "",
        roomCheckBox: [],
        message: []
      },

      bindingAddForm: {
        name: "",
        certificate_type: "身份证",
        identity_card_number: "",
        contact_number: ""
      },

      bindingEditForm: {
        name: "",
        certificate_type: "身份证",
        identity_card_number: "",
        contact_number: "",
        bindingEditId: ""
      },

      orderStatus: [
        {
          value: 1,
          label: "待审核"
        },
        {
          value: 3,
          label: "已审核"
        },
        {
          value: 15,
          label: "预订单"
        }
      ],

      destinationTitle: [],

      mock: [],

      ruleValidate: {
        reserve_person_name: [
          { required: true, message: "请输入预订人", trigger: "blur" }
        ],

        reserve_persion_phone: [
          { validator: valiContact_number, trigger: "blur" }
        ],

        reserve_destination: [
          {
            required: true,
            type: "string",
            min: 1,
            message: "请选择目的地",
            trigger: "change"
          }
        ],

        // check_time: [
        //   { required: true, message: "请输入入离时间", trigger: "blur" }
        // ],

        // comments: [
        //   { required: true, message: "请输入备注", trigger: "blur" },
        //   {
        //     type: "string",
        //     min: 20,
        //     message: "Introduce no less than 20 words",
        //     trigger: "blur"
        //   }
        // ]
      },

      ruleValidate1: {
        // 定义表单的校验规则
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],

        identity_card_number: [
          { validator: valiIdCard, trigger: "blur" }
        ],

        contact_number: [
          { validator: valiContact_number, trigger: "blur" }
        ]
      },

      destination: [],
      postStr: "",
      delReserve_id: "",
      room_type_id: "", //用于发送 拼接的字符串room_type_id
      compareArr: [],
      length: 0,
      message: [], //用于存放  各种数据
      roomNameArr: [], //用于存放 各个房型房间名
      maxArr: [], //用于存放 各个房型最大房间剩余数
      price: "",
      totalPrice: 0, //用于 总价格计算
      liveTime: "", //入离时间
      liveTimeSearch: "",
      liveTimeadd: "",

      delLoading: false, // 控制删除按钮loading

      currentPageIndex: 1, // 当前页

      delArr: [], //绑定入住人 删除数组

      reserve_id: "",
      base: "",
      columns: [
        // 表头信息
        {
          title: "订单号",
          width: 250,
          key: "reserve_id"
        },

        {
          title: "预订人",
          width: 100,
          render: (h, { row, index }) => {
            return h(
              "span",
              {},
              row.reserve_person_name ? row.reserve_person_name : `暂无${index}`
            );
          }
        },

        {
          title: "预订人手机",
          width: 157,
          render: (h, { row, index }) => {
            return h(
              "span",
              {},
              row.reserve_persion_phone
                ? row.reserve_persion_phone
                : `暂无${index}`
            );
          }
        },

        {
          title: "预定机构",
          width: 110,
          render: (h, { row, index }) => {
            return h(
              "span",
              {},
              row.yu_org_name ? row.yu_org_name : `暂无${index}`
            );
          }
        },

        {
          title: "目的地名称",
          width: 130,

          render: (h, { row, index }) => {
            return h("span", {}, row.org_name ? row.org_name : `暂无${index}`);
          }
        },

        {
          title: "申请日期",
          width: 130,

          render: (h, { row, index }) => {
            return h("span", {}, this.formatTime(row.apply_date) || "暂无");
          }
        },

        {
          title: "入住日期",
          width: 130,

          render: (h, { row, index }) => {
            return h(
              "span",
              {},
              row.begin_time ? row.begin_time : `暂无${index}`
            );
          }
        },

        {
          title: "离开日期",
          width: 130,

          render: (h, { row, index }) => {
            return h("span", {}, row.end_time ? row.end_time : `暂无${index}`);
          }
        },

        {
          title: "订单金额",
          width: 130,

          render: (h, { row, index }) => {
            return h(
              "span",
              {},
              row.ord_amount ? `￥${row.ord_amount}` : `暂无${index}`
            );
          }
        },
        {
          title: "订单状态",
          width: 130,

          render: (h, { row, index }) => {
            return h(
              "span",
              {},
              this.SetStatusFilter(row.order_status) || "暂无"
            );
          }
        },

        {
          title: "操作",
          width: 300,
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
                    marginRight: "5px",
                    display:
                      params.row.order_status === 15 ? "inline-block" : "none"
                  },
                  on: {
                    click: () => {
                      this.bindingClick(params);
                    }
                  }
                },
                "绑定"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px",
                    display:
                      params.row.order_status === 15 ? "inline-block" : "none"
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
                    marginRight: "5px",
                    display:
                      params.row.order_status === 15 ? "inline-block" : "none"
                  },
                  on: {
                    click: () => {
                      this.submitClick(params);
                    }
                  }
                },
                "提交"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px",
                    display:
                      params.row.order_status === 15 ? "inline-block" : "none"
                  },
                  on: {
                    click: () => {
                      this.delClick(params);
                    }
                  }
                },
                "删除"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px",
                    display:
                      params.row.order_status === 15 ? "none" : "inline-block"
                  },
                  on: {
                    click: () => {
                      this.goToInfo(params);
                    }
                  }
                },
                "详情"
              )
            ]);
          }
        }
      ],

      columns1: [
        // 绑定-表头信息
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "姓名",
          width: 85,
          render: (h, { row, index }) => {
            return h("span", {}, row.name ? row.name : `暂无${index}`);
          }
        },

        {
          title: "证件类型",
          width: 120,
          render: (h, { row, index }) => {
            return h(
              "span",
              {},
              row.certificate_type ? row.certificate_type : `暂无${index}`
            );
          }
        },

        {
          title: "身份证号码",
          width: 160,
          render: (h, { row, index }) => {
            return h(
              "span",
              {},
              row.identity_card_number
                ? row.identity_card_number
                : `暂无${index}`
            );
          }
        },

        {
          title: "联系电话",
          width: 140,
          render: (h, { row, index }) => {
            return h(
              "span",
              {},
              row.contact_number ? row.contact_number : `暂无${index}`
            );
          }
        },

        {
          title: "操作",
          width: 100,
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
                      this.editClickBinding(params);
                    }
                  }
                },
                "编辑"
              )
            ]);
          }
        }
      ],
      reserveId:{},
      userData: [], // 内容数据
      customerData: [], // 内容数据
      actionUrl:"",
      total: 0, // 总页数
      customerTotal: 0,
      roomName: [], //checkbox房间名称
      roomCheckBox: [],
      formInline: {
        // 定义表单对象
        reserve_persion_name: "",
        reserve_persion_phone: "",
        ord_status: "",
        reserve_destination: "",
        org_name: "",
        check_time: ""
      },

      loading: false, // 定义loading为true

      currentPage: 1 // 定义当前页
    };
  },

  methods: {
    excelSuccess(response, file, fileList){
      console.log(response);
      console.log(file);
      console.log(fileList);
    },
        // 上传失败
    excelError(err, file, fileList) {
      console.log(err, file, fileList);
    },
    //当选择 入离日期 显示天数差
    dateChange(val) {
      console.log(this.liveTimeadd);
      console.log(val);
      
      this.liveTime = val;
      var d = new Date(val[0]);
      var D = new Date(val[1]);
      var cha = D.getTime() - d.getTime();
      if (cha) {
        this.addForm.jiday = cha / 86400000;
      } else {
        this.addForm.jiday = 0;
      }
    },
    editDateChange(val) {
      this.liveTime = val;
      var d = new Date(val[0]);
      var D = new Date(val[1]);
      var cha = D.getTime() - d.getTime();
      if (cha) {
        this.editForm.jiday = cha / 86400000;
      } else {
        this.editForm.jiday = 0;
      }
    },
    //当选择 入离日期 显示天数差
    SearchdateChange(val) {
      console.log(val);
      console.log(this.liveTimeadd);

      this.liveTime = val;
      var d = new Date(val[0]);
      var D = new Date(val[1]);
      var cha = D.getTime() - d.getTime();
      if (cha) {
        this.addForm.jiday = cha / 86400000;
      } else {
        this.addForm.jiday = 0;
      }
    },
    // 进入详情
    goToInfo(params) {
      this.$router.push({
        path: "/infoModel",
        data: params
      });
    },
    // 输入  预定的房间数量  失去焦点触发的方法
    showPice(roomNum, price) {
      console.log(this.addForm.message);
      this.price = 0;
      for (var i = 0; i < this.addForm.message.length; i++) {
        this.price +=
          (this.addForm.message[i].default_priceB - 0) *
          (this.addForm.message[i].room_num - 0);
      }
      this.totalPrice = (this.price - 0) * (this.addForm.jiday - 0);
      console.log(this.totalPrice, this.price, this.addForm.jiday);

      this.addForm.ord_amount = this.totalPrice; //??????????
      // console.log(this.addForm);

      // this.$set(this.addForm.ord_amount,this.totalPrice)
    },
    roomChange(val) {
      // 房型checkboxChange 的时候需先 判断 入住时间是否填写 和 目的地名称是否选择

      console.log(val);
      if (this.addModal === true) {
        var d = new Date(this.liveTime[0]);
        var D = new Date(this.liveTime[1]);
        var start_time = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
        var end_time = D.getFullYear() + "-" + (D.getMonth() + 1) + "-" + D.getDate();
        if (!this.addForm.reserve_destination) {
          this.$Message.error("请先选择目的地名称");
          this.addForm.roomCheckBox = [];
          return;
        }
        if (!this.liveTime[0] || !this.liveTime[1]) {
          this.$Message.error("请先选择入离时间");
          this.addForm.roomCheckBox = [];
          return;
        }
        console.log(this.addForm.roomCheckBox);

        //当选择一个房型时会用this.compareArr与val比较  如果difference是空数组  就证明是新点出来的(checkbox为true)
        //如果difference不是空数组 证明是点下去的  checkbox为false  在后边要取到它的id 然后从this.message（this.message用来存放显示信息的数组）中移除它
        let a = new Set(this.compareArr);
        let b = new Set(val);
        let difference = Array.from(new Set([...a].filter(x => !b.has(x))));
        this.compareArr = val;
        console.log(difference);
        
        // let params = {
        //   start_time,
        //   end_time,
        //   room_type_id:this.addForm.roomCheckBox[this.addForm.roomCheckBox.length - 1]
        // }
        // roomTypeChange(params).then(res => {
        //   console.log(res);
        // })

        if (this.addForm.roomCheckBox.length > this.length) {
          this.length = this.addForm.roomCheckBox.length;

          let param = {
            startTime: start_time,
            endTime: end_time,
            room_type_id: this.addForm.roomCheckBox[this.addForm.roomCheckBox.length - 1]
          };
          roomTypeNum(param).then(res => {
            console.log(res);
            // var newArr = [];
            // // res.data.data.number.push(newArr);
            // for(var i = 0;i<res.data.data.length;i++){
            //   newArr.push(res.data.data[i].number);
            // }
            // var max = Math.max(...newArr);
            // console.log(max);
            // this.maxArr.push(max);
            // this.roomNameArr.push()

            var maxNum = 0;
            var index = 0;
            for (var i = 0; i < res.data.data.length; i++) {
              if (res.data.data[i].number >= maxNum) {
                var msg = {};
                maxNum = res.data.data[i].number;
                index = i;
                msg = res.data.data[i];
                msg.room_num = "";//这个room_num是我push到显示对象中的 所填入的预定房间数 如果注释掉  会出现undefined  减0之后会NAN
              }
            }

            this.addForm.message.push(msg);
            console.log(this.addForm.message);

            var arr = [];
            for (var i = 0; i < this.addForm.message.length; i++) {
              arr.push(this.addForm.message[i].room_type_id);
            }
            this.room_type_id = arr.join();
          });
        } else {
          this.length--;
          for (var i = 0; i < this.addForm.message.length; i++) {
            if (difference[0] === this.addForm.message[i].room_type_id) {
              this.addForm.message.splice(i, 1);
            }
          }
        }

        this.price = 0;
        for (var i = 0; i < this.addForm.message.length; i++) {
          this.price += (this.addForm.message[i].default_priceB - 0) * (this.addForm.message[i].room_num - 0);
        }
        this.totalPrice = (this.price - 0) * (this.addForm.jiday - 0);
        console.log(this.totalPrice, this.price, this.addForm.jiday);

        this.addForm.ord_amount = this.totalPrice; //??????????
      } else {
        var d = new Date(this.liveTime[0]);
        var D = new Date(this.liveTime[1]);
        var start_time = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
        var end_time = D.getFullYear() + "-" + (D.getMonth() + 1) + "-" + D.getDate();
        if (!this.editForm.reserve_destination) {
          this.$Message.error("请先选择目的地名称");
          this.editForm.roomCheckBox = []; //??????
          return;
        }
        if (!this.liveTime[0] || !this.liveTime[1]) {
          this.$Message.error("请先选择入离时间");
          this.addForm.roomCheckBox = [];
          return;
        }
        let a = new Set(this.compareArr);
        let b = new Set(val);
        let difference = Array.from(new Set([...a].filter(x => !b.has(x))));
        console.log(difference);
        this.compareArr = val;
        if (this.editForm.roomCheckBox.length > this.length) {
          this.length = this.editForm.roomCheckBox.length;
          let param = {
            startTime: start_time,
            endTime: end_time,
            room_type_id: this.editForm.roomCheckBox[
              this.editForm.roomCheckBox.length - 1
            ]
          };
          roomTypeNum(param).then(res => {
            console.log(res);
            // var newArr = [];
            // // res.data.data.number.push(newArr);
            // for(var i = 0;i<res.data.data.length;i++){
            //   newArr.push(res.data.data[i].number);
            // }
            // var max = Math.max(...newArr);
            // console.log(max);
            // this.maxArr.push(max);
            // this.roomNameArr.push()

            var maxNum = 0;
            var index = 0;
            for (var i = 0; i < res.data.data.length; i++) {
              if (res.data.data[i].number >= maxNum) {
                var msg = {};
                maxNum = res.data.data[i].number;
                index = i;
                msg = res.data.data[i];
                msg.number = "";
              }
            }
            this.editForm.message.push(msg);
            console.log(this.editForm.message);
            var arr = [];
            for (var i = 0; i < this.editForm.message.length; i++) {
              arr.push(this.editForm.message[i].room_type_id);
            }
            this.room_type_id = arr.join();
            console.log(this.room_type_id);
          });
        } else {
          this.length--;
          for (var i = 0; i < this.editForm.message.length; i++) {
            if (difference[0] === this.editForm.message[i].room_type_id) {
              this.editForm.message.splice(i, 1);
            }
          }
        }
        console.log(this.editForm.message);
      }
    },
    roomChange1(val) {
      console.log(val);
    },
    // 过滤订单状态
    SetStatusFilter(status) {
      switch (status) {
        case 1:
          return "待审核";
          break;
        case 3:
          return "已审核";
          break;
        case 13:
          return "订单取消";
          break;
        case 15:
          return "预订单";
          break;
        default:
          return "";
          break;
      }
    },
    formatTime(date) {
      if (!date) {
        return "";
      }
      var date = new Date(date); //如果date为13位不需要乘1000
      var Y = date.getFullYear() + "-";
      var M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";
      var D =
        (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + " ";
      var h =
        (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":";
      var m =
        (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) +
        ":";
      var s =
        date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      return Y + M + D + h + m + s;
    },

    // 清除图片列表动作
    handleResetFile() {},

    resetTotal() {
      this.currentPage = 1;
      this.total = 1;
    },

    // 执行新增的事件
    addClick() {
      this.addModal = true;
      this.getCheckbox();
    },
    tableChange(val) {
      console.log(val);
      this.delArr = [];
      for (var i = 0; i < val.length; i++) {
        this.delArr.push(val[i].reserve_id);
      }
      console.log(this.delArr);
      this.postStr = this.delArr.join();
    },
    BindingModalConfirm() {
      this.$Message.success("绑定成功");
      this.bindingModal = false;
      // if (this.customerTotal === 0) {
      //   this.$Message.error("入住人信息为空，不可提交");
      //   return;
      // }
      // this.$Message.success("订单提交成功");
    },

    // 封装清空Form的动作
    clearFormFun(Form) {
      if (this.$refs[Form]) {
        this.$refs[Form].resetFields(); //清除diglog弹窗内数据
      }
    },

    // 点击确定按钮
    AddModalConfirm(name) {
      var roomNumArr = [];
      var roomPriceArr = [];
      console.log(this.addForm.message);

      for (var m = 0; m < this.addForm.message.length; m++) {
        roomNumArr.push(this.addForm.message[m].room_num);
        roomPriceArr.push(this.addForm.message[m].default_priceB);
      }
      var room_num = roomNumArr.join();
      var default_priceB = roomPriceArr.join();

      this.$refs[name].validate(valid => {
        if (valid) {
          console.log(this.liveTime);

          this.loading = true;
          var adm_user_id = JSON.parse(localStorage.getItem("user"))
            .adm_user_id;
          var dd = new Date(this.liveTime[0]);
          var DD = new Date(this.liveTime[1]);

          var start_time =
            dd.getFullYear() + "-" + (dd.getMonth() + 1) + "-" + dd.getDate();
          var end_time =
            DD.getFullYear() + "-" + (DD.getMonth() + 1) + "-" + DD.getDate();

          let params = {
            adm_user_id,
            reserve_person_name: this.addForm.reserve_person_name,
            reserve_persion_phone: this.addForm.reserve_persion_phone,
            reserve_destination: this.addForm.reserve_destination,
            comments: this.addForm.comments,
            begin_time: start_time,
            end_time: end_time,
            room_type_id: this.room_type_id,
            // default_priceB:this.addForm.reserve_persion_phone,
            // room_num:this.addForm.reserve_persion_phone,
            default_priceB,
            room_num
          };
          addReserve(params).then(res => {
            console.log(res);
            if (res.data.reserve_id) {
              this.$Message.success("新增成功");
              this.addModal = false;
              this.getUser();
            } else {
              this.$Message.error("新增失败");
            }
            this.clearFormFun("addForm");
          });
          this.addModal = false;
          this.loading = false;
        } else {
          this.$Message.error("Fail!");
        }
      });
    },

    // 点击新增框取消按钮
    AddModalReset(name) {
      this.handleResetFile();
      this.clearFormFun("addForm");
      this.addModal = false;
    },

    // 执行table编辑的事件
    editClick(params) {
      this.editModal = true;
      let { row } = params;
      console.log(row);
      this.delReserve_id = params.row.reserve_id;
      getEditMsgReserve({ reserve_id: this.delReserve_id }).then(res => {
        console.log(res);
        for (var i = 0; i < res.data.content.room.length; i++) {
          this.editForm.roomCheckBox.push(
            res.data.content.room[i].room_type_id
          );
          this.editForm.message = res.data.content.room;
        }
        console.log(this.editForm.roomCheckBox);
      });
      this.editForm.reserve_person_name = params.row.reserve_person_name;
      this.editForm.reserve_persion_phone = params.row.reserve_persion_phone;
      this.editForm.ord_amount = params.row.ord_amount;
      this.editForm.comments = params.row.comments;
      this.editForm.reserve_destination = params.row.reserve_destination;
      var time = [];
      time.push(params.row.begin_time);
      time.push(params.row.end_time);
      this.editDateChange(time);

      var strtime = new Date(params.row.begin_time);
      var strtime1 = new Date(params.row.end_time);
      this.liveTime = [];
      this.liveTime.push(strtime);
      this.liveTime.push(strtime1);
      this.getCheckbox();

      // let params = {
      //   startTime:params.row.begin_time,
      //   endTime:params.row.end_time,
      //   room_type_id:this.addForm.roomCheckBox[this.addForm.roomCheckBox.length - 1]
      // }
      // roomTypeNum(params).then(res => {
      //   console.log(res);

      // });
      // this.editForm.roomCheckBox = 1;

      console.log(this.liveTime);
      let param = {
        startTime: params.row.begin_time,
        endTime: params.row.end_time,
        room_type_id: this.addForm.roomCheckBox[
          this.addForm.roomCheckBox.length - 1
        ]
      };
    },
    EditModalConfirm(name) {
      
      console.log(this.editForm.message.number);
      
      var roomNumArr = [];
      var roomPriceArr = [];
      console.log(this.editForm.message);

      for (var m = 0; m < this.editForm.message.length; m++) {
        roomNumArr.push(this.editForm.message[m].room_num);
        roomPriceArr.push(this.editForm.message[m].default_priceB);
      }
      var room_num = roomNumArr.join();
      var default_priceB = roomPriceArr.join();

      this.$refs[name].validate(valid => {
        if (valid) {
          console.log(this.liveTime);

          this.loading = true;
          var adm_user_id = JSON.parse(localStorage.getItem("user"))
            .adm_user_id;
          var dd = new Date(this.liveTime[0]);
          var DD = new Date(this.liveTime[1]);

          var start_time =
            dd.getFullYear() + "-" + (dd.getMonth() + 1) + "-" + dd.getDate();
          var end_time =
            DD.getFullYear() + "-" + (DD.getMonth() + 1) + "-" + DD.getDate();

          let params = {
            adm_user_id,
            reserve_person_name: this.editForm.reserve_person_name,
            reserve_persion_phone: this.editForm.reserve_persion_phone,
            reserve_destination: this.editForm.reserve_destination,
            comments: this.editForm.comments,
            begin_time: start_time,
            end_time: end_time,
            room_type_id: this.room_type_id,
            // default_priceB:this.addForm.reserve_persion_phone,
            // room_num:this.addForm.reserve_persion_phone,
            default_priceB,
            room_num,
            reserve_id: this.delReserve_id
          };
          editReserve(params).then(res => {
            console.log(res);
            if (res.data.reserve_id) {
              this.$Message.success("编辑成功");
              this.addModal = false;
              this.getUser();
            } else {
              this.$Message.error("编辑失败");
            }
            this.clearFormFun("addForm");
          });
          this.addModal = false;
          this.loading = false;
        } else {
          this.$Message.error("Fail!");
        }
      });
    },
    // 编辑取消事件
    EditModalReset(formName) {
      this.$refs[formName].resetFields();
      this.handleResetFile();
      this.editModal = false;
    },
    //列表 提交按钮
    submitClick(row) {
      console.log(row);
      if (row) {
        var reserve_id = row.row.reserve_id;
        this.reserve_id = reserve_id;
      }
      this.loading = true;
      addCustomer({ reserve_id: this.reserve_id }).then(res => {
        this.loading = false;
        console.log(res);

        this.customerTotal = res.data.content.total;
        console.log(this.customerTotal);
        console.log(this.customerTotal);

        if (this.customerTotal === 0) {
          this.$Message.error("入住人信息为空，不可提交");
          return;
        }
        var order_status = row.row.order_status;
        submit({ reserve_id: this.reserve_id, order_status }).then(res => {
          this.loading = false;
          console.log(res);
          if (res.data.code === "success") {
            this.$Message.success("订单提交成功");
            this.getUser();
          }
        });
      });
    },
    // 执行删除的事件
    delClick(params) {
      console.log(params);
      this.delDilaog = true;
      this.delReserve_id = params.row.reserve_id;
    },

    // 删除确定按钮
    delConfrmClick() {
      this.delLoading = true;
      delReserve({ reserve_id: this.delReserve_id }).then(res => {
        console.log(res);
        if (res.data === 1) {
          this.delLoading = false;
          this.$Message.success("删除成功");
          this.delDilaog = false;
          this.getUser();
        }
      });
    },

    // 绑定-执行的事件
    bindingClick(row) {
      this.reserveId = {reserve_id:row.row.reserve_id};
      if (row) {
        var reserve_id = row.row.reserve_id;
        this.reserve_id = reserve_id;
      }
      this.loading = true;
      addCustomer({ reserve_id: this.reserve_id }).then(res => {
        this.loading = false;
        console.log(res);
        this.customerTotal = res.data.content.total;
        this.customerData = res.data.content.list;
      });
      if (this.$refs["bindingAddForm"]) {
        this.$refs["bindingAddForm"].resetFields(); //清除diglog弹窗内数据
      }
      this.bindingModal = true;
    },

    // 绑定- 点击确定按钮
    bindingModalConfirm(name) {
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

    // 绑定- 点击取消按钮
    BindingModalReset(name) {
      this.bindingModal = false;
    },

    // 绑定-执行新增的事件
    addClickBinding() {
      if (this.$refs["bindingAddForm"]) {
        this.$refs["bindingAddForm"].resetFields(); //清除diglog弹窗内数据
      }
      this.bindingaddModal = true;
    },

    // 绑定- 点击新增确定按钮
    bindingAddModalConfirm(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.loading = true;
          let params = {
            name: this.bindingAddForm.name,
            identity_card_number: this.bindingAddForm.identity_card_number,
            contact_number: this.bindingAddForm.contact_number,
            reserve_id: this.reserve_id
          };
          addOccupant(params).then(res => {
            console.log(res);
            if (res.data === 1) {
              this.$Message.success("新增成功");
              addCustomer({ reserve_id: this.reserve_id }).then(res => {
                this.customerTotal = res.data.content.total;
                this.customerData = res.data.content.list;
              });
              this.bindingaddModal = false;
              this.loading = false;
            } else {
              this.$Message.success("新增失败");
            }
          });
        } else {
          this.$Message.error("Fail!");
        }
      });
    },

    // 绑定- 点击编辑确定按钮
    bindingEditModalConfirm(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.loading = true;
          let params = {
            name: this.bindingEditForm.name,
            identity_card_number: this.bindingEditForm.identity_card_number,
            contact_number: this.bindingEditForm.contact_number,
            occu_id: this.bindingEditForm.bindingEditId
          };
          editOccupant(params).then(res => {
            console.log(res);
            if (res.data === 1) {
              this.$Message.success("编辑成功");
              this.bindingClick();
              this.bindingeditModal = false;
              this.loading = false;
            } else {
              this.$Message.success("新增失败");
            }
          });
        } else {
          this.$Message.error("Fail!");
        }
      });
    },

    // 绑定- 点击新增框取消按钮
    bindingAddModalCancel(name) {
      this.$refs[name].resetFields();
      this.handleResetFile();
      this.bindingaddModal = false;
    },

    // 绑定- 执行table编辑的事件
    editClickBinding(params) {
      this.bindingeditModal = true;
      console.log(params);
      this.bindingEditForm.name = params.row.name;
      this.bindingEditForm.bindingEditId = params.row.occu_id;
      this.bindingEditForm.identity_card_number =
        params.row.identity_card_number;
      this.bindingEditForm.contact_number = params.row.contact_number;
    },

    // 绑定- 编辑取消事件
    bindingEditModalCancel(formName) {
      this.$refs[formName].resetFields();
      this.handleResetFile();
      this.bindingeditModal = false;
    },

    // 绑定- 执行删除的事件
    delClickBinding(params) {
      this.bindingdelDilaog = true;
    },

    // 绑定- 删除确定按钮
    bindingdelConfrmClick() {
      this.delLoading = true;
      delOccupant({ occids: this.delArr }).then(res => {
        console.log(res);
        if (res.data.success === "批量删除成功") {
          this.$Message.success("删除成功");
          this.bindingdelDilaog = false;
          addCustomer({ reserve_id: this.reserve_id }).then(res => {
            this.customerTotal = res.data.content.total;
            this.customerData = res.data.content.list;
          });
        } else {
          this.$Message.success("删除失败");
        }
      });
    },

    downloadClick() {},

    uploadClick() {},

    // 获取时间
    getFormatterTime(val) {
      console.log(val);
    },

    // 改变分页触发的事件
    pageChange(pageIndex) {
      console.log(pageIndex);
      // 改变当前页
      this.currentPage = pageIndex;
      for (let i in this.formInline) {
        if (this.formInline[i] !== undefined || this.formInline[i] !== "") {
          this.getUser(this.formInline);
          return false;
        }
      }
      this.getUser();
    },
    //
    async getCheckbox() {
      var org_id = JSON.parse(localStorage.getItem("user")).org_id;
      const { data } = await destinationCheckbox();
      console.log(data);
      data.shift(0);
      this.roomName = data;
    },

    // 渲染目的地下拉列表
    async destinationTitleFun() {
      var adm_user_id = JSON.parse(localStorage.getItem("user")).adm_user_id;
      const { data } = await destinationTitleList({ adm_user_id });
      console.log(data);
      //   this.destinationTitle = Array.from(new Set(data));
      this.destinationTitle = data;
    },

    searchClick(filter) {
      this.resetTotal();
      console.log(this.liveTimeSearch);
      if (this.liveTimeSearch[0] === "" || this.liveTimeSearch[1] === "") {
        var begin_time = "";
        var end_time = "";
      } else {
        var begin_time = new Date(this.liveTimeSearch[0]);
        begin_time =
          begin_time.getFullYear() +
          "-" +
          (begin_time.getMonth() + 1) +
          "-" +
          begin_time.getDate();
        var end_time = new Date(this.liveTimeSearch[1]);
        end_time =
          end_time.getFullYear() +
          "-" +
          (end_time.getMonth() + 1) +
          "-" +
          end_time.getDate();
      }
      console.log(begin_time, end_time);

      var adm_user_id = JSON.parse(localStorage.getItem("user")).adm_user_id;
      let params = {
        pageSize: 10,
        pageNum: filter ? 1 : this.currentPage,
        adm_user_id,
        reserve_person_name: this.formInline.reserve_persion_name,
        reserve_persion_phone: this.formInline.reserve_persion_phone,
        order_status: this.formInline.order_status,
        reserve_destination: this.formInline.reserve_destination,
        begin_time,
        end_time
      };
      batchReservationOrderList(params).then(res => {
        console.log(res);
        this.userData = res.data.content.list;
        this.total = res.data.content.count;
      });
    },

    //批量预定订单列表
    // 为了解决异步问题
    async getUser(filter) {
      var adm_user_id = JSON.parse(localStorage.getItem("user")).adm_user_id;
      let params = {
        pageSize: 10,
        pageNum: filter ? 1 : this.currentPage,
        adm_user_id
      };
      let { data } = await batchReservationOrderList(params);
      console.log(data);
      this.userData = data.content.list;
      this.total = data.content.count;
      this.addForm.org_name = JSON.parse(localStorage.getItem("user")).org_name;
      console.log(this.addForm.org_name);
      this.editForm.org_name = JSON.parse(
        localStorage.getItem("user")
      ).org_name;
      this.addForm.adm_phonenum = JSON.parse(
        localStorage.getItem("user")
      ).adm_phonenum;
      this.editForm.adm_phonenum = JSON.parse(
        localStorage.getItem("user")
      ).adm_phonenum;
    }
  },
  mounted() {
    this.getUser();
    this.destinationTitleFun();
    this.base = getBase().base3;
    this.actionUrl = `${this.base}/Occupant_infoController/saveExcel`;
  }
};
</script>

