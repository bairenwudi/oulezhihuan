<style scope lang="less">
@import "./hotCity.less";
</style>

<template>
    <div class="formView">
        <Form ref="formInline" :model="formInline" inline>
            <FormItem>
                <Button type="primary" @click.stop="addClick()">新增</Button>
            </FormItem>
        </Form>

        <TableM :columns="columns" :data="userData" :loading="loading" :current.async="currentPageIndex" :total="total" @pageChange="pageChange"></TableM>
    </div>

    
</template>
<template>
  <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
        <FormItem label="Name" prop="name">
            <Input v-model="formValidate.name" placeholder="Enter your name"></Input>
        </FormItem>
        <FormItem label="E-mail" prop="mail">
            <Input v-model="formValidate.mail" placeholder="Enter your e-mail"></Input>
        </FormItem>
        <FormItem label="City" prop="city">
            <Select v-model="formValidate.city" placeholder="Select your city">
                <Option value="beijing">New York</Option>
                <Option value="shanghai">London</Option>
                <Option value="shenzhen">Sydney</Option>
            </Select>
        </FormItem>
        <FormItem label="Date">
            <Row>
                <Col span="11">
                    <FormItem prop="date">
                        <DatePicker type="date" placeholder="Select date" v-model="formValidate.date"></DatePicker>
                    </FormItem>
                </Col>
                <Col span="2" style="text-align: center">-</Col>
                <Col span="11">
                    <FormItem prop="time">
                        <TimePicker type="time" placeholder="Select time" v-model="formValidate.time"></TimePicker>
                    </FormItem>
                </Col>
            </Row>
        </FormItem>
        <FormItem label="Gender" prop="gender">
            <RadioGroup v-model="formValidate.gender">
                <Radio label="male">Male</Radio>
                <Radio label="female">Female</Radio>
            </RadioGroup>
        </FormItem>
        <FormItem label="Hobby" prop="interest">
            <CheckboxGroup v-model="formValidate.interest">
                <Checkbox label="Eat"></Checkbox>
                <Checkbox label="Sleep"></Checkbox>
                <Checkbox label="Run"></Checkbox>
                <Checkbox label="Movie"></Checkbox>
            </CheckboxGroup>
        </FormItem>
        <FormItem label="Desc" prop="desc">
            <Input v-model="formValidate.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter something..."></Input>
        </FormItem>
        <FormItem>
            <Button type="primary" @click="handleSubmit('formValidate')">Submit</Button>
            <Button @click="handleReset('formValidate')" style="margin-left: 8px">Reset</Button>
        </FormItem>
    </Form>
</template>

<script>
import TableM from "../../common/table/table.vue";
import {
  hotCityList,
  selProvince,
  selCity,
  hotCityAdd,
  hotCityEdit,
  hotCityDel
} from "../../api/zh-system/api.js";

export default {
  name: "hotCity",

  components: {
    TableM
  },

  data() {
    return {
      formValidate: {
        name: "",
        mail: "",
        city: "",
        gender: "",
        interest: [],
        date: "",
        time: "",
        desc: ""
      },
      ruleValidate: {
        name: [
          {
            required: true,
            message: "The name cannot be empty",
            trigger: "blur"
          }
        ],
        mail: [
          {
            required: true,
            message: "Mailbox cannot be empty",
            trigger: "blur"
          },
          { type: "email", message: "Incorrect email format", trigger: "blur" }
        ],
        city: [
          {
            required: true,
            message: "Please select the city",
            trigger: "change"
          }
        ],
        gender: [
          { required: true, message: "Please select gender", trigger: "change" }
        ],
        interest: [
          {
            required: true,
            type: "array",
            min: 1,
            message: "Choose at least one hobby",
            trigger: "change"
          },
          {
            type: "array",
            max: 2,
            message: "Choose two hobbies at best",
            trigger: "change"
          }
        ],
        date: [
          {
            required: true,
            type: "date",
            message: "Please select the date",
            trigger: "change"
          }
        ],
        time: [
          {
            required: true,
            type: "string",
            message: "Please select time",
            trigger: "change"
          }
        ],
        desc: [
          {
            required: true,
            message: "Please enter a personal introduction",
            trigger: "blur"
          },
          {
            type: "string",
            min: 20,
            message: "Introduce no less than 20 words",
            trigger: "blur"
          }
        ]
      },
      loading1: false,

      currentPageIndex: 1,

      columns: [
        // 表头信息
        {
          title: "省份",
          key: "p_name"
        },

        {
          title: "城市",
          key: "c_name"
        },

        {
          title: "排序",
          key: "hcm_sort"
        },

        {
          title: "创建时间",
          key: "create_date"
        },

        {
          title: "操作",
          key: "action",
          width: 150,
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
                    type: "error",
                    size: "small"
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

      formInline: {
        // 定义表单对象
        cus_account: "",
        cus_nick_name: ""
      },

      ruleInline: {
        // 定义规则对象
        cus_account: [
          { required: true, message: "请输入账号", trigger: "blur" }
        ],
        cus_nick_name: [
          { required: true, message: "请输入昵称", trigger: "blur" }
          // { type: 'string', min: 11, message: '电话最多为11位', trigger: 'blur' }
        ]
      },

      loading: false, // 定义loading为true

      currentPage: 1 // 定义当前页
    };
  },

  methods: {
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.$Message.success("Success!");
        } else {
          this.$Message.error("Fail!");
        }
      });
    },
    handleReset(name) {
      this.$refs[name].resetFields();
    },
    resetTotal() {
      this.currentPage = 1;
      this.total = 1;
    },
    //点击新增 弹出新增框
    addClick() {},
    // 执行table编辑的事件
    editClick(params) {
      console.log(params);
    },

    // 执行删除的事件
    async delClick(params) {
      console.log(params.row.hcm_id);
      this.loading = true;
      const { data } = await hotCityDel({ hcm_id: params.row.hcm_id });
      this.loading = false;

      console.log(data);
      if (data === 1) {
        this.$Message.success("删除成功");
        this.getUser();
      } else {
        this.$Message.error("删除失败");
      }
      // let res = await BannerListDelete({id: });
    },

    // 改变分页触发的事件
    pageChange(pageIndex) {
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

    // 为了解决删除不跳转页面的BUG
    ResolveDeleteBUG(data, page) {
      if (data.length <= 1) {
        page = page - 1;
      }
    },

    // 为了解决异步问题
    async getUser(filter) {
      this.ResolveDeleteBUG(this.userData, this.currentPage);
      let params = {
        pageSize: 10,
        startPos: filter ? 1 : this.currentPage
      };

      if (filter) {
        params = Object.assign(params, filter);
      }

      this.loading = true;
      let { data } = await hotCityList(params);
      this.loading = false;
      this.total = data[0].count;
      data.shift(0);
      this.userData = data;
    }
  },
  mounted() {
    this.getUser();
  }
};
</script>

