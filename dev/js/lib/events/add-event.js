import { getData } from './event-data';

let nextGuid = 0;

export default function addEvent(element, type, func, cntx) {
  const fn = func;
  const data = getData(element);

  if (!data.handlers) data.handlers = {};

  if (!data.handlers[type]) {
    data.handlers[type] = [];
  }

  if (!fn.guid) {
    fn.guid = nextGuid;
  }
  nextGuid += 1;

  data.handlers[type].push({
    fn,
    cntx,
  });

  if (!data.dispatcher) {
    data.disabled = false;
    data.dispatcher = (event) => {
      if (data.disabled) return;

      const handlers = data.handlers[event.type];
      if (handlers) {
        for (let n = 0; n < handlers.length; n += 1) {
          handlers[n].fn.call(handlers[n].cntx, event);
        }
      }
    };
  }

  if (data.handlers[type].length === 1) {
    element.addEventListener(type, data.dispatcher, false);
  }
}
