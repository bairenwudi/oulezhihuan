<style scope lang="less">
@import "./applyDeal.less";
</style>
<!--批量预定订单 -->
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
    </div>

</template>

<script>
import TableM from "../../common/table/table.vue";
import {
  detailAndDeal,
  addCustomer
} from "../../api/lp-order/api.js";

export default {
  name: "applyDeal",

  components: {
    TableM
  },
  data() {

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
        room_num: ''
      },

      addForm: {
        // 定义新增表单的对象
        reserve_persion_name: "",
        reserve_persion_phone: "",
        reserve_destination: "",
        ord_status: "",
        org_name: "",
        adm_phonenum:"",
        check_time: "",
        jiday: "",
        roomCheckBox:[],
        message: [],
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
        adm_phonenum:"",
        check_time: "",
        jiday: "",
        roomCheckBox:[],
      },

      delLoading: false, // 控制删除按钮loading

      currentPageIndex: 1, // 当前页

      delArr:[],//绑定入住人 删除数组

      reserve_id: "",

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
      const { data } = await addCustomer({reserve_id:"0dde1288783e40cb86d579ca76e05676"});
      console.log(data);
      this.userData = data.content.list;
      this.total = data.content.total
      
    },
    async getList(){
      const { data } = await detailAndDeal({reserve_id:"0dde1288783e40cb86d579ca76e05676"});
      console.log(data);
      // this.userData = data.roomList;
      
    }
  },
  mounted() {
    this.getList();
    this.getUser();
    // this.destinationTitleFun();
  }
};
</script>

