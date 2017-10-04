const simpleSelectorRE = /^[\w-]*$/;

export default function getOne(element, selector) {
  const maybeID = selector[0] === '#';
  const maybeClass = selector[0] === '.';
  const nameOnly = (maybeID || maybeClass) ? selector.slice(1) : selector;
  const isSimple = simpleSelectorRE.test(nameOnly);
  let found;

  if (isSimple) {
    if (maybeID) {
      const elem = element.getElementById ? element : document;
      found = elem.getElementById(nameOnly);
      return found || null;
    }

    if (element.getElementsByClassName && maybeClass) {
      return element.getElementsByClassName(nameOnly)[0];
    }

    return element.getElementsByTagName(selector)[0];
  }

  return element.querySelector(selector);
}
