import contains from './contains';
import isWindow from './is-window';
import ownerDocument from '../utils/owner-document';

export default function offset(node) {
  const doc = ownerDocument(node);
  const win = isWindow(doc);
  const docElem = doc && doc.documentElement;
  let box = { top: 0, left: 0, height: 0, width: 0 };

  if (!doc) return false;

  // Make sure it's not a disconnected DOM node
  if (!contains(docElem, node)) return box;

  if (node.getBoundingClientRect !== undefined) box = node.getBoundingClientRect();

  // IE8 getBoundingClientRect doesn't support width & height
  box = {
    top: (box.top + (win.pageYOffset || docElem.scrollTop)) - (docElem.clientTop || 0),
    left: (box.left + (win.pageXOffset || docElem.scrollLeft)) - (docElem.clientLeft || 0),
    width: (box.width === null ? node.offsetWidth : box.width) || 0,
    height: (box.height === null ? node.offsetHeight : box.height) || 0,
  };

  return box;
}
