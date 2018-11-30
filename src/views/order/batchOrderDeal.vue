<style scope lang="less">
@import "./batchOrderDeal.less";
</style>
<!--处理后 -->
<template>
    <div class="formView">
    <h2>入住人信息：</h2>

        <TableM 
        :columns="columns" 
        class="Table" 
        :data="userData" 
        :loading="loading" 
        :current.async="currentPageIndex" 
        :total="total" 
        @pageChange="pageChange">
        </TableM>
        <Row>


      <Card class="TD-card" ref="appOrderInfoForm" :model="appOrderInfoForm">

          <div class="TD-view">
              <dd>预订人</dd>
              <dt>{{appOrderInfoForm.reserve_person_name}}</dt>
          </div>

          <div class="TD-view">
              <dd>预定人手机</dd>
              <dt>{{appOrderInfoForm.reserve_persion_phone}}</dt>
          </div>

          <div class="TD-view">
              <dd>预定机构</dd>
              <dt>{{appOrderInfoForm.org_name}}</dt>
          </div>

          <div class="TD-view">
              <dd>机构手机</dd>
              <dt>{{appOrderInfoForm.adm_phonenum}}</dt>
          </div>
          <div class="TD-view">
              <dd>目的地名称</dd>
              <dt>{{appOrderInfoForm.reserve_destination}}</dt>
          </div>
          <div class="TD-view">
              <dd>入住日期</dd>
              <dt>{{ formatTime(appOrderInfoForm.begin_time) }}</dt>
          </div>

          <div class="TD-view">
              <dd>离开日期</dd>
              <dt>{{ formatTime(appOrderInfoForm.end_time) }}</dt>
          </div>
          <div class="TD-view">
              <dd>预定天数</dd>
              <dt>{{ jiday }}</dt>
          </div>


          <div class="TD-view">
              <dd>房型名称</dd>
              <dt>
                <div v-for="(i,index) in message" :key="index">
                <span class="roomName">{{ i.room_name }}</span>房间数量<span class="roomNum">{{ i.room_num }}</span>房间单价<span class="roomPrice">￥{{ i.room_price }}</span>
                </div>
              </dt>
          </div>



          <div class="TD-view">
              <dd>订单金额</dd>
              <dt>{{appOrderInfoForm.sum}}</dt>
          </div>
          <div class="TD-view">
              <dd>备注</dd>
              <dt>{{appOrderInfoForm.comments}}</dt>
          </div>


      </Card>
    </Row>
    </div>

    

</template>

<script>
import TableM from "../../common/table/table.vue";
import {
  detailAndDeal,
  addCustomer,
} from "../../api/lp-order/api.js";

export default {
  name: "batchOrderDeal",

  components: {
    TableM
  },
  data() {

    return {
       multiForm: {},

      multiRuleValidate: {
        room_num: ''
      },
      yesOrNot:"apple",
      currentPageIndex: 1, // 当前页
      yesOrNot1:false,
      delArr:[],//绑定入住人 删除数组
      reason:"",
      reserve_id: "",
      jiday:"",
      columns: [
        // 表头信息
        {
          title: "姓名",
          key: "name"
        },

        {
          title: "证件类型",
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
          render: (h, { row, index }) => {
            return h("span", {}, row.contact_number ? row.contact_number : `暂无${index}`);
          }
        },

      ],
      canBindingOrNot: "", //看入住人能否 点提交  如果数据中是
      userData: [], // 内容数据
      customerData: [], // 内容数据
      message:[],
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
      appOrderInfoForm:{
        adm_phonenum:"",
        begin_time:"",
        comments:"",
        end_time:"",
        ord_status:"",
        org_name:"",
        reserve_destination:"",
        reserve_persion_phone:"",
        reserve_person_name:"",
      },

      loading: false, // 定义loading为true

      currentPage: 1 // 定义当前页
    };
  },

  methods: {
    radioChange(){
      this.yesOrNot1 = !this.yesOrNot1;
    },
    pageChange(pageIndex) {
      console.log(pageIndex);
      // 改变当前页
      // this.currentPage = pageIndex;
      // for (let i in this.formInline) {
      //   if (this.formInline[i] !== undefined || this.formInline[i] !== "") {
      //     this.getUser(this.formInline);
      //     return false;
      //   }
      // }
      this.getUser();
    },
    async getUser(){
      const { data } = await addCustomer({reserve_id:JSON.parse(this.$route.query.data)});
      console.log(data);
      this.userData = data.content.list;
      this.total = data.content.total
    },
    async getList(){
      const { data } = await detailAndDeal({reserve_id:JSON.parse(this.$route.query.data)});
      console.log(data);
      this.appOrderInfoForm = data.info;
      this.message = data.info.roomList;
      var dayCha = data.info.end_time - data.info.begin_time;
      this.jiday = dayCha/1000/24/60/60;
    },
    formatTime(date) {
      if(!date){
        return ""
      }
      var date = new Date(date); //如果date为13位不需要乘1000
      var Y = date.getFullYear() + '-';
      var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
      var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
      return Y + M + D;
    },
    
  },
  mounted() {
    this.getList();
    this.getUser();
    // this.destinationTitleFun();
  }
};
</script>

