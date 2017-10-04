import scrollTop from './scroll-top';

const scrollDir = {
  init: () => {
    let lastScrollTop;
    return () => {
      const curScrollTop = scrollTop(window);
      if (lastScrollTop === curScrollTop) return 0;
      const result = lastScrollTop > curScrollTop;
      lastScrollTop = curScrollTop;
      return result ? -1 : 1;
    };
  },
};

export default scrollDir;
