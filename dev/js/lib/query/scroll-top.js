/* eslint-disable consistent-return,no-param-reassign */
import getWindow from './is-window';

export default function scrollTop(node, val) {
  const win = getWindow(node);

  if (val === undefined) {
    if (win) {
      if ('pageYOffset' in win) {
        return win.pageYOffset;
      }
      return win.document.documentElement.scrollTop;
    }
    return node.scrollTop;
  }

  if (win) {
    if ('pageXOffset' in win) {
      win.scrollTo(win.pageXOffset, val);
    } else {
      win.scrollTo(win.document.documentElement.scrollLeft, val);
    }
  } else { node.scrollTop = val; }
}
