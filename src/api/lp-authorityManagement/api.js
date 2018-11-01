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

//系统用户列表
const systemUserManagementList = params => {
    return axios.post(`${baseUrl.base2}/Admin_userController/userList?startPos=${params.startPos}&pageSize=10`, params);
};

//系统用户模糊查询
const systemUserManagementSearch = params => {
    return axios.post(`${baseUrl.base2}/Admin_userController/userList?startPos=${params.startPos}&pageSize=10`, params);
};

//系统用户添加
const systemUserManagementAdd = params => {
    return axios.post(`${baseUrl.base2}/Admin_userController/save`, params);
}

//系统用户添加-添加角色
const systemUserManagementAddRole = params => {
    return axios.post(`${baseUrl.base2}/User_mapping_roleController/save`, params);
}


export {
    systemUserManagementList, //系统用户列表
    systemUserManagementSearch, //系统用户模糊查询
    systemUserManagementAdd, //系统用户添加
    systemUserManagementAddRole,//系统用户添加-角色
};

// 组件中获取base地址
export const getBase = () => {
    return baseObj;
};


