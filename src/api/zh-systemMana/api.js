import { CorrectpathObj } from '../index.js';
import axios from 'axios'

const baseUrl = CorrectpathObj.Correctpath;

const baseObj = {
  base1: baseUrl.base1,
  base2: baseUrl.base2
}
//                                            热门城市
//热门城市列表渲染
export const hotCityList = params => {
  return axios.post(`${baseUrl.base1}/Hot_city_managementController/selectHotCity`,params);
}

//热门城市  下拉框省渲染
export const selProvince = params => {
  return axios.post(`${baseUrl.base1}/Region_province_infoController/findAll`,params);
}

//热门城市  下拉框市渲染
export const selCity = params => {
  return axios.post(`${baseUrl.base1}/Region_city_infoController/findAll`,params);
}

//热门城市  新增
export const hotCityAdd = params => {
  return axios.post(`${baseUrl.base1}/Hot_city_managementController/save`,params);
}

//热门城市  编辑
export const hotCityEdit = params => {
  return axios.post(`${baseUrl.base1}/Hot_city_managementController/updateById`,params);
}

//热门城市  删除
export const hotCityDel = params => {
  return axios.post(`${baseUrl.base1}/Hot_city_managementController/deleteById`,params);
}


//                                            banner
//banner  新增
export const bannerAdd = params => {
  return axios.post(`${baseUrl.base1}/Banner_managementController/save`,params);
}

//banner  编辑获取信息
export const bannerGetEditMsg = params => {
  return axios.post(`${baseUrl.base1}/Banner_managementController/findById`,params);
}

//banner  编辑
export const bannerEdit = params => {
  return axios.post(`${baseUrl.base1}/Banner_managementController/updateById`,params);
}

//banner  删除
export const bannerDel = params => {
  return axios.post(`${baseUrl.base1}/Banner_managementController/deleteById`,params);
}

//banner  列表渲染
export const bannerList = params => {
  return axios.post(`${baseUrl.base1}/Banner_managementController/selectBanner`,params);
}
//                                            用户管理

//用户管理  列表渲染/查询
export const userList = params => {
  return axios.post(`${baseUrl.base1}/CustomerController/selectCustomer`,params);
}

//                                            配套设施
//配套设施  列表渲染
export const baseSetList = params => {
  return axios.post(`${baseUrl.base1}/Facilities_managementController/selectFacilities`,params);
}

//配套设施  新增
export const baseSetAdd = params => {
  return axios.post(`${baseUrl.base1}/Facilities_managementController/save`,params);
}

//配套设施  点击编辑获取信息
export const baseSetGetEditMsg = params => {
  return axios.post(`${baseUrl.base1}/Facilities_managementController/findById`,params);
}

//配套设施  编辑
export const baseSetEdit = params => {
  return axios.post(`${baseUrl.base1}/Facilities_managementController/updateById`,params);
}

//配套设施  删除
export const baseSetDel = params => {
  return axios.post(`${baseUrl.base1}/Facilities_managementController/deleteById`,params);
}




// 组件中获取base地址
export const getBase = () => { 
  return baseObj;
};