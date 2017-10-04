import canUseDOM from '../utils/in-dom';

function fallback(context, node) {
  let target = node;
  if (target) {
    do {
      if (target === context) return true;
      target = target.parentNode;
    } while (target);
  }

  return false;
}

export default (() => {
  // HTML DOM and SVG DOM may have different support levels,
  // so we need to check on context instead of a document root element.
  if (canUseDOM) {
    return (context, node) => {
      if (context.contains) {
        return context.contains(node);
      } else if (context.compareDocumentPosition) {
        return context === node || context.compareDocumentPosition(node) === 16;
      }
      return fallback(context, node);
    };
  }
  return fallback;
})();
