import getOne from './get-one';

export default function query(selector) {
  return getOne(document, selector);
}
