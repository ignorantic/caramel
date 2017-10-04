import CONSTS from './consts';

const ACTIONS = {
  prev() {
    return {
      type: CONSTS.PREV,
    };
  },
  next() {
    return {
      type: CONSTS.NEXT,
    };
  },
  loop(currentOffset) {
    return {
      type: CONSTS.LOOP,
      currentOffset,
    };
  },
  refresh() {
    return {
      type: CONSTS.REFRESH,
    };
  },
  clickDot(index) {
    return {
      type: CONSTS.CLICK_DOT,
      index,
    };
  },
  touch(touchX, currentOffset) {
    return {
      type: CONSTS.TOUCH,
      touchX,
      currentOffset,
    };
  },
  drag(touchX) {
    return {
      type: CONSTS.DRAG,
      touchX,
    };
  },
  untouch(currentOffset) {
    return {
      type: CONSTS.UNTOUCH,
      currentOffset,
    };
  },
  update(numCols, slideWidth, slidesWidthPx, maxOffset) {
    return {
      type: CONSTS.UPDATE,
      numCols,
      slideWidth,
      slidesWidthPx,
      maxOffset,
    };
  },
};

export default ACTIONS;
