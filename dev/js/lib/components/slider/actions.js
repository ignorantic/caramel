import CONSTS from './consts';

export function prev() {
  return {
    type: CONSTS.PREV,
  };
}

export function next() {
  return {
    type: CONSTS.NEXT,
  };
}

export function loop(currentOffset) {
  return {
    type: CONSTS.LOOP,
    currentOffset,
  };
}

export function refresh() {
  return {
    type: CONSTS.REFRESH,
  };
}

export function clickDot(index) {
  return {
    type: CONSTS.CLICK_DOT,
    index,
  };
}

export function touch(touchX, currentOffset) {
  return {
    type: CONSTS.TOUCH,
    touchX,
    currentOffset,
  };
}

export function drag(touchX) {
  return {
    type: CONSTS.DRAG,
    touchX,
  };
}

export function untouch(currentOffset) {
  return {
    type: CONSTS.UNTOUCH,
    currentOffset,
  };
}

export function update(numCols, slideWidth, slidesWidthPx, maxOffset) {
  return {
    type: CONSTS.UPDATE,
    numCols,
    slideWidth,
    slidesWidthPx,
    maxOffset,
  };
}
