import { describe, it, before, beforeEach } from 'mocha';
import chai from 'chai';
import ScrollFire from '../lib/components/scroll-fire';

const expect = chai.expect;

describe('ScrollFire component', () => {
  describe('init', () => {
    let scrollFire;

    before(() => {
      document.body.innerHTML = window.__html__['dev/js/test/fixtures/scroll-fire.html'];
    });

    beforeEach(() => {
      scrollFire = new ScrollFire();
    });

    it('set empty conf', () => {
      expect(scrollFire.cache[0].offset).to.equal(0);
    });
  });
});
