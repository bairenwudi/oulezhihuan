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

//用户管理列表
const userManagementList = params => {
    return axios.post(`${baseUrl.base2}/CustomerController/selectCustomer?startPos=${params.startPos}&pageSize=10`, params);
};

//用户管理模糊查询
const userManagementSearch = params => {
    return axios.post(`${baseUrl.base2}/CustomerController/selectCustomer?startPos=${params.startPos}&pageSize=10`, params);
};




//banner管理列表
const bannerManagementList = params => {
    return axios.post(`${baseUrl.base2}/Banner_managementController/selectBanner?startPos=${params.startPos}&pageSize=10`, params);
};

//banner管理新增
const bannerManagementAdd = params => {
    return axios.post(`${baseUrl.base2}/Banner_managementController/save`, params);
}

//banner管理修改
const bannerManagementEdit = params => {
    return axios.post(`${baseUrl.base2}/Banner_managementController/updateById`, params);
}

//banner管理删除
const bannerManagementDel = params => {
    return axios.post(`${baseUrl.base2}/Banner_managementController/deleteById`, params);
}





//热门城市管理列表
const hotCityManagementList = params => {
    return axios.post(`${baseUrl.base2}/Hot_city_managementController/selectHotCity?startPos=${params.startPos}&pageSize=10`, params);
};

//热门城市管理新增
const hotCityManagementAdd = params => {
    return axios.post(`${baseUrl.base2}/Hot_city_managementController/save`, params);
}

//热门城市管理修改
const hotCityManagementEdit = params => {
    return axios.post(`${baseUrl.base2}/Hot_city_managementController/updateById`, params);
}

//热门城市管理删除
const hotCityManagementDel = params => {
    return axios.post(`${baseUrl.base2}/Hot_city_managementController/deleteById`, params);
}

//热门城市管理 省 列表渲染
const hotCityPList = params => {
    return axios.post(`${baseUrl.base2}/Region_province_infoController/findAll`, params);
}

//热门城市管理 市 列表渲染
const hotCityCList = params => {
    return axios.post(`${baseUrl.base2}/Region_city_infoController/findAll`, params);
}
//热门城市管理 点击编辑获取信息
const hotCityGetEditMessage = params => {
    return axios.post(`${baseUrl.base2}/Hot_city_managementController/selectHotCityByObj`, params);
}

// 评价管理列表
const evaluationManagementList = params => {
    return axios.post(`${baseUrl.base2}/Facilities_managementController/selectFacilities?startPos=${params.startPos}&pageSize=10`, params);
};//暂无接口

//评价管理-置顶
const evaluationManagementTop = params => {
    return axios.post(`${baseUrl.base2}/Facilities_managementController/deleteById`, params);
};//暂无接口

// 评价管理删除
const evaluationManagementDel = params => {
    return axios.post(`${baseUrl.base2}/Facilities_managementController/deleteById`, params);
};//暂无接口

// 评价管理模糊查询-机构标题下拉列表渲染
const evaluationManagementTitleList = params => {
    return axios.post(`${baseUrl.base2}/Orders_app/Select_org_name`, params);
};//暂无接口



//配套设施管理列表
const supportingFacilitiesList = params => {
    return axios.post(`${baseUrl.base2}/Facilities_managementController/selectFacilities?startPos=${params.startPos}&pageSize=10`, params);
};

//配套设施管理新增
const supportingFacilitiesAdd = params => {
    return axios.post(`${baseUrl.base2}/Facilities_managementController/save`, params);
}

//配套设施管理修改
const supportingFacilitiesEdit = params => {
    return axios.post(`${baseUrl.base2}/Facilities_managementController/updateById`, params);
}

//配套设施管理删除
const supportingFacilitiesDel = params => {
    return axios.post(`${baseUrl.base2}/Facilities_managementController/deleteById`, params);
}





//意见反馈列表
const FeedbackList = params => {
    return axios.post(`${baseUrl.base2}/Live_suggestion_infoController/selectSuggestion?startPos=${params.startPos}&pageSize=10`, params);
};

//意见反馈模糊查询
const FeedbackSearch = params => {
    return axios.post(`${baseUrl.base2}/Live_suggestion_infoController/selectSuggestion?startPos=${params.startPos}&pageSize=10`, params);
};

export {
    userManagementList, //用户管理列表
    userManagementSearch, //用户管理模糊查询
    bannerManagementList, //banner管理列表
    bannerManagementAdd,//banner管理添加
    bannerManagementEdit,//banner管理编辑
    bannerManagementDel,//banner管理删除
    hotCityManagementList, //热门城市管理列表
    hotCityManagementAdd,//热门城市管理添加
    hotCityManagementEdit,//热门城市管理编辑
    hotCityManagementDel,//热门城市管理删除
    hotCityGetEditMessage,//热门城市管理点击编辑获取信息
    hotCityPList,//热门城市管理 省 列表渲染
    hotCityCList,//热门城市管理删除 市 列表渲染
    evaluationManagementList,//评价管理列表  //暂无接口
    evaluationManagementDel,//评价管理删除   //暂无接口
    evaluationManagementTop,//评价管理-置顶  //暂无接口
    evaluationManagementTitleList,//评价管理模糊查询-机构标题下拉列表渲染  //暂无接口
    supportingFacilitiesList, //配套设施管理列表
    supportingFacilitiesAdd,//配套设施管理添加
    supportingFacilitiesEdit,//配套设施管理编辑
    supportingFacilitiesDel,//配套设施管理删除
    FeedbackList, //意见反馈列表
    FeedbackSearch, //意见反馈模糊查询
};

// 组件中获取base地址
export const getBase = () => {
    return baseObj;
};


