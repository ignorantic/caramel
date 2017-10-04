/**
 * @license
 * dom-helper.spec.js for Nautic library
 * https://github.com/ignorantic
 * Released under MIT license
 */

import { describe, it, before } from 'mocha';
import { assert } from 'chai';
import dom from '../js/lib/js/dom-helper';
import html from '../js/lib/js/html-helper';

describe('dom-helper.js', () => {
  describe('getters', () => {
    before(() => {
      document.documentElement.appendChild(html.tag('div', 'Test div.', {
        id: 'super',
        class: [
          'testClass1',
          'testClass2',
        ],
      },
      {
        width: '125px',
      }));
    });

    it('getElement()', () => {
      assert.isOk(dom('.testClass1').getElement(), 'should be OK');
      assert.isOk(dom('#super').getElement(), 'should be OK');
      assert.isNotOk(dom('#super1').getElement(), 'should be not OK');
      assert.equal(dom('#super').getElement().toString(), '[object HTMLDivElement]',
        'should be [object HTMLDivElement]');
    });

    it('getNodeList()', () => {
      assert.isOk(dom('.testClass1').getNodeList(), 'should be OK');
      assert.isOk(dom('#super').getNodeList(), 'should be OK');
      assert.equal(dom('#super').getNodeList().toString(), '[object NodeList]',
        'should be [object NodeList]');
    });

    it('getClassName()', () => {
      assert.equal(dom('.testClass1').getClassName(), 'testClass1', 'should be "testClass1"');
      assert.equal(dom('#super').getClassName(), 'testClass1', 'should be "testClass1"');
    });

    it('getClassNames()', () => {
      assert.equal(dom('.testClass1').getClassNames()[0], 'testClass1', 'should be "testClass1"');
      assert.equal(dom('.testClass1').getClassNames()[1], 'testClass2', 'should be "testClass2"');
      assert.equal(dom('#super').getClassNames()[1], 'testClass2', 'should be "undefined"');
      assert.isUndefined(dom('.testClass1').getClassNames()[2], 'should be "undefined"');
      assert.isUndefined(dom('#super').getClassNames()[2], 'should be "undefined"');
    });

    it('getWidth()', () => {
      assert.equal(dom('.testClass1').getWidth(), 125, 'should be 125px');
      assert.equal(dom('.testClass2').getWidth(), 125, 'should be 125px');
    });
  });
});
