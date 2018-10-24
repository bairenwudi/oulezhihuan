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

// 公用的接口
// 获取所有省
const selectAllProvince = params => {
    return axios.get(`${baseUrl.base3}/Live_VoteActivityManageController/selectProvinceInfo`, params);
}

// 获取所有市
const selectCity = params => {
    return axios.get(`${baseUrl.base3}/Live_VoteActivityManageController/selectCityByProvinceId?province_code=${params.province_code}`);
}

// 获取群体类型
const selectGroupType = params => {
    return axios.post(`${baseUrl.base3}/Live_VoteActivityManageController/selectGroupType`, params);
}

// 所有活动页面接口

// 获取所有活动
const getAllActivity =  params => {
    return axios.post(`${baseUrl.base3}/Live_VoteActivityManageController/selectVoteActivity?startPos=${params.startPos}&pageSize=10`, params);
}

// 保存
const saveActivity = params => {
    return axios.post(`${baseUrl.base3}/Live_VoteActivityManageController/createActivity`, params);
}

// 编辑
const updateActivity = params => {
    return axios.post(`${baseUrl.base3}/Live_VoteActivityManageController/updateActivity`, params);
}

// 删除
const delActivity = params => {
    return axios.post(`${baseUrl.base3}/Live_VoteActivityManageController/deleteActivity`, params);
}

// 绑定上级活动  参数是上级活动id为ancestor，下级活动id为descendent
const bindActivityTree = params => {
    return axios.post(`${baseUrl.base3}/Live_VoteActivityManageController/bindActivityTree`, params);
}

// 保存机构与活动的关联关系     参数为activity_id, department_id
const updateActivityOrg = params => {
    return axios.post(`${baseUrl.base3}/Live_VoteActivityManageController/updateActivityOrg`, params);
}

// 上下线
const downLineActivity = params => {
    return axios.post(`${baseUrl.base3}/Live_VoteActivityManageController/downLineActivity`, params);
}


// activity_id, department_id

// 查询所有机构
const lstSysOrgs = params => {
    return axios.post(`${baseUrl.base3}/sysOrgController/lstSysOrgs`, params);
}

// 活动关联轮次     参数是activity_id和轮次的数组turnIds[]
const activityRelationTurns = params => {
    return axios.post(`${baseUrl.base3}/Live_VoteActivityManageController/activityRelationTurns`, params);
}

// 查看详情
const WactchActivityInfo = params => {
    return axios.post(`${baseUrl.base3}/Live_VoteActivityManageController/selectActivityDetails`, params);
}

// 活动关联规则
const activityRelationRules = params => {
    return axios.post(`${baseUrl.base3}/Live_VoteActivityManageController/activityRelationRules`, params);
}




// 所有轮次接口

// 获取所有轮次
const getAllrounds =  params => {
    return axios.post(`${baseUrl.base3}/Live_TurnsManageController/selectTurnsList?startPos=${params.startPos}&pageSize=10`, params);
}

// 新增轮次
const addRounds = params => {
    return axios.post(`${baseUrl.base3}/Live_TurnsManageController/insertTurn`, params);
}

// 编辑轮次
const editRounds = params => {
    return axios.post(`${baseUrl.base3}/Live_TurnsManageController/updateTurn`, params);
}

// 轮次状态  0：未开启  1：进行中  2：已结束  3：未绑定
// 活动状态 0上线 1下线 2已结束 3未开始
 // 0 已晋级  1 未晋级
// 删除
const deleteTurn = params => {
    return axios.post(`${baseUrl.base3}/Live_TurnsManageController/deleteTurn?turn_id=${params.turn_id}&turn_status=${params.turn_status}`);
}

// turn_id  turn_status  ruleIds

// 轮次关联规则
const trunRelationRules = params => {
    return axios.post(`${baseUrl.base3}/Live_TurnsManageController/trunRelationRules`, params);
}


// 所有规则管理

// 添加规则管理
const addRule = params => {
    return axios.post(`${baseUrl.base3}/Live_RulesManageController/insertRule?rule_name=${params.rule_name}&rule_description=${params.rule_description}&rule_parameter=${params.rule_parameter}&tech_description=${params.tech_description}`);
}

// 编辑规则管理
const editRule = params => {
    return axios.post(`${baseUrl.base3}/Live_RulesManageController/updateRule?rule_id=${params.rule_id}&rule_name=${params.rule_name}&rule_description=${params.rule_description}&rule_parameter=${params.rule_parameter}&tech_description=${params.tech_description}`);
}

// 查询规则管理
const SearchRule = params => {
    return axios.post(`${baseUrl.base3}/Live_RulesManageController/selectRulesList?startPos=${params.startPos}&pageSize=10`, params);
}

// 删除规则管理
const delRule = params => {
    return axios.post(`${baseUrl.base3}/Live_RulesManageController/deleteRule?rule_id=${params.rule_id}`);
}



// 活动报名

// 查询
const selectAdminSignUpList = params => {
    return axios.post(`${baseUrl.base3}/Live_Activity_Admin_SignUpManageController/selectAdminSignUpList`, params);
}

// 获取报名处理页面没有的节目信息数据  (team_id,audit_status,refuse_reason)  
const selectSignUpInfo = params => {
    return axios.post(`${baseUrl.base3}/Live_UploadSignUpVideoController/selectSignUpInfo`, params);
}

// 点击确定进行处理
const updateAuditStatus = params => {
    return axios.post(`${baseUrl.base3}/Live_Activity_Admin_SignUpManageController/updateAuditStatus`, params);
}

// 获取轮次的晋级节目   turn_id
const queryTurnAllPrograms = params => {
    return axios.post(`${baseUrl.base3}/springPromotionController/queryTurnAllPrograms`, params);
}

// 获取活动的晋级节目   activity_id
const queryActivityAllPrograms = params => {
    return axios.post(`${baseUrl.base3}/springPromotionController/queryActivityAllPrograms`, params);
}


// 轮次计算晋级   参数turn_id
const turnPromotionCalculate = params => {
    return axios.post(`${baseUrl.base3}/springPromotionController/turnPromotionCalculate`, params);
}


// 活动计算晋级 参数activity_id
const activityPromotionCalculate = params => {
    return axios.post(`${baseUrl.base3}/springPromotionController/activityPromotionCalculate`, params);
}


// 轮次手动晋级 参数turn_id， 节目id数组--vedioIds
const turnPromotionHandle = params => {
    return axios.post(`${baseUrl.base3}/springPromotionController/turnPromotionHandle`, params);
}


// 活动手动计算晋级 参数activity_id，节目id数组--vedioIds
const activityPromotionHandle = params => {
    return axios.post(`${baseUrl.base3}/springPromotionController/activityPromotionHandle`, params);
}



// 联动

// 活动和轮次的联动
const activityTrunLinkage = params => {
    return axios.post(`${baseUrl.base3}/Live_VoteActivityManageController/activityTrunLinkage`, params);
}

// 轮次和规则的联动
const trunRuleLinkage = params => {
    return axios.post(`${baseUrl.base3}/Live_TurnsManageController/trunRuleLinkage`, params);
}

// 视频  返回Token
const getTencentToken = params => {
    return axios.post(`${baseUrl.base3}/TencentTokenController/getTencentToken`, params);
}

// 查询报名视频列表
const selectSignUpVideoList = params => {
    return axios.post(`${baseUrl.base3}/Live_UploadSignUpVideoController/selectSignUpVideoList`, params);
}

// 绑定报名的视频和封面
const bindSignUpCoverAndVideo = params => {
    return axios.post(`${baseUrl.base3}/Live_UploadSignUpVideoController/bindSignUpCoverAndVideo`, params);
}

// 获取报名赛区
const selectProvinceCityName = params => {
    return axios.post(`${baseUrl.base3}/Live_Activity_Admin_SignUpManageController/selectProvinceCityName`, params);
}

// 单个节目进行删除
const deleteProgramToTurn = params => {
    return axios.post(`${baseUrl.base3}/springPromotionController/deleteProgramToTurn`, params);
}

// 单个节目进行编辑
const updateProgramToTurnInfo = params => {
    return axios.post(`${baseUrl.base3}/springPromotionController/updateProgramToTurnInfo`, params);
}

// 全部晋级
const allProgramPromotion = params => {
    return axios.post(`${baseUrl.base3}/springPromotionController/allProgramPromotion?turn_id=${params.turn_id}`, params);
}

// 解除绑定
const releaseActivityRelation = params => {
    return axios.post(`${baseUrl.base3}/Live_VoteActivityManageController/releaseActivityRelation`, params);
}

// 手动开始或者结束(活动)  activity_id  activity_status(状态:0上线 1下线 2已结束 3未开始)
const activityStartOrEnd = params => {
    return axios.post(`${baseUrl.base3}/Live_VoteActivityManageController/activityStartOrEnd`, params);
}

// 手动开始或者结束(轮次)   turn_id  turn_status(轮次状态0：未开启 1：进行中 2：已结束 3：未绑定 4：已晋级)
const turnStartOrEnd = params => {
    return axios.post(`${baseUrl.base3}/Live_TurnsManageController/turnStartOrEnd`, params);
}

// -修改活动时间
const updateActivityTime = params => {
    return axios.post(`${baseUrl.base3}/Live_VoteActivityManageController/updateActivityTime`, params);
}

// -修改轮次时间
const updateTurnTime = params => {
    return axios.post(`${baseUrl.base3}/Live_TurnsManageController/updateTurnTime`, params);
}



export {
    turnPromotionCalculate,
    activityPromotionCalculate,
    turnPromotionHandle,
    activityPromotionHandle,
    getAllActivity,
    getAllrounds,
    saveActivity,
    updateActivity,
    delActivity,
    activityRelationTurns,
    bindActivityTree,
    addRounds,
    lstSysOrgs,
    selectAllProvince,
    selectCity,
    deleteTurn,
    editRounds,
    addRule,
    SearchRule,
    delRule,
    editRule,
    updateActivityOrg,
    selectGroupType,
    WactchActivityInfo,
    downLineActivity,
    trunRelationRules,
    selectAdminSignUpList,
    updateAuditStatus,
    selectSignUpInfo,
    queryTurnAllPrograms,
    queryActivityAllPrograms,
    activityRelationRules,
    activityTrunLinkage,
    trunRuleLinkage,
    getTencentToken,
    selectSignUpVideoList,
    bindSignUpCoverAndVideo,
    selectProvinceCityName,
    deleteProgramToTurn,
    updateProgramToTurnInfo,
    allProgramPromotion,
    releaseActivityRelation,
    activityStartOrEnd,
    turnStartOrEnd,
    updateActivityTime,
    updateTurnTime,
}

// 组件中获取base地址
export const getBase = () => {
    return baseObj;
};