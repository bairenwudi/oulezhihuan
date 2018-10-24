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

// 获取助力礼物列表
const helpGiftList = params => {
    return axios.post(`${baseUrl.base2}/Live_GiftManagementController/selectAssistanceGift?startPos=${params.startPos}&pageSize=10`, params);
};
// 助力礼物查询
const helpGiftSearch = params => {
    return axios.post(`${baseUrl.base2}/Live_GiftManagementController/selectAssistanceGiftLikeName?startPos=${params.startPos}&pageSize=10`, params);
};
// 助力礼物更新上线
const helpGiftUpdateStatus = params => {
    return axios.post(`${baseUrl.base2}/Live_GiftManagementController/updateStatus?startPos=${params.startPos}&pageSize=10`, params);
};
//礼物删除
const GiftDelete = params =>{
    return axios.post(`${baseUrl.base2}/Live_GiftManagementController/deleteGift`, params);
}
//新增助力礼物
const helpGiftListAdd = params =>{
    return axios.post(`${baseUrl.base2}/Live_GiftManagementController/saveAssistanceGift`, params);
}
// 获取金币礼物列表
const goldGiftList = params => {
    return axios.post(`${baseUrl.base2}/Live_GiftManagementController/selectGoldGift?startPos=${params.startPos}&pageSize=10`, params);
};
// 金币礼物查询
const goldGiftSearch = params => {
    return axios.post(`${baseUrl.base2}/Live_GiftManagementController/selectGoldGiftLikeName?startPos=${params.startPos}&pageSize=10`, params);
};

// 获取特惠礼物列表
const specialGiftList = params => {
    return axios.post(`${baseUrl.base2}/Live_GiftManagementController/selectPreferenceGift?startPos=${params.startPos}&pageSize=10`, params);
};
// 特惠礼物查询
const specialGiftSearch = params => {
    return axios.post(`${baseUrl.base2}/Live_GiftManagementController/selectPreferenceGiftLikeName?startPos=${params.startPos}&pageSize=10`, params);
};
// 新增特惠礼物
const savePreferenceGift = params =>{
    return axios.post(`${baseUrl.base2}/Live_GiftManagementController/savePreferenceGift`,params);
}
// 删除特惠礼物
const deletePreferenceGift = params =>{
    return axios.post(`${baseUrl.base2}/Live_GiftManagementController/deleteGift`,params);
}
// 编辑特惠礼物
const updatePreferenceGift = params =>{
    return axios.post(`${baseUrl.base2}/Live_GiftManagementController/updateGift`,params);
}
 // 特惠礼物-新增-选择礼物
const ChooseGift = params =>{
    return axios.post(`${baseUrl.base2}/Live_GiftManagementController/getGiftAll`,params);    
}
//我的包裹
const myParcelList = para=>{
    return axios.post(`${baseUrl.base2}/Live_GiftManagementController/selectBalance?pageNum=${para.pageNum}&pageSize=10`, para);    
}
//我的包裹内所有礼物类型
const myParcelGiftType = para=>{
    return axios.post(`${baseUrl.base2}/Live_GoldManagementController/selectGiftType`);    
}

export {
    helpGiftList,
    helpGiftSearch,  //助力礼物查询
    helpGiftUpdateStatus, //助力礼物更新上线
    GiftDelete, //删除礼物
    helpGiftListAdd,//新增礼物
    goldGiftList,
    goldGiftSearch,  //金币礼物查询
    specialGiftList,
    specialGiftSearch, //特惠礼物查询
    myParcelList,    //我的包裹 
    myParcelGiftType, //包裹礼物类型
    savePreferenceGift,  //新增特惠礼物
    deletePreferenceGift,
    updatePreferenceGift,
    ChooseGift
    // SearchPreferenceGift
}

// 组件中获取base地址
export const getBase = () => {
    return baseObj;
};


