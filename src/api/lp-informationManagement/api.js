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

//信息管理列表
const informationManagementList = params => {
    return axios.post(`${baseUrl.base2}/organ/selectOrg?startPos=${params.startPos}&pageSize=10`, params);
    //暂无接口
};


export {
    informationManagementList

};

// 组件中获取base地址
export const getBase = () => {
    return baseObj;
};


