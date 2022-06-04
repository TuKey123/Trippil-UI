import { isObject } from './helpers';

export function parsePytoJs(responseData: any) {
  const keys = Object.keys(responseData).map((oldKey) => ({
    oldKey: oldKey,
    newKey: getNewKey(oldKey),
  }));

  let convertedData = {};
  keys.forEach((key) => {
    convertedData = {
      ...convertedData,
      [key.newKey]: isObject(responseData[key.oldKey])
        ? parsePytoJs(responseData[key.oldKey])
        : responseData[key.oldKey],
    };
  });

  return convertedData;
}

function getNewKey(key: string) {
  return key
    .split('_')
    .map((key, index) =>
      index ? key.charAt(0).toUpperCase() + key.slice(1) : key
    )
    .join('');
}
