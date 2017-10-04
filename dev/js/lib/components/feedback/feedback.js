import isEmpty from 'validator/lib/isEmpty';
import isEmail from 'validator/lib/isEmail';
import isInt from 'validator/lib/isInt';
import { input, change, validate } from './actions';
import on from '../../events/on';
import query from '../../query/query';
import addClass from '../../classes/add-class';
import removeClass from '../../classes/remove-class';
import reducer from './reducer';
import Component from '../component';

export default class Feedback extends Component {
  constructor(structure) {
    super();
    this.structure = structure;
    this.types = ['text', 'email', 'integer'];
    this.defaults = {
      classes: {
        inputError: 'input-error',
        messageNone: 'message-none',
        messageError: 'message-error',
        messageSuccess: 'message-success',
      },
      ID: {
        submit: 'submit-btn',
        message: 'message',
        form: 'form',
      },
      error: 'Undefined error',
    };
    this.store = this.constructor.createStore(reducer, this.initState());
    this.store.subscribe(() => {
      const state = this.store.getState();
      this.constructor.render(state);
    });
    const state = this.store.getState();
    this.constructor.render(state);

    const fields = Object.keys(state.fields);
    fields.forEach((id) => {
      on(`#${id}`, {
        change: this.onChange,
        input: this.onInput,
      }, this);
    });
    on(`#${state.submit.id}`, { click: this.onSubmit }, this);
  }

  initState() {
    const state = {};
    state.form = this.initForm();
    state.fields = this.initFields();
    state.submit = this.initSubmit();
    state.message = this.initMessage();
    state.classes = this.initClasses();
    return state;
  }

  initForm() {
    const form = {};
    form.id = typeof this.structure.form.id === 'string'
      ? this.structure.form.id
      : this.defaults.id.form;
    return form;
  }

  initFields() {
    const fields = {};
    this.structure.fields.forEach((item) => {
      fields[item.id] = {};
      fields[item.id].type = this.types.includes(item.type)
        ? item.type
        : this.types[0];
      fields[item.id].placeholder = item.placeholder
        ? item.placeholder
        : '';
      fields[item.id].label = item.label
        ? item.label
        : '';
      fields[item.id].error = typeof item.error === 'string'
        ? item.error
        : this.defaults.error;
      fields[item.id].validated = false;
      return fields;
    });
    return fields;
  }

  initSubmit() {
    const result = {};
    result.id = typeof this.structure.submit.id === 'string'
      ? this.structure.submit.id
      : this.defaults.id.submit;
    return result;
  }

  initMessage() {
    const message = {};
    message.id = typeof this.structure.message.id === 'string'
      ? this.structure.message.id
      : this.defaults.id.message;
    return message;
  }

  initClasses() {
    const classes = { ...this.structure.classes, ...this.defaults.classes };
    return classes;
  }

  static render(state) {
    const message = query(`#${state.message.id}`);
    if (state.error) {
      removeClass(message, state.classes.messageNone);
      removeClass(message, state.classes.messageSuccess);
      addClass(message, state.classes.messageError);
      message.innerHTML = state.error;
    } else {
      removeClass(message, state.classes.messageError);
      addClass(message, state.classes.messageNone);
    }
    const fields = Object.keys(state.fields);
    fields.forEach((id) => {
      const node = query(`#${id}`);
      node.value = state.fields[id].value || '';
      node.placeholder = state.fields[id].placeholder || '';
      const label = query(`label[for*="${id}"]`);
      if (label) label.innerHTML = state.fields[id].label || '';
      if (!state.fields[id].edited || state.fields[id].validated) {
        removeClass(query(`#${id}`), state.classes.inputError);
      } else {
        addClass(query(`#${id}`), state.classes.inputError);
      }
    });
  }

  onInput(e) {
    e.preventDefault();
    const id = e.target.id;
    const value = e.target.value;
    this.store.dispatch(input(id, value));
  }

  onChange(e) {
    e.preventDefault();
    const id = e.target.id;
    const value = e.target.value;
    const type = e.target.type;
    const validated = this.constructor.validateField(value, type);
    this.store.dispatch(change(id, value, validated));
  }

  onSubmit(e) {
    e.preventDefault();
    const state = this.store.getState();
    if (this.validateForm(state)) {
      this.submitForm();
    }
  }

  validateForm(state) {
    let result = true;
    const fields = Object.keys(state.fields);
    fields.forEach((id) => {
      const field = state.fields[id];
      if (result && !field.validated) {
        result = false;
        this.store.dispatch(validate(field.error));
      }
    });
    if (result) this.store.dispatch(validate(false));
    return result;
  }

  static validateField(value, type) {
    switch (type) {
      case 'textarea':
        if (!isEmpty(value)) {
          return true;
        }
        break;
      case 'text':
        if (!isEmpty(value)) {
          return true;
        }
        break;
      case 'email':
        if (isEmail(value)) {
          return true;
        }
        break;
      case 'integer':
        if (isInt(value, {
          min: 1,
          max: 130,
        })) {
          return true;
        }
        break;
      default:
        return false;
    }
    return false;
  }

  submitForm() {
    const state = this.store.getState();
    const form = document.getElementById(state.form.id);
    form.submit();
  }
}
