/* eslint-disable no-param-reassign */
import getOffset from './offset';
import getOffsetParent from './offset-parent';
import scrollTop from './scroll-top';
import scrollLeft from './scroll-left';
import css from '../style/style';

function nodeName(node) {
  return node.nodeName && node.nodeName.toLowerCase();
}

export default function position(node, offsetParent) {
  let parentOffset = { top: 0, left: 0 };
  let offset;

  // Fixed elements are offset from window (parentOffset = {top:0, left: 0},
  // because it is its only offset parent
  if (css(node, 'position') === 'fixed') {
    offset = node.getBoundingClientRect();
  } else {
    offsetParent = offsetParent || getOffsetParent(node);
    offset = getOffset(node);

    if (nodeName(offsetParent) !== 'html') { parentOffset = getOffset(offsetParent); }

    parentOffset.top += (parseInt(css(offsetParent, 'borderTopWidth'), 10) - scrollTop(offsetParent)) || 0;
    parentOffset.left += (parseInt(css(offsetParent, 'borderLeftWidth'), 10) - scrollLeft(offsetParent)) || 0;
  }

  // Subtract parent offsets and node margins
  return {
    ...offset,
    top: offset.top - parentOffset.top - (parseInt(css(node, 'marginTop'), 10) || 0),
    left: offset.left - parentOffset.left - (parseInt(css(node, 'marginLeft'), 10) || 0),
  };
}
