import { CorrectpathObj } from '../index.js';
import axios from 'axios'

const baseUrl = CorrectpathObj.Correctpath;

const baseObj = {
    base1: baseUrl.base1,
    base2: baseUrl.base2,
    base2: baseUrl.base2,
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
    return axios.post(`${baseUrl.base2}/organ/selectOrg?pageSize=10`, params);
};

// 机构管理删除
export const organizationalManagementDel = params => {
    return axios.post(`${baseUrl.base2}/org/deleteByObj`, params);
};

// 机构管理模糊查询
export const organizationalManagementSearch = params => {
    return axios.post(`${baseUrl.base2}/organ/selectOrg?pageSize=10`, params);
};

// 省份下拉列表渲染
export const ProvinceTitleList = params => {
    return axios.post(`${baseUrl.base2}/Region_province_infoController/findAll`, params);
};

// 城市份下拉列表渲染
export const CityTitleList = params => {
    return axios.post(`${baseUrl.base2}/Region_city_infoController/findAll`, params);
};

// 机构标题下拉列表渲染
export const InstitutionalTitleList = params => {
    return axios.post(`${baseUrl.base2}/Admin_userController/selectOrg_name`, params);
};

// 修改上下线
export const changeOnlineType = params => {
    return axios.post(`${baseUrl.base2}/organ/changeOnlineType`, params);
}

// 获取机构设置的默认信息
export const selectOrgByObj = params => {
    return axios.post(`${baseUrl.base2}/organ/selectOrgByObj`, params);
}

// 编辑机构设置的默认信息
export const updateById = params => {
    return axios.post(`${baseUrl.base2}/organ/updateById`, params);
}



/**
 * 
 * @param { roomType } 房间类型
 */

// 机构设施
export const selectFacilitiesByArray = params => {
    return axios.post(`${baseUrl.base2}/Facilities_managementController/selectFacilitiesByArray`, params);
}
  
// 获取房间类型
export const selectRoomType = params => {
    return axios.post(`${baseUrl.base2}/Zh_room_typeController/selectRoomType`, params);
}

// 新增房间类型
export const saveRoomType = params => {
    return axios.post(`${baseUrl.base2}/Zh_room_typeController/save`, params);
}

// 编辑房间类型 参数： org_id   room_type_id  room_type   room_name   room_type_sort
export const updateByIdRoomType = params => {
    return axios.post(`${baseUrl.base2}/Zh_room_typeController/updateById`, params);
}

// 房间类型删除
export const roomtypeDel = params => {
    return axios.post(`${baseUrl.base2}/Zh_room_typeController/deleteById`, params);
}

// 获取全部的基地设施
export const selectFacilities = params => {
    return axios.post(`${baseUrl.base2}/Facilities_managementController/selectFacilities`, params);
}


/**
 * 
 * @param { area } 区域管理
 * 
 */

// 新增区域
export const saveZone = params => {
    return axios.post(`${baseUrl.base2}/Zh_zone_infoController/save`, params);
}

// 获取区域
export const selectZone = params => {
    return axios.post(`${baseUrl.base2}/Zh_zone_infoController/selectZone`, params);
}

// 编辑区域名称
export const updateByIdArea = params => {
    return axios.post(`${baseUrl.base2}/Zh_zone_infoController/updateById`, params);
}

// 批量删除(区域)
export const deleteByIds = params => {
    return axios.post(`${baseUrl.base2}/Zh_zone_infoController/deleteByIds`, params);
}

// 批量删除(楼栋)
export const deleteByIdsBuilding = params => {
    return axios.post(`${baseUrl.base2}/Zh_building_infoController/deleteByIds`, params);
}

// 移动楼栋
export const updateByIds = params => {
    return axios.post(`${baseUrl.base2}/Zh_building_infoController/updateByIds`, params);
}

// 查询楼栋
export const selectBuildings = params => {
    return axios.post(`${baseUrl.base2}/Zh_building_infoController/selectBuildings`, params);
}

// 楼栋添加 传名字和父级区域id
export const buildingSave = params => {
    return axios.post(`${baseUrl.base2}/Zh_building_infoController/save`, params);
}

// 编辑楼栋名称
export const updateBuildingName = params => {
    return axios.post(`${baseUrl.base2}/Zh_building_infoController/updateBuildingName`, params);
}

// 查询楼层  传入楼栋id(building_id)
export const selectAllFloors = params => {
    return axios.post(`${baseUrl.base2}/Zh_floor_infoController/selectAllFloors`, params);
}

// 楼层添加 传名字和父级区域id
export const floorSave = params => {
    return axios.post(`${baseUrl.base2}/Zh_floor_infoController/save`, params);
}

// 楼层移动
export const updateByIdsFloor = params => {
    return axios.post(`${baseUrl.base2}/Zh_floor_infoController/updateByIds`, params);
}

// 批量删除(楼层)
export const deleteByIdsFloor = params => {
    return axios.post(`${baseUrl.base2}/Zh_floor_infoController/deleteByIds`, params);
}

// 编辑楼层名称
export const updateFloorName = params => {
    return axios.post(`${baseUrl.base2}/Zh_floor_infoController/updateFloorName`, params);
}

// 添加房间
export const saveRoom = params => {
    return axios.post(`${baseUrl.base2}/Zh_room_infoController/save`, params);
}

// 获取楼层 org_id
export const selectRoomTypeSel = params => {
    return axios.post(`${baseUrl.base2}/Zh_room_typeController/selectRoomType`, params);
}

// 获取房间 room_id
export const selectRooms = params => {
    return axios.post(`${baseUrl.base2}/Zh_room_infoController/selectRooms`, params);
}

// 批量删除 (房间)
export const deleteByIdsRoom = params => {
    return axios.post(`${baseUrl.base2}/Zh_room_infoController/deleteByIds`, params);
}

// 编辑房间名称
export const updateRoomName = params => {
    return axios.post(`${baseUrl.base2}/Zh_room_infoController/updateRoomName`, params);
}

// 房间移动
export const updateByIdsRoom = params => {
    return axios.post(`${baseUrl.base2}/Zh_room_infoController/updateByIds`, params);
}




/**
 * 
 * @param { price } 价格设置 
 */

// 获取当前价格
export const selectNowRoomPrice = params => {
    return axios.post(`${baseUrl.base2}/Zh_room_type_priceController/selectNowRoomPrice`, params);
}

// 添加方案 org_id //机构id project_name //方案名称 start_time //开始时间 end_time //结束时间
export const saveRoomPrice = params => {
    return axios.post(`${baseUrl.base2}/Zh_room_type_priceController/save`, params);
}

// 显示列表
export const showRoomPriceList = params => {
    return axios.post(`${baseUrl.base2}/Zh_room_type_priceController/showRoomPriceList?pageSize=10`, params);
}

// 新增方案
export const addPricePlanSave = params => {
    return axios.post(`${baseUrl.base2}/Zh_room_type_priceController/save`, params);
}



/**
 *
 *  @param { defaultPrice } 默认价格 
 */

// 查询默认价格
export const selectRoomTypeDefaultPrice = params => {
    return axios.post(`${baseUrl.base2}/Zh_room_typeController/selectRoomType?pageSize=10`, params);
}


// 编辑默认价格
export const updateByIdDefaultPrice = params => {
    return axios.post(`${baseUrl.base2}/Zh_room_typeController/updateById`, params);
}



/**
 * 
 * @param { public } 公共发射
 */
// 组件中获取base地址
export const getBase = () => {
    return baseObj;
};
