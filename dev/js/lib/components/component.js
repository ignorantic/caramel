import query from '../query/query';
import addClass from '../classes/add-class';
import removeClass from '../classes/remove-class';
import on from '../events/on';

export default class Component {
  constructor(name, actions) {
    this.blockName = name;
    if (actions) {
      [].concat(actions).forEach((item) => {
        on(item.target, { [item.type]: item.handler });
      });
    }
  }

  /**
   * Create store of component
   * @param {function} reducer
   * @param {object} initialState
   * @returns {*}
   */
  static createStore(reducer, initialState) {
    const currentReducer = reducer;
    let currentState = initialState;
    let listener = () => {
    };
    return {
      getState() {
        return currentState;
      },
      dispatch(action) {
        currentState = currentReducer(currentState, action);
        listener();
        return action;
      },
      subscribe(newListener) {
        listener = newListener;
      },
    };
  }

  /**
   * Modify view of component
   * @param state
   */
  render(state) {
    function setClasses(node, prop, className) {
      if (prop === true) {
        addClass(node, className);
      } else {
        removeClass(node, className);
      }
    }

    Object.keys(state).forEach((key) => {
      const list = query(`.${this.blockName}`);
      switch (typeof state[key]) {
        case 'boolean':
          requestAnimationFrame(() => setClasses(list, state[key], `${this.blockName}_${key}`));
          break;
        case 'string':
          requestAnimationFrame(() =>
            setClasses(list, state[key], `${this.blockName}_${key}_${state[key]}`));
          break;
        case 'object':
          this[key].render(state[key]);
          break;
        default:
          break;
      }
    });
  }
}
