import { isObject } from './helpers';

export function parsePytoJs(responseData: any) {
  if (!responseData) return {};

  const keys = Object.keys(responseData).map((oldKey) => ({
    oldKey: oldKey,
    newKey: getNewKey(oldKey),
  }));

  let convertedData = {};
  keys.forEach((key) => {
    let data;
    const oldData = responseData[key.oldKey];

    if (isObject(oldData)) {
      data = parsePytoJs(oldData);
    } else if (Array.isArray(oldData)) {
      data = oldData.map((data) => parsePytoJs(data));
    } else {
      data = oldData;
    }

    convertedData = {
      ...convertedData,
      [key.newKey]: data,
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
