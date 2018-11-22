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

/**
 * 
 * @param { organ } 基地信息
 */

// 机构管理列表
export const organizationalManagementList = params => {
    return axios.post(`${baseUrl.base3}/organ/selectOrg?pageSize=10`, params);
};

// 机构管理删除
export const organizationalManagementDel = params => {
    return axios.post(`${baseUrl.base3}/org/deleteByObj`, params);
};

// 机构管理模糊查询
export const organizationalManagementSearch = params => {
    return axios.post(`${baseUrl.base3}/organ/selectOrg?pageSize=10`, params);
};

// 省份下拉列表渲染
export const ProvinceTitleList = params => {
    return axios.post(`${baseUrl.base3}/Region_province_infoController/findAll`, params);
};

// 城市份下拉列表渲染
export const CityTitleList = params => {
    return axios.post(`${baseUrl.base3}/Region_city_infoController/findAll`, params);
};

// 机构标题下拉列表渲染
export const InstitutionalTitleList = params => {
    return axios.post(`${baseUrl.base2}/Admin_userController/selectOrg_name`, params);
};

// 机构设置-基地信息列表
export const baseInformationList = params => {
    return axios.post(`${baseUrl.base3}/Zh_room_typeController/selectRoomType?pageSize=10`, params);
};

// 机构设置-房间类型列表
export const roomtypeList = params => {
    return axios.post(`${baseUrl.base3}/Zh_room_typeController/selectRoomType?pageSize=10`, params);
};



// 修改上下线
export const changeOnlineType = params => {
    return axios.post(`${baseUrl.base3}/organ/changeOnlineType`, params);
}

// 获取机构设置的默认信息
export const selectOrgByObj = params => {
    return axios.post(`${baseUrl.base3}/organ/selectOrgByObj`, params);
}

// 编辑机构设置的默认信息
export const updateById = params => {
    return axios.post(`${baseUrl.base3}/organ/updateById`, params);
}






/**
 * 
 * @param { roomType } 房间类型
 */

// 机构设施
export const selectFacilitiesByArray = params => {
    return axios.post(`${baseUrl.base3}/Facilities_managementController/selectFacilitiesByArray`, params);
}
  
// 获取房间类型
export const selectRoomType = params => {
    return axios.post(`${baseUrl.base3}/Zh_room_typeController/selectRoomType?pageSize=10`, params);
}

// 新增房间类型
export const saveRoomType = params => {
    return axios.post(`${baseUrl.base3}/Zh_room_typeController/save`, params);
}

// 编辑房间类型 参数： org_id   room_type_id  room_type   room_name   room_type_sort
export const updateByIdRoomType = params => {
    return axios.post(`${baseUrl.base3}/Zh_room_typeController/updateById`, params);
}

// 房间类型删除
export const roomtypeDel = params => {
    return axios.post(`${baseUrl.base3}/Zh_room_typeController/deleteById`, params);
}

// 获取全部的基地设施
export const selectFacilities = params => {
    return axios.post(`${baseUrl.base3}/Facilities_managementController/selectFacilities`, params);
}


/**
 * 
 * @param { area } 区域管理
 * 
 */

// 新增区域
export const saveZone = params => {
    return axios.post(`${baseUrl.base3}/Zh_zone_infoController/save`, params);
}

// 获取区域
export const selectZone = params => {
    return axios.post(`${baseUrl.base3}/Zh_zone_infoController/selectZone`, params);
}







/**
 * 
 * @param { public } 公共发射
 */
// 组件中获取base地址
export const getBase = () => {
    return baseObj;
};
