import ACTIONS from './actions';

export default function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.TYPES.TOGGLE_MENU:
      return {
        ...state,
        menu: {
          dropped: !state.menu.dropped,
        },
      };
    case ACTIONS.TYPES.UNDROP_MENU:
      return {
        ...state,
        menu: {
          dropped: false,
        },
      };
    case ACTIONS.TYPES.FIX_NAVBAR:
      return {
        ...state,
        navbar: {
          fixed: true,
        },
      };
    case ACTIONS.TYPES.UNFIX_NAVBAR:
      return {
        ...state,
        navbar: {
          fixed: false,
        },
      };
    case ACTIONS.TYPES.DROP_NAVBAR:
      return {
        ...state,
        navbar: {
          dropped: true,
        },
      };
    case ACTIONS.TYPES.UNDROP_NAVBAR:
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
