import CONSTS from './consts';

export default function reducer(state, action) {
  let activeSlide = state.activeSlide;
  let currentOffset = action.currentOffset;
  let targetOffset;
  let shiftRel;
  let shiftAbs;
  let sign;
  let n;
  let moveShiftPx;
  let touchPosRel;
  const lastTime = Date.now();
  const currentTransition = lastTime - state.lastTime;

  switch (action.type) {
    // PREV
    case CONSTS.PREV:
      if (state.loop || state.activeSlide > 0) {
        activeSlide = state.activeSlide - 1;
      }
      return {
        ...state,
        activeSlide,
        lastTime,
        currentTransition,
        status: CONSTS.ANIMATING,
      };

    // NEXT
    case CONSTS.NEXT:
      if (state.loop || state.activeSlide < (state.count + state.firstSlide) - state.numCols) {
        activeSlide = state.activeSlide + 1;
      }
      return {
        ...state,
        activeSlide,
        lastTime,
        currentTransition,
        status: CONSTS.ANIMATING,
      };

    // LOOP
    case CONSTS.LOOP:
      if (activeSlide < state.firstSlide) {
        do {
          activeSlide += state.count;
          currentOffset += state.count * state.slideWidth;
        }
        while (activeSlide < state.firstSlide);
      } else {
        do {
          activeSlide -= state.count;
          currentOffset -= state.count * state.slideWidth;
        }
        while (activeSlide > state.count + state.firstSlide);
      }
      return {
        ...state,
        activeSlide,
        currentOffset,
        status: CONSTS.JUMPING,
      };

    // UNLOOP
    case CONSTS.REFRESH:
      return {
        ...state,
        status: CONSTS.ANIMATING,
      };

    // CLICK DOT
    case CONSTS.CLICK_DOT:
      activeSlide = action.index;
      return {
        ...state,
        activeSlide,
        currentTransition,
        status: CONSTS.ANIMATING,
      };

    // TOUCH
    case CONSTS.TOUCH:
      targetOffset = state.slideWidth * state.activeSlide;
      touchPosRel = action.touchX + (((action.currentOffset - targetOffset)
        * state.slidesWidthPx) / 100);
      return {
        ...state,
        currentOffset: action.currentOffset,
        currentTransition: action.transition,
        touchPosRel,
        shiftAbs: 0,
        shiftRel: 0,
        touchPosAbs: action.touchX,
        status: CONSTS.DRAGGING,
      };

    // DRAG
    case CONSTS.DRAG:
      moveShiftPx = state.touchPosRel - action.touchX;
      shiftRel = (100 * moveShiftPx) / state.slidesWidthPx;
      shiftAbs = state.touchPosAbs - action.touchX;
      currentOffset = (state.slideWidth * state.activeSlide) + shiftRel;
      if (!state.loop) {
        if (currentOffset < 0) {
          currentOffset = 0;
        }
        if (currentOffset > state.maxOffset) {
          currentOffset = state.maxOffset;
        }
      }
      return {
        ...state,
        shiftAbs,
        shiftRel,
        currentOffset,
      };

    // UNTOUCH
    case CONSTS.UNTOUCH:
      if (state.loop === true) {
        if (state.shiftAbs > 5 && action.currentOffset > (state.activeSlide - 1) * 100) {
          activeSlide = state.activeSlide + 1;
        }
        if (state.shiftAbs < -5 && action.currentOffset < (state.activeSlide + 1) * 100) {
          activeSlide = state.activeSlide - 1;
        }
      } else if (Math.abs(state.shiftRel) > 5) {
        sign = Math.abs(state.shiftAbs) / state.shiftAbs;
        n = sign * Math.ceil(Math.abs(state.shiftRel / state.slideWidth));
        activeSlide = state.activeSlide + n;
        if (activeSlide < 0) {
          activeSlide = state.firstSlide;
        }
        if (activeSlide > (state.count + state.firstSlide) - state.numCols) {
          activeSlide = (state.count + state.firstSlide) - state.numCols;
        }
      }
      return {
        ...state,
        activeSlide,
        lastTime,
        status: CONSTS.ANIMATING,
      };

    // UPDATE
    case CONSTS.UPDATE:
      if (action.numCols > 1 && state.activeSlide > state.count - action.numCols) {
        activeSlide = state.count - action.numCols;
        currentOffset = action.maxOffset;
      }
      return {
        ...state,
        activeSlide,
        currentOffset,
        numCols: action.numCols,
        slideWidth: action.slideWidth,
        slidesWidthPx: action.slidesWidthPx,
        maxOffset: action.maxOffset,
        status: CONSTS.JUMPING,
      };

    default:
      return state;
  }
}
