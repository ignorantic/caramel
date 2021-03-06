/* eslint-disable consistent-return,no-nested-ternary,no-param-reassign */
import getWindow from './is-window';

export default function scrollTop(node, val) {
  const win = getWindow(node);

  if (val === undefined) {
    return win
      ? ('pageXOffset' in win)
        ? win.pageXOffset
        : win.document.documentElement.scrollLeft
      : node.scrollLeft;
  }

  if (win) {
    win.scrollTo(val, ('pageYOffset' in win)
      ? win.pageYOffset
      : win.document.documentElement.scrollTop);
  } else { node.scrollLeft = val; }
}
