export default function isWindow(node) {
  if (node === node.window) {
    return node;
  } else if (node.nodeType === 9) {
    return node.defaultView || node.parentWindow;
  }
  return false;
}
