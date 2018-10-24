import { CorrectpathObj } from '../index.js';
import axios from 'axios'

const baseUrl = CorrectpathObj.Correctpath;


//投票记录  无数据
const voteRec_List = params => {
  return axios.post(`${baseUrl.base3}/RechargeManagementController/selectVote_log`, params)
};

//助力记录  无数据
const helpRec_List = params => {
  return axios.post(`${baseUrl.base3}/RechargeManagementController/selectAssistance`, params)
};

//助力记录  下拉框
const helpRec_SelList = params => {
  return axios.post(`${baseUrl.base3}/RechargeManagementController/selectGift_name`,params)
};

//提现记录  o
const cashRec_List = params => {
  return axios.post(`${baseUrl.base3}/RechargeManagementController/selectWithdraw_log`, params)
};

//充值记录  o
const rechargeRec_List = params => {
  return axios.post(`${baseUrl.base3}/RechargeManagementController/selectRecharge_log`, params)
};
const coinOrOb_list = params => {
  return axios.get(`${baseUrl.base3}/Live_systemManagement/queryRecharge?pageSize=20`);
};
//消费记录 o
const consumeRec_List = params => {
  return axios.post(`${baseUrl.base3}/RechargeManagementController/selectConsume_log`,params)
};

//礼物记录  跟没数据基本没啥区别   o
const giftRec_List = params => {
  return axios.post(`${baseUrl.base3}/RechargeManagementController/selectGift`, params)
};
const coinDonation_gift = params => {
  return axios.post(`${baseUrl.base3}/Live_GoldManagementController/selectGiftType`)
};
//赠送详情  
const recharge_detail = params => {
  return axios.post(`${baseUrl.base3}/RechargeManagementController/selectPresent`,params)
};
// 
export {
  voteRec_List,
  helpRec_List,
  cashRec_List,
  rechargeRec_List,
  coinOrOb_list,
  consumeRec_List,
  giftRec_List,
  coinDonation_gift,
  recharge_detail,
  helpRec_SelList
}