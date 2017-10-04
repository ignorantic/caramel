const ACTIONS = {
  TOGGLE_MENU: 'TOGGLE_MENU',
  UNDROP_MENU: 'UNDROP_MENU',

  FIX_NAVBAR: 'FIX_NAVBAR',
  UNFIX_NAVBAR: 'UNFIX_NAVBAR',
  DROP_NAVBAR: 'DROP_NAVBAR',
  UNDROP_NAVBAR: 'UNDROP_NAVBAR',
};

export default ACTIONS;

export function toggleMenu() {
  return {
    type: ACTIONS.TOGGLE_MENU,
  };
}

export function undropMenu() {
  return {
    type: ACTIONS.UNDROP_MENU,
  };
}

export function fixNavbar() {
  return {
    type: ACTIONS.FIX_NAVBAR,
  };
}

export function unfixNavbar() {
  return {
    type: ACTIONS.UNFIX_NAVBAR,
  };
}

export function dropNavbar() {
  return {
    type: ACTIONS.DROP_NAVBAR,
  };
}

export function undropNavbar() {
  return {
    type: ACTIONS.UNDROP_NAVBAR,
  };
}
