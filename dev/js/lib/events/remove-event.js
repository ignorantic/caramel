import { getData } from './event-data';
import tidyUp from './tidy-up';

export default function removeEvent(elem, type, fn) {
  const data = getData(elem);

  if (!data.handlers) return;

  const removeType = (t) => {
    data.handlers[t] = [];
    this.tidyUp(elem, t);
  };

  if (!type) {
    Object.keys(data.handlers).forEach((t) => {
      removeType(t);
    });
    return;
  }

  const handlers = data.handlers[type];
  if (!handlers) return;

  if (!fn) {
    removeType(type);
    return;
  }

  if (fn.guid) {
    for (let n = 0; n < handlers.length; n += 1) {
      if (handlers[n].fn.guid === fn.guid) {
        handlers.splice(n -= 1, 1);
      }
    }
  }
  tidyUp(elem, type);
}
