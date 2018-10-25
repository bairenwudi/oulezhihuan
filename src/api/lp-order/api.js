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

// 获取精彩视频列表
const selectVideoMsg = params => {
    return axios.post(`${baseUrl.base2}/Live_Video_ManagementController/selectVideoMsg?startPos=${params.startPos}&pageSize=10`, params);
};

// 删除精彩视频
const deleteVideo = params => {
    return axios.post(`${baseUrl.base2}/Live_Video_ManagementController/deleteVideo`, params);
};

// 置顶 stick // 传 1 置顶,传 0 取消置顶 video_id // 主键
const updateStick = params => {
    return axios.post(`${baseUrl.base2}/Live_Video_ManagementController/updateStick`, params);
};

// 获取精彩视频分类
const selectVideo = params => {
    return axios.post(`${baseUrl.base2}/live_video_category/selectVideo?video_type=2`, params);
};

// // 显示权限接口
const selectCusRoles = params => {
    return axios.post(`${baseUrl.base2}/Customer_RoleController/selectCusRoles`, params);
};

// 修改精彩视频
const updateVideoMsg = params => {
    return axios.post(`${baseUrl.base2}/Customer_RoleController/updateVideoMsg`, params);
};

// 获取主播审核列表
const hostAuditList = params => {
    return axios.post(`${baseUrl.base2}/AnchorManagementController/anchorList?startPos=${params.startPos}&pageSize=10`, params);
};

// 主播审核查询
const hostAuditSearch = params => {
    return axios.post(`${baseUrl.base2}/AnchorManagementController/anchorList?startPos=${params.startPos}&pageSize=10`, params);
};

// 审核通过
const hostAuditPass = params => {
    return axios.post(`${baseUrl.base2}/AnchorManagementController/updateByObj`, params);
};

// 获取主播审核详情列表
const hostAuditDetailList = params => {
    return axios.post(`${baseUrl.base2}/AnchorManagementController/anchorList`, params);
};

// 获取用户管理列表
const userManagementList = params => {
    return axios.post(`${baseUrl.base2}/CustomerController/selectCustomer?startPos=${params.startPos}&pageSize=10`, params);
};

// 用户管理查询
const userManagementSearch = params => {
    return axios.post(`${baseUrl.base2}/CustomerController/selectCustomer?startPos=${params.startPos}&pageSize=10`, params);
};

// 获取主播管理列表
const hostManagementList = params => {
    return axios.post(`${baseUrl.base2}/AnchorManagementController/anchorList?startPos=${params.startPos}&pageSize=10`, params);
};

//分组下拉框渲染接口
const groupList = params => {
    return axios.post(`${baseUrl.base2}/Live_anchorgroupController/selectGroup`, params);
}

//分组新增接口
const groupAdd = params => {
    return axios.post(`${baseUrl.base2}/Live_anchorgroupController/save`, params);
}

const moveGroup = params => {
    return axios.post(`${baseUrl.base2}/AnchorManagementController/moveGroupOrClassify`,params)
}

// 主播管理查询
const hostManagementSearch = params => {
    return axios.post(`${baseUrl.base2}/AnchorManagementController/anchorList?startPos=${params.startPos}&pageSize=10`, params);
};

// 获取主播管理详情列表
const hostManagementDetailList = params => {
    return axios.post(`${baseUrl.base2}/AnchorManagementController/selectOneAnchor`, params);
};

// 获取直播分类列表
const directClassList = params => {
    return axios.post(`${baseUrl.base2}/Live_categoryController/selectCategory`, params);
};

// 主播视频上传
const hostManagementVideoUpload = params => {
    return axios.post(`${baseUrl.base2}/AnchorManagementController/anchorOfVideoUpload`, params);
};
//视频删除接口
const hostManagementVideodel = params => {
    return axios.post(`${baseUrl.base2}/AnchorManagementController/deleteAnchorVideo`, params);
};

// 主播视频列表
const videoList = params => {
    return axios.post(`${baseUrl.base2}/AnchorManagementController/anchorVideoList`, params);
};

// 置顶 stick // 传 1 置顶,传 0 取消置顶 cus_id/ // 主键  录播,录屏
const hostManagementStick = params => {
    return axios.post(`${baseUrl.base2}/AnchorManagementController/updateAnchorType`, params);
};

export {
    selectCusRoles,
    selectVideoMsg,
    updateStick,
    selectVideo,
    updateVideoMsg,
    deleteVideo,
    hostAuditList,
    hostAuditSearch,
    hostAuditDetailList,
    hostAuditPass,
    userManagementList,
    
    userManagementSearch,
    hostManagementList,
    groupList,
    groupAdd,
    moveGroup,
    hostManagementSearch,
    hostManagementDetailList,
    directClassList,
    hostManagementVideoUpload,
    videoList,
    hostManagementVideodel,
    hostManagementStick

};

// 组件中获取base地址
export const getBase = () => {
    return baseObj;
};


