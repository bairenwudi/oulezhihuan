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
    return axios.post(`${baseUrl.base2}/Zh_room_reserve_numController/selectRoomNum?startPos=${params.startPos}&pageSize=10`, params);
};

//房型可预订数模糊查询
const roomtypeNumsSearch = params => {
    return axios.post(`${baseUrl.base2}/CustomerController/selectCustomer?startPos=${params.startPos}&pageSize=10`, params);
};

//房型可预订数新增
const roomtypeNumsAdd = params => {
    return axios.post(`${baseUrl.base2}/Zh_room_reserve_numController/updateRoomNums`, params);
}

export {
    roomtypeNumsList, //房型可预订数列表
    roomtypeNumsSearch,//房型可预订数模糊查询
    roomtypeNumsAdd,//房型可预订数新增
};

// 组件中获取base地址
export const getBase = () => {
    return baseObj;
};


