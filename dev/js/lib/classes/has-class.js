export default function containsClass(element, className) {
  if (element.classList) {
    return !!className && element.classList.contains(className);
  }
  return ` ${element.className} `.indexOf(` ${className} `) !== -1;
}
