/* eslint-disable no-shadow,no-const-assign */
import ownerDocument from '../utils/owner-document';
import css from '../style/style';

function nodeName(node) {
  return node.nodeName && node.nodeName.toLowerCase();
}

export default function offsetParent(node) {
  const doc = ownerDocument(node);
  let offsetParent = node && node.offsetParent;

  while (offsetParent && nodeName(node) !== 'html' && css(offsetParent, 'position') === 'static') {
    offsetParent = offsetParent.offsetParent;
  }

  return offsetParent || doc.documentElement;
}
