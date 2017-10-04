/* eslint-disable no-shadow,import/no-mutable-exports,one-var */
import canUseDOM from '../utils/in-dom';

let transform = 'transform';
let prefix,
  transitionEnd,
  animationEnd;
let transitionProperty,
  transitionDuration,
  transitionTiming,
  transitionDelay;
let animationName,
  animationDuration,
  animationTiming,
  animationDelay;

function getTransitionProperties() {
  let style = document.createElement('div').style;

  const vendorMap = {
    O: e => `o${e.toLowerCase()}`,
    Moz: e => e.toLowerCase(),
    Webkit: e => `webkit${e}`,
    ms: e => `MS${e}`,
  };

  const vendors = Object.keys(vendorMap);

  let transitionEnd,
    animationEnd;
  let prefix = '';

  for (let i = 0; i < vendors.length; i += 1) {
    const vendor = vendors[i];

    if (`${vendor}TransitionProperty` in style) {
      prefix = `-${vendor.toLowerCase()}`;
      transitionEnd = vendorMap[vendor]('TransitionEnd');
      animationEnd = vendorMap[vendor]('AnimationEnd');
      break;
    }
  }

  if (!transitionEnd && 'transitionProperty' in style) { transitionEnd = 'transitionend'; }

  if (!animationEnd && 'animationName' in style) { animationEnd = 'animationend'; }

  style = null;

  return { animationEnd, transitionEnd, prefix };
}

if (canUseDOM) {
  ({ prefix, transitionEnd, animationEnd } = getTransitionProperties());

  transform = `${prefix}-${transform}`;
  transitionProperty = `${prefix}-transition-property`;
  transitionDuration = `${prefix}-transition-duration`;
  transitionDelay = `${prefix}-transition-delay`;
  transitionTiming = `${prefix}-transition-timing-function`;

  animationName = `${prefix}-animation-name`;
  animationDuration = `${prefix}-animation-duration`;
  animationTiming = `${prefix}-animation-delay`;
  animationDelay = `${prefix}-animation-timing-function`;
}

export {
  transform,
  transitionProperty,
  transitionTiming,
  transitionDelay,
  transitionDuration,
  transitionEnd,

  animationName,
  animationDuration,
  animationTiming,
  animationDelay,
  animationEnd,
};

export default {
  transform,
  end: transitionEnd,
  property: transitionProperty,
  timing: transitionTiming,
  delay: transitionDelay,
  duration: transitionDuration,
};
