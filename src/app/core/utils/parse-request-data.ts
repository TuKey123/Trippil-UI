import { isObject } from './helpers';

export function parseJstoPy(requestData: any) {
  if (!isObject(requestData)) return requestData;

  const keys = Object.keys(requestData).map((oldKey) => ({
    oldKey: oldKey,
    newKey: getNewKey(oldKey),
  }));

  let convertedData = {};
  keys.forEach((key) => {
    convertedData = {
      ...convertedData,
      [key.newKey]: isObject(requestData[key.oldKey])
        ? parseJstoPy(requestData[key.oldKey])
        : requestData[key.oldKey],
    };
  });

  return convertedData;
}

function getNewKey(key: string) {
  let newKey = '';
  for (let index = 0; index < key.length; index++) {
    if (key[index] === key[index].toUpperCase())
      newKey += '_'.concat(key[index].toLowerCase());
    else newKey += key[index];
  }

  return newKey;
}
