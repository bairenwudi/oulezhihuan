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

// 获取直播分类列表(finished)
const directClassList = params => {
    return axios.post(`${baseUrl.base3}/Live_categoryController/selectCategory?startPos=${params.startPos}&pageSize=10`, params);
};

// 新增直播分类(finished)
const directClassAdd = params => {
    return axios.post(`${baseUrl.base3}/Live_categoryController/save`, params);
};

// 编辑直播分类(finished)
const directClassEdit = params => {
    return axios.post(`${baseUrl.base3}/Live_categoryController/updateCategory`, params);
};

// 删除直播分类(finished)
const directClassDel = params => {
    return axios.post(`${baseUrl.base3}/Live_categoryController/deleteCategory`, params);
};

// 获取短视频分类列表
const videoClassList = params => {
    return axios.post(`${baseUrl.base3}/live_video_category/selectVideo?startPos=${params.startPos}&pageSize=10`, params);
};

// 新增短视频分类
const videoClassAdd = params => {
    return axios.post(`${baseUrl.base3}/live_video_category/save`, params);
};

// 删除短视频分类
const videoClassDelete = params => {
    return axios.post(`${baseUrl.base3}/live_video_category/deleteVideo`, params);
};

// 编辑短视频分类
const videoClassUpdate = params => {
    return axios.post(`${baseUrl.base3}/live_video_category/updateVideo`, params);
};

// 获取精彩视频视频分类列表(finished)
const excellentClassList = params => {
    return axios.post(`${baseUrl.base3}/live_video_category/selectVideo?startPos=${params.startPos}&pageSize=10`, params);
};

// 新增精彩视频分类(finished)
const excellentClassAdd = params => {
    return axios.post(`${baseUrl.base3}/live_video_category/save`, params);
};

// 编辑精彩视频分类(finished)
const excellentClassEdit = params => {
    return axios.post(`${baseUrl.base3}/live_video_category/updateVideo`, params);
};

// 删除精彩视频分类(finished)
const excellentClassDel = params => {
    return axios.post(`${baseUrl.base3}/live_video_category/deleteVideo`, params);
};

// 获取直播兴趣爱好标签列表(finished)
const interestLabelList = params => {
    return axios.post(`${baseUrl.base3}/Live_interest_tagController/selectInterest?startPos=${params.startPos}&pageSize=10`, params);
};

// 新增直播兴趣爱好标签(finished)
const interestLabelAdd = params => {
    return axios.post(`${baseUrl.base3}/Live_interest_tagController/save`, params);
};

// 编辑直播兴趣爱好标签(finished)
const interestLabelEdit = params => {
    return axios.post(`${baseUrl.base3}/Live_interest_tagController/updateInterest`, params);
};

// 删除直播兴趣爱好标签(finished)
const interestLabelDel = params => {
    return axios.post(`${baseUrl.base3}/Live_interest_tagController/deleteInterset`, params);
};

// 获取举报原因列表列表(finished)
const reasonList = params => {
    return axios.post(`${baseUrl.base3}/live_report_reasonlistController/selectReason?startPos=${params.startPos}&pageSize=10`, params);
};

// 新增举报原因列表(finished)
const reasonAdd = params => {
    return axios.post(`${baseUrl.base3}/live_report_reasonlistController/save`, params);
};

// 编辑举报原因列表(finished)
const reasonEdit = params => {
    return axios.post(`${baseUrl.base3}/live_report_reasonlistController/updateReason`, params);
};

// 删除举报原因列表(finished)
const reasonDel = params => {
    return axios.post(`${baseUrl.base3}/live_report_reasonlistController/deleteReason`, params);
};

// 获取可提现金额列表(finished)
const AvailableAmountList = params => {
    return axios.post(`${baseUrl.base3}/Live_withdraw_ruleController/findList?startPos=${params.startPos}&pageSize=10`, params);
};

// 新增可提现金额(finished)
const AvailableAmountAdd = params => {
    return axios.post(`${baseUrl.base3}/Live_withdraw_ruleController/saveOrupdate`, params);
};

// 编辑可提现金额(finished)
const AvailableAmountEdit = params => {
    return axios.post(`${baseUrl.base3}/Live_withdraw_ruleController/saveOrupdate`, params);
};

//可提现金额-提现方式(finished)
const moneyWayList = params => {
    return axios.post(`${baseUrl.base3}/Live_withdraw_ruleController/type`, params);
};


// 获取意见反馈列表(finished)
const feedbackList = params => {
    return axios.post(`${baseUrl.base6}/Live_suggestion_infoController/selectSuggestion?pageNum=${params.startPos}&pageSize=10`, params);
};

// 意见反馈模糊查询(finished)
const feedbackSearch = params => {
    return axios.post(`${baseUrl.base6}/Live_suggestion_infoController/selectSuggestion?pageNum=${params.startPos}&pageSize=10`, params);
};

// 获取马甲列表
const vestList = params => {
    return axios.post(`${baseUrl.base2}/Live_RobotManagementController/selectRobots?startPos=${params.startPos}&pageSize=10`, params);
};
// 新增马甲
const vestAdd = params => {
    return axios.post(`${baseUrl.base2}/Live_RobotManagementController/saveRobot`, params);
};
//删除马甲列表
const vestDelete = params =>{
    return axios.post(`${baseUrl.base2}/Live_RobotManagementController/deleteRobot`,params);
}
//编辑马甲列表
const vestEdit = params =>{
    return axios.post(`${baseUrl.base2}/Live_RobotManagementController/updateRobot`,params);
}
// 获取直播推送消息列表
const listPushList = params => {
    return axios.post(`${baseUrl.base2}/Live_PushMessageController/selectPush?startPos=${params.startPos}&pageSize=10`);
};
//直播推送按钮接口
const listPushMsg = params =>{
    return axios.post(`${baseUrl.base2}/LiveController/pushMSG`,params)
}
// 新增直播推送消息
const listPushAdd = params => {
    return axios.post(`${baseUrl.base2}/Live_PushMessageController/save`, params);
};
// 编辑直播推送消息
const listPushEdit = params => {
    return axios.post(`${baseUrl.base2}/Live_PushMessageController/updatePush`, params);
};
// 删除直播推送消息
const listPushDelete = params => {
    return axios.post(`${baseUrl.base2}/Live_PushMessageController/deletePush`, params);
};
// 获取所有分组数据
const getLiveDictionaryItemInfo = params => {
    return axios.post(`${baseUrl.base2}/Live_anchorgroupController/selectGroup`, params); 
}
// 获取直播系统公告内容
const LivebroadcastingsystemannouncementContent = params => {
    return axios.post(`${baseUrl.base2}/Live_PushMessageController/selectPushByid`, params); 
}
// 编辑直播系统公告内容
const LivebroadcastingsystemannouncementContentEdit = params => {
    return axios.post(`${baseUrl.base2}/Live_PushMessageController/updateSystemPush`, params); 
}
// 渲染banner列表
const BannerList = params =>{
    return axios.post(`${baseUrl.base2}/Live_Banner_Management/selectBanner`,params)
}
// 删除banner列表
const BannerListDelete = params =>{
    return axios.post(`${baseUrl.base2}/Live_Banner_Management/deleteById`,params)
}

// 获取机器人规则列表
const robotRulesList = params =>{
    return axios.post(`${baseUrl.base2}/Live_RobotRuleController/selectRole`,params)
}

// 新增机器人规则
const robotRulesEdit = params =>{
    return axios.post(`${baseUrl.base2}/Live_RobotRuleController/update`,params)
}

export {
    getUserListPage,

    directClassList,
    directClassAdd,
    directClassEdit,
    directClassDel,

    videoClassList,
    videoClassAdd,
    videoClassDelete,
    videoClassUpdate,

    excellentClassList,
    excellentClassAdd,
    excellentClassEdit,
    excellentClassDel,

    interestLabelList,
    interestLabelAdd,
    interestLabelEdit,
    interestLabelDel,

    reasonList,
    reasonAdd,
    reasonEdit,
    reasonDel,

    AvailableAmountList,
    AvailableAmountAdd,
    AvailableAmountEdit,
    moneyWayList,

    feedbackList,
    feedbackSearch,
    
    vestList,
    vestAdd,
    vestDelete,
    vestEdit,

    listPushList,
    listPushAdd,
    listPushEdit,
    listPushDelete,
    listPushMsg,
    getLiveDictionaryItemInfo,
    LivebroadcastingsystemannouncementContent,
    LivebroadcastingsystemannouncementContentEdit,

    BannerList,
    BannerListDelete,
    
    robotRulesList,
    robotRulesEdit
}

// 组件中获取base地址
export const getBase = () => { 
    return baseObj;
};


