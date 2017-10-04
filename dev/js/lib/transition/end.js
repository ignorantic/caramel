/* eslint-disable no-underscore-dangle,no-param-reassign */
import transition from './properties';
import style from '../style/style';

function parseDuration(node) {
  const str = style(node, transition.duration);
  const mult = str.indexOf('ms') === -1 ? 1000 : 1;

  return parseFloat(str) * mult;
}

function onEnd(node, handler, duration) {
  const fakeEvent = {
    target: node,
    currentTarget: node,
  };
  let backup;

  function done(event) {
    if (event.target !== event.currentTarget) return;
    clearTimeout(backup);
    event.target.removeEventListener(transition.end, done);
    handler.call(this);
  }

  if (!transition.end) {
    duration = 0;
  } else if (duration === null) {
    duration = parseDuration(node) || 0;
  }

  if (transition.end) {
    node.addEventListener(transition.end, done, false);

    backup = setTimeout(() => done(fakeEvent)
      , (duration || 100) * 1.5);
  } else { setTimeout(done.bind(null, fakeEvent), 0); }
}

onEnd._parseDuration = parseDuration;

export default onEnd;
