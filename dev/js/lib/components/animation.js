import on from '../events/on';
import getAll from '../query/get-all';
import height from '../query/height';
import rect from '../query/rect';
import scrollTop from '../query/scroll-top';
import style from '../style/style';
import addClass from '../classes/add-class';
import removeClass from '../classes/remove-class';

const animated = 'js-animated';
const defaultConf = {
  delay: 0,
  interval: 0,
  selector: 'to-animate',
  func: 'fadeIn',
  event: {
    target: window,
    type: 'load',
  },
  repeat: false,
};

export function animate(conf) {
  let counter = 1;
  const config = {
    delay: 0,
    interval: 0,
    ...conf,
  };

  getAll(document, config.selector).forEach((item) => {
    setTimeout(() => {
      function play() {
        addClass(item, conf.func);
        addClass(item, animated);
      }
      requestAnimationFrame(play);
    },
    config.delay + (config.interval * counter));
    counter += 1;
  });
}

export function animateOn(conf) {
  [].concat(conf).forEach((item) => {
    const param = {
      ...defaultConf,
      ...item,
    };
    const events = Object.keys(param.event);

    events.forEach((target) => {
      on(target, {
        [param.event[target]]: () => {
          getAll(document, param.selector).forEach((node) => {
            removeClass(node, param.func);
          });
          animate(param);
        },
      });
    });
    on(param.selector, { transitionend: e => e.stopPropagation() });
  });
}

export function scrollParallax(conf) {
  [].concat(conf).forEach((item) => {
    on(document, {
      scroll: () => {
        if (rect(item.selector).bottom < 0) {
          return;
        }
        const yOffset = -Math.round(((2 * item.value * scrollTop(document))
          / height(document)) - (item.value / 2));
        const nodeList = getAll(document, item.selector);
        nodeList.forEach((node) => {
          requestAnimationFrame(() => style(node, 'backgroundPositionY', `${yOffset}%`));
        });
      },
    }, this);
  });
}
