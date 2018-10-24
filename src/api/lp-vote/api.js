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
const selectVote =  params => {
    return axios.post(`${baseUrl.base3}/VoteSystemController/selectVote`, params);
}

// 点击编辑获取单个活动信息
const selectVoteInfo = params => {
    return axios.post(`${baseUrl.base3}/VoteSystemController/selectVoteInfo`, params);
}

// 点击提交
const updateGradeAndTickets = params => {
    return axios.post(`${baseUrl.base3}/VoteSystemController/updateGradeAndTickets`, params);
}

// 取消原因
const updateReason = params => {
    return axios.post(`${baseUrl.base3}/VoteSystemController/updateReason?id=${params.id}&disqualified_reason=${params.disqualified_reason}`);
}

// 下载excel
const VotedownloadAllExcelData = params => {
    return axios.post(`${baseUrl.base3}/VoteSystemController/VotedownloadAllExcelData`, params);
}


export {
    selectVote,
    selectVoteInfo,
    updateGradeAndTickets,
    updateReason,
    VotedownloadAllExcelData,
}

// 组件中获取base地址
export const getBase = () => { 
    return baseObj;
};


