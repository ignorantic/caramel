const ACTIONS = {
  TYPES: {
    TOGGLE_MENU: 'TOGGLE_MENU',
    UNDROP_MENU: 'UNDROP_MENU',

    FIX_NAVBAR: 'FIX_NAVBAR',
    UNFIX_NAVBAR: 'UNFIX_NAVBAR',
    DROP_NAVBAR: 'DROP_NAVBAR',
    UNDROP_NAVBAR: 'UNDROP_NAVBAR',
  },
  toggleMenu() {
    return {
      type: ACTIONS.TYPES.TOGGLE_MENU,
    };
  },
  undropMenu() {
    return {
      type: ACTIONS.TYPES.UNDROP_MENU,
    };
  },
  fixNavbar() {
    return {
      type: ACTIONS.TYPES.FIX_NAVBAR,
    };
  },
  unfixNavbar() {
    return {
      type: ACTIONS.TYPES.UNFIX_NAVBAR,
    };
  },
  dropNavbar() {
    return {
      type: ACTIONS.TYPES.DROP_NAVBAR,
    };
  },
  undropNavbar() {
    return {
      type: ACTIONS.TYPES.UNDROP_NAVBAR,
    };
  },
};

export default ACTIONS;
