
import { html } from 'lit-html';
import { ArcDemoPage } from '@advanced-rest-client/arc-demo-helper/ArcDemoPage.js';
import '@advanced-rest-client/arc-demo-helper/arc-interactive-demo.js';
import '@advanced-rest-client/arc-models/variables-model.js';
import '@anypoint-web-components/anypoint-button/anypoint-button.js';
import '@advanced-rest-client/variables-manager/variables-manager.js';
import '@advanced-rest-client/variables-editor/variables-editor.js';
import '../variables-preview-overlay.js';

class DemoPage extends ArcDemoPage {
  constructor() {
    super();
    this.initObservableProperties([
      'compatibility'
    ]);
    this._componentName = 'variables-preview-overlay';
    this.demoStates = ['Material design', 'Anypoint'];

    this._demoStateHandler = this._demoStateHandler.bind(this);
    this._toggleMainOption = this._toggleMainOption.bind(this);
  }

  _toggleMainOption(e) {
    const { name, checked } = e.target;
    this[name] = checked;
  }

  _demoStateHandler(e) {
    const state = e.detail.value;
    this.compatibility = state === 1;
  }

  _openOverlay() {
    document.querySelector('variables-preview-overlay').opened = true;
  }

  _demoTemplate() {
    const {
      demoStates,
      darkThemeActive,
      compatibility
    } = this;
    return html`
      <section class="documentation-section">
        <h3>Interactive demo</h3>
        <p>
          This demo lets you preview the variables editor element with various
          configuration options.
        </p>

        <arc-interactive-demo
          .states="${demoStates}"
          @state-chanegd="${this._demoStateHandler}"
          ?dark="${darkThemeActive}"
        >
          <anypoint-button
            slot="content"
            ?compatibility="${compatibility}"
            @click="${this._openOverlay}"
            aria-label="Activate to open variables editor">Open overlay</anypoint-button>

        </arc-interactive-demo>

        <variables-preview-overlay
          dynamicalign
          horizontalalign="auto"
          verticalalign="auto"
          maskedvalues
          ?compatibility="${compatibility}"
        ></variables-preview-overlay>
      </section>
    `;
  }

  contentTemplate() {
    return html`
      <variables-manager></variables-manager>
      <variables-editor></variables-editor>
      <variables-model></variables-model>

      <h2>Variables preview overlay</h2>
      ${this._demoTemplate()}
    `;
  }
}

const instance = new DemoPage();
instance.render();
window._demo = instance;
