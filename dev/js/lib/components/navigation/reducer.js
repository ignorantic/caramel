import ACTIONS from './actions';

export default function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.TOGGLE_MENU:
      return {
        ...state,
        menu: {
          dropped: !state.menu.dropped,
        },
      };
    case ACTIONS.UNDROP_MENU:
      return {
        ...state,
        menu: {
          dropped: false,
        },
      };
    case ACTIONS.FIX_NAVBAR:
      return {
        ...state,
        navbar: {
          fixed: true,
        },
      };
    case ACTIONS.UNFIX_NAVBAR:
      return {
        ...state,
        navbar: {
          fixed: false,
        },
      };
    case ACTIONS.DROP_NAVBAR:
      return {
        ...state,
        navbar: {
          dropped: true,
        },
      };
    case ACTIONS.UNDROP_NAVBAR:
      return {
        ...state,
        navbar: {
          dropped: false,
        },
      };
    default:
      return state;
  }
}
