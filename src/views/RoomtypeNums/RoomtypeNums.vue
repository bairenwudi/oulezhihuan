<style scoped lang="less">
  @import "./RoomtypeNums.less";
</style>
<!-- 房型可预订数 -->
<template>
  <div class="formView">
    <Form inline>
      <FormItem prop="room_name" label="房型名称" :label-width="60">
        <Select v-model="formInline.room_type_id" clearable style="width:200px">
          <virtual-list :size="30" :remain="5">
            <Option
              v-for="item in roomType"
              :value="item.room_type_id"
              :key="item.room_type_id"
            >{{ item.room_name }}</Option>
          </virtual-list>
        </Select>
      </FormItem>

      <FormItem prop="check_time" label="起止时间" :label-width="60">
        <DatePicker
          v-model="formInline.check_time"
          format="yyyy年MM月dd日"
          type="daterange"
          placeholder="请选择时间"
          style="width: 300px"
        ></DatePicker>
      </FormItem>

      <FormItem>
        <Button type="primary" @click.stop="searchClick(formInline)">查询</Button>
      </FormItem>

      <FormItem>
        <Button type="primary" @click="addClick">批量增加</Button>
      </FormItem>
    </Form>

      <!-- @on-row-dblclick="tableClick" -->
    <TableM
      :columns="columns"
      :data="userData"
      :loading="loading"
      :current.async="currentPageIndex"
      :total="total"
      @pageChange="pageChange"
    ></TableM>

    <!-- 新增提示框 -->
    <Modal
      v-model="addModal"
      title="新增"
      :mask-closable="false"
      @on-ok="ModalConfirm('formValidate')"
      @on-cancel="ModalCancel('formValidate')"
    >
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
        <FormItem prop="room_type" label="使用房型">
          <CheckboxGroup v-model="formValidate.room_type" @on-change="roomChange">
            <Checkbox :label="i.room_type_id" v-for="i in checkboxList" :key="i.room_type_id">{{ i.room_name }}</Checkbox>
          </CheckboxGroup>
        </FormItem>

        <FormItem prop="check_time" label="入离时间" :label-width="80">
          <DatePicker
            v-model="formValidate.check_time"
            format="yyyy年MM月dd日"
            type="daterange"
            placeholder="请选择时间"
            style="width: 300px"
          ></DatePicker>
        </FormItem>

        <FormItem prop="room_num" v-for="(i, index) in formValidate.message"
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
                placeholder="请输入房间数量"
                class="inputWidth"
              >
              </Input>
            </div>
        </FormItem>
      </Form>
      <div slot="footer" align="center">
        <Button type="primary" @click="ModalConfirm('formValidate')" :loading="loading">确定</Button>
        <Button @click="ModalCancel('formValidate')" style="margin-left: 8px">取消</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import TableM from "../../common/table/table.vue";
import {
  roomtypeNumsList, //房型可预订数列表
  roomtypeList, //房型可预订数-房间类型下拉框渲染
  roomtypeNumsAdd
} from "../../api/lp-RoomtypeNums/api.js";

// 引入优化滚动插件
import VirtualList from "vue-virtual-scroll-list";

export default {
  name: "RoomtypeNumsModel",

  components: {
    TableM,
    VirtualList
  },
  data() {
    return {
      formValidate: {
        // 定义新增表单的对象
        room_type: [],
        check_time: [],
        message: [],
      },
      ruleValidate: {
        // room_type:{
        //   required: true, message: '请选择房型', trigger: 'change'
        // },
        // check_time:{
        //   required: true, message: '请选择入离时间', trigger: 'change'
        // },
      },

      columns: [
        // 房型可预订数表头信息
        {
          title: "房型名称",
          render: (h, { row, index }) => {
            return h(
              "span",
              {},
              row.room_name ? row.room_name : `暂无`
            );
          }
        },

        {
          title: "日期",
          render: (h, { row, index }) => {
            return h(
              "span",
              {},
              row.reserver_time ? row.reserver_time : `暂无`
            );
          }
        },

        {
          title: "剩余数量",
          render: (h, { row, index, column }) => {
            return (
              <div>
              <span class="roomNumBeforeBtn" onDblclick={ this.tableClick.bind(this, { row, index, column }) }>{row.number}间</span>
                { this.edittingId === `${row.room_type_id}_${index}`? <i-input class="iptWidth" onBlur={ this.Inputblur.bind(this, { row }) } onInput={this.handleInput}></i-input>: '' }
                <i-button type="primary" onClick={ this.editInputClick.bind(this, { row, index, column }) }>{ row.editName ? row.editName : `编辑` }</i-button>
              </div>
            )
          }
        }
      ],
      //双击需要的数据对象
      dbClickMsg:{
        dbtime:"",
        dbRoom_type_id:""
      },
      message:[],
      length: 0,
      addModal: false,

      roomType: [],
      room_type_id:"",
      currentPageIndex: 1, // 当前页
      userData: [], // 内容数据
      checkboxList:[],
      total: 0, // 总页数

      formInline: {
        // 定义表单对象
        room_name: "",
        check_time: ""
      },

      loading: false, // 定义loading为true

      currentPage: 1, // 定义当前页

      i_input: '',

      edittingId: '',

      editDesc: '编辑',

      inputValue: '',

      value: '',

      tableIptNum:"",

    };
  },

  methods: {

    editInputClick({row, index, column}) {
      if(this.edittingId === `${row.room_type_id}_${index}`) {
        this.edittingId = '';
        row.editName = '编辑';
      } else {
        this.edittingId = `${row.room_type_id}_${index}`;
        row.editName = '保存';
      }
      if(row.editName === "编辑"){
        // 校验
        var numberReg = /^[+]{0,1}(\d+)$/;

        if(!numberReg.test(this.tableIptNum)){
          this.$Message.error("请输入正整数");
          return;
        }
        console.log(row);
        var time = row.reserver_time.split(" ");
        console.log(time[0]);
        this.dbClickMsg.dbtime= time[0].replace("年","-").replace("月","-").replace("日","");
        console.log(this.dbClickMsg.dbtime);
        this.dbClickMsg.dbRoom_type_id = row.room_type_id;
        var adm_user_id = JSON.parse(localStorage.getItem("user")).adm_user_id;
        
        let param = {
          numbers:this.tableIptNum,
          adm_user_id,
          start_time: this.dbClickMsg.dbtime,
          end_time: this.dbClickMsg.dbtime,
          room_type_ids: row.room_type_id
        };
        roomtypeNumsAdd(param).then(res => {
          console.log(res);
          if(res.data.data === 1){
            this.$Message.success("修改成功");
            this.getUser();
          }else{
            this.$Message.error(res.data.msg);
          }
          
        })
      }
    },

    handleInput(val) {
      this.tableIptNum = val;
      console.log(val);
    },

    dataFormat(time) {
      return this.formatTime(time);
    },
    roomChange(val){
      var d = new Date(this.formValidate.check_time[0]);
      var D = new Date(this.formValidate.check_time[1]);
      var start_time = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
      var end_time = D.getFullYear() + "-" + (D.getMonth() + 1) + "-" + D.getDate();
      if(!this.formValidate.room_type){
        this.$Message.error("请选择房型")
        this.formValidate.room_type = [];
        return;
      }
      if (!this.formValidate.check_time[0] || !this.formValidate.check_time[1]) {
        this.$Message.error("请先选择入离时间");
        this.formValidate.room_type = [];
        return;
      }
      console.log(this.formValidate.room_type);
      let a = new Set(this.compareArr);
      let b = new Set(val);
      let difference = Array.from(new Set([...a].filter(x => !b.has(x))));
      console.log(difference);
      this.compareArr = val;

      if (this.formValidate.room_type.length > this.length) {
        this.length = this.formValidate.room_type.length;
        let param = {
          startTime: start_time,
          endTime: end_time,
          room_type_id: this.formValidate.room_type[this.formValidate.room_type.length - 1]
        };
        roomtypeNumsList(param).then(res => {
          console.log(res);
          var maxNum = 0;
          var index = 0;
          for (var i = 0; i < res.data.data.length; i++) {
            if (res.data.data[i].number >= maxNum) {
              var msg = {};
              maxNum = res.data.data[i].number;
              index = i;
              msg = res.data.data[i];
              msg.room_num = "";
            }
          }

          this.formValidate.message.push(msg);
          console.log(this.formValidate.message);

          var arr = [];
          for (var i = 0; i < this.formValidate.message.length; i++) {
            arr.push(this.formValidate.message[i].room_type_id);
          }
          this.room_type_id = arr.join();
          
        })
      }else{
        this.length--;
        for (var i = 0; i < this.formValidate.message.length; i++) {
          if (difference[0] === this.formValidate.message[i].room_type_id) {
            this.formValidate.message.splice(i, 1);
          }
        }
      }
    },
    tableClick({ row, index, column }){
      console.log(row);
      var time = row.reserver_time.split(" ");
      console.log(time[0]);
      this.dbClickMsg.dbtime= time[0].replace("年","-").replace("月","-").replace("日","");
      console.log(this.dbClickMsg.dbtime);
      this.dbClickMsg.dbRoom_type_id = row.room_type_id;
      var adm_user_id = JSON.parse(localStorage.getItem("user")).adm_user_id;
      
      if(this.edittingId === `${row.room_type_id}_${index}`) {
        this.edittingId = '';
        row.editName = '编辑';
      } else {
        this.edittingId = `${row.room_type_id}_${index}`;
        row.editName = '保存';
      }
    },

    Inputblur({ row }) {
      console.log(1)
        // 校验
        var numberReg = /^[+]{0,1}(\d+)$/;
        console.log('萨达')
        if(!numberReg.test(this.tableIptNum)){
          this.$Message.error("请输入正整数");
          return;
        }
        console.log(row);
        var time = row.reserver_time.split(" ");
        console.log(time[0]);
        this.dbClickMsg.dbtime= time[0].replace("年","-").replace("月","-").replace("日","");
        console.log(this.dbClickMsg.dbtime);
        this.dbClickMsg.dbRoom_type_id = row.room_type_id;
        var adm_user_id = JSON.parse(localStorage.getItem("user")).adm_user_id;
        
        let param = {
          numbers:this.tableIptNum,
          adm_user_id,
          start_time: this.dbClickMsg.dbtime,
          end_time: this.dbClickMsg.dbtime,
          room_type_ids: row.room_type_id
        };
        roomtypeNumsAdd(param).then(res => {
          console.log(res);
          if(res.data.data === 1){
            this.$Message.success("修改成功");
            this.getUser();
          }else{
            this.$Message.error(res.data.msg);
          }
        })
        // let param = {
        //   numbers
        //   adm_user_id
        //   startTime: start_time,
        //   endTime: end_time,
        //   room_type_id: this.formValidate.room_type[this.formValidate.room_type.length - 1]
        // };
        // roomtypeNumsList(param).then(res => {
        //   console.log(res);
          
        // })
      
    },
    resetTotal() {
      this.currentPage = 1;
      this.total = 1;
    },

    // 执行新增的事件
    addClick() {
      this.addModal = true;
      this.getCheckbox();
    },
    async getCheckbox(){
      var org_id = JSON.parse(localStorage.getItem("user")).org_id;
      const { data } = await roomtypeList({org_id});
      data.shift(0);
      console.log(data);
      this.checkboxList = data;

    },
    // 点击确定按钮
    ModalConfirm(name) {
      var roomNumArr = [];
      for (var m = 0; m < this.formValidate.message.length; m++) {
        roomNumArr.push(this.formValidate.message[m].room_num);
      }
      var numbers = roomNumArr.join();

      this.$refs[name].validate(valid => {
        if (valid) {
          var adm_user_id = JSON.parse(localStorage.getItem("user")).adm_user_id;

          var dd = new Date(this.formValidate.check_time[0]);
          var DD = new Date(this.formValidate.check_time[1]);

          var start_time =
            dd.getFullYear() + "-" + (dd.getMonth() + 1) + "-" + dd.getDate();
          var end_time =
            DD.getFullYear() + "-" + (DD.getMonth() + 1) + "-" + DD.getDate();
          let params = {
            adm_user_id,
            start_time,
            end_time,
            room_type_ids: this.room_type_id,
            numbers
          }
          this.loading = true;
          roomtypeNumsAdd(params).then(res => {
            console.log(res);
            if(res.data.data === 1){
              this.$Message.success("保存成功");
              this.getUser();
              this.$refs[name].resetFields();
              this.formValidate.message = [];
              this.addModal = false;
              this.loading = false;
            }else{
              this.$Message.error(res.data.msg);
              this.loading = false;

            }
          })

        }
      });
    },

    // 点击框取消按钮
    ModalCancel(name) {
      this.$refs[name].resetFields();
      this.addModal = false;
    },

    // 改变分页触发的事件
    pageChange(pageIndex) {
      // 改变当前页
      this.currentPage = pageIndex;
      for (let i in this.formInline) {
        if (this.formInline[i] !== undefined || this.formInline[i] !== "") {
          this.getUser(this.formInline, pageIndex);
          return false;
        }
      }
      this.getUser();
    },

    // 渲染房间类型下拉列表
    async roomtypeListFun() {
      var org_id = JSON.parse(localStorage.getItem("user")).org_id;
      const { data } = await roomtypeList({ org_id });
      data.shift(0);
      this.roomType = data;
      console.log(this.roomType);
    },

    // 模糊查询
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
    },

    // 为了解决异步问题
    async getUser(filter, pageIndex = 1) {
      var org_id = JSON.parse(localStorage.getItem("user")).org_id;
      console.log(org_id);
      //start_time, end_time,
      let params = {
        pageSize: 20,
        // startPos: filter ? pageIndex : this.currentPage,
        startPos: this.currentPage,
        org_id
      };

      if (filter) {
        params = Object.assign(params, filter);

        if (filter.check_time[0] !== "") {
          params.startTime = this.dataFormat(filter.check_time[0].getTime());
          params.endTime = this.dataFormat(filter.check_time[1].getTime());
        }
        delete params.check_time
      }

      this.loading = true;
      let { data } = await roomtypeNumsList(params);
      console.log(data);
      this.total = data.count;
      this.userData = data.data;
      this.loading = false;
    },
    formatTime(date) {
      if(!date){
        return ""
      }
      var date = new Date(date); //如果date为13位不需要乘1000
      var Y = date.getFullYear() + '-';
      var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
      var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
      // var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
      // var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
      // var s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
      return Y + M + D;
    },
  },
  mounted() {
    this.getUser();
    this.roomtypeListFun();
  }
};
</script>

