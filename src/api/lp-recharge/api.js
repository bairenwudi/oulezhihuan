import { CorrectpathObj } from '../index.js';
import axios from 'axios'

const baseUrl = CorrectpathObj.Correctpath;


//自定义兑换规则
const selfcharge_List = params => {
  return axios.get(`${baseUrl.base1}/Live_recharge_convertController/queryConvert?pageNum=${params.pageNum}&pageSize=10`)
};

const selfcharge_selList = params => {
  return axios.get(`${baseUrl.base1}/Live_recharge_convertController/queryDownBox`)
}; //下拉框接口

const selfcharge_add = params => {
  return axios.post(`${baseUrl.base1}/Live_recharge_convertController/insertConvert`, params)
};

const selfcharge_del = params => {
  return axios.post(`${baseUrl.base1}/Live_recharge_convertController/deleteConvert`, params)
};

const selfcharge_getEdit = params => {
  return axios.post(`${baseUrl.base1}/Live_recharge_convertController/queryConvert`, params)
};

const selfcharge_edit = params => {
  return axios.post(`${baseUrl.base1}/Live_recharge_convertController/updateConvert`, params)
};


//自定义充值规则管理
const customRules_List = params => {
  return axios.get(`${baseUrl.base1}/Live_recharge_ruleController/queryRecharge_rule?pageNum=${params.pageNum}&pageSize=10`)
};

const customRules_selList = params => {
  return axios.get(`${baseUrl.base1}/Live_recharge_ruleController/queryPayType`)
}; //下拉框接口

const customRules_add = params => {
  return axios.post(`${baseUrl.base1}/Live_recharge_ruleController/insertRecharge_rule`, params)
};

const customRules_del = params => {
  return axios.post(`${baseUrl.base1}/Live_recharge_ruleController/deleteRecharge_rule`, params)
};

const customRules_getEdit = params => {
  return axios.post(`${baseUrl.base1}/Live_recharge_ruleController/queryRecharge_rule`, params)
};

const customRules_edit = params => {
  return axios.post(`${baseUrl.base1}/Live_recharge_ruleController/updateRecharge_rule`, params)
};

//金币金额及赠送管理
const coinDonation_List = params => {
  return axios.get(`${baseUrl.base1}/Live_GoldManagementController/selectGolds?startPos=${params.startPos}&pageSize=10`)
};

const coinDonation_add = params => {
  return axios.post(`${baseUrl.base1}/Live_GoldManagementController/save`, params)
};

const coinDonation_del = params => {
  return axios.post(`${baseUrl.base1}/Live_GoldManagementController/deleteGold`, params)
};

const coinDonation_getEdit = params => {
  return axios.post(`${baseUrl.base1}/Live_GoldManagementController/selectGoldByid`, params)
};

const coinDonation_edit = params => {
  return axios.post(`${baseUrl.base1}/Live_GoldManagementController/updateGold`, params)
};

const coinDonation_gift = params => {
  return axios.post(`${baseUrl.base1}/Live_GoldManagementController/selectGiftType`)
};

const coinDonation_Allgifts = params => {
  return axios.get(`${baseUrl.base1}/Live_GoldManagementController/selectGift?type_id=${params.type_id}`)
};

const coinDonation_getCoin = params => {
  return axios.post(`${baseUrl.base1}/Live_GoldManagementController/getGolds`,params)// 查询换算后金币数
};

const coinDonation_donation = params => {
  return axios.post(`${baseUrl.base1}/Live_GoldManagementController/updateGoldName`,params)
};

// //鸥币金额及赠送管理
const obDonation_List = params => {
  return axios.get(`${baseUrl.base1}/Live_OBGoldsManagementController/selectGolds?startPos=${params.startPos}&pageSize=10`)
};

const obDonation_add = params => {
  return axios.post(`${baseUrl.base1}/Live_OBGoldsManagementController/save`, params)
};

const obDonation_del = params => {
  return axios.post(`${baseUrl.base1}/Live_OBGoldsManagementController/deleteGold`, params)
};

const obDonation_getEdit = params => {
  return axios.post(`${baseUrl.base1}/Live_OBGoldsManagementController/selectGoldByid`, params)
};

const obDonation_edit = params => {
  return axios.post(`${baseUrl.base1}/Live_OBGoldsManagementController/updateGold`, params)
};

const obDonation_gift = params => {
  return axios.post(`${baseUrl.base1}/Live_OBGoldsManagementController/selectGiftType`)
};

const obDonation_Allgifts = params => {
  return axios.get(`${baseUrl.base1}/Live_OBGoldsManagementController/selectGift?type_id=${params.type_id}`)
};

const obDonation_getCoin = params => {
  return axios.post(`${baseUrl.base1}/Live_OBGoldsManagementController/getOB`,params)// 查询换算后金币数
};

const obDonation_donation = params => {
  return axios.post(`${baseUrl.base1}/Live_OBGoldsManagementController/updateGoldName`,params)
};
export {
  selfcharge_List,
  selfcharge_selList,
  selfcharge_add,
  selfcharge_del,
  selfcharge_getEdit,
  selfcharge_edit,
  
  customRules_List,
  customRules_selList,
  customRules_add,
  customRules_del,
  customRules_getEdit,
  customRules_edit,

  coinDonation_List,
  coinDonation_add,
  coinDonation_del,
  coinDonation_getEdit,
  coinDonation_edit,
  coinDonation_gift,//获取复选框礼物类型
  coinDonation_Allgifts,//获取礼物(带图片)
  coinDonation_getCoin,// 查询换算后金币数
  coinDonation_donation,

  obDonation_List,
  obDonation_add,
  obDonation_del,
  obDonation_getEdit,
  obDonation_edit,
  obDonation_gift,//获取复选框礼物类型
  obDonation_Allgifts,//获取礼物(带图片)
  obDonation_getCoin,// 查询换算后金币数
  obDonation_donation
}