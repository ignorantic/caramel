import { describe, it } from 'mocha';
import { expect } from 'chai';
import end from '../lib/transition/end';
import properties from '../lib/transition/properties';

const props = properties;

describe('Transition helpers', () => {
  it('should parse duration from node property', () => {
    const el = document.createElement('div');

    el.style[props.duration] = '1.4s';

    expect(end._parseDuration(el)).to.equal(1400);

    el.style[props.duration] = '500ms';

    expect(end._parseDuration(el)).to.equal(500);
  });
});
