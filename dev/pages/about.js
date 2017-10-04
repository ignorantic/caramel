import Navigation from '../js/lib/components/navigation/navigation';
import { scrollParallax } from '../js/lib/components/animation';
import './common.scss';
import './about.scss';

const app = {};

document.addEventListener('DOMContentLoaded', () => {
  app.nav = new Navigation();
  scrollParallax([{
    selector: '.about__head',
    value: 100,
  }]);
});
