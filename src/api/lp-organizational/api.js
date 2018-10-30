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

// 房间类型查询
const roomtypeList = params => {
    return axios.post(`${baseUrl.base2}/Zh_room_typeController/selectRoomType?startPos=${params.startPos}&pageSize=10`, params);
};

// 用户管理查询
const userManagementSearch = params => {
    return axios.post(`${baseUrl.base2}/CustomerController/selectCustomer?startPos=${params.startPos}&pageSize=10`, params);
};


//分组新增接口
const groupAdd = params => {
    return axios.post(`${baseUrl.base2}/Live_anchorgroupController/save`, params);
}


export {
    roomtypeList  //房间类型查询
};

// 组件中获取base地址
export const getBase = () => {
    return baseObj;
};


