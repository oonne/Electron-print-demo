/*
 * 将Promisr的结果和错误，转化为一个数组返回。
 * @params {Promise}
 * @return {array} [err, res]
 */
const to = (promise: Promise<any>) => {
  return promise
    .then(res => {
      return [null, res];
    })
    .catch(err => {
      return [err, null];
    });
};

export default to;
