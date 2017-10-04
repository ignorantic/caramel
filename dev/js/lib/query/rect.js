import contains from './contains';
import getOne from './get-one';
import ownerDocument from '../utils/owner-document';

export default function rect(selector) {
  const node = getOne(document, selector);
  const doc = ownerDocument(node);
  const docElem = doc && doc.documentElement;
  let box = { top: 0, left: 0, height: 0, width: 0 };

  if (!doc) return false;

  // Make sure it's not a disconnected DOM node
  if (!contains(docElem, node)) return box;

  if (node.getBoundingClientRect !== undefined) box = node.getBoundingClientRect();

  return box;
}
