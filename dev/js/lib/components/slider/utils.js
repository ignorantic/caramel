import getOne from '../../query/get-one';
import getAll from '../../query/get-all';
import width from '../../query/width';
import addClass from '../../classes/add-class';
import removeClass from '../../classes/remove-class';
import style from '../../style/style';

/**
 * Return value of element translateX
 * @param {HTMLElement} node
 * @returns {number}
 */
export function getComputedTranslateX(node) {
  const matrix = getComputedStyle(node).getPropertyValue('transform');
  if (matrix === 'none') {
    return 0;
  }
  return matrix.split(', ')[4];
}

/**
 * Return current offset of node.
 * @returns {number}
 */
export function getOffset(selector) {
  const slides = getOne(document, selector);
  const slidesWidth = width(slides);
  const translate = -getComputedTranslateX(slides);
  return (100 * translate) / slidesWidth;
}

/**
 * Set class to node by index in node list
 * @param {string} selector
 * @param {string} className
 * @param {number} index
 */
export function setClassByIndex(selector, className, index) {
  const nodeList = getAll(document, selector);
  nodeList.forEach((item) => {
    removeClass(item, className);
  });
  const indexes = [].concat(index);
  indexes.forEach((item) => {
    addClass(nodeList[item], className);
  });
}

/**
 * Append clones of edge nodes
 * @param {string} selector
 * @param {number} count
 */
export function cloneEdgeSlides(selector, count) {
  const nodeList = getAll(document, selector);
  const first = [];
  const last = [];
  let i;
  for (i = 0; i < count; i += 1) {
    first[i] = nodeList[i].cloneNode(true);
    last[i] = nodeList[(count - 1) + i].cloneNode(true);
  }
  for (i = 0; i < count; i += 1) {
    nodeList[0].parentNode.appendChild(first[i]);
    nodeList[0].parentNode.insertBefore(last[i], nodeList[0]);
  }
}

/**
 * Return width of slides frame in pixels.
 * @returns {number}
 */
export function getSlidesWidthPx(selector) {
  return width(getOne(document, selector));
}

/**
 * Return width of slide in percents.
 * @return {number} - Width of slide.
 */
export function getSlideWidth(slide, slides) {
  const slideWidth = width(getOne(document, slide));
  return (100 * slideWidth) / getSlidesWidthPx(slides);
}

/**
 * Return number of columns in frame.
 * @return {number} - Number of columns in frame.
 */
export function getNumCols(slide, slides) {
  const slideWidth = width(getOne(document, slide));
  const slidesWidth = width(getOne(document, slides));
  return Math.round(slidesWidth / slideWidth);
}

/**
 * Return number of slides
 * @param {string} slide
 */
export function getNumSlides(slide) {
  return getAll(document, slide).length;
}

/**
 * Return max shift of slide.
 * @return {number} - Max shift of slide in percent.
 */
export function getMaxOffset(slide, slides, count) {
  return getSlideWidth(slide, slides) * (count - getNumCols(slide, slides));
}

/**
 * Set translate of slider.
 * @param {string} selector
 * @param {number} duration - Duration of transition.
 * @param {number} offset - Shift of slider in percent.
 */
export function setTranslate(selector, duration, offset) {
  const slides = getOne(document, selector);
  if (duration === 0) {
    style(slides, 'transition', '');
  } else {
    const props = {
      'transition-property': 'transform',
      'transition-duration': `${duration}ms`,
      'transition-timing-function': 'ease',
    };
    style(slides, props);
  }
  style(slides, 'transform', `translateX(-${offset}%)`);
}

/**
 * Set cursor for slides.
 * @param {string} selector
 * @param {string} cursor - Duration of transition.
 */
export function setCursor(selector, cursor) {
  style(getOne(document, selector), 'cursor', cursor);
}
