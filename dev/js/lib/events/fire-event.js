export default function fireEvent(element, type) {
  const event = new Event(type);
  element.dispatchEvent(event);
}
