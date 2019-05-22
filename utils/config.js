import {
  wxRequest
} from '@/utils/wxRequest';

let env = "-test" //-dev 或者 -test
const apiMall = 'https://sujiefs.com/';

const apiCis = 'http://10.20.3.222:14081/gateway/educational';

//微信的jscode换取sessionKey
const wxJsCode2Session = (params) => wxRequest(params, apiMall + "/api/wechat/jscode2session");
const user2session = (params) => wxRequest(params, apiMall + "/api/wechat/user2session?jsoncallback=?");
//const login = (params) => wxRequest(params, apiMall + "/api/wechat/user2session?jsoncallback=?");
const apiLogin = (params) => wxRequest(params, apiCis + "/api/user/login");
const apiUserInfo = (params) => wxRequest(params, apiCis + "/appCustomer/customerDetail");
const countDown = (params) => wxRequest(params, apiCis + "/postgraduate/countDown");
const apiVerify = (params) => wxRequest(params, apiCis + "/api/user/sendSms");
const apiForget = (params) => wxRequest(params, apiCis + "/api/user/forgetPassword");
const apiModifyPwd = (params) => wxRequest(params, apiCis + "/api/user/updatePassWord");
//我的二维码
const apiMyQRCode = (params) => wxRequest(params, apiCis + "/app/student/QRcoderation");
const apiCreateQR = (params) => wxRequest(params, apiCis + "/api/appCodeClass/classQRCodeGeneration");
const apiScanScheduleQR = (params) => wxRequest(params, apiCis + "/api/appCodeClass/stuScanQRCode");
const apiScanClassQR = (params) => wxRequest(params, apiCis + "/api/appCodeClass/stuScanClassQRCode");
const selectVideoCategory = (params) => wxRequest(params, apiCis + "/app/appturnpicturecontroller/selectVideoCategory");
const canEnter = (params) => wxRequest(params, apiCis + "/api/user/canEnter");
const unReadMsgNum = (params) => wxRequest(params, apiCis + "/message/unReadMsgNum");
const getNewsList = (params) => wxRequest(params, apiCis + "/message/getNewsList");
const customerDetail = (params) => wxRequest(params, apiCis + "/appCustomer/customerDetail");
const bindMobil = (params) => wxRequest(params, apiCis + "/api/user/bindMobile");
const appPunchRecord = (params) => wxRequest(params, apiCis + "/appCustomer/appPunchRecord");
const apiUserSchedule = (params) => wxRequest(params, apiCis + "/studentSchedule/getStudentSchedule")
export default {
  wxJsCode2Session,
  user2session,
  apiLogin,
  apiVerify,
  apiForget,
  apiModifyPwd,
  selectVideoCategory,
  canEnter,
  countDown,
  apiUserInfo,
  unReadMsgNum,
  apiCreateQR,
  apiScanScheduleQR,
  apiScanClassQR,
  bindMobil,
  apiMyQRCode,
  getNewsList,
  customerDetail,
  appPunchRecord,
  apiUserSchedule
}