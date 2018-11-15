import axios from 'axios';

// let base = 'http://192.168.1.6:8848';

let base = 'http://192.168.1.39:8080';

// let base = 'http://192.168.1.11:8080';

// 分页
export const getUserListPage = params => { 
    return axios.get(`${base}/Hot_city_managementController/selectHotCity?startPos=${params.startPos}&pageSize=10`);
};