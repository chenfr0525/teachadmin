/**
 * 格式化增长率，保留两位小数 ，并且去掉末尾的0  取绝对值
 *
 * @param growthRate
 * @returns
 */
export function formatGrowthRate(growthRate) {
  if (growthRate === 0) {
    return "-";
  }

  const formattedRate = Math.abs(growthRate * 100)
    .toFixed(2)
    .replace(/\.?0+$/, "");
  return formattedRate + "%";
}

/**
 * 生成[min,max]的随机数
 * 
 * @param min,max
 * @returns
 */
export function getRandomNum(min,max){
  return Math.floor(Math.random()*(max-min+1)+min)
}

/**
 * 将时间格式 HH:MM:SS 转换为小时数
 */
export function convertTimeToHours(time) {
  // 将时间字符串按冒号分割成数组
  const parts = time.split(':');
  
  // 将小时、分钟、秒转换为数字
  const hours = parseFloat(parts[0]);
  const minutes = parseFloat(parts[1]);
  const seconds = parseFloat(parts[2]);
  
  // 将分钟和秒转换为小时的小数部分
  const totalHours = hours + (minutes / 60) + (seconds / 3600);
  
  return parseFloat(totalHours.toFixed(2))
}

// 格式化日期函数
export function formatDate(dateString){
  const date = new Date(dateString);
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // 月份从 0 开始，需要 +1
  const day = String(date.getUTCDate()).padStart(2, '0'); // 确保两位数字
  return `${year}/${month}/${day}`;
};