// api 基本路径
const apiMall  = 'https://sujiefs.com/'
const basePath = 'http://10.20.3.151:14081/gateway/educational'

const api = {
  login: basePath + '/api/user/login', // 登录
  sendSms: basePath + '/api/user/sendSms', // 获取短信验证码
  getStudentSchedule: basePath + '/studentSchedule/getStudentSchedule', // 我的课表
  recentStudentSchedule: basePath + '/studentSchedule/search', // 近期课表
  scheduleDetail: basePath + '/studentSchedule/selectClassScheduleDetail', // 课程详情
  postQRcode: basePath + '/app/student/QRcoderation', // 我的二维码
  customerDetail: basePath + '/appCustomer/customerDetail', // 个人信息
  countDown: basePath + '/postgraduate/countDown', // 考研倒计时
  msgNum: basePath + '/message/unReadMsgNum', // 未读消息数
  classInfoList: basePath + '/message/getNewsList', // 上课提醒列表
  codeRecord: basePath + '/appCustomer/appPunchRecord', // 扫码记录
  getAdditionalList: basePath + '/additionalClassApply/getAdditionalClassApplyList', // 附加课申请列表
  getAdditionalDetail: basePath + '/additionalClassApply/getAdditionalClassApplyDetail', // 附加课详情
  getAllCourseCategory: basePath + '/additionalClassApply/getAllCourseCategory', // 获取学员已购买科目列表
  getClassTypeList: basePath + '/additionalClassApply/getClassTypeList', // 获取班型列表
  getClassList: basePath + '/additionalClassApply/getClassList', // 获取班级列表
  commitAdditional: basePath + '/additionalClassApply/commitAdditional', // 提交附加课申请
}

module.exports = api