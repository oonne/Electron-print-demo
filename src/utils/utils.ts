/**
 *  获取n位的数字随机数
 */
const randomDigits = (n: number): number => {
  if (n > 21) {
    return 0;
  }
  return Math.round((Math.random() + 1) * Math.pow(10, n - 1));
};

/**
 *  获取n以内的随机整数
 */
const randomWithin = (n: number): number => {
  return Math.floor(Math.random() * n);
};

/**
 *  延迟一定时间，单位毫秒。
 */
const wait = async (time: number): Promise<void> => {
  return new Promise(resolve => {
    setTimeout(resolve, time);
  });
};

/**
 * 获取url上的指定参数
 */
const getQueryString = (name: string) => {
  const reg = new RegExp(`(^|&)${name}=([^&#]*)(#|&|$)`, 'i');
  const url = window.location.href;
  const search = url.substring(url.lastIndexOf('?'));
  const r = search.substring(1).match(reg);
  if (r !== null) {
    return decodeURIComponent(r[2]);
  }
  return '';
};

/**
 * 获取url上的指定参数列表
 */
const getQueryStringList = (nameList: string[] = []) => {
  return nameList.map(name => getQueryString(name));
};

export default {
  randomDigits,
  randomWithin,
  wait,
  getQueryString,
  getQueryStringList,
};
