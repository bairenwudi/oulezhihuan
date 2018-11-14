import { CorrectpathObj } from '../index.js';
import axios from 'axios'

const baseUrl = CorrectpathObj.Correctpath;

const baseObj = {
    base1: baseUrl.base1,
    base2: baseUrl.base2,
    base3: baseUrl.base3,
    base4: baseUrl.base4,
    base5: baseUrl.base5,
    base6: baseUrl.base6
};


// 机构管理列表
const organizationalManagementList = params => {
    return axios.post(`${baseUrl.base3}/organ/selectOrg?pageSize=10`, params);
};

// 机构管理删除
const organizationalManagementDel = params => {
    return axios.post(`${baseUrl.base3}/org/deleteByObj`, params);
};

// 机构管理模糊查询
const organizationalManagementSearch = params => {
    return axios.post(`${baseUrl.base3}/organ/selectOrg?pageSize=10`, params);
};

// 机构管理-省份下拉列表渲染
const ProvinceTitleList = params => {
    return axios.post(`${baseUrl.base3}/Region_province_infoController/findAll`, params);
};

// 机构管理-城市份下拉列表渲染
const CityTitleList = params => {
    return axios.post(`${baseUrl.base3}/Region_city_infoController/findAll`, params);
};

// 机构管理模糊查询-机构标题下拉列表渲染
const InstitutionalTitleList = params => {
    return axios.post(`${baseUrl.base2}/Admin_userController/selectOrg_name`, params);
};

// 机构设置-基地信息列表
const baseInformationList = params => {
    return axios.post(`${baseUrl.base3}/Zh_room_typeController/selectRoomType?pageSize=10`, params);
};

// 机构设置-房间类型列表
const roomtypeList = params => {
    return axios.post(`${baseUrl.base3}/Zh_room_typeController/selectRoomType?pageSize=10`, params);
};

//机构设置-房间类型添加
const roomtypeAdd = params => {
    return axios.post(`${baseUrl.base3}/Zh_room_typeController/save`, params);
}

//机构设置-房间类型编辑
const roomtypeEdit = params => {
    return axios.post(`${baseUrl.base3}/Zh_room_typeController/updateById`, params);
}

//机构设置-房间类型删除
const roomtypeDel = params => {
    return axios.post(`${baseUrl.base3}/Zh_room_typeController/deleteById`, params);
}


export {
    organizationalManagementList, //机构管理列表
    organizationalManagementDel, //机构管理删除
    organizationalManagementSearch,//机构管理模糊查询
    ProvinceTitleList, //机构管理-省份下拉列表渲染
    CityTitleList, //机构管理-城市下拉列表渲染
    InstitutionalTitleList, //机构管理-机构标题下拉框渲染
    baseInformationList,//机构设置-基地信息
    roomtypeList, //机构设置-房间类型列表
    roomtypeAdd, //机构设置-房间类型添加
    roomtypeEdit, //机构设置-房间类型编辑
    roomtypeDel, //机构设置-房间类型删除
};

// 组件中获取base地址
export const getBase = () => {
    return baseObj;
};


