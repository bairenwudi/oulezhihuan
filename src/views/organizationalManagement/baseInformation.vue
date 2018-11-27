<style scope lang="less">
@import "./baseInformation.less";
</style>

<template>
      <Tabs type="card" :value="defaultName">
          <!-- 基地信息 -->
        <TabPane label="基地信息" name="base">
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
                            <Select v-model="baseInfoList.adm_province_code" @on-change="provinceChange" clearable style="width:200px">
                                <Option v-for="item in ProvinceTitle" :value="item.code" :key="item.id">{{ item.name }}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                    
                    <Col span="6">
                        <FormItem label="城市" prop="city_name">
                            <Select v-model="baseInfoList.adm_city_code" clearable style="width:200px">
                                <Option v-for="item in CityTitle" :value="item.code" :label="item.name" :key="item.id"></Option>
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

                    <FormItem label="机构设施" prop="org_facilities" id="org_facilities">
                        <div class="institutionalFacilities">
                            <CheckboxGroup v-model="social">
                                <Checkbox v-for="(item, index) in allFacilitiesList" :key="index" :label="item.facilities_name">
                                    <img :src="item.imgUrl" width="80" height="80">
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
                            :on-remove="onRemove"
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
        <TabPane label="房间类型" name="roomType">
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
            :current.async="CurrentPageIndex"
            :total="roomTypeTotal"
            @pageChange="roomTypePageChange"
            @selectChange="selectChange"
        >
        </TableM>
        <!-- 房间管理新增提示框 -->
        <Modal v-model="roomTypeAddModal"
                title="添加房型"
                :mask-closable="false"
                @on-ok="ModalConfirm('roomTypeAddForm', 0)"
                @on-cancel="ModalCancel('roomTypeAddForm', 0)"
            >
            <Form ref="roomTypeAddForm" :model="roomTypeAddForm" :rules="roomTypeRule" :label-width="80">
                <FormItem label="房型分类" prop="room_type">
                    <Select v-model="roomTypeAddForm.room_type" placeholder="请选择">
                        <Option value="标准间">标准间</Option>
                        <Option value="大床房">大床房</Option>
                        <Option value="单人间">单人间</Option>
                        <Option value="套房">套房</Option>
                    </Select>
                </FormItem>

                <FormItem label="房型名称" prop="room_name">
                    <Input v-model="roomTypeAddForm.room_name" placeholder="请输入名称"></Input>
                </FormItem>

                <FormItem label="排序" prop="room_type_sort">
                    <Input type="text" v-model.number="roomTypeAddForm.room_type_sort" placeholder="请输入排序"></Input>
                </FormItem>

            </Form>
                <div slot="footer" align="center">
                    <Button type="primary" @click="ModalConfirm('roomTypeAddForm', 0)" :loading="loading">保存</Button>
                    <Button @click="ModalCancel('roomTypeAddForm', 0)" style="margin-left: 8px">取消</Button>
                </div>
        </Modal>

        <!--  房间管理编辑提示框 -->
        <Modal v-model="roomTypeEditModal"
                title="编辑房型"
                :mask-closable="false"
                @on-ok="ModalConfirm('roomTypeEditForm', 1)"
                @on-cancel="ModalCancel('roomTypeEditForm', 1)"
            >
            <Form ref="roomTypeEditForm" :model="roomTypeEditForm" :rules="roomTypeRule" :label-width="80">
            
                <FormItem label="房型分类" prop="room_type">
                    <Select v-model="roomTypeEditForm.room_type" placeholder="请选择">
                        <Option value="标准间">标准间</Option>
                        <Option value="大床房">大床房</Option>
                        <Option value="单人间">单人间</Option>
                        <Option value="套房">套房</Option>
                    </Select>
                </FormItem>

                <FormItem label="房型名称" prop="room_name">
                    <Input v-model="roomTypeEditForm.room_name" placeholder="请输入名称"></Input>
                </FormItem>

                <FormItem label="排序" prop="room_type_sort">
                    <Input v-model.number="roomTypeEditForm.room_type_sort" placeholder="请输入排序"></Input>
                </FormItem>

            </Form>
                <div slot="footer" align="center">
                    <Button type="primary" @click="ModalConfirm('roomTypeEditForm', 1)" :loading="loading">保存</Button>
                    <Button @click="ModalCancel('roomTypeEditForm', 1)" style="margin-left: 8px">取消</Button>
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

    <TabPane label="区域管理" name="area" id="RegionalManagement">
        <Row>
            <Col span="6">
                <Card>
                    <div slot="title">
                        <span>区域</span>
                        <span class="sparator"></span>
                        <Button type="info" icon="android-checkbox-outline" @click="editOrgNameClick('area')">编辑</Button>
                    </div>

                    <div class="filter">
                        <Input type="text" v-model.trim="areaText" placeholder="区域名称" style="margin-bottom: 20px;"></Input>
                        <Button type="primary"  @click="addAreaClick">添加</Button>
                        <Button type="warning" icon="edit" @click="batchOperationClick(1, 'area')">批量操作</Button>
                    </div>

                    <div class="content">
                        <RadioGroup v-model="area_radio" @on-change="areaRadioChange" vertical>
                            <Radio v-for="(item, index) in AreaList" :label="item.zone_name" :value="item.zone_id" :key="index"></Radio>
                        </RadioGroup>
                    </div>
                </Card>
            </Col>

            <Col span="6">
                <Card>
                    <div slot="title">
                        <span>楼栋</span>
                        <span class="sparator">
                            <Button type="primary" icon="android-checkbox-outline" @click="slectAllBuildingClick">查询全部</Button>
                        </span>
                        <Button type="info" icon="android-checkbox-outline" @click="editOrgNameClick('building')">编辑</Button>
                    </div>

                    <div class="filter">
                        <Input type="text" v-model.trim="buildingText" placeholder="楼栋名称" style="margin-bottom: 20px;"></Input>
                        <Button type="primary" @click="addBuildingTextClick">添加</Button>
                        <Button type="warning" icon="edit" @click="batchOperationClick(0, 'building')">批量操作</Button>
                    </div>

                    <div class="content">
                        <RadioGroup v-model="building_radio" @on-change="buildRadioChange" vertical>
                            <Radio v-for="(item, index) in buildingList" :label="item.building_name" :value="item.building_id" :key="index"></Radio>
                        </RadioGroup>
                    </div>
                </Card>
            </Col>

            <Col span="6" offset="0.5">
                <Card>
                    <div slot="title">
                        <span>楼层</span>
                        <span class="sparator"></span>
                        <Button type="info" icon="android-checkbox-outline" @click="editOrgNameClick('floor')">编辑</Button>
                    </div>

                    <div class="filter">
                        <Input type="text" v-model.trim="floorText" placeholder="楼层名称" style="margin-bottom: 20px;"></Input>
                        <Button type="primary"  @click="addFloorClick">添加</Button>
                        <Button type="warning" icon="edit" @click="batchOperationClick(0, 'floor')">批量操作</Button>
                    </div>

                    <div class="content">
                        <RadioGroup v-model="floor_radio" @on-change="floorRadioChange" vertical>
                            <Radio v-for="(item, index) in floorList" :label="item.floor_name" :value="item.floor_id" :key="index"></Radio>
                        </RadioGroup>
                    </div>
                </Card>
            </Col>

            <Col span="6">
                <Card>
                    <div slot="title">
                        <span>房间</span>
                        <span class="sparator"></span>
                        <Button type="info" icon="android-checkbox-outline" @click="editOrgNameClick('room')">编辑</Button>
                    </div>

                    <div class="filter">
                        <Button type="primary"  @click="addRoomClick">添加</Button>
                        <Button type="warning" icon="edit" @click="batchOperationClick(0, 'room')">批量操作</Button>
                    </div>

                    <div class="content">
                        <RadioGroup v-model="room_radio" vertical>
                            <Radio v-for="(item, index) in roomList" :label="item.room_number" :value="item.room_id" :key="index"></Radio>
                        </RadioGroup>
                    </div>
                </Card>
            </Col>
        </Row>

        <!-- 批量操作 -->
        <Modal 
            v-model="batchOperationDialog"
            :mask-closable="false"
            width="360"
        >
            <p slot="header">
                批量操作
            </p>

            <div id="ivu-checkbox-view">
                <CheckboxGroup v-model="batchOperationChecked" v-if="option === 'building'">
                    <Checkbox v-for="(item, index) in RadioList" :label="item.building_name" :value="item.building_id" :key="index"></Checkbox>
                </CheckboxGroup>

                <CheckboxGroup v-model="batchOperationChecked" v-if="option === 'floor'">
                    <Checkbox v-for="(item, index) in RadioList" :label="item.floor_name" :value="item.floor_id" :key="index"></Checkbox>
                </CheckboxGroup>

                <CheckboxGroup v-model="batchOperationChecked" v-if="option === 'room'">
                    <Checkbox v-for="(item, index) in RadioList" :label="item.room_number" :value="item.room_id" :key="index"></Checkbox>
                </CheckboxGroup>
            </div>

            <div class="Btn-set">
                <Button type="primary" icon="edit" @click="batchOperationEditClick">编辑</Button>
                <Button type="error" icon="ios-trash-outline" @click="batchOperationDelClick">删除</Button>
            </div>

            <div class="Btn-set" v-if="editShow">
                <Select v-model="moveAreaRadio" v-if="option === 'building'" style="width:200px">
                    <Option v-for="(item, index) in slectionList" :label="item.zone_name" :value="item.zone_id" :key="index"></Option>
                </Select>

                <Select v-model="moveAreaRadio" v-if="option === 'floor'" style="width:200px">
                    <Option v-for="(item, index) in slectionList" :label="item.building_name" :value="item.building_id" :key="index"></Option>
                </Select>

                <Select v-model="moveAreaRadio" v-if="option === 'room'" style="width:200px">
                    <Option v-for="(item, index) in slectionList" :label="item.floor_name" :value="item.floor_id" :key="index"></Option>
                </Select>

                <div class="sparator-div"></div>

                <Button @click="batchOperationCencelClick">取消</Button>
                <Button type="primary" :loading="loading" @click="batchOperationSaveClick">确定</Button>
            </div>

            <div slot="footer"></div>
        </Modal>

         <!-- 批量操作(区域) -->
        <Modal 
            v-model="batchOperationAreaDialog"
            :mask-closable="false"
            width="360"
        >
            <p slot="header">
                批量操作
            </p>

            <div id="ivu-checkbox-view">
                <CheckboxGroup v-model="batchOperationChecked" v-if="option === 'area'">
                    <Checkbox v-for="(item, index) in AreaList" :label="item.zone_name" :value="item.zone_id" :key="index"></Checkbox>
                </CheckboxGroup>
            </div>

            <div class="Btn-set">
                <Button type="error" icon="ios-trash-outline" @click="batchOperationDelClick">删除</Button>
            </div>

            <div slot="footer"></div>
        </Modal>

        <!--批量删除弹出框  -->
        <Modal v-model="delDilaog" width="360">
            <p slot="header" style="color:#f60;text-align:center">
                <Icon type="ios-information-circle"></Icon>
                <span>提示</span>
            </p>
            <div style="text-align:center">
                <p>确定要删除吗？</p>
            </div>
            <div slot="footer">
                <Button type="error" size="large" long :loading="delLoading" @click="batchOperationDelConfrmClick">删除</Button>
            </div>
        </Modal>

        <!-- 区域管理 -》 房间新增提示框 -->
        <Modal v-model="roomAddModal"
                title="添加房间"
                :mask-closable="false"
                @on-ok="addRoomModalClick('roomAddForm', 0)"
                @on-cancel="addRoomModalCancelClick('roomAddForm', 0)"
            >
            <Form ref="roomAddForm" :model="roomAddForm" :rules="roomTypeRule" :label-width="90">
                <FormItem label="楼层：">
                    {{ building_radio }}
                    {{ floor_radio }}
                </FormItem>

                <FormItem label="房型名称：" prop="room_id">
                    <Select v-model="roomAddForm.room_id" placeholder="请选择">
                        <Option v-for="(item, index) in roomTypeList" :key="index" :value="item.room_type_id" :label="item.room_name"></Option>
                    </Select>
                </FormItem>
    
                <FormItem label="房号：" prop="room_number">
                    <Input v-model="roomAddForm.room_number" placeholder="请输入名称"></Input>
                </FormItem>

                <FormItem label="房间朝向：" prop="room_orientation">
                    <Input v-model="roomAddForm.room_orientation" placeholder="请输入名称"></Input>
                </FormItem>

                <FormItem label="电话分机：" prop="room_telphone">
                    <Input type="text" v-model.number="roomAddForm.room_telphone" placeholder="请输入排序"></Input>
                </FormItem>

                <FormItem label="房间特色：" prop="room_characteristics">
                    <Input type="textarea" v-model.number="roomAddForm.room_characteristics" :autosize="{minRows: 2, maxRows: 5}" placeholder="请输入房间特色"></Input>
                </FormItem>

                <FormItem label="房间概况：" prop="room_details">
                    <Input type="textarea" v-model.number="roomAddForm.room_details" :autosize="{minRows: 2, maxRows: 5}" placeholder="请输入房间概况"></Input>
                </FormItem>

                <FormItem label="房间图片：" prop="">
                    <el-upload
                            ref="imgsUpload"
                            :action="addRoomUrl"
                            list-type="picture-card"
                            :auto-upload="false"
                            :on-preview="handlePictureCardPreview"
                            :on-success="uploadSuccess"
                            :on-error="uploadError"
                            :on-remove="onRemove"
                            :on-exceed="uploadonExceed"
                            :on-change="onChangeRoomImgs"
                            :limit="1"
                        >
                        <i class="el-icon-plus"></i>
                    </el-upload>

                    <Modal :footer-hide="true" title="预览图片" v-model="visible">
                        <img :src="imgUrl" v-if="visible" style="width: 100%">
                    </Modal>
                </FormItem>

            </Form>
                <div slot="footer" align="center">
                    <Button type="primary" @click="addRoomModalClick('roomAddForm', 0)" :loading="loading">保存</Button>
                    <Button @click="addRoomModalCancelClick('roomAddForm', 0)" style="margin-left: 8px">取消</Button>
                </div>
        </Modal>
    </TabPane>

    <TabPane label="价格设置"  name="priceSet">
        <div class="split-set">
            <div class="dropdown-parent">
                <p class="current-price">当前房价：</p>
                <div class="dropdown-auto">
                    <ul>
                        <li v-for="(item, index) in currentRoomPrice" :key="index">
                            <span class="sparator-span">{{ index }}</span>
                            <span>￥{{ item }}</span>
                        </li>
                    </ul>
                </div>
            </div>

            <div class="table-parent">
                <div class="set-div">
                    <span>价格方案</span>
                    <Button type="primary" class="" @click="addPricePlanClick">新增方案</Button>
                </div>

                <TableM
                    :columns="pricePlanColumns"
                    :data="pricePlanList"
                    :loading="loading"
                    :current.async="CurrentPageIndex"
                    :total="pricePricePlan"
                    @pageChange="pricePlanPageChange"
                    @selectChange="selectChange"
                >
                </TableM>
            </div>
        </div>


        <!-- 新增价格方案 => modal -->
        <Modal v-model="addPricePlanModal"
                title="添加价格方案"
                :mask-closable="false"
                @on-ok="addPricePlanConfirmClick('addPricePlanForm')"
                @on-cancel="addPricePlanCancelClick('addPricePlanForm')"
            >
            <Form ref="addPricePlanForm" :model="addPricePlanForm" :rules="addPricePlanRule" :label-width="90">
                <FormItem label="方案名称：" prop="project_name">
                    <Input v-model="addPricePlanForm.project_name" placeholder="请输入名称"></Input>
                </FormItem>

                <FormItem label="使用房型：" prop="room_type_ids">
                    <CheckboxGroup @on-change="pricePlanChange" v-model="addPricePlanForm.room_type_ids">
                        <Checkbox v-for="(item, index) in notPageRoomType" :key="index" :value="item.room_type" :label="item.room_type_id">{{ item.room_type }}</Checkbox>
                    </CheckboxGroup>
                </FormItem>

                <FormItem label="日期范围：" prop="PlanDate">
                    <DatePicker 
                        v-model="addPricePlanForm.PlanDate"
                        clearable
                        format="yyyy-MM-dd"
                        type="datetimerange"
                        @on-change="PlanDateChange"
                        placeholder="请选择时间"
                        style="width: 300px"
                    >
                    </DatePicker>
                </FormItem>

                <FormItem label="价格明细：">
                    
                </FormItem>

                <FormItem 
                    id="addPricePlan"
                    v-for="(item, index) in addPricePlanForm.checkedPricePlan"
                    :prop="`checkedPricePlan.${index}.room_prices`"
                    :key="index"
                    :rules="[
                        { required: true, message: '不能为空', trigger: 'blur' }
                    ]"
                    :label-width="0"
                    style="margin-left: -70px;"
                >
                    <Col span="16">
                        <Button type="error" shape="circle" icon="ios-trash-outline" @click="delOneRowClick(index)"></Button>
                        <span class="sparator-span-sm">{{ item.room_type }}</span>
                        <Tag>默认房价</Tag>
                        <span class="sparator-span-sm">￥{{ item.default_priceB || '0'}}</span>
                        <Tag>变更房价</Tag>
                    </Col>
                    <Col span="7">
                        <Input v-model="item.room_prices" placeholder="请输入变更房价"></Input>
                    </Col>
                </FormItem>

            </Form>
                <div slot="footer" align="center">
                    <Button type="primary" @click="addPricePlanConfirmClick('addPricePlanForm')" :loading="loading">保存</Button>
                    <Button @click="addPricePlanCancelClick('addPricePlanForm')" style="margin-left: 8px">取消</Button>
                </div>
        </Modal>
    </TabPane>

    <TabPane label="默认价格" name="defaultPrice">
        <TableM
            :columns="roomTypeColumns"
            :data="roomTypeUserData"
            :loading="loading"
            :current.async="CurrentPageIndex"
            :total="roomTypeTotal"
            @pageChange="pricePlanPageChange"
            @selectChange="selectChange"
        >
        </TableM>
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
  selectRoomType,
  saveRoomType,
  updateByIdRoomType,
  roomtypeDel,
  selectFacilities,
  selectZone,
  saveZone,
  updateByIdArea,
  deleteByIds,
  updateByIds,
  selectBuildings,
  selectAllFloors,
  buildingSave,
  deleteByIdsBuilding,
  updateBuildingName,
  floorSave,
  updateByIdsFloor,
  deleteByIdsFloor,
  saveRoom,
  selectRoomTypeSel,
  selectRooms,
  deleteByIdsRoom,
  updateFloorName,
  updateRoomName,
  updateByIdsRoom,
  selectNowRoomPrice,
  saveRoomPrice,
  showRoomPriceList,
  addPricePlanSave,
  getBase,
} from "@/api/lp-organizational/api.js";

export default {
  name: "baseInformation",

  components: {
    TableM,
    VueEditor
  },

  data() {
    const sortValid = (rule, value, callback) => {
        if (value === '' || value === undefined) {
            return callback(new Error('内容不能为空'));
        }
        if (!Number.isInteger(value)) {
            callback(new Error('请填写数字'));
        } else {
            if(value <= 0) {
                callback(new Error('序号必须大于0'));
            } else {
                callback();
            }
        }
    };

    const DateValid = (rule, value, callback) => {
        if(!value) {
            return callback(new Error('时间不能为空'));
        } else if(value[1] === '') {
            return callback(new Error('时间不能为空'));
        } else {
            callback();
        }
    };

    const roomTypeIdsValid = (rule, value, callback) => {
        if(this.addPricePlanForm.room_type_ids.length <= 0) {
            return callback(new Error('请选择一个房型'));
        } else {
            callback();
        }
    }

    return {

        AreaList: [],           // 区域列表radio

        moveAreaRadio: '',      // 移动区域的radio

        defaultName: 'priceSet',     // 默认显示哪个标签页

        allFacilitiesList: [],  // 获取全部的基地设施

        social: [], // 多选框机构设施

        baseInfoList: {}, // 基地信息

        baseInfoListRule: {}, // 基地详情规则

        roomTypeAddForm: {}, // 房间类型新增表单

        roomTypeEditForm: {}, // 房间类型编辑表单

        roomTypeRule: {
            room_type: 
            [
                { required: true, message: '内容不能为空', trigger: 'change' }
            ],

            room_name: [
                { required: true, message: '内容不能为空', trigger: 'blur' }
            ],

            room_type_sort: [
                { validator: sortValid, trigger: 'blur' }
            ]
        }, // 房间类型规则

        addPricePlanRule: {       // 添加房间表单
            PlanDate: [
                { validator: DateValid, trigger: "change" }
            ],
            project_name: [
                { required: true, message: '请填写内容', trigger: 'blur' }
            ],
            room_type_ids: [
                { validator: roomTypeIdsValid, trigger: 'change' }
            ]
        },

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
                key: "room_type"
            },

            {
                title: "房型名称",
                key: "room_name"
            },

            {
                title: "排序",
                render: (h, { row, index }) => {
                return h(
                    "span", {
                    }, row.room_type_sort || '暂无' );
                }
            }
        ],

        visible: false, // 控制放大图片的显示

        roomTypeUserData: [{}], // 房间类型数据

        CurrentPageIndex: 1, // 房间类型分页(当前第几页)

        roomTypeTotal: 0, // 房间类型分页(总页数)

        delPromptDilaog: false, // 删除提示dialog

        base: [],

        org_imags: [], // 机构图片

        actionUrl: "", // 提交表单的地址

        baseInfoFormData: {}, // 上传需要冲入额外的参数

        ImgsfileList: [], // 9涨图片列表

        CoverfileList: [], // 封面列表

        roomTypePage: 0,    // 房间类型当前页数

        roomTypeAddModal: false,  // 控制房间类型新增显示

        roomTypeEditModal: false,  // 控制房间类型编辑显示

        selectRow: [],   // 多选框对象

        validationImgsList: [],   // 记录多张图片操作状态

        RadioList: [],   // 区域的radio列表

        area_radio: '',  // 区域单选框1

        building_radio: '',   // 楼栋单选框2

        floor_radio: '',    // 楼层单选框3

        room_radio: '',    // 房间单选框4

        areaText: '',    // 区域新增字段

        areaDeepName: '',  // 克隆编辑区域名称(编辑)

        dirty: false,   // 脏检查   

        batchOperationDialog: false,  // 批量操作dialog

        editShow: false,   // 控制显示编辑出现slection框

        delLoading: false,  // 删除弹出框

        delDilaog: false,    // 控制批量删除显示

        batchOperationChecked: [],  // 已经选择的区域集合

        buildingList: [],  // 楼栋列表

        batchOperationAreaDialog: false,  // 区域的单独dialog

        selected: '',  // 已经选择的下拉框

        option: '',    // 点击批量操作当前的list

        slectionList: [], // 下拉框list

        buildingText: '',    //  楼栋新增字段

        floorText: '',  // 楼层新增字段

        roomText: '',   // 房间新增字段
        
        floorList: [],   // 楼层列表

        roomList: [],  // 房间列表

        roomAddForm: {},   // 房间新增表单

        roomTypeRule: {     // 房间新增表单

            room_id: [
                { required: true, message: '请选择完整', trigger: 'change' }
            ],

            room_number: [
                { required: true, message: '请填写完整', trigger: 'blur' }
            ],

            room_orientation: [
                { required: true, message: '请填写完整', trigger: 'blur' }
            ],

            room_telphone: [
                { required: true, message: '请填写完整', trigger: 'blur' }
            ],

            room_characteristics: [
                { required: true, message: '请填写完整', trigger: 'blur' }
            ],

            room_details: [
                { required: true, message: '请填写完整', trigger: 'blur' }
            ]
        },

        roomAddModal: false,   // 房间新增dialog

        addRoomUrl: '',       // 定义添加房间接口的地址

        roomImgsfileList: [],      // 定义添加房间中图片的数组

        roomTypeList: [],    // 定义楼层下拉列表

        currentRoomPrice: [],   // 定义当前价格

        currentPricekeys: [],     // 存储当前价格的key

        pricePricePage: 0,     // 价格方案当前页

        pricePricePlan: 0,      // 价格方案总页数
        
        pricePlanList: [],     // 价格方案列表

        pricePlanColumns: [
            {
                title: '价格方案名称',
                key: 'project_name'
            }
        ],   // 价格设置表头

        notPageRoomType: [],    // 不带分页的房间类型

        addPricePlanForm: {
            project_name: '',
            check_time: [],
            room_type_ids: [],
            checkedPricePlan: [],
        },   // 新增价格方案新增表单

        addPricePlanModal: false,   // 新增价格方案dialog

             // 装载已经选择的使用房型
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

    // 在渲染完之前 获取数据
    initCreated() {
        this.InstitutionalTitleListFun();
        this.selectAllFacilitiesFun();
        this.ProvinceTitleListFun();
        this.CityTitleListFun();
        this.selectZoneFun();
        this.slectCurrentPrice();
        this.selectPricePlanFun();
    },

    // 在渲染完之后 初始化多个富文本传值
    initMounted() {
        this.base = getBase().base2;
        console.log(this.base);
        this.actionUrl = `${this.base}/organ/updateById`;
        this.addRoomUrl = `${this.base}/Zh_room_infoController/save`;
        this.selectRoomTypeFun();
        this.selectOrgByObjFun();
        this.selectBuildingsFun();
    },

    //省下拉框 选择触发
    provinceChange(p_code) {
      console.log(p_code);
      this.CityTitle = [];
      this.baseInfoList.adm_province_code = p_code;
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

    // 获取全部的基地设施
    async selectAllFacilitiesFun() {
        const { data } = await selectFacilities();
        data.shift(0);
        this.allFacilitiesList = data;
    },

    // 获取基地设置列表
    async selectOrgByObjFun() {
        let local = JSON.parse(localStorage.user);
        let params = {
            org_id: local.org_id
        };
        const { data } = await selectOrgByObj(params);
        this.baseInfoList = data;
        this.baseInfoList.adm_city_code = this.baseInfoList.adm_city_code - 0;
        this.baseInfoList.adm_province_code = this.baseInfoList.adm_province_code - 0;

        let org_imags = JSON.parse(this.baseInfoList.org_imags);

        this.org_imags = [];
        for (let i of org_imags) {
            this.org_imags.push({ url: i.images });
        }

        this.defaultImageList = [{ url: this.baseInfoList.cover }];
        // 根据获取基地信息的机构设施字段来获取机构设施图片集合
        this.social = [];

        if(this.baseInfoList.org_facilities === '') {
            return
        };
        
        let org_facilities = this.baseInfoList.org_facilities.split(',');

        for(let i of org_facilities) {
            this.social.push(
                this.allFacilitiesList.find(item => item.facilities_id === i).facilities_name
            )
        }
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
            if(i !== 'org_facilities') {
                formData.append(i, this.baseInfoList[i]);
            }
          }

          let social = [];
          for (let i of this.social) {
            social.push( 
              this.allFacilitiesList.find(item => item.facilities_name === i).facilities_id
            )
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

    // 删除图片
    onRemove(file, fileList) {
        //
    },

    // 图片上传之前的钩子
    onChangeImgs(file, fileList) {
        this.ImgsfileList = fileList;
        let org_imags = JSON.parse(this.baseInfoList.org_imags);
        // 如果后进行操作的大于默认图片列表
        //   if(this.ImgsfileList.length > org_imags.length) {
        //     // validationImgsList

        //   } else {

        //   }
    },

    // 房间上传图片

    onChangeRoomImgs(file, fileList) {
        this.roomImgsfileList = fileList[0].raw;
    },

    // 图片
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

    // 多选触发的事件
    selectChange(row) {
        this.selectRow = row;
    },
    
    // 获取房间类型
    selectRoomTypeFun() {
        let params = {
            startPos: this.roomTypePage,
            org_id: JSON.parse(localStorage.user).org_id
        };
        selectRoomType(params).then(res => {
            this.roomTypeTotal = res.data[0].count;
            res.data.shift(0);
            this.roomTypeUserData = res.data;
        })
    },

    // 获取房间类型(没有分页)
    getNotPageRoomTypeFun() {
        let params = {
            org_id: JSON.parse(localStorage.user).org_id
        };
        selectRoomType(params).then(res => {
            res.data.shift(0);
            this.notPageRoomType = res.data;
            console.log(this.notPageRoomType);
        })
    },

    // 点击新增按钮
    roomTypeAddClick() {
        this.roomTypeAddModal = true;
    },

    // 点击编辑按钮
    roomTypeEditClick(row) {
        this.roomTypeEditModal = true;
        this.roomTypeEditForm = Object.assign(this.roomTypeEditForm, row);
        this.roomTypeEditForm.room_type = row.room_type;
    },

    // 新增和编辑保存按钮
    ModalConfirm(formName, type) {
        this.$refs[formName].validate((valid) => {
            if(valid) {
                // 0 为新增 1 为编辑
                if(type === 0) {
                    let params = {
                        org_id: JSON.parse(localStorage.user).org_id
                    };
                    params = Object.assign(params, this[formName]);
                    saveRoomType(params).then(res => {
                        console.log(res);
                        if(res.data === 1) {
                            this.$Message.success('成功');
                            this.roomTypeAddModal = false;
                            this.selectRoomTypeFun();
                        } else {
                            this.$Message.error('失败');
                        }
                    });
                } else {
                    let params = {
                        org_id: JSON.parse(localStorage.user).org_id
                    };
                    params = Object.assign(params, this[formName]);
                    updateByIdRoomType(params).then(res => {
                        console.log(res);
                        if(res.data === 1) {
                            this.$Message.success('成功');
                            this.roomTypeEditModal = false;
                            this.selectRoomTypeFun();
                        } else {
                            this.$Message.error('失败');
                        }
                    });
                }
            }
        })
    },

    // 新增和编辑取消按钮
    ModalCancel(formName, type) {
        this.$nextTick(() => {
            // 0 为新增 1 为编辑
            if(type === 0) {
                this.roomTypeAddModal = false;
                this.$refs.roomTypeAddForm.resetFields();
            } else {
                this.roomTypeEditModal = false;
                this.$refs.roomTypeEditForm.resetFields();
            }
        });
    },

    // 删除
    roomTypeDelClick() {
        if(this.selectRow.length <= 0) {
            this.$Message.warning('请选择房间');
            return
        }
        this.delPromptDilaog = true;
    },

    // 删除确定
    delConfrmClick() {
        let arr = [];
        for(let i of this.selectRow) {
            arr.push(i.room_type_id);
        };
        let params = {
            room_type_id: arr
        };
        this.loading = true;
        roomtypeDel(params).then(res => {
            if(res.data === -1) {
                this.$Message.warning('重要信息不能删除');
            } else {
                this.$Message.success('成功');
                this.selectRoomTypeFun();
            }
            this.loading = false;
            this.delPromptDilaog = false;
        })
    },

    // 改变分页事件
    roomTypePageChange(val) {
        this.roomTypePage = val;
        this.selectRoomTypeFun();
    },


    /**
     * 
     * @param { area } 区域管理
     * 
     */

    // 获取区域
    async selectZoneFun() {
      const { data } = await selectZone({ org_id: JSON.parse(localStorage.user).org_id });
      this.AreaList = data;
    },

    // 点击添加
    addAreaClick() {
        if(this.areaText === '') {
            this.$Message.warning('请您填写区域名称');
        } else {
            let params = {
                org_id: JSON.parse(localStorage.user).org_id,
                zone_name: this.areaText
            };
            saveZone(params).then(res => {
                console.log(res);
                if(res.data.code === 'success') {
                    this.$Message.success('成功');
                    this.areaText = '';
                    this.selectZoneFun();
                } else {
                    this.$Message.warning('失败');
                }
            })
        }
    },

    // 编辑区域名称
    editOrgNameClick(type) {
        let radio = '';
        let message1 = '';
        let message2 = '';
        let message3 = '';
        let list = '';
        let name = '';
        let currentRow_id = '';
        if(type === 'area') {
            radio = 'area_radio';
            message1 = '请选择区域';
            message2 = '编辑区域名称：';
            message3 = '请填写区域名称';
            list = 'AreaList';
            name = 'zone_name';
            currentRow_id = 'zone_id';
        } else if (type === 'building') {
            radio = 'building_radio';
            message1 = '请选择楼栋';
            message2 = '编辑楼栋名称：';
            message3 = '请填写楼栋名称';
            list = 'buildingList';
            name = 'building_name';
            currentRow_id = 'building_id';
        } else if (type === 'floor') {
            radio = 'floor_radio';
            message1 = '请选择楼层';
            message2 = '编辑楼层名称：';
            message3 = '请填写楼层名称';
            list = 'floorList';
            name = 'floor_name';
            currentRow_id = 'floor_id';
        } else {
            radio = 'room_radio';
            message1 = '请选择房间';
            message2 = '编辑房间名称：';
            message3 = '请填写房间名称';
            list = 'roomList';
            name = 'room_number';
            currentRow_id = 'room_id';
        }

        if(this[radio] === '') {
            this.$Message.warning(message1);
            return
        }

        this.areaDeepName = this[radio];
        this.$Modal.confirm({
            loading: this.loading,
            render: (h) => {
                return h("div", [
                    h('h3', {

                    }, message2),
                    h('Input', {
                        props: {
                            value: this[radio],
                            autofocus: true,
                            placeholder: message3
                        },
                        style: {
                            marginTop: '20px'
                        },
                        on: {
                            input: (val) => {
                                this.dirty = true;
                                this.areaDeepName = val;
                            }
                        }
                    })
                ]);
            },

            onOk: () => {
                if(this.areaDeepName === '') {
                    this.$Message.warning(message3);
                    this.dirty = false;
                    return
                }

                if(this.areaDeepName === this[radio] || this.dirty === false) {
                    this.$Message.success('成功');
                    this.dirty = false;
                    return
                }

                this.loading = true;

                const row = this[list].find(item => item[name] === this[radio]);

                if(list === 'AreaList') {
                    this.editAreaNameFun(row, radio);
                } else if(list === 'buildingList') {
                    this.editBuildingNameFun(row, radio);
                } else if(list === 'floorList') {
                    this.editFloorNameFun(row, radio);
                } else {
                    this.editRoomNameFun(row, radio);
                }
            }
        })
    },

    // 编辑区域名字封装函数
    editAreaNameFun(row, radio) {
        let params = {
            org_id: JSON.parse(localStorage.user).org_id,
            zone_id: row.zone_id,
            zone_name: this.areaDeepName
        }

        updateByIdArea(params).then(res => {
            if(res.data.code === 'success') {
                this.$Message.success('成功');
                this.selectZoneFun();
                this[radio] = this.areaDeepName;
            } else {
                this.$Message.error(`${res.data.content.msg}`);
            }
            this.loading = false;
        })
    },

    // 编辑楼栋名字封装函数
    editBuildingNameFun(row, radio) {
        let params = {
            building_name: this.areaDeepName,
            building_id: row.building_id,
            org_id: row.org_id,
            zone_id: row.zone_id
        }
        updateBuildingName(params).then(res => {
            if(res.data.code === 'success') {
                this.$Message.success('成功');
                this.selectBuildingsFun();
                this[radio] = this.areaDeepName;
            } else {
                this.$Message.error(`${res.data.content.msg}`);
            }
            this.loading = false;
        })
    },

    // 编辑楼层名字封装函数
    editFloorNameFun(row, radio) {
        let params = {
            floor_name: this.areaDeepName,
            floor_id: row.floor_id,
            org_id: JSON.parse(localStorage.user).org_id,
            building_id: row.building_id
        }
        updateFloorName(params).then(res => {
            if(res.data.code === 'success') {
                this.$Message.success('成功');
                this.selectFloorFun(this.building_radio);
                this[radio] = this.areaDeepName;
            } else {
                this.$Message.error(`${res.data.content.msg}`);
            }
            this.loading = false;
        })
    },

    // 编辑房间名字封装函数
    editRoomNameFun(row, radio) {
        let params = {
            room_number: this.areaDeepName,
            room_id: row.room_id,
            floor_id: row.floor_id
        }
        updateRoomName(params).then(res => {
            if(res.data.code === 'success') {
                this.$Message.success('成功');
                this.floorRadioChange();
                this[radio] = this.areaDeepName;
            } else {
                this.$Message.error(`${res.data.content.msg}`);
            }
            this.loading = false;
        })
    },

    // 批量操作
    batchOperationClick(choose, list) {
        this.option = list;
        if(choose === 1) {
            this.batchOperationAreaDialog = true;
        } else {
            this.batchOperationDialog = true;
        }

        switch(list) {
            case 'area':
                this.selectZoneFun();
                break;
            case 'building':
                this.RadioList = this.buildingList;
                this.slectionList = this.AreaList;
                break;
            case 'floor':
                this.RadioList = this.floorList;
                this.slectionList = this.buildingList;
                break;
            case 'room':
                console.log(1);
                this.RadioList = this.roomList;
                this.slectionList = this.floorList;
                break;
            default:
                break;
        }
    },

    // 批量编辑显示
    batchOperationEditClick() {
        this.editShow = true;
    },

    // 批量编辑取消按钮
    batchOperationCencelClick() {
        this.editShow = false;
    },

    // 批量编辑保存按钮
    batchOperationSaveClick() {
        let _this = this;
        let radio = '';
        let message1 = '';
        let message2 = '';
        let message3 = '';
        let message4 = '';
        let list = '';
        let name = '';
        let currentRow_id = '';
        if(this.option === 'building') {
            message1 = '请选择区域';
            message2 = '编辑楼栋名称：';
            message3 = '请填写楼栋名称';
            message4 = '请选择楼栋';
            list = 'buildingList';
            name = 'building_name';
            currentRow_id = 'building_id';
        } else if(this.option === 'floor') {
            message1 = '请选择楼栋';
            message2 = '编辑楼栋名称：';
            message4 = '请选择楼栋';
            message3 = '请填写楼层名称';
            list = 'floorList';
            name = 'floor_name';
            currentRow_id = 'floor_id';
        } else {
            message1 = '请选择楼层';
            message2 = '编辑楼层名称：';
            message3 = '请填写楼层名称';
            message4 = '请选择房间';
            list = 'roomList';
            name = 'room_number';
            currentRow_id = 'room_id';
        }
        this.$nextTick(() => {
            if(this.moveAreaRadio === '') {
                this.$Message.warning(message1)
                return
            }

            if(this.batchOperationChecked.length <= 0) {
                this.$Message.warning(message4)
                return
            };

            let arr = [];
            for(let i of this.batchOperationChecked) {
                arr.push(this.RadioList.find(item => item[name] === i)[currentRow_id])
            }

            if(this.option === 'building') {
                this.buildingMoveFun(arr);
            } else if(this.option === 'floor') {
                this.floorMoveFun(arr);
            } else {
                this.roomMoveFun(arr);
            }

        });
    },

    // 楼栋移动封装函数
    buildingMoveFun(arr) {
        this.loading = true;
        let params = {
            zone_id: this.moveAreaRadio,
            building_ids: arr,
        }
        updateByIds(params).then(res => {
            if(res.data.code === 'success') {
                this.$Message.success('成功');
                this.batchOperationDialog = false;
                this.selectBuildingsFun();
                this.batchOperationChecked = [];
            } else {
                this.$Message.error(`${res.data.content.msg}`);
            }
            this.loading = false;
        })
    },

    // 楼层移动封装函数
    floorMoveFun(arr) {
        this.loading = true;
        let params = {
            building_id: this.moveAreaRadio,
            floor_ids: arr,
        }
        updateByIdsFloor(params).then(res => {
            if(res.data.code === 'success') {
                this.$Message.success('成功');
                this.batchOperationDialog = false;
                this.buildRadioChange(this.building_radio);
                this.batchOperationChecked = [];
            } else {
                this.$Message.error(`${res.data.content.msg}`);
            }
            this.loading = false;
        })
    },

    // 房间移动封装函数
    roomMoveFun(arr) {
        this.loading = true;
        let params = {
            floor_id: this.moveAreaRadio,
            room_ids: arr,
        }
        updateByIdsRoom(params).then(res => {
            if(res.data.code === 'success') {
                this.$Message.success('成功');
                this.batchOperationDialog = false;
                this.selectRoomsFun();
                this.batchOperationChecked = [];
            } else {
                this.$Message.error(`${res.data.content.msg}`);
            }
            this.loading = false;
        })
    },

    // 批量删除操作显示
    batchOperationDelClick() {
        if(!this.batchOperationChecked.length) {
            switch(this.option) {
                case 'area':
                    this.$Message.warning('请选择区域');
                    break;
                case 'building':
                    this.$Message.warning('请选择楼栋');
                    break;
                default: 
                    this.$Message.warning('我是其他');
                    break;
            }
            return
        }
        this.delDilaog = true;
    },

    // 批量删除确定按钮
    batchOperationDelConfrmClick() {
        this.$nextTick(() => {
            // 声明 需要 获取的属性值 (根据不同的区域)
            let name = '';
            let id = '';
            let ids = '';
            let deleteFun = '';
            let list = '';

            if(this.option === 'area') {
                name = 'zone_name';
                id = 'zone_id';
                ids = 'zone_ids';
                deleteFun = 'deleteByIds';
                list = 'AreaList';
            } else if(this.option === 'building') {
                name = 'building_name';
                id = 'building_id';
                ids = 'building_ids';
                deleteFun = 'deleteByIdsBuilding';
                list = 'RadioList';
            } else if(this.option === 'floor') {
                name = 'floor_name';
                id = 'floor_id';
                ids = 'floor_ids';
                deleteFun = 'deleteByIdsFloor';
                list = 'RadioList';
            } else {
                name = 'room_number';
                id = 'room_id';
                ids = 'room_ids';
                deleteFun = 'deleteByIdsRoom';
                list = 'RadioList';
            }

            let arr = [];

            for(let i of this.batchOperationChecked) {
                arr.push(this[list].find(item => item[name] === i)[id])
            }

            let params = {
                [ids]: arr
            }

            switch(deleteFun) {
                case 'deleteByIds':
                    this.areaDelFun(params);
                    break;
                case 'deleteByIdsBuilding':
                    this.buildingDelFun(params);
                    break;
                case 'deleteByIdsFloor':
                    this.floorDelFun(params);
                    break;
                case 'deleteByIdsRoom':
                    this.roomDelFun(params);
                    break;
                default:
                    break;
            }
        })
    },

    // 房间批量删除封装函数
    roomDelFun(params) {
        this.delLoading = true;
        deleteByIdsRoom(params).then(res => {
            console.log(res);
            if(res.data.code === 'success') {
                this.$Message.success('成功');
                this.delDilaog = false;
                this.selectRoomsFun();
                this.batchOperationChecked = [];
            } else {
                this.$Message.error(`${res.data.content.msg}`);
            }
            this.delLoading = false;
            this.batchOperationDialog = false;
        })
    },

    // 楼层批量删除封装函数
    floorDelFun(params) {
        this.delLoading = true;
        deleteByIdsFloor(params).then(res => {
            if(res.data.code === 'success') {
                this.$Message.success('成功');
                this.delDilaog = false;
                this.selectFloorFun(this.building_radio);
                this.batchOperationChecked = [];
            } else {
                this.$Message.error(`${res.data.content.msg}`);
            }
            this.delLoading = false;
            this.batchOperationDialog = false;
        })
    },

    // 楼栋批量删除封装函数
    buildingDelFun(params) {
        this.delLoading = true;
        deleteByIdsBuilding(params).then(res => {
            if(res.data.code === 'success') {
                this.$Message.success('成功');
                this.delDilaog = false;
                this.selectBuildingsFun();
                this.batchOperationChecked = [];
            } else {
                this.$Message.error(`${res.data.content.msg}`);
            }
            this.delLoading = false;
            this.batchOperationDialog = false;
        })
    },

    // 区域批量删除封装函数
    areaDelFun(params) {
        this.delLoading = true;
        deleteByIds(params).then(res => {
            if(res.data.code === 'success') {
                this.$Message.success('成功');
                this.delDilaog = false;
                this.selectZoneFun();
                this.batchOperationChecked = [];
            } else {
                this.$Message.error(`${res.data.content.msg}`);
            }
            this.delLoading = false;
            this.batchOperationAreaDialog = false;
        })
    },

    // 区域radio改变的事件
    areaRadioChange(val) {
        const zone_id = this.AreaList.find(item => item.zone_name === val).zone_id
        this.buildingList = [];
        let params = {
            zone_id
        }
        this.selectBuildingsFun(params);
    },

    // 查询楼栋
    async selectBuildingsFun(params) {
        const res = await selectBuildings(params);
        this.buildingList = res.data;
    },

    // 店家查询全部
    slectAllBuildingClick() {
        this.selectBuildingsFun();
        this.area_radio = '';
    },

    // 楼栋新增
    addBuildingTextClick() {
        if(this.buildingText === '') {
            this.$Message.warning('请您填写楼栋名称');
        } else {
            if(!this.AreaList.length) {
                this.$Modal.confirm({
                    loading: this.loading,
                    render: (h) => {
                        return h("div", [
                            h('h3', {

                            }, '确定要添加到区域吗？')
                        ])
                    },

                    onOk: () => {
                        let params = {
                            org_id: JSON.parse(localStorage.user).org_id,
                            zone_name: this.buildingText
                        }
                        saveZone(params).then(res => {
                            console.log(res);
                            if(res.data.code === 'success') {
                                this.$Message.success('成功');
                                this.buildingText = '';
                                this.selectZoneFun();
                            } else {
                                this.$Message.warning('失败');
                            }
                        })
                    },
                    onCancel: () => {
                        this.buildingAddFun();
                    }
                })
            } else {
                this.buildingAddFun();
            }
        }
    },

    // 楼栋添加接口封装 利于多次调用
    buildingAddFun() {
        this.loading = true;
        let params = {
            building_name: this.buildingText,
            zone_id: 0,
            org_id: JSON.parse(localStorage.user).org_id
        }
        buildingSave(params).then(res => {
            console.log(res);
            if(res.data.code === 'success') {
                this.$Message.success('成功');
                this.buildingText = '';
                this.selectZoneFun();
                this.selectBuildingsFun();
            } else {
                this.$Message.error(`${res.data.content.msg}`)
            }
            this.loading = false;
        })
    },

    // 点击单个楼栋查询下面的楼层
    buildRadioChange(val) {
        this.floorList = [];
        this.selectFloorFun(val);
    },

    // 查询楼层封装函数
    selectFloorFun(val){
        const building_id = this.buildingList.find(item => item.building_name === val).building_id;
        let params = {
            building_id
        }
        selectAllFloors(params).then(res => {
            this.floorList = res.data
        })
    },
    
    // 楼层添加接口
    addFloorClick() {
        // 判断是否选择了楼栋
        if(this.floorText === '') {
            this.$Message.warning('请您填写楼层名称')
            return
        }

        if(this.building_radio === '') {
            this.$Message.warning('请选择楼栋');
            return
        }
        const row = this.buildingList.find(item => item.building_name === this.building_radio);

        let params = {
            building_id: row.building_id,
            floor_name: this.floorText
        };

        floorSave(params).then(res => {
            this.floorText = '';
            this.buildRadioChange(this.building_radio);
        })
    },


    // 房间添加接口
    addRoomClick() {
        // 判断是否选择了楼层
        if(this.floor_radio === '') {
            this.$Message.warning('请选择楼栋');
            return
        }

        this.getRoomTypeFun();
        this.roomAddModal = true;
    },

    // 房间弹出框确定按钮
    addRoomModalClick(formName) {
        this.$refs[formName].validate((valid) => {
            if(valid) {
                let formData = new FormData();
                let _this = this;
                
                for(let i in this[formName]) {
                    formData.append(i, this[formName][i])
                }

                const floor_id = this.floorList.find(item => item.floor_name === this.floor_radio).floor_id;

                formData.append('file', this.roomImgsfileList);
                formData.append('floor_id', floor_id);
                formData.append('room_type_id', this[formName].room_id);
                // 请求接口
                setTimeout(() => {
                    $.ajax({
                        type: "POST",
                        url: `${_this.addRoomUrl}`,
                        data: formData,
                        dataType: "JSON",
                        cache: false, // 不缓存
                        processData: false, // jQuery不要去处理发送的数据
                        contentType: false
                    }).success(function(res) {
                        console.log(res);
                        if(res.code === 'success') {
                            _this.$Message.success('成功');
                            _this.getRoomTypeFun();
                            _this.selectRoomsFun();
                            _this.roomAddModal = false;
                        } else {
                            _this.$Message.error('失败');
                        }
                    }).error(function(err) {
                        console.log(err);
                    });
                }, 200)
            }
        })
    },

    // 房间弹出框取消按钮
    addRoomModalCancelClick() {

    },

    // 获取楼层
    async getRoomTypeFun() {
        let params = {
            org_id: JSON.parse(localStorage.user).org_id
        }
        const { data } = await selectRoomTypeSel(params);
        data.shift(0);
        this.roomTypeList = data;
        console.log(data);
    },

    // 获取房间
    async selectRoomsFun() {
        const floor_id = this.floorList.find(item => item.floor_name === this.floor_radio).floor_id;

        let params = {
            floor_id
        }
        const { data } = await selectRooms(params);
        this.roomList = data;
        console.log(data);
    },

    // 当floor的改变时查询楼层下面的房间
    floorRadioChange() {
        this.selectRoomsFun();
    },




    /**
     * @param { price } 价格管理
     */


    // 获取当前价格
    async slectCurrentPrice() {
        let params = {
            org_id: JSON.parse(localStorage.user).org_id
        }
        const data = await selectNowRoomPrice(params);
        this.currentRoomPrice = data.data;
    },

    // 显示列表
    async selectPricePlanFun() {
        let params = {
            startPos: this.pricePricePage,
            org_id: JSON.parse(localStorage.user).org_id
        }
        const { data } = await showRoomPriceList();
        this.pricePlanList = data.data;
        this.pricePricePlan = data.count;

        let roomTypeArrIds = [];
        let pricePlanIds = [];
        let pricePlanPrices = [];

        let rebirthArr = [];
        for(let i in this.roomTypeUserData) {
            roomTypeArrIds.push({ids: this.roomTypeUserData[i].room_type_id, room_name: this.roomTypeUserData[i].room_name});
        }
        
        for(let i of this.pricePlanList) {
            pricePlanIds = i.room_type_id.split(',');
            pricePlanPrices = i.room_price.split(',');

            for(let k in roomTypeArrIds) {
                if(pricePlanIds.indexOf(roomTypeArrIds[k].ids) !== -1) {
                    console.log(roomTypeArrIds[k].ids);
                    rebirthArr.push({title: roomTypeArrIds[k].room_name, price: pricePlanPrices[pricePlanIds.indexOf(roomTypeArrIds[k].ids)]});
                }
            }
        }

        console.log(rebirthArr);

        this.pricePlanColumns.push({
            title: '操作',
            align: 'center',
            render: (h, { row, index }) => {
            return h(
                "Button", {
                    props: {
                        type: 'primary',
                        icon: 'edit'
                    },
                }, '编辑' );
            }
        });
    },

    // 价格方案改变当前页的事件
    pricePlanPageChange() {
        // getNotPageRoomTypeFun
    },

    // 点击新增方案
    addPricePlanClick() {
        this.addPricePlanModal = true;
        this.getNotPageRoomTypeFun();
    },

    // 房间类型改变时
    pricePlanChange(plan) {
        this.addPricePlanForm.checkedPricePlan = [];
        for(let i of plan) {
            this.addPricePlanForm.checkedPricePlan.push(
                this.notPageRoomType.find(item => item.room_type_id === i)
            );
        }
    },

    // 删除单个价格明细
    delOneRowClick(index) {
        this.addPricePlanForm.room_type_id.splice(index, 1);
        this.addPricePlanForm.checkedPricePlan.splice(index, 1)
    },

    // 点击添加房间价格方案确定按钮
    addPricePlanConfirmClick(formName) {
        this.$refs[formName].validate((valid) => {
            console.log(valid)
            if(valid) {
                console.log('我成功了 ')
                let room_prices = [];

                if(this.addPricePlanForm.checkedPricePlan.length >= 1) {
                    for(let i of this.addPricePlanForm.checkedPricePlan) {
                        room_prices.push(i.room_prices);
                    }
                }

                this[formName].start_time = this[formName].PlanDate[0];
                this[formName].end_time = this[formName].PlanDate[1];
                this[formName].room_prices = room_prices.join(',');
                this[formName].room_type_ids = this[formName].room_type_ids.join(',');
                this[formName].org_id = JSON.parse(localStorage.user).org_id;

                addPricePlanSave(this[formName]).then(res => {
                    if(res.data.code === 'success') {
                        this.$Message.success('成功');
                    } else {
                        this.$Message.error(`${res.data.content.msg}`);
                    }
                })
            }
        })
    },

    // 点击添加房间价格方案取消按钮
    addPricePlanCancelClick() {
        this.$nextTick(() => {
            this.addPricePlanModal = false;
            this.addPricePlanForm.resetFields();
        })
    },

    // 当时间改变时
    PlanDateChange(val) {
        this.addPricePlanForm.PlanDate = val;
    }

  },

  created() {
    this.initCreated()
  },

  mounted() {
    this.initMounted();
  }
};
</script>
