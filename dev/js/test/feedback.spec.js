import { describe, it, beforeEach } from 'mocha';
import { assert } from 'chai';
import FeedbackForm from '../lib/components/feedback/feedback';

describe('Feedback form', () => {
  describe('functions', () => {
    let feedback;
    beforeEach(() => {
      document.body.innerHTML = window.__html__['dev/js/test/fixtures/feedback.html'];
      feedback = new FeedbackForm({
        form: {
          id: 'feedback-form',
        },
        fields: [
          {
            id: 'input-first-name',
            type: 'text',
            error: 'Invalid first name',
          },
          {
            id: 'input-last-name',
            type: 'text',
            error: 'Invalid last name',
          },
          {
            id: 'input-email',
            type: 'email',
            error: 'Invalid email',
          },
          {
            id: 'input-body',
            type: 'text',
            error: 'Invalid message body',
          },
        ],
        submit: {
          id: 'submit-btn',
        },
        message: {
          id: 'message',
        },
        classes: {
          inputError: 'input_state_error',
          messageNone: 'message_none',
          messageError: 'message_type_error',
          messageSuccess: 'message_type_success',
        },
      });
    });

    it('check constructor()', () => {
      assert.isNotOk(feedback.structure, 'feedback.structure was deleted object before init');
      assert.isOk(feedback.fields, 'feedback.fields was initialized');
      assert.isOk(feedback.submit, 'feedback.submit was initialized');
    });
  });
});
