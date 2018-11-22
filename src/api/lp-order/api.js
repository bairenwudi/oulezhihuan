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

//App订单列表
const appOrderList = params => {
    return axios.post(`${baseUrl.base2}/Orders_app/select_Orders_app?startPos=${params.startPos}&pageSize=10`, params);
};

//App订单模糊查询
const appOrderSearch = params => {
    return axios.post(`${baseUrl.base2}/Orders_app/select_Orders_app?startPos=${params.startPos}&pageSize=10`, params);
};

// 机构设置-房间类型列表(App订单、退款单、退房单 模糊查询-房型下拉列表渲染)
const roomtypeList = params => {
    return axios.post(`${baseUrl.base2}/Zh_room_typeController/selectRoomType`, params);
};

// App订单模糊查询-机构标题下拉列表渲染
const AppInstitutionalTitleList = params => {
    return axios.post(`${baseUrl.base2}/Orders_app/select_Orders_app`, params);
};


// App订单详情列表-订单信息、订单明细、预订人信息
const appOrderListinfo = params => {
    return axios.post(`${baseUrl.base2}/Orders_app/selectOrdersInfo`, params);
};

// App订单详情列表-入住人
const appOrderListCustomerinfo = params => {
    return axios.post(`${baseUrl.base2}/Orders_app/customerList?startPos=${params.startPos}&pageSize=10`, params);
};



//批量预定订单列表
const batchReservationOrderList = params => {
    return axios.post(`${baseUrl.base2}/BatchReserveController/reserveList?startPos=${params.startPos}&pageSize=10`, params);
};

//批量预定订单模糊查询
const batchReservationOrderSearch = params => {
    return axios.post(`${baseUrl.base2}/BatchReserveController/reserveList?startPos=${params.startPos}&pageSize=10`, params);
};

// 批量预定订单模糊查询-目的地下拉列表渲染
const destinationTitleList = params => {
    return axios.post(`${baseUrl.base2}/BatchReserveController/Select_des`, params);
};

//批量审核列表
const batchAuditList = params => {
    return axios.post(`${baseUrl.base2}/BatchReserveController/reserveList?startPos=${params.startPos}&pageSize=10`, params);
};

//批量审核模糊查询
const batchAuditSearch = params => {
    return axios.post(`${baseUrl.base2}/BatchReserveController/reserveList?startPos=${params.startPos}&pageSize=10`, params);
};

// 批量审核模糊查询-预定机构下拉列表渲染
const batchinstitutionTitleList = params => {
    return axios.post(`${baseUrl.base2}/Admin_userController/selectOrg_name`, params);
};

// 批量审核模糊查询-获取登录的id(adm_id)
const batchIdList = params => {
    return axios.post(`${baseUrl.base2}/Admin_userController/getSessionAdminUser`, params);
};



//退款单列表
const refundList = params => {
    return axios.post(`${baseUrl.base2}/Refund/select_refund?startPos=${params.startPos}&pageSize=10`, params);
};

//退款单模糊查询
const refundListSearch = params => {
    return axios.post(`${baseUrl.base2}/Refund/select_refund?startPos=${params.startPos}&pageSize=10`, params);
};

// 退款单模糊查询-机构标题下拉列表渲染
const RefundInstitutionalTitleList = params => {
    return axios.post(`${baseUrl.base2}/Refund/Select_org_name`, params);
};

// 退款单详情列表-订单信息、订单明细、预订人信息
const RefundListinfo = params => {
    return axios.post(`${baseUrl.base2}/RefundOrderApp/selectRefundOrderInfo`, params);
};

// 退款单详情列表-入住人
const RefundListCustomerinfo = params => {
    return axios.post(`${baseUrl.base2}/RefundOrderApp/customerList?startPos=${params.startPos}&pageSize=10`, params);
};



//退房单列表/详情
const checkoutList = params => {
    return axios.post(`${baseUrl.base2}/check/select_check?startPos=${params.startPos}&pageSize=10`, params);
};

//退房单模糊查询
const checkoutListSearch = params => {
    return axios.post(`${baseUrl.base2}/check/select_check?startPos=${params.startPos}&pageSize=10`, params);
};

// 退房单模糊查询-机构标题下拉列表渲染
const checkoutInstitutionalTitleList = params => {
    return axios.post(`${baseUrl.base2}/check/Select_org_name`, params);
};

// 退房单详情列表-订单信息、订单明细、预订人信息
const checkoutListinfo = params => {
    return axios.post(`${baseUrl.base2}/check/select_check`, params);
};

// 退房单详情列表-入住人
const checkoutListCustomerinfo = params => {
    return axios.post(`${baseUrl.base2}/check/customerList?startPos=${params.startPos}&pageSize=10`, params);
};

//批量预定   新增弹框中的checkboxGroup渲染 房间类型
const destinationCheckbox = params => {
    return axios.post(`${baseUrl.base2}/Zh_room_type_priceController/showRoomPriceList`, params);
}
//批量预定   点击绑定 
const addCustomer = params => {
    return axios.post(`${baseUrl.base2}/Occupant_infoController/occupantList`, params);
}
//批量预定   新增入住人 
const addOccupant = params => {
    return axios.post(`${baseUrl.base2}/Occupant_infoController/saveOccupant`, params);
}
//批量预定   编辑入住人 
const editOccupant = params => {
    return axios.post(`${baseUrl.base2}/Occupant_infoController/updateOccupant`, params);
}
//批量预定   删除入住人 
const delOccupant = params => {
    return axios.post(`${baseUrl.base2}/Occupant_infoController/deleteBatchOccupant`, params);
}
//批量预定   提交按钮 
const submit = params => {
    return axios.post(`${baseUrl.base2}/BatchReserveController/submit`, params);
}
//批量预定   新增 
const addReserve = params => {
    return axios.post(`${baseUrl.base2}/BatchReserveController/saveBatchReserve`, params);
}

export {
    appOrderList, //App订单列表
    appOrderSearch, //App订单模糊查询
    roomtypeList, // App订单、退款单、退房单 -房间类型下拉框渲染
    AppInstitutionalTitleList, //App订单-机构标题下拉框渲染
    appOrderListinfo,//App订单详情列表-订单信息、订单明细、预订人信息
    appOrderListCustomerinfo,// App订单详情列表-入住人
    batchReservationOrderList, //批量预定订单列表
    batchReservationOrderSearch, //批量预定订单模糊查询
    destinationTitleList,// 批量预定订单模糊查询-目的地下拉列表渲染
    batchAuditList,//批量审核列表
    batchAuditSearch,//批量审核模糊查询
    batchinstitutionTitleList,// 批量审核模糊查询-预定机构下拉列表渲染
    batchIdList,//批量审核模糊查询-获取登录的id(adm_id)
    refundList, //退款单列表
    refundListSearch, //退款单模糊查询
    RefundInstitutionalTitleList, //退款单-机构标题下拉框渲染
    RefundListinfo, //退款单详情列表-订单信息、订单明细、预订人信息
    RefundListCustomerinfo, // 退款单详情列表-入住人
    checkoutList, //退房单列表
    checkoutListSearch, //退房单模糊查询
    checkoutInstitutionalTitleList, //退房单-机构标题下拉框渲染
    checkoutListinfo, //退房单详情列表-订单信息、订单明细、预订人信息
    checkoutListCustomerinfo, // 退房单详情列表-入住人
    destinationCheckbox,
    addCustomer,
    addOccupant,
    editOccupant,
    delOccupant,
    submit,
    addReserve,
    
};

// 组件中获取base地址
export const getBase = () => {
    return baseObj;
};


