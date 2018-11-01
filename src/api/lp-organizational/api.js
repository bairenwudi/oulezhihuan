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


//机构管理列表
const organizationalManagementList = params => {
    return axios.post(`${baseUrl.base2}/organ/selectOrg?startPos=${params.startPos}&pageSize=10`, params);
};

//机构管理模糊查询
const organizationalManagementSearch = params => {
    return axios.post(`${baseUrl.base2}/organ/selectOrg?startPos=${params.startPos}&pageSize=10`, params);
};

// 机构设置-基地信息列表
const baseInformationList = params => {
    return axios.post(`${baseUrl.base2}/Zh_room_typeController/selectRoomType?startPos=${params.startPos}&pageSize=10`, params);
};

// 机构设置-房间类型列表
const roomtypeList = params => {
    return axios.post(`${baseUrl.base2}/Zh_room_typeController/selectRoomType?startPos=${params.startPos}&pageSize=10`, params);
};

//机构设置-房间类型添加
const roomtypeAdd = params => {
    return axios.post(`${baseUrl.base2}/Zh_room_typeController/save`, params);
}

//机构设置-房间类型编辑
const roomtypeEdit = params => {
    return axios.post(`${baseUrl.base2}/Zh_room_typeController/updateById`, params);
}

//机构设置-房间类型删除
const roomtypeDel = params => {
    return axios.post(`${baseUrl.base2}/Zh_room_typeController/deleteById`, params);
}


export {
    organizationalManagementList, //机构管理列表
    organizationalManagementSearch,//机构管理模糊查询
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


