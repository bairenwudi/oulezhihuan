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

// 获取用户列表
const getUserListPage =  params => {
   return axios.get(`${baseUrl.base2}/Hot_city_managementController/selectHotCity?startPos=${params.startPos}&pageSize=10`);
}

// 获取用户列表
const userList = params => {
    return axios.post(`${baseUrl.base5}/sysUserController/lstSysUsers?startPos=${params.startPos}&pageSize=10`, params);
};

// 获取角色列表
const roleList = params => {
    return axios.post(`${baseUrl.base5}/sysRoleController/lstSysRoles?startPos=${params.startPos}&pageSize=10`, params);
};

// 获取机构列表
const ListOfInstitutions = params => {
    return axios.post(`${baseUrl.base5}/sysOrgController/lstSysOrgs?startPos=${params.startPos}&pageSize=10`, params);
};

// 获取权限列表
const PermissionsList = params => {
    return axios.post(`${baseUrl.base5}/sysRightController/lstSysRights?startPos=${params.startPos}&pageSize=10`, params);
};

// 获取组织机构树
const OrganizationTree = params => {
    return axios.get(`${baseUrl.base5}/sysOrgController/lstZtreeOrgs`, params)
}

export {
    userList,
    PermissionsList,
    roleList,
    ListOfInstitutions,
    OrganizationTree
}

// 组件中获取base地址
export const getBase = () => {
    return baseObj;
};
