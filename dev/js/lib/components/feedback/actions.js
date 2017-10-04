const ACTIONS = {
  INPUT: 'INPUT',
  CHANGE: 'CHANGE',
  VALIDATE: 'VALIDATE',
  SUBMIT: 'SUBMIT',
};

export default ACTIONS;

export function input(id, value) {
  return {
    type: ACTIONS.INPUT,
    id,
    value,
  };
}

export function change(id, value, validated) {
  return {
    type: ACTIONS.CHANGE,
    id,
    value,
    validated,
  };
}

export function validate(error) {
  return {
    type: ACTIONS.VALIDATE,
    error,
  };
}

export function submit() {
  return {
    type: ACTIONS.SUBMIT,
  };
}
