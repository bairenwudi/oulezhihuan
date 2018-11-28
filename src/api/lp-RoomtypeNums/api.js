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

//房型可预订数列表
const roomtypeNumsList = params => {
    return axios.post(`${baseUrl.base2}/Zh_room_reserve_numController/selectRoomNum`, params);
};


// 机构设置-房间类型列表(房型可预订数 模糊查询-房型下拉列表渲染)
const roomtypeList = params => {
    return axios.post(`${baseUrl.base2}/Zh_room_typeController/selectRoomType`, params);
};

//房型可预订数新增
const roomtypeNumsAdd = params => {
    return axios.post(`${baseUrl.base2}/Zh_room_reserve_numController/updateRoomNums`, params);
}

export {
    roomtypeNumsList, //房型可预订数列表
    roomtypeList,//房型可预订数-房间类型下拉框渲染
    roomtypeNumsAdd,//房型可预订数新增
};

// 组件中获取base地址
export const getBase = () => {
    return baseObj;
};


