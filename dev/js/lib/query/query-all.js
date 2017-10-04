import getAll from './get-all';

export default function queryAll(selector) {
  return getAll(document, selector);
}
