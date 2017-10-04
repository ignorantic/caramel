import { describe, it, beforeEach } from 'mocha';
import { expect, assert } from 'chai';
import sinon from 'sinon';
import getAll from '../lib/query/get-all';
import getOne from '../lib/query/get-one';
import matches from '../lib/query/matches';
import contains from '../lib/query/contains';
import offset from '../lib/query/offset';

describe('Query helpers', () => {
  describe('getAll', () => {
    beforeEach(() => {
      document.body.innerHTML = window.__html__['dev/js/test/fixtures/get-all.html'];
    });

    it('should use GetElementByTagName', () => {
      const spy = sinon.spy(document, 'getElementsByTagName');

      expect(getAll(document, 'li').length).to.equal(3);
      expect(spy.callCount).to.equal(1);

      spy.restore();
    });

    it('should use GetElementById', () => {
      const spy = sinon.spy(document, 'getElementById');

      expect(getAll(document, '#list-id').length).to.equal(1);
      expect(spy.callCount).to.equal(1);

      spy.restore();
    });

    it('should use GetElementsByClassName', () => {
      const spy = sinon.spy(document, 'getElementsByClassName');

      expect(getAll(document, '.item-class').length).to.equal(1);
      expect(spy.callCount).to.equal(1);
      spy.restore();
    });

    it('should use querySelectorAll for complex selectors', () => {
      const spy = sinon.spy(document, 'querySelectorAll');

      expect(getAll(document, '.item-class li').length).to.equal(3);
      expect(spy.callCount).to.equal(1);

      spy.restore();
    });
  });

  describe('getOne', () => {
    beforeEach(() => {
      document.body.innerHTML = window.__html__['dev/js/test/fixtures/get-one.html'];
    });

    it('should use GetElementByTagName', () => {
      const spy = sinon.spy(document, 'getElementsByTagName');
      expect(getOne(document, 'li').innerHTML).to.equal('1');
      expect(spy.callCount).to.equal(1);

      spy.restore();
    });

    it('should use GetElementById', () => {
      const spy = sinon.spy(document, 'getElementById');

      expect(getOne(document, '#list-id').childElementCount).to.equal(3);
      expect(spy.callCount).to.equal(1);

      spy.restore();
    });

    it('should use GetElementsByClassName', () => {
      const spy = sinon.spy(document, 'getElementsByClassName');

      expect(getOne(document, '.item-class-1').childElementCount).to.equal(1);
      expect(spy.callCount).to.equal(1);
      spy.restore();
    });

    it('should use querySelector for complex selectors', () => {
      const spy = sinon.spy(document, 'querySelector');
      expect(getOne(document, '.item-class-2 span').innerHTML).to.equal('3');
      expect(spy.callCount).to.equal(1);

      spy.restore();
    });
  });

  describe('Matches', () => {
    beforeEach(() => {
      document.body.innerHTML = window.__html__['dev/js/test/fixtures/matches.html'];
    });

    it('should match', () => {
      const child = document.getElementById('middle');
      assert.isOk(matches(child, '#middle'));
      assert.isOk(matches(child, 'li#middle'));
      assert.isOk(matches(child, '.item-class li'));
      assert.isNotOk(matches(child, '.item-class'));
    });
  });

  describe('Contains', () => {
    beforeEach(() => {
      document.body.innerHTML = window.__html__['dev/js/test/fixtures/query.html'];
    });

    it('should check for contained element', () => {
      const child = document.getElementById('item-3');
      const parent = document.getElementById('item-1');

      assert.isOk(contains(parent, child));
      assert.isNotOk(contains(child, parent));
    });

    it('should handle orphaned elements', () => {
      const orphan = document.createElement('div');

      assert.isNotOk(contains(document.body, orphan));
    });
  });

  describe('Offset', () => {
    beforeEach(() => {
      document.body.innerHTML = window.__html__['dev/js/test/fixtures/offset.html'];
    });

    it('should fallback when there is no gBCR', () => {
      const shift = offset({ ownerDocument: document });

      expect(shift.top).to.be.equal(0);
      expect(shift.left).to.be.equal(0);
    });

    it('should fallback when node is disconnected', () => {
      const shift = offset(document.createElement('div'));

      expect(shift.top).to.be.equal(0);
      expect(shift.left).to.be.equal(0);
    });

    it('should handle absolute position', () => {
      const item = document.getElementById('item-abs');

      const shift = offset(item);

      expect(shift.top).to.be.equal(400);
      expect(shift.left).to.be.equal(350);
    });

    it('should handle nested positioning', () => {
      const item = document.getElementById('item-nested-abs');

      const shift = offset(item);

      expect(shift.top).to.be.equal(400);
      expect(shift.left).to.be.equal(200);
    });

    it('should handle fixed offset', () => {
      const item = document.getElementById('item-fixed');

      const shift = offset(item);

      expect(shift.top).to.be.equal(400);
      expect(shift.left).to.be.equal(350);
    });
  });
});
