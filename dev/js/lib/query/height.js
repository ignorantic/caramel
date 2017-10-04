import offset from './offset';
import getWindow from './is-window';

export default function height(node, client) {
  const win = getWindow(node);
  if (win) {
    return win.innerHeight;
  } else if (client) {
    return node.clientHeight;
  }
  return offset(node).height;
}
