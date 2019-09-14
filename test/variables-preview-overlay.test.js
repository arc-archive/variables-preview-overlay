import { fixture, assert, nextFrame } from '@open-wc/testing';
import * as MockInteractions from '@polymer/iron-test-helpers/mock-interactions.js';
import * as sinon from 'sinon/pkg/sinon-esm.js';
import '../variables-preview-overlay.js';

describe('<variables-preview-overlay>', function() {
  async function basicFixture() {
    return await fixture(`<variables-preview-overlay></variables-preview-overlay>`);
  }

  describe('basic', function() {
    let element;
    beforeEach(async function() {
      element = await basicFixture();
    });

    it('appVariables is computed', () => {
      element.variables = [{
        variable: 'test',
        value: 'test'
      }];
      assert.typeOf(element.appVariables, 'array');
      assert.lengthOf(element.appVariables, 1);
    });

    it('hasAppVariables is computed', function() {
      element.variables = [{
        variable: 'test',
        value: 'test'
      }];
      assert.isTrue(element.hasAppVariables, 'has variables when set');
      element.variables = undefined;
      assert.isFalse(element.hasAppVariables, 'is false when undefined');
    });

    it('hasSysVariables is computed', function() {
      element.systemVariables = [{
        variable: 'test',
        value: 'test'
      }];
      assert.isTrue(element.hasSysVariables);
      element.systemVariables = undefined;
      assert.isFalse(element.hasSysVariables);
    });

    it('Renders app variables list', async () => {
      element.variables = [{
        variable: 'test',
        value: 'test'
      }];
      await nextFrame();
      const list = element.shadowRoot.querySelector('.list.app-vars');
      assert.ok(list);
    });

    it('Renders system variables list', async () => {
      element.systemVariables = [{
        variable: 'test',
        value: 'test'
      }];
      await nextFrame();
      const list = element.shadowRoot.querySelector('.list.sys-vars');
      assert.ok(list);
    });

    it('Sets properties from the variables-list-changed event', function() {
      const e = new CustomEvent('variables-list-changed', {
        bubbles: true,
        detail: {
          value: [{
            variable: 'test',
            value: 'test'
          }]
        }
      });
      document.body.dispatchEvent(e);
      assert.isTrue(element.hasVariables);
      assert.typeOf(element.variables, 'array');
    });

    it('Fires open-variables-editor event', function() {
      const spy = sinon.spy();
      element.addEventListener('open-variables-editor', spy);
      const button = element.shadowRoot.querySelector('header anypoint-button');
      MockInteractions.tap(button);
      assert.isTrue(spy.called);
    });
  });

  describe('Visibility toggle', () => {
    let element;
    beforeEach(async function() {
      element = await basicFixture();
      element.systemVariables = [{
        variable: 'test',
        value: 'test'
      }];
      await nextFrame();
    });

    it('makes labels masked', async () => {
      const button = element.shadowRoot.querySelector('[data-action="toggle-masked"]');
      MockInteractions.tap(button);
      await nextFrame();
      const label = element.shadowRoot.querySelector('.var-value');
      assert.equal(label.textContent, '••••');
    });

    it('makes labels visible again', async () => {
      const button = element.shadowRoot.querySelector('[data-action="toggle-masked"]');
      MockInteractions.tap(button);
      await nextFrame();
      MockInteractions.tap(button);
      await nextFrame();
      const label = element.shadowRoot.querySelector('.var-value');
      assert.equal(label.textContent, 'test');
    });
  });
});
