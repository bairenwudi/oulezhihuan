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
export const organizationalManagementList = params => {
    return axios.post(`${baseUrl.base2}/organ/selectOrg?pageSize=10`, params);
};

// 机构标题下拉框渲染（传值参数org_name）
export const selectOrg_name = params => {
    return axios.post(`${baseUrl.base2}/Admin_userController/selectOrg_name`, params);
};

//机构管理模糊查询
export const organizationalManagementSearch = params => {
    return axios.post(`${baseUrl.base2}/organ/selectOrg?pageSize=10`, params);
};

// 机构设置-基地信息列表
export const baseInformationList = params => {
    return axios.post(`${baseUrl.base2}/Zh_room_typeController/selectRoomType?pageSize=10`, params);
};

// 机构设置-房间类型列表
export const roomtypeList = params => {
    return axios.post(`${baseUrl.base2}/Zh_room_typeController/selectRoomType?pageSize=10`, params);
};

//机构设置-房间类型添加
export const roomtypeAdd = params => {
    return axios.post(`${baseUrl.base2}/Zh_room_typeController/save`, params);
}

//机构设置-房间类型编辑
export const roomtypeEdit = params => {
    return axios.post(`${baseUrl.base2}/Zh_room_typeController/updateById`, params);
}

//机构设置-房间类型删除
export const roomtypeDel = params => {
    return axios.post(`${baseUrl.base2}/Zh_room_typeController/deleteById`, params);
}


// 组件中获取base地址
export const getBase = () => {
    return baseObj;
};


