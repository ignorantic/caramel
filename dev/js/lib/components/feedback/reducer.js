import ACTIONS from './actions';

export default function reducer(state, action) {
  const fields = {};
  switch (action.type) {
    case ACTIONS.INPUT:
      return {
        ...state,
        fields: {
          ...state.fields,
          [action.id]: {
            ...state.fields[action.id],
            value: action.value,
          },
        },
      };
    case ACTIONS.CHANGE:
      return {
        ...state,
        fields: {
          ...state.fields,
          [action.id]: {
            ...state.fields[action.id],
            value: action.value,
            validated: action.validated,
            edited: true,
          },
        },
      };
    case ACTIONS.VALIDATE:
      Object.keys(state.fields).forEach((id) => {
        fields[id] = {
          ...state.fields[id],
          edited: true,
        };
      });
      return {
        ...state,
        error: action.error,
        fields,
      };
    case ACTIONS.SUBMIT:
      return {
        ...state,
      };
    default:
      return state;
  }
}
