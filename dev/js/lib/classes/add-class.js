import hasClass from './has-class';

export default function addClass(element, className) {
  if (element.classList) {
    element.classList.add(className);
  } else if (!hasClass(element, className)) {
    const target = element;
    target.className = `${element.className} ${className}`;
  }
}
