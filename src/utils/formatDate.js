/**
 * 将日期格式化为指定格式的字符串
 * @param { Number,String } time 时间戳或new Date()可接受的参数，默认当前时间
 * @param { String } fmt 目标字符串格式，支持的字符有：y,M,d,q,w,H,h,m,S，默认：yyyy-MM-dd HH:mm:ss
 * @returns 返回格式化后的日期字符串
 */
export default function(time = Date.now(), fmt = 'yyyy-MM-dd HH:mm:ss') {
  const date = new Date(time);
  if (date === 'Invalid Date') {
    return time;
  }
  const obj = {
    'y': date.getFullYear(), // 年份，注意必须用getFullYear
    'M': date.getMonth() + 1, // 月份，注意是从0-11
    'd': date.getDate(), // 日期
    'q': Math.ceil((date.getMonth() + 1) / 3), // 季度
    'w': date.getDay(), // 星期，注意是0-6
    'H': date.getHours(), // 24小时制
    'h': date.getHours() % 12 === 0 ? 12 : date.getHours() % 12, // 12小时制
    'm': date.getMinutes(), // 分钟
    's': date.getSeconds(), // 秒
    'S': date.getMilliseconds() // 毫秒
  };
  const week = ['天', '一', '二', '三', '四', '五', '六'];
  for (var i in obj) {
    fmt = fmt.replace(new RegExp(i + '+', 'g'), function(m) {
      let val = obj[i] + '';
      if (i === 'w') return (m.length > 2 ? '星期' : '周') + week[val];
      for (var j = 0, len = val.length; j < m.length - len; j++) {
        val = '0' + val;
      }
      return m.length === 1 ? val : val.substring(val.length - m.length);
    });
  }
  return fmt;
}
