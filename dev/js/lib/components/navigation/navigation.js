import Component from '../component';
import ScrollFire from '../scroll-fire';
import ACTIONS from './actions';
import reducer from './reducer';

export default class Navigation extends Component {
  constructor() {
    super();
    this.breakpoint = '#breakpoint';
    this.menu = new Component('menu');
    this.navbar = new Component('navbar', [{
      target: '#menu-btn',
      type: 'click',
      handler: () => this.store.dispatch(ACTIONS.toggleMenu()),
    }]);

    this.store = this.constructor.createStore(reducer, {
      menu: {
        dropped: false,
      },
      navbar: {
        fixed: false,
        dropped: false,
      },
    });

    this.store.subscribe(() => {
      const state = this.store.getState();
      this.render(state);
    });

    this.scrollFire = new ScrollFire([{
      selector: this.breakpoint,
      offset: 100,
      direction: 'up',
      handler: () => {
        this.store.dispatch(ACTIONS.fixNavbar());
      },
    }, {
      direction: 'up',
      handler: () => {
        this.store.dispatch(ACTIONS.undropMenu());
        this.store.dispatch(ACTIONS.undropNavbar());
      },
    }, {
      direction: 'down',
      handler: () => {
        this.store.dispatch(ACTIONS.dropNavbar());
      },
    }, {
      selector: this.breakpoint,
      offset: 100,
      direction: 'down',
      handler: () => {
        this.store.dispatch(ACTIONS.unfixNavbar());
        this.store.dispatch(ACTIONS.undropNavbar());
      },
    }]);
  }
}
