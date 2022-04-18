const isString = (s): s is string => {
  return typeof s === 'string';
};

const isArray = (a): a is Array<any> => {
  return Array.isArray(a);
};

export default {
  isString,
  isArray,
};
