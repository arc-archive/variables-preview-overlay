[![Published on NPM](https://img.shields.io/npm/v/@advanced-rest-client/variables-preview-overlay.svg)](https://www.npmjs.com/package/@advanced-rest-client/variables-preview-overlay)

[![Build Status](https://travis-ci.org/advanced-rest-client/variables-preview-overlay.svg?branch=stage)](https://travis-ci.org/advanced-rest-client/variables-preview-overlay)

[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/advanced-rest-client/variables-preview-overlay)

## &lt;variables-preview-overlay&gt;

An element to render an overlay with application and system variables (if applicable).
It uses `VariablesPreviewOverlay` to manage list of variable and works with `variables-manager` and `variables-model` to get information about current environment, available environments, and variables.

## Usage

### Installation
```
npm install --save @advanced-rest-client/variables-preview-overlay
```

### In an LitElement template

```js
import { LitElement, html } from 'lit-element';
import './node_odules/@advanced-rest-client/variables-preview-overlay/variables-preview-overlay.js';

class SampleElement extends LitElement {
  render() {
    return html`
    <variables-preview-overlay
      maskedvalues
      ?compatibility="${this.compatibility}"
      @open-variables-editor="${this._openEditor}"></variables-preview-overlay>

    <variables-manager></variables-manager>
    <variables-editor hidden></variables-editor>
    <variables-model></variables-model>
    `;
  }

  _openEditor() {
    this.shadowRoot.querySelector('variables-editor').removeAttribute('hidden');
  }
}
customElements.define('sample-element', SampleElement);
```

## Development

```sh
git clone https://github.com/advanced-rest-client/variables-preview-overlay
cd variables-preview-overlay
npm install
```

### Running the demo locally

```sh
npm start
```

### Running the tests

```sh
npm test
```

## API components

This components is a part of [API components ecosystem](https://elements.advancedrestclient.com/)
