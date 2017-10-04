import Component from '../component';
import ACTIONS from './actions';
import CONSTS from './consts';
import on from '../../events/on';
import reducer from './reducer';
import * as utils from './utils';

/**
 * Class representing a component of slider.
 * @class Slider
 * @extends Component
 */
export default class Slider extends Component {
  constructor(conf) {
    super();
    this.conf = {
      interval: 5000,
      transition: 1000,
      drag: false,
      auto: false,
      dots: true,
      loop: true,
      ...conf,
    };

    this.slides = `${conf.selector} .${CONSTS.SLIDES}`;
    this.slide = `${conf.selector} .${CONSTS.SLIDE}`;
    this.leftBtn = `${conf.selector} .${CONSTS.LEFT_BTN}`;
    this.rightBtn = `${conf.selector} .${CONSTS.RIGHT_BTN}`;

    if (this.conf.loop) {
      utils.cloneEdgeSlides(this.slide, 2);
    }

    this.store = this.constructor.createStore(reducer, this.init());
    this.store.subscribe(() => {
      const state = this.store.getState();
      this.switcher(state);
    });

    const state = this.store.getState();
    if (this.conf.dots === true) {
      this.dot = `${conf.selector} .${CONSTS.DOT}`;
      this.setDots(state);
    }

    this.render(state);

    this.registerListeners();
    if (this.conf.auto === true) {
      this.setTimer();
    }
  }

  /**
   * Initialize state
   * @returns {object} - State object
   */
  init() {
    let count;
    let firstSlide;
    const num = utils.getNumSlides(this.slide);

    if (this.conf.loop === true) {
      firstSlide = 2;
      count = num - 4;
    } else {
      firstSlide = 0;
      count = num;
    }

    const activeSlide = firstSlide;
    const slideWidth = utils.getSlideWidth(this.slide, this.slides);
    const slidesWidthPx = utils.getSlidesWidthPx(this.slides);
    const numCols = utils.getNumCols(this.slide, this.slides);
    const currentOffset = (slideWidth * firstSlide) / numCols;

    return {
      count,
      firstSlide,
      activeSlide,
      currentOffset,
      slideWidth,
      slidesWidthPx,
      numCols,
      ...this.conf,
    };
  }

  /**
   * Switcher
   * @param {object} state
   */
  switcher(state) {
    switch (state.status) {
      case CONSTS.ANIMATING:
        if (state.activeSlide > state.count + state.firstSlide
          || state.activeSlide < state.firstSlide) {
          const currentOffset = utils.getOffset(this.slides);
          this.store.dispatch(ACTIONS.loop(currentOffset));
        } else {
          this.render(state);
        }
        break;
      case CONSTS.DRAGGING:
        this.render(state);
        break;
      case CONSTS.JUMPING:
        this.render(state);
        this.store.dispatch(ACTIONS.refresh());
        break;
      default:
        break;
    }
  }

  /**
   * Modify the DOM tree
   * @param {object} state
   */
  render(state) {
    let duration;
    let targetOffset;
    switch (state.status) {
      case CONSTS.ANIMATING:
        utils.setCursor(this.slides, 'default');
        if (this.timer || !state.currentTransition) {
          duration = state.transition;
        } else {
          duration = state.transition < 2 * state.currentTransition
            ? state.transition
            : 2 * state.currentTransition;
        }
        targetOffset = state.slideWidth * state.activeSlide;
        setTimeout(requestAnimationFrame(() => {
          utils.setTranslate(this.slides, duration, targetOffset);
        }), 10);
        this.setActiveSlide(state);
        if (state.dots === true) {
          this.setDots(state);
        }
        break;
      case CONSTS.DRAGGING:
        utils.setCursor(this.slides, 'move');
        requestAnimationFrame(() => utils.setTranslate(this.slides, 0, state.currentOffset));
        break;
      default:
        utils.setTranslate(this.slides, 0, state.currentOffset);
        this.setActiveSlide(state);
        break;
    }
  }

  /**
   * Set active class.
   * @param {object} state
   */
  setActiveSlide(state) {
    const indexes = [].concat(state.activeSlide);
    if (state.loop) {
      if (state.activeSlide > state.firstSlide) {
        indexes.push(state.activeSlide - state.count);
      }
      if (state.activeSlide < state.count) {
        indexes.push(state.activeSlide + state.count);
      }
    }
    utils.setClassByIndex(this.slide, CONSTS.ACTIVE_SLIDE, indexes);
  }

  /**
   * Toggle classes of dots.
   * @param {object} state
   */
  setDots(state) {
    utils.setClassByIndex(this.dot, CONSTS.ACTIVE_DOT, state.activeSlide);
  }

  /**
   * Register event listeners for slider
   */
  registerListeners() {
    on(document, {
      resize: this.onResizeWindow,
      load: this.onResizeWindow,
    }, this);
    on(this.leftBtn, { click: this.onClickLeftBtn }, this);
    on(this.rightBtn, { click: this.onClickRightBtn }, this);
    if (this.conf.dots) {
      on(this.dot, { click: this.onClickDot }, this);
    }
    if (this.conf.auto) {
      on(this.slides, { click: this.onClickSlides }, this);
    }

    // Mouse drag events
    if (this.conf.drag) {
      on(this.slides, {
        mousedown: this.onMouseDownSlides,
        mouseup: this.onMouseUpSlides,
        mousemove: this.onMouseMoveSlides,
        mouseleave: this.onMouseUpSlides,
      }, this);
    }

    // Touch events
    if ('ontouchstart' in window) {
      on(this.slides, {
        touchstart: this.onTouchStartSlides,
        touchend: this.onTouchEndSlides,
        touchmove: this.onTouchMoveSlides,
      }, this);
    }
  }

  onClickDot(e) {
    e.preventDefault();
    const index = +e.target.dataset.index;
    this.store.dispatch(ACTIONS.clickDot(index));
  }

  onClickSlides(e) {
    e.preventDefault();
    this.clearTimer();
  }

  onResizeWindow() {
    const state = this.store.getState();
    const numCols = utils.getNumCols(this.slide, this.slides);
    const slideWidth = utils.getSlideWidth(this.slide, this.slides);
    const slidesWidthPx = utils.getSlidesWidthPx(this.slides);
    const maxOffset = utils.getMaxOffset(this.slide, this.slides, state.count);
    this.store.dispatch(ACTIONS.update(numCols, slideWidth, slidesWidthPx, maxOffset));
  }

  onClickLeftBtn(e) {
    e.preventDefault();
    this.clearTimer();
    this.store.dispatch(ACTIONS.prev());
  }

  onClickRightBtn(e) {
    e.preventDefault();
    this.clearTimer();
    this.store.dispatch(ACTIONS.next());
  }

  onMouseDownSlides(e) {
    e.preventDefault();
    const touchX = e.screenX;
    this.clearTimer();
    const currentOffset = utils.getOffset(this.slides);
    this.store.dispatch(ACTIONS.touch(touchX, currentOffset));
  }

  onMouseUpSlides() {
    const state = this.store.getState();
    if (state.status === CONSTS.DRAGGING) {
      const currentOffset = utils.getOffset(this.slides);
      this.store.dispatch(ACTIONS.untouch(currentOffset));
    }
  }

  onMouseMoveSlides(e) {
    const state = this.store.getState();
    if (state.status === CONSTS.DRAGGING && e.buttons === 1) {
      const touchX = e.screenX;
      this.store.dispatch(ACTIONS.drag(touchX));
    }
  }

  onTouchStartSlides(e) {
    const touchX = e.targetTouches[0].pageX;
    this.clearTimer();
    const currentOffset = utils.getOffset(this.slides);
    this.store.dispatch(ACTIONS.touch(touchX, currentOffset));
  }

  onTouchEndSlides() {
    const state = this.store.getState();
    if (state.status === CONSTS.DRAGGING) {
      const currentOffset = utils.getOffset(this.slides);
      this.store.dispatch(ACTIONS.untouch(currentOffset));
    }
  }

  onTouchMoveSlides(e) {
    const touchX = e.targetTouches[0].pageX;
    this.store.dispatch(ACTIONS.drag(touchX));
  }

  /**
   * Start timer for automatic slide switch.
   */
  setTimer() {
    this.timer = setInterval(
      () => {
        this.store.dispatch(ACTIONS.next());
      },
      this.store.getState().interval,
    );
  }

  /**
   * Stop timer.
   */
  clearTimer() {
    if (this.timer !== null) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }
}
