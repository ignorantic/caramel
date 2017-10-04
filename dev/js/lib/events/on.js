import getAll from '../query/get-all';
import isWindow from '../query/is-window';
import addEvent from './add-event';
import ownerDocument from '../utils/owner-document';

export default function on(selector, handlers, cntx) {
  if (typeof selector === 'string') {
    const nodeList = getAll(document, selector);
    nodeList.forEach((node) => {
      Object.keys(handlers).forEach((type) => {
        addEvent(node, type, handlers[type], cntx);
      });
    });
  } else {
    const doc = ownerDocument(selector);
    const win = isWindow(doc);
    const docElem = doc && doc.documentElement;
    const node = win || docElem;
    Object.keys(handlers).forEach((type) => {
      addEvent(node, type, handlers[type], cntx);
    });
  }
}
