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

// 获取货币类型列表(finished)
const currencyTypeList = para => {
    return axios.get(`${baseUrl.base1}/Live_systemManagement/queryCurrency?pageNum=${para.pageNum}&pageSize=10`, para);
};

// 货币类型新增
const currencyTypeAdd = params => {
    return axios.post(`${baseUrl.base1}/Live_systemManagement/insertCurrency`, params);
};

// 货币类型编辑
const currencyTypeEdit = params => {
    return axios.post(`${baseUrl.base1}/Live_systemManagement/updateCurrency`, params);
};

// 获取礼物类型列表(finished)
const giftTypeList = para => {
    return axios.get(`${baseUrl.base1}/Live_systemManagement/queryGift?pageNum=${para.pageNum}&pageSize=10`, para);
};

// 新增礼物类型(finished)
const giftTypeAdd = params => {
    return axios.post(`${baseUrl.base1}/Live_systemManagement/insertGift`, params);
};

// 获取充值类型列表(finished)
const rechargeTypeList = para => {
    return axios.get(`${baseUrl.base1}/Live_systemManagement/queryRecharge?pageNum=${para.pageNum}&pageSize=10`, para);
};

// 新增充值类型(finished)
const rechargeTypeAdd = params => {
    return axios.post(`${baseUrl.base1}/Live_systemManagement/insertRecharge`, params);
};


// 获取兑换类型列表(finished)
const exchangeTypeList = para => {
    return axios.get(`${baseUrl.base1}/Live_systemManagement/queryExchange?pageNum=${para.pageNum}&pageSize=10`, para);
};

// 新增兑换类型(finished)
const exchangeTypeAdd = params => {
    return axios.post(`${baseUrl.base1}/Live_systemManagement/insertExchange`, params);
};

// 渲染货币类型下拉框(finished)
const currencyTypeSelect = para => {
    return axios.get(`${baseUrl.base1}/Live_systemManagement/queryCurrency?pageNum=1&pageSize=50`, para);
};

export {
    getUserListPage,
    currencyTypeList,//货币类型列表
    currencyTypeAdd,//货币类型添加
    currencyTypeEdit,//货币类型编辑
    giftTypeList,//礼物类型列表
    giftTypeAdd,//礼物类型添加
    rechargeTypeList,//充值类型列表
    rechargeTypeAdd,//充值类型添加 
    exchangeTypeList,//兑换类型列表
    exchangeTypeAdd,//兑换类型添加
    currencyTypeSelect//渲染货币类型下拉框
}

// 组件中获取base地址
export const getBase = () => {
    return baseObj;
};


