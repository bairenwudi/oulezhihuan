
import { CorrectpathObj } from '../index.js';
import axios from 'axios'

const baseUrl = CorrectpathObj.Correctpath;


// 查询所有角色名
const getUserListPage =  params => {
   return axios.post(`${baseUrl.base2}/Customer_RoleController/selectCusRoles`, params);
}

// 获取机构列表
const ListOfInstitutions = params => {
    return axios.post(`${baseUrl.base2}/sysOrgController/lstSysOrgs?startPos=${params.startPos}&pageSize=10`, params);
};

// 获取权限
const OrganizationTree = params => {
    return axios.get(`${baseUrl.base2}/sysOrgController/lstZtreeOrgs`, params)
}

// 添加或者修改角色
const saveOrUpdateCusRole = params => {
    return axios.post(`${baseUrl.base2}/Customer_RoleController/saveOrUpdateCusRole`, params)
}

// 删除
const deleteCusOfRole = params => {
    return axios.post(`${baseUrl.base2}/Customer_RoleController/deleteCusOfRole`, params)
}

// 获取app权限列表
const selectCusRight = params =>{
    return axios.post(`${baseUrl.base2}/Customer_RightController/selectCusRight`,params)
}

// 选择权限确定
const update = params =>{
    return axios.post(`${baseUrl.base2}/Cus_Role_Mapping_RightController/update`,params)
}

// 显示权限树状结构
const selectDepZTree = params =>{
    return axios.post(`${baseUrl.base2}/Department_infoController/selectDepZTree`,params)
}

// 显示所有机构
const selectAllDep = params =>{
    return axios.post(`${baseUrl.base2}/Department_infoController/selectAllDep`,params)
}

// 添加
const save = params =>{
    return axios.post(`${baseUrl.base2}/Admin_roleController/save`,params)
}

// 修改
const updateByObj = params =>{
    return axios.post(`${baseUrl.base2}/Admin_roleController/updateByObj`,params)
}

// 删除
const deleteRoleByObj = params =>{
    return axios.post(`${baseUrl.base2}/Admin_roleController/deleteRoleByObj`,params)
}

// 权限中点击结构树 根据id获取下面的子级角色信息
const selectRolesForDep = params =>{
    return axios.post(`${baseUrl.base2}/Admin_roleController/selectRolesForDep?startPos=${params.startPos}&pageSize=10`,params)
}

// 系统用户管理
const userList = params =>{
    return axios.post(`${baseUrl.base2}/Admin_userController/userList?startPos=${params.startPos}&pageSize=10`,params)
}

// 系统用户编辑
const updateAdminUser = params =>{
    return axios.post(`${baseUrl.base2}/Admin_userController/updateAdminUser`, params)
}

// 关联角色
const updateUserOfRole = params =>{
    return axios.post(`${baseUrl.base2}/User_mapping_roleController/updateUserOfRole`, params)
}

// 机构获取树形机构下面的部门
const selectDepH = params =>{
    return axios.post(`${baseUrl.base2}/Department_infoController/selectDepH?startPos=${params.startPos}&pageSize=10`, params)
}

// 机构添加部门
const Depsave = params =>{
    return axios.post(`${baseUrl.base2}/Department_infoController/save`, params)
}

// 机构修改部门
const DepupdateById = params =>{
    return axios.post(`${baseUrl.base2}/Department_infoController/updateById`, params)
}

// 机构删除部门
const DepdeleteById = params =>{
    return axios.post(`${baseUrl.base2}/Department_infoController/deleteById`, params)
}

// 获取原始数据list
const selectRight = params =>{
    return axios.post(`${baseUrl.base2}/Admin_rightController/selectRight`, params)
}

// 获取权限列表
const selectUserRight = params =>{
    return axios.post(`${baseUrl.base2}/Admin_rightController/selectUserRight`, params)
}

// 添加权限 //父级id, 没有不传
const saveUserRight = params =>{
    return axios.post(`${baseUrl.base2}/Admin_rightController/saveUserRight`, params)
}

// 编辑  传adm_right_id 要编辑信息的id
const updateUserRight = params =>{
    return axios.post(`${baseUrl.base2}/Admin_rightController/updateUserRight`, params)
}

// 删除直接 传adm_right_id 
const deleteUserRight = params =>{
    return axios.post(`${baseUrl.base2}/Admin_rightController/deleteUserRight`, params)
}

/**
 * 角色管理接口
 */

// 直播添加角色
const saveLiveRole = params =>{
    return axios.post(`${baseUrl.base2}/Admin_roleController/save`, params)
}

// 显示对应的角色
const selectRolesForDepLive = params =>{
    return axios.post(`${baseUrl.base2}/Admin_roleController/selectRolesForDep`, params)
}

// 编辑
const updateByObjLive = params =>{
    return axios.post(`${baseUrl.base2}/Admin_roleController/updateByObj`, params)
}

// 删除
const deleteRoleByObjLive = params =>{
    return axios.post(`${baseUrl.base2}/Admin_roleController/deleteRoleByObj`, params)
}

// 角色关联权限
const updaterRight = params =>{
    return axios.post(`${baseUrl.base2}/Role_mapping_rightController/update`, params)
}

// 用户管理添加用户
const userSave = params =>{
    return axios.post(`${baseUrl.base2}/Admin_userController/save`, params)
}

// 查询某个角色的权限
const selectRightOfRole = params =>{
    return axios.post(`${baseUrl.base2}/Role_mapping_rightController/selectRightOfRole`, params)
}



/**
 * app版接口
 */

// 添加
const Appsave = params =>{
    return axios.post(`${baseUrl.base2}/App_versionController/save`, params)
}

// 查询
const selectVersion = params =>{
    return axios.post(`${baseUrl.base2}/App_versionController/selectVersion?startPos=${params.startPos}&pageSize=10`, params)
}

// 修改
const updateVersion = params =>{
    return axios.post(`${baseUrl.base2}/App_versionController/updateVersion`, params)
}

// 删除
const deleteVersion = params =>{
    return axios.post(`${baseUrl.base2}/App_versionController/deleteVersion`, params)
}


export {
    getUserListPage,
    OrganizationTree,
    ListOfInstitutions,
    saveOrUpdateCusRole,
    deleteCusOfRole,
    selectCusRight,
    update,
    selectDepZTree,
    selectRolesForDep,
    save,
    deleteRoleByObj,
    updateByObj,
    userList,
    selectAllDep,
    updateAdminUser,
    updateUserOfRole,
    selectDepH,
    Depsave,
    DepupdateById,
    DepdeleteById,
    selectRight,
    saveUserRight,
    updateUserRight,
    deleteUserRight,
    selectUserRight,
    saveLiveRole,
    selectRolesForDepLive,
    updateByObjLive,
    deleteRoleByObjLive,
    updaterRight,
    userSave,
    selectRightOfRole,
    Appsave,
    selectVersion,
    updateVersion,
    deleteVersion,
}