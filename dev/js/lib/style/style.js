import camelize from '../utils/camelize-style';
import hyphenate from '../utils/hyphenate-style';
import _getComputedStyle from './get-computed-style';
import removeStyle from './remove-style';
import { transform } from '../transition/properties';
import isTransform from '../transition/is-transform';

export default function style(node, property, value) {
  let css = '';
  let transforms = '';
  let props = property;

  if (typeof property === 'string') {
    if (value === undefined) {
      return node.style[camelize(property)]
        || _getComputedStyle(node).getPropertyValue(hyphenate(property));
    }
    (props = {})[property] = value;
  }

  Object.keys(props).forEach((key) => {
    const propValue = props[key];
    if (!propValue && propValue !== 0) {
      removeStyle(node, hyphenate(key));
    } else if (isTransform(key)) {
      transforms += `${key}(${propValue}) `;
    } else {
      css += `${hyphenate(key)}: ${propValue};`;
    }
  });

  if (transforms) {
    css += `${transform}: ${transforms};`;
  }
  const target = node;
  target.style.cssText += `;${css}`;
  return target;
}
