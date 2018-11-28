
// 年月日时分
export function formatTime(date) {
  var date = new Date(date); //如果date为13位不需要乘1000
  var Y = date.getFullYear() + '-';
  var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
  var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
  var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
  var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) ;
  // var s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
  return Y + M + D + h + m;
}
// 年月日
export function formatTimeDay(date) {
  var date = new Date(date); //如果date为13位不需要乘1000
  var Y = date.getFullYear() + '-';
  var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
  var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
  return Y + M + D;
}

// 年月
export function formatTimeMonth(date) {
  var date = new Date(date); //如果date为13位不需要乘1000
  var Y = date.getFullYear() + '-';
  var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) ;
  // var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
  return Y + M;
}


export function DateDiff(sDate1, sDate2) { //sDate1和sDate2是yyyy-MM-dd格式
  var aDate, oDate1, oDate2, iDays;
  // console.log(sDate1);
  // console.log(sDate2);

  aDate = sDate1.split("-");//1990-10-57
  
  oDate1 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0]); //转换为yyyy-MM-dd格式
  aDate = sDate2.split("-");
  oDate2 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0]);
  iDays = parseInt(Math.abs(oDate1 - oDate2) / 1000 / 60 / 60 / 24); //把相差的毫秒数转换为天数
  return iDays + 1; //返回相差天数
}