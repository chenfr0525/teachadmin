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