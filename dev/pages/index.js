import Modernizr from 'modernizr';
import Navigation from '../js/lib/components/navigation/navigation';
import Slider from '../js/lib/components/slider/slider';
import { animate, animateOn, scrollParallax } from '../js/lib/components/animation';
import ScrollFire from '../js/lib/components/scroll-fire';
import './common.scss';
import './index.scss';

const app = {};

document.addEventListener('DOMContentLoaded', () => {
  app.nav = new Navigation();
  app.hero = new Slider({
    selector: '#hero',
    drag: true,
    dots: false,
    auto: true,
    transition: 1000,
    interval: 5000,
  });
  app.works = new Slider({
    selector: '#works',
    drag: true,
    dots: false,
    loop: false,
    transition: 500,
  });
  app.quotes = new Slider({
    selector: '#quotes',
    loop: false,
    drag: true,
  });
});

window.addEventListener('load', () => {
  if (Modernizr.cssanimations) {
    app.scrollFire = new ScrollFire([{
      selector: '#hero',
      once: true,
      ever: false,
      handler: () => {
        animate({
          selector: '.hero_to-animate',
          func: 'fadeIn',
        });
      },
    }, {
      selector: '#hero',
      once: true,
      ever: false,
      handler: () => {
        animate({
          selector: '#hero .hero_right_to-animate',
          func: 'fadeInRight',
        });
      },
    }, {
      selector: '#hero',
      once: true,
      ever: false,
      handler: () => {
        animate({
          selector: '#hero .hero_left_to-animate',
          func: 'fadeInLeft',
        });
      },
    }, {
      selector: '#brands',
      offset: 20,
      once: true,
      ever: false,
      handler: () => {
        animate({
          selector: '.brands_to-animate',
          func: 'fadeIn',
          interval: 300,
        });
      },
    }, {
      selector: '#services',
      offset: 20,
      once: true,
      ever: false,
      handler: () => {
        animate({
          selector: '.services_to-animate',
          func: 'fadeInUp',
          interval: 100,
        });
      },
    }, {
      selector: '#works',
      offset: 20,
      once: true,
      ever: false,
      handler: () => {
        animate({
          selector: '.works_to-animate',
          func: 'fadeInUp',
          interval: 100,
        });
      },
    }, {
      selector: '#features',
      offset: 20,
      once: true,
      ever: false,
      handler: () => {
        animate({
          selector: '.features_to-animate',
          func: 'fadeInUp',
          interval: 100,
        });
      },
    }, {
      selector: '#info',
      offset: 20,
      once: true,
      ever: false,
      handler: () => {
        animate({
          selector: '.info_to-animate',
          func: 'fadeInUp',
          interval: 100,
        });
      },
    }, {
      selector: '#quotes',
      offset: 20,
      once: true,
      ever: false,
      handler: () => {
        animate({
          selector: '.quotes_to-animate',
          func: 'fadeIn',
        });
      },
    }]);

    animateOn([{
      event: { '#hero .slider__slides': 'transitionend' },
      activeSelector: '#hero .slider__slide_active .hero_right_to-animate',
      selector: '#hero .hero_right_to-animate',
      func: 'shakeToRight',
    }, {
      event: { '#hero .slider__slides': 'transitionend' },
      activeSelector: '#hero .slider__slide_active .hero_left_to-animate',
      selector: '#hero .hero_left_to-animate',
      func: 'shakeToLeft',
    }]);

    scrollParallax({
      selector: '.hero .slider__slide',
      value: 100,
    });
  }
});
