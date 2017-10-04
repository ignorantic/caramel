/* eslint-disable no-underscore-dangle */
import camelize from '../utils/camelize-style';

const rposition = /^(top|right|bottom|left)$/;
const rnumnonpx = /^([+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|))(?!px)[a-z%]+$/i;

export default function _getComputedStyle(node) {
  if (!node) throw new TypeError('No Element passed to `getComputedStyle()`');
  const doc = node.ownerDocument;

  if ('defaultView' in doc) {
    if (doc.defaultView.opener) {
      return node.ownerDocument.defaultView.getComputedStyle(node, null);
    }
    return window.getComputedStyle(node, null);
  }
  return { // ie 8 "magic" from: https://github.com/jquery/jquery/blob/1.11-stable/src/css/curCSS.js#L72
    getPropertyValue(prop) {
      const style = node.style;
      let propName = camelize(prop);

      if (propName === 'float') propName = 'styleFloat';

      let current = node.currentStyle[propName] || null;

      if (current === null && style && style[propName]) {
        current = style[propName];
      }

      if (rnumnonpx.test(current) && !rposition.test(propName)) {
        // Remember the original values
        const left = style.left;
        const runStyle = node.runtimeStyle;
        const rsLeft = runStyle && runStyle.left;

        // Put in the new values to get a computed value out
        if (rsLeft) {
          runStyle.left = node.currentStyle.left;
        }

        style.left = propName === 'fontSize' ? '1em' : current;
        current = `${style.pixelLeft}px`;

        // Revert the changed values
        style.left = left;
        if (rsLeft) runStyle.left = rsLeft;
      }

      return current;
    },
  };
}
