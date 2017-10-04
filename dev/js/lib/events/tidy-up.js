import { getData, removeData } from './event-data';

export default function tidyUp(elem, type) {
  function isEmpty(object) {
    return Object.keys(object).length === 0;
  }

  const data = getData(elem);

  if (data.handlers[type].length === 0) {
    delete data.handlers[type];
    elem.removeEventListener(type, data.dispatcher, false);
  }

  if (isEmpty(data.handlers)) {
    delete data.handlers;
    delete data.dispatcher;
  }

  if (isEmpty(data)) {
    removeData(elem);
  }
}
