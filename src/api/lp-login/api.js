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

// 登录接口
export const selectAdmin =  params => {
    return axios.post(`${baseUrl.base2}/Admin_userController/selectAdmin`, params);
}

// 图片验证码对比接口   
export const comparison =  params => {
    return axios.post(`${baseUrl.base2}/auth/comparison`, params);
}

// 获取登录人自己的权限列表
export const selectUserRightForVue = params =>{
    return axios.post(`${baseUrl.base2}/Admin_userController/selectUserRightForVue`, params)
}

// 个人资料
export const getSessionAdminUser = params =>{
    return axios.post(`${baseUrl.base2}/Admin_userController/getSessionAdminUser`, params)
}

// 保存个人资料
export const updateAdminUser = params =>{
    return axios.post(`${baseUrl.base2}/Admin_userController/updateAdminUser`, params)
}

// 获取手机验证码
export const getCode = params =>{
    return axios.post(`${baseUrl.base2}/verification/getCode`, params)
}

// 验证手机验证码
export const validCode = params =>{
    return axios.post(`${baseUrl.base2}/verification/validCode`, params)
}

// 重置密码保存
export const isExistPhonenum = params =>{
    return axios.post(`${baseUrl.base2}/Admin_userController/isExistPhonenum`, params)
}

// 注册
export const registerSave = params =>{
    return axios.post(`${baseUrl.base2}/Admin_userController/save`, params)
}




// 组件中获取base地址
export const getBase = () => {
    return baseObj;
};