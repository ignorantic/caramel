import canUseDOM from '../utils/in-dom';
import getAll from './get-all';

function ie8MatchesSelector(node, selector) {
  const matches = getAll(node.document || node.ownerDocument, selector);
  let i = 0;

  while (matches[i] && matches[i] !== node) i += 1;

  return !!matches[i];
}

let buffMatches;
if (canUseDOM) {
  const body = document.body;
  const nativeMatch = body.matches
    || body.matchesSelector
    || body.webkitMatchesSelector
    || body.mozMatchesSelector
    || body.msMatchesSelector;

  buffMatches = nativeMatch
    ? (node, selector) => nativeMatch.call(node, selector)
    : ie8MatchesSelector;
}

const matches = buffMatches;

export default matches;
