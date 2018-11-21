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


//批量预定列表
const batchReservationOrderList = params => {
    return axios.post(`${baseUrl.base3}/BatchReserveController/reserveList?startPos=${params.startPos}&pageSize=10`, params);
};

//批量预定模糊查询
const batchReservationSearch = params => {
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


//批量预定   目的地名称下拉框渲染
const destinationSel = params => {
    return axios.post(`${baseUrl.base2}/BatchReserveController/Select_des`, params);
}

//批量预定   新增弹框中的checkboxGroup渲染 房间类型
const destinationCheckbox = params => {
    return axios.post(`${baseUrl.base2}/Zh_room_type_priceController/showRoomPriceList`, params);
}

export {
    batchReservationOrderList, //批量预定列表
    batchReservationSearch,//批量预定模糊查询
    baseInformationList,//机构设置-基地信息
    roomtypeList, //机构设置-房间类型列表
    roomtypeAdd, //机构设置-房间类型添加
    roomtypeEdit, //机构设置-房间类型编辑
    roomtypeDel, //机构设置-房间类型删除
    destinationCheckbox,//批量预定   目的地名称下拉框渲染
};

// 组件中获取base地址
export const getBase = () => {
    return baseObj;
};


