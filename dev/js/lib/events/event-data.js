const cache = {};
const expando = `data${(new Date()).getTime()}`;
let guidCounter = 0;

export function getData(el) {
  const elem = el;
  let guid = elem[expando];
  if (!guid) {
    guid = guidCounter;
    elem[expando] = guidCounter;
    guidCounter += 1;
    cache[guid] = {};
  }
  return cache[guid];
}

export function removeData(el) {
  const elem = el;
  const guid = elem[expando];
  if (!guid) return;
  delete cache[guid];
  try {
    delete elem[expando];
  } catch (e) {
    if (elem.removeAttribute) {
      elem.removeAttribute(expando);
    }
  }
}
