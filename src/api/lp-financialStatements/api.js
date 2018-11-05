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

//财务报表列表
const financialStatementsList = params => {
    return axios.post(`${baseUrl.base3}/FinanceController/select_finance?startPos=${params.startPos}&pageSize=10`, params);
};

//财务报表模糊查询
const financialStatementsSearch = params => {
    return axios.post(`${baseUrl.base3}/FinanceController/select_finance?startPos=${params.startPos}&pageSize=10`, params);
};



export {
    financialStatementsList, //财务报表列表
    financialStatementsSearch, //财务报表模糊查询
};

// 组件中获取base地址
export const getBase = () => {
    return baseObj;
};


