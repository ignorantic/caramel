import includes from 'lodash/includes';
import defaults from 'lodash/defaults';
import isEmpty from 'validator/lib/isEmpty';
import isEmail from 'validator/lib/isEmail';
import isInt from 'validator/lib/isInt';
import he from 'he';

export default class FeedbackForm {
  constructor(structure) {
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
        input: 'input-undefined',
        message: 'message',
        form: 'form',
      },
      error: 'Undefined error',
    };
    this.error = null;
    this.initForm();
    this.initFields();
    this.initSubmit();
    this.initMessage();
    this.initClasses();
    this.addEventListenerToInputs();
    this.addEventListenerToSubmit();
    delete this.structure;
    this.validateForm();
  }

  initForm() {
    this.form = {};
    this.form.id = typeof this.structure.form.id === 'string'
      ? this.structure.form.id
      : this.defaults.id.form;
  }

  initFields() {
    this.fields = this.structure.fields.map((item) => {
      const field = {};
      field.id = typeof item.id === 'string' ?
        item.id :
        this.defaults.id.input;
      field.type = includes(this.types, item.type) ?
        item.type :
        this.types[0];
      field.error = typeof item.error === 'string' ?
        item.error :
        this.defaults.error;
      field.validated = false;
      return field;
    });
  }

  initSubmit() {
    this.submit = {};
    this.submit.id = typeof this.structure.submit.id === 'string' ?
      this.structure.submit.id :
      this.defaults.id.submit;
  }

  initMessage() {
    this.message = {};
    this.message.id = typeof this.structure.message.id === 'string' ?
      this.structure.message.id :
      this.defaults.id.message;
  }

  initClasses() {
    this.classes = {};
    this.classes = defaults(this.structure.classes, this.defaults.classes);
  }

  addEventListenerToInputs() {
    this.fields.forEach((field) => {
      const index = this.fields.indexOf(field);
      document.getElementById(field.id).addEventListener('change', this.handleChange(index), false);
    });
  }

  addEventListenerToSubmit() {
    document.getElementById(this.submit.id).addEventListener('click', this.handleSubmit(), false);
  }

  handleChange(index) {
    return (e) => {
      if (FeedbackForm.validateField(e.target.value, this.fields[index].type)) {
        e.target.classList.remove(this.classes.inputError);
        this.fields[index].validated = true;
        if (this.validateForm()) {
          this.hideErrors();
        }
      } else {
        e.target.classList.add(this.classes.inputError);
        this.fields[index].validated = false;
      }
    };
  }

  handleSubmit() {
    return (e) => {
      e.preventDefault();
      if (this.validateForm()) {
        this.fields.forEach((field) => {
          const input = document.getElementById(field.id);
          input.value = he.encode(input.value);
        });
        this.submitForm();
      } else {
        this.showErrors();
      }
    };
  }

  validateForm() {
    let result = true;
    this.fields.forEach((field, index) => {
      const input = document.getElementById(field.id);
      this.fields[index].validated
        = FeedbackForm.validateField(input.value, this.fields[index].type);
      if (result && !this.fields[index].validated) {
        result = false;
        this.error = this.fields[index].error;
      }
    });
    return result;
  }

  static validateField(value, type) {
    switch (type) {
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
    const form = document.getElementById(this.form.id);
    form.submit();
  }

  showErrors() {
    const message = document.getElementById(this.message.id);
    message.classList.remove(this.classes.messageNone);
    message.classList.add(this.classes.messageError);
    message.innerHTML = this.error;
  }

  hideErrors() {
    const message = document.getElementById(this.message.id);
    message.classList.remove(this.classes.messageError);
    message.classList.add(this.classes.messageNone);
    message.innerHTML = '';
  }
}
