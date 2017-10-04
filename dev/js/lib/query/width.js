import offset from './offset';
import getWindow from './is-window';

export default function width(node, client) {
  const win = getWindow(node);
  if (win) {
    return win.innerWidth;
  } else if (client) {
    return node.clientWidth;
  }
  return offset(node).width;
}
