import addEvent from '../events/add-event';
import rect from '../query/rect';
import height from '../query/height';
import scrollDir from '../query/scroll-dir';

export default class ScrollFire {
  constructor(conf) {
    this.scrollDir = scrollDir.init();
    this.cache = [].concat(conf || {}).map((item) => {
      const result = {
        offset: 0,
        direction: 'up',
        once: false,
        ever: true,
        completed: false,
        ...item,
      };
      result[result.direction] = true;
      return result;
    });
    this.handleScroll();
    addEvent(document, 'scroll', this.handleScroll, this);
  }

  handleScroll() {
    const dir = this.scrollDir();
    const count = this.cache.reduce((result, item) =>
      result + this.constructor.checkOffset(item, dir), 0);
    if (count > 0) this.tidyUp();
  }

  /**
   * Handle events and return number of cache items to tidy up
   * @param item
   * @param dir
   * @returns {number}
   */
  static checkOffset(item, dir) {
    const cacheItem = item;
    const direction = dir;

    let toProcessing = false;
    let here;
    let there;
    if (direction > 0) {
      here = 'up';
      there = 'down';
    } else {
      here = 'down';
      there = 'up';
    }

    function doProcessing() {
      // Launch handler!
      if (cacheItem.handler) cacheItem.handler();
      if (cacheItem.once) {
        cacheItem.completed = true;
        return 1;
      }
      if (!cacheItem.ever) cacheItem[here] = false;
      return 0;
    }

    if (cacheItem.selector) {
      const nodeTop = rect(cacheItem.selector).top;
      const winHeight = height(window);
      const level = (100 * (winHeight - nodeTop)) / winHeight;
      toProcessing = direction > 0
        ? level > cacheItem.offset
        : level < cacheItem.offset;
    } else {
      toProcessing = true;
    }

    switch (cacheItem.direction) {
      case here:
        if (toProcessing && cacheItem[here]) {
          return doProcessing();
        }
        break;
      case there:
        cacheItem[there] = true;
        return 0;
      case 'both':
        if (toProcessing && (cacheItem[here] || cacheItem.both)) {
          if (!cacheItem.ever) cacheItem.both = false;
          return doProcessing();
        }
        cacheItem[there] = true;
        return 0;
      default:
        break;
    }
    return 0;
  }

  tidyUp() {
    this.cache = this.cache.filter(item => !item.completed);
  }
}
