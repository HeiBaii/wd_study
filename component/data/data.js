Page({
  data: {
    year: 0,
    month: 0,
    date: ['日', '一', '二', '三', '四', '五', '六'],
    dateArr: [],
    isToday: 0,
    isTodayWeek: false,
    todayIndex: 0,
    lastX: 0, // 滑动开始x轴位置
    lastY: 0, // 滑动开始y轴位置
    tx: 0, // 滑动结束x轴位置
    ty: 0 // 滑动结束y轴的位置
  },
  onLoad: function () {
    let now = new Date();
    let year = now.getFullYear();
    let month = now.getMonth() + 1;
    this.dateInit();
    this.setData({
      year: year,
      month: month,
      isToday: '' + year + month + now.getDate()
    })
  },
  dateInit: function (setYear, setMonth) {
    //全部时间的月份都是按0~11基准，显示月份才+1
    let dateArr = [];                        //需要遍历的日历数组数据
    let arrLen = 0;                            //dateArr的数组长度
    let now = setYear ? new Date(setYear, setMonth) : new Date();
    let year = setYear || now.getFullYear();
    let nextYear = 0;
    let month = setMonth || now.getMonth();                    //没有+1方便后面计算当月总天数
    let nextMonth = (month + 1) > 11 ? 1 : (month + 1);
    let startWeek = new Date(year + ',' + (month + 1) + ',' + 1).getDay();                            //目标月1号对应的星期
    let dayNums = new Date(year, nextMonth, 0).getDate();                //获取目标月有多少天
    let obj = {};
    let num = 0;

    if (month + 1 > 11) {
      nextYear = year + 1;
      dayNums = new Date(nextYear, nextMonth, 0).getDate();
    }
    arrLen = startWeek + dayNums;
    for (let i = 0; i < arrLen; i++) {
      if (i >= startWeek) {
        num = i - startWeek + 1;
        obj = {
          isToday: '' + year + (month + 1) + num,
          dateNum: num,
          weight: 5
        }
      } else {
        obj = {};
      }
      dateArr[i] = obj;
    }
    this.setData({
      dateArr: dateArr
    })
    let nowDate = new Date();
    let nowYear = nowDate.getFullYear();
    let nowMonth = nowDate.getMonth() + 1;
    let nowWeek = nowDate.getDay();
    let getYear = setYear || nowYear;
    let getMonth = setMonth >= 0 ? (setMonth + 1) : nowMonth;

    // if (nowYear == getYear && nowMonth == getMonth) {
    //   this.setData({
    //     isTodayWeek: true,
    //     todayIndex: nowWeek
    //   })
    // } else {
    //   this.setData({
    //     isTodayWeek: false,
    //     todayIndex: -1
    //   })
    // }
  },
  //滑动移动事件
  handletouchmove (event) {
    var currentX = event.touches[0].pageX
    var currentY = event.touches[0].pageY
    this.data.tx = currentX - this.data.lastX
    this.data.ty = currentY - this.data.lastY
    //将当前坐标进行保存以进行下一次计算
    this.data.lastX = currentX
    this.data.lastY = currentY
  },
  // 滑动结束事件
  handletouchend: function (event) {
    //左右方向滑动
    if (Math.abs(this.data.tx) > Math.abs(this.data.ty)) {
      if (this.data.tx < 0) {
        this.nextMonth()
      }
      else if (this.data.tx > 0) {
        this.lastMonth()
      }
    }
    //上下方向滑动
    else {
      if (this.data.ty < 0) {
        this.nextMonth()
      }
      else if (this.data.ty > 0) {
        this.lastMonth()
      }
    }
    this.data.tx = 0
    this.data.ty = 0
    this.data.lastX = 0
    this.data.lastY = 0
  },
  lastMonth () {
    //全部时间的月份都是按0~11基准，显示月份才+1
    let year = this.data.month - 2 < 0 ? this.data.year - 1 : this.data.year;
    let month = this.data.month - 2 < 0 ? 11 : this.data.month - 2;
    this.setData({
      year: year,
      month: (month + 1)
    })
    this.dateInit(year, month);
  },
  nextMonth () {
    //全部时间的月份都是按0~11基准，显示月份才+1
    let year = this.data.month > 11 ? this.data.year + 1 : this.data.year;
    let month = this.data.month > 11 ? 0 : this.data.month;
    this.setData({
      year: year,
      month: (month + 1)
    })
    this.dateInit(year, month);
  },
  dateClick (e) {
    console.log(e)
  }
})