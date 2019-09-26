/**
@license
Copyright 2018 The Advanced REST client authors <arc@mulesoft.com>
Licensed under the Apache License, Version 2.0 (the "License"); you may not
use this file except in compliance with the License. You may obtain a copy of
the License at
http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
License for the specific language governing permissions and limitations under
the License.
*/
import { LitElement, html } from 'lit-element';
import { VariablesConsumerMixin } from '@advanced-rest-client/variables-consumer-mixin/variables-consumer-mixin.js';
import { ArcOverlayMixin } from '@advanced-rest-client/arc-overlay-mixin/arc-overlay-mixin.js';
import '@anypoint-web-components/anypoint-button/anypoint-button.js';
import { varsSort, valueLabel } from './utils.js';
import styles from './styles.js';
/**
 * An element to display quick preview of variables values for current
 * environment.
 *
 * The element works with
 * [variables-manager](https://github.com/advanced-rest-client/variables-manager/)
 * that provides the events API to get information about environemnts and variables.
 * It also requires `advanced-rest-client/arc-models/variables-model` as an
 * access to the data store.
 *
 * The element renders an overlay controlled by `Polymer.IronOverlayBehavior`
 * with list of variables associated with current environment.
 *
 * It listens for `variables-list-changed` custom event dispatched by the
 * `variables-manager`.
 * If the event cannot be send by the application then set `variables` and
 * `environemnt` properties to the corresponding values.
 *
 * ### Example
 *
 * ```html
 * <variables-preview-overlay id="overlay"></variables-preview-overlay>
 * ```
 * ```javascript
 * document.getElementById('overlay').positionTarget = target; // HTML element
 * ```
 *
 * ### Styling
 *
 * `<variables-preview-overlay>` provides the following custom properties and
 * mixins for styling:
 *
 * Custom property | Description | Default
 * ----------------|-------------|----------
 * `--variables-preview-overlay` | Mixin applied to the element | `{}`
 * `--variables-preview-overlay-background-color` | Background color of the oberlay | `inherit`
 * `--variables-preview-overlay-dialog-color` | Overlay foreground color | `--primary-text-color`
 * `--variables-preview-overlay-title` | Mixin applied to the title element | `{}`
 * `--variables-preview-overlay-var-name-color` | Color of a variable name label | `rgba(0, 0, 0, .54)`
 * `--variables-preview-overlay-var-value-color` | Color of a variable value label | `rgba(0, 0, 0, .87)`
 *
 * @memberof UiElements
 * @customElement
 * @demo demo/index.html
 * @appliesMixin VariablesConsumerMixin
 * @appliesMixin ArcOverlayMixin
 */
export class VariablesPreviewOverlay extends VariablesConsumerMixin(ArcOverlayMixin(LitElement)) {
  static get styles() {
    return styles;
  }

  static get properties() {
    return {
      /**
       * List of application variables (stored in the data store + in memory)
       * @type {Array<Object>}
       */
      appVariables: { type: Array },
      /**
       * List of system variables to display.
       * @type {Array<Object>}
       */
      systemVariables: { type: Array },
      /**
       * When set it renders values masked under non-meaningful character
       */
      maskedValues: { type: Boolean },
      /**
       * Enables compatibility with Anypoint platform
       */
      compatibility: { type: Boolean }
    };
  }

  get hasAppVariables() {
    const { appVariables } = this;
    return !!(appVariables && appVariables.length);
  }

  get hasSysVariables() {
    const { systemVariables } = this;
    return !!(systemVariables && systemVariables.length);
  }

  _variablesChanged(vars) {
    super._variablesChanged(vars);
    const appVars = [];
    const sysVars = [];
    if (vars && vars.length) {
      for (let i = vars.length - 1; i >= 0; i--) {
        const item = Object.assign({}, vars[i]);
        if (vars[i].sysVar) {
          sysVars[sysVars.length] = item;
        } else {
          appVars[appVars.length] = item;
        }
      }
    }
    this.systemVariables = sysVars.length ? sysVars.sort(varsSort) : undefined;
    this.appVariables = appVars.length ? appVars.sort(varsSort) : undefined;
  }

  _fireEdit() {
    this.dispatchEvent(new CustomEvent('open-variables-editor', {
      bubbles: true,
      composed: true
    }));
    this.opened = false;
  }

  _toggleValues() {
    this.maskedValues = !this.maskedValues;
  }

  _headerTemplate() {
    const { environment, compatibility } = this;
    return html`<header>
      <h2>Variables for ${environment}</h2>
      <anypoint-button
        ?compatibility="${compatibility}"
        @click="${this._fireEdit}"
        aria-label="Activate to open variables editor">Edit variables</anypoint-button>
    </header>`;
  }

  _emptyInfoTemplate() {
    const { environment } = this;
    return html`<p class="no-vars">There's no variables for environment ${environment}</p>`;
  }

  _appVarsTemplate() {
    const items = this.appVariables || [];
    const { maskedValues } = this;
    return html`<ul class="list app-vars">
      ${items.map((item) => html`<li ?data-enabled="${item.enabled}">
        <span class="var-name">${item.variable}</span>
        <span class="var-value">${valueLabel(item.value, maskedValues)}</span>
      </li>`)}
    </ul>`;
  }

  _sysVarsTemplate() {
    const items = this.systemVariables || [];
    const { maskedValues } = this;
    return html`
    <h2>System variables</h2>
    <ul class="list sys-vars">
      ${items.map((item) => html`<li data-enabled>
        <span class="var-name">${item.variable}</span>
        <span class="var-value">${valueLabel(item.value, maskedValues)}</span>
      </li>`)}
    </ul>`;
  }

  render() {
    const { hasAppVariables, hasSysVariables, compatibility } = this;
    return html`
    <div class="container">
      <div class="content">
        ${this._headerTemplate()}
        ${hasAppVariables ? this._appVarsTemplate() : this._emptyInfoTemplate() }
        ${hasSysVariables ? this._sysVarsTemplate() : '' }
      </div>
      <div class="buttons">
        <anypoint-button
          data-action="toggle-masked"
          ?compatibility="${compatibility}"
          @click="${this._toggleValues}"
          aria-label="Activate to toggle variables visibility"
        >Toggle visibility</anypoint-button>
        <anypoint-button
          ?compatibility="${compatibility}"
          @click="${this._fireEdit}"
          aria-label="Activate to edit variables"
        >Edit variables</anypoint-button>
      </div>
    </div>`;
  }
  /**
   * Fired when the user requested to edit variables for selected environemnt.
   *
   * @event open-variables-editor
   */
}
