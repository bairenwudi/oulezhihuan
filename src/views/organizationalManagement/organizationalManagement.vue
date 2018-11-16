<style scope lang="less">
@import "./organizationalManagement.less";
</style>
 <!-- 机构管理 -->
<template>
    <div class="formView">
        <Form ref="OrganizationManagementForm" :model="OrganizationManagementForm" inline>

            <FormItem prop="org_name" label="机构标题" :label-width="60">
               <Select v-model="OrganizationManagementForm.org_name" clearable style="width:200px">
                 <Option v-for="item in InstitutionalTitle" :value="item.org_name" :key="item.value">{{ item.org_name }}</Option>
               </Select>
            </FormItem>

            <FormItem prop="name" label="省份" :label-width="60">
               <Select v-model="OrganizationManagementForm.adm_province_code" @on-change="provinceChange" clearable style="width:200px">
                 <Option v-for="item in ProvinceTitle" :value="item.code" :key="item.id">{{ item.name }}</Option>
               </Select>
            </FormItem>

            <FormItem prop="name" label="城市" :label-width="60">
               <Select v-model="OrganizationManagementForm.adm_city_code" clearable style="width:200px">
                 <Option v-for="item in CityTitle" :value="item.code" :key="item.id">{{ item.name }}</Option>
               </Select>
            </FormItem>

            <FormItem prop="org_status" label="状态" :label-width="60">
               <Select v-model="OrganizationManagementForm.org_status" clearable style="width:200px">
                 <Option v-for="item in statusTitle" :value="item.value" :key="item.value">{{ item.label }}</Option>
               </Select>
            </FormItem>

            <FormItem prop="adm_user_type" label="标签" :label-width="60">
               <Select v-model="OrganizationManagementForm.adm_user_type" clearable style="width:200px">
                 <Option v-for="item in typeTitle" :value="item.value" :key="item.value">{{ item.label }}</Option>
               </Select>
            </FormItem>

            <FormItem>
                <Button type="primary" @click.stop="searchClick(OrganizationManagementForm)">查询</Button>
            </FormItem>

            <FormItem>
                <Button type="primary" @click.stop="delClick">删除</Button>
            </FormItem>
            
            <FormItem prop="org_status" label="更改状态" :label-width="60">
               <Select v-model="OrganizationManagementForm.org_status" clearable style="width:200px">
                 <Option v-for="item in statusTitle" :value="item.value" :key="item.value">{{ item.label }}</Option>
               </Select>
            </FormItem>

            <FormItem>
                <Button type="primary" @click.stop="handleStatusClick">确定</Button>
            </FormItem>

        </Form>

        <TableM :columns="columns" :data="data" :loading="loading" :current.async="currentPageIndex" :total="total" @pageChange="pageChange"></TableM>

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
  organizationalManagementList, //机构管理列表
  organizationalManagementDel, //机构管理删除
  InstitutionalTitleList, //机构管理-机构标题下拉框渲染 
  ProvinceTitleList, //机构管理-省份下拉列表渲染
  CityTitleList, //机构管理-城市下拉列表渲染      
} from "../../api/lp-organizational/api.js";

export default {
  name: "organizationalManagementModel",

  components: {
    TableM
  },
  data() {
    return {
      InstitutionalTitle: [],

      ProvinceTitle: [],

      CityTitle: [],

      statusTitle: [
        {
          value: "1",
          label: "已上线"
        },
        {
          value: "0",
          label: "已下线"
        },
      ],
      typeTitle: [
        {
          value: "1",
          label: "基地"
        },
        {
          value: "2",
          label: "个人"
        },
        {
          value: "3",
          label: "旅行社"
        }
      ],
      delDilaog: false, // 控制删除弹出框

      delLoading: false, // 控制删除按钮loading

      currentPageIndex: 1, // 当前页

      columns: [
        // 机构管理表头信息
        {
          type: "selection",
          width: 60,
          align: "center"
        },

        {
          title: "机构标题",
          key: "org_name"
        },

        {
          title: "省份",
          render: (h, { row, index }) => {
            return h(
              "span",
              {},
              row.province_name ? row.province_name : `暂无${index}`
            );
          }
        },

        {
          title: "城市",
          render: (h, { row, index }) => {
            return h(
              "span",
              {},
              row.city_name ? row.city_name : `暂无${index}`
            );
          }
        },

        {
          title: "手机号码",
          render: (h, { row, index }) => {
            return h(
              "span",
              {},
              row.adm_phonenum ? row.adm_phonenum : `暂无${index}`
            );
          }
        },

        {
          title: "上线时间",
          render: (h, { row, index }) => {
            return h(
              "span",
              {},
              row.org_login_time ? row.org_login_time : `暂无${index}`
            );
          }
        },

        {
          title: "状态",
          render: (h, { row, index }) => {
            return h(
              "span",
              {},
              // row.org_status ? row.org_status : `暂无${index}`
              row.org_status === "1" ? `已上线` : `已下线`
            );
          }
        },

        {
          title: "标签",
          render: (h, { row, index }) => {
            return h(
              "span",
              {},
              this.typeFilter(row.adm_user_type) || "暂无");
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
                      this.goToInfo(params);
                    }
                  }
                },
                "编辑"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "warning",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.onlineClick(params);
                    }
                  }
                },
                "上线"
              )
            ]);
          }
        }
      ],

      data: [], // 内容数据

      total: 1, // 总页数
            //       org_id,
            // startPos: page || 1, //起始页或当前页
            // pageSize: 10, //每页条数
            // org_status: org_status,
            // adm_user_type: adm_user_type,
            // adm_city_code: adm_city_code,
            // adm_province_code: adm_province_code,
            // org_name: org_name   
      OrganizationManagementForm: {
          org_name:'',
          adm_province_code:"",
          adm_city_code:"",
          org_status:"",
          adm_user_type:"",
      },

      loading: false, // 定义loading为true

      currentPage: 1 // 定义当前页
    };
  },

  methods: {
    // 类型过滤
    typeFilter(type) {
      switch(type){
        case 1:
            return '基地';
            break;
        case 2:
            return '个人';
            break;
        case 3:
            return '旅行社';
            break;
        default:
            return '';
            break;
      }
    },

    //省下拉框 选择触发
    provinceChange(p_code){
      console.log(p_code);
      
      if(p_code=== ''|| p_code === undefined){
        this.CityTitle = [];
        this.OrganizationManagementForm.adm_city_code = '';
      }else{
        this.CityTitleListFun(p_code)

      }
    },

    // 进入编辑详情
    goToEditInfo(params) {
      this.$router.push({
        path: "/infoModel",
        data: params
      });
    },

    // 初始化分页
    resetTotal() {
      this.currentPage = 1;
      this.total = 1;
    },

    // 执行table编辑的事件
    editClick(params) {
      console.log(params);
    },

    // 执行更改状态确定按钮
    handleStatusClick() {
      
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

    // 改变分页触发的事件
    pageChange(pageIndex) {
      // 改变当前页
      // this.currentPage = pageIndex;
      for (let i in this.OrganizationManagementForm) {
        if (this.OrganizationManagementForm[i] !== undefined || this.OrganizationManagementForm[i] !== "") {
          this.getUser(this.OrganizationManagementForm, pageIndex);
          return false;
        }
      }
      this.getUser();
    },

    searchClick(filter) {
      console.log(filter);
      

      this.resetTotal();
      if (filter) {
        for (let i in filter) {
          if (filter[i] === undefined || filter[i] === "") {
            delete filter[i];
          }
        }
      }
      this.getUser(filter);
      console.log(filter)
    },

    // 渲染机构标题下拉列表
    async InstitutionalTitleListFun() {
        const { data } = await InstitutionalTitleList();
        data.shift(0);
        this.InstitutionalTitle = data;
        console.log(this.InstitutionalTitle)
    },

    // 渲染省份下拉列表
    async ProvinceTitleListFun() {

        console.log(this.ProvinceTitleListFun)
        const { data } = await ProvinceTitleList();
        this.ProvinceTitle = data;
        console.log(this.ProvinceTitle)
    },

    // 渲染城市下拉列表
    async CityTitleListFun(p_code) {
        const { data } = await CityTitleList({p_code});
        this.CityTitle = data;
        console.log(this.CityTitle)
    },

    // 为了解决异步问题
    async getUser(filter, pageIndex = 1) {
      let params = {
        startPos: filter ? pageIndex : this.currentPage
      };

      if (filter) {
        params = Object.assign(params, filter);
      }

      this.loading = true;
      let { data } = await organizationalManagementList(params);
      this.total = data[0].count;
      data.shift(0);
      this.data = data;
      this.loading = false;
      console.log(data);
    }
  },
  mounted() {
    this.getUser();
    this.InstitutionalTitleListFun();
    this.ProvinceTitleListFun();
    // this.CityTitleListFun();
  }
};
</script>

