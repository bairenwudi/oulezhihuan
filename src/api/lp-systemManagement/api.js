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

//App订单列表
const appOrderList = params => {
    return axios.post(`${baseUrl.base3}/Orders_app/select_Orders_app?startPos=${params.startPos}&pageSize=10`, params);
};

//App订单模糊查询
const apOrderSearch = params => {
    return axios.post(`${baseUrl.base3}/Orders_app/select_Orders_app?startPos=${params.startPos}&pageSize=10`, params);
};

//批量预定订单列表
const batchReservationOrderList = params => {
    return axios.post(`${baseUrl.base3}/BatchReserveController/reserveList?startPos=${params.startPos}&pageSize=10`, params);
};

//批量预定订单模糊查询
const batchReservationOrderSearch = params => {
    return axios.post(`${baseUrl.base3}/BatchReserveController/reserveList?startPos=${params.startPos}&pageSize=10`, params);
};

//退款单列表
const refundList = params => {
    return axios.post(`${baseUrl.base3}/RedundOrderApp/selectRefundOrder?startPos=${params.startPos}&pageSize=10`, params);
};

//退款单模糊查询
const refundListSearch = params => {
    return axios.post(`${baseUrl.base3}/RedundOrderApp/selectRefundOrder?startPos=${params.startPos}&pageSize=10`, params);
};

//退房单列表
const checkoutList = params => {
    return axios.post(`${baseUrl.base3}/CheckeOutOrder/selectCheckOutOrder?startPos=${params.startPos}&pageSize=10`, params);
};

//退房单模糊查询
const checkoutListSearch = params => {
    return axios.post(`${baseUrl.base3}/CheckeOutOrder/selectCheckOutOrder?startPos=${params.startPos}&pageSize=10`, params);
};

export {
    appOrderList, //App订单列表
    apOrderSearch, //App订单模糊查询
    batchReservationOrderList, //批量预定订单列表
    batchReservationOrderSearch, //批量预定订单模糊查询
    refundList, //退款单列表
    refundListSearch, //退款单模糊查询
    checkoutList, //退房单列表
    checkoutListSearch //退房单模糊查询
};

// 组件中获取base地址
export const getBase = () => {
    return baseObj;
};


