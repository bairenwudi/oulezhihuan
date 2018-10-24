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

//个人主页  李e彪渲染
const selfPage_List = params => {
  return axios.post(`${baseUrl.base3}/Short_videoController/selectPersonalPage`, params)
};
const selfPage_Detail = params => {
  return axios.post(`${baseUrl.base3}/Short_videoController/selectPersonalPageInfo`, params)
};

//举报原因
const tipOff_List = params => {
  return axios.post(`${baseUrl.base3}/Short_videoController/selectReportList`, params)
};
//举报原因  举报原因下拉框
const tipOff_selReason = params => {
  return axios.post(`${baseUrl.base3}/Short_videoController/selectReason`, params)
};
//举报原因  举报原因下拉框
const tipOff_selResource = params => {
  return axios.post(`${baseUrl.base3}/Short_videoController/select_report_source`, params)
};
//封停帐号  
const tipOff_ListUpdate = params => {
  return axios.post(`${baseUrl.base3}/Short_videoController/updateFH`, params)
};
//解封
const tipOff_jiefeng = params => {
  return axios.post(`${baseUrl.base3}/Short_videoController/deblockingCus`, params)
};

export {
  selfPage_List,
  selfPage_Detail,

  tipOff_List,
  tipOff_selReason,
  tipOff_selResource,
  tipOff_ListUpdate,
  tipOff_jiefeng
}

// 组件中获取base地址
export const getBase = () => {
  return baseObj;
};