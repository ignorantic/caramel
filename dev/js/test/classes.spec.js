import { describe, it, beforeEach } from 'mocha';
import { expect } from 'chai';
import addClass from '../lib/classes/add-class';
import removeClass from '../lib/classes/remove-class';
import hasClass from '../lib/classes/has-class';

function removeProperty(property, element) {
  Object.defineProperty(element, property, {
    value: undefined,
  });
}

describe('Classes helpers', () => {
  beforeEach(() => {
    document.body.innerHTML = window.__html__['dev/js/test/fixtures/classes.html'];
  });

  it('should add a class', () => {
    const el = document.getElementById('item-1');

    addClass(el, 'my-class');

    expect(el.className).to.contain('my-class');
  });

  it('should add a class properly when using a fallback path', () => {
    const el = [].concat(document.getElementById('item-1'));
    removeProperty('classList', el);

    addClass(el, 'test-class');
    expect(hasClass(el, 'test-class')).to.equal(true);

    addClass(el, 'test-class');
    removeClass(el, 'test-class');
    expect(hasClass(el, 'test-class')).to.equal(false);

    addClass(el, 'undefined');
    addClass(el, 'test-class2');
    expect(hasClass(el, 'test-class2')).to.equal(true);
  });

  it('should remove a class', () => {
    const el = document.getElementById('item-2');

    removeClass(el, 'test-class');

    expect(el.className).to.equal('');
  });

  it('should check for a class', () => {
    expect(hasClass(document.getElementById('item-2'), 'test-class')).to.equal(true);
    expect(hasClass(document.getElementById('item-1'), 'test-class')).to.equal(false);
  });
});
