const simpleSelectorRE = /^[\w-]*$/;
const toArray = Function.prototype.bind.call(Function.prototype.call, [].slice);

export default function getAll(element, selector) {
  const maybeID = selector[0] === '#';
  const maybeClass = selector[0] === '.';
  const nameOnly = (maybeID || maybeClass) ? selector.slice(1) : selector;
  const isSimple = simpleSelectorRE.test(nameOnly);
  let found;

  if (isSimple) {
    if (maybeID) {
      const elem = element.getElementById ? element : document;
      found = elem.getElementById(nameOnly);
      const result = found ? [found] : [];
      return result;
    }

    if (element.getElementsByClassName && maybeClass) {
      return toArray(element.getElementsByClassName(nameOnly));
    }

    return toArray(element.getElementsByTagName(selector));
  }

  return toArray(element.querySelectorAll(selector));
}
