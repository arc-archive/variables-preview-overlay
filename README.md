[![Published on NPM](https://img.shields.io/npm/v/@advanced-rest-client/variables-preview-overlay.svg)](https://www.npmjs.com/package/@advanced-rest-client/variables-preview-overlay)

[![Build Status](https://travis-ci.org/advanced-rest-client/variables-preview-overlay.svg?branch=stage)](https://travis-ci.org/advanced-rest-client/variables-preview-overlay)

[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/advanced-rest-client/variables-preview-overlay)

## &lt;variables-preview-overlay&gt;

An element to display quick preview of variables values for selected environment.

```html
<variables-preview-overlay></variables-preview-overlay>
```

### API components

This components is a part of [API components ecosystem](https://elements.advancedrestclient.com/)

## Usage

### Installation
```
npm install --save @advanced-rest-client/variables-preview-overlay
```

### In an html file

```html
<html>
  <head>
    <script type="module">
      import '@advanced-rest-client/variables-preview-overlay/variables-preview-overlay.js';
    </script>
  </head>
  <body>
    <variables-preview-overlay></variables-preview-overlay>
  </body>
</html>
```

### In a Polymer 3 element

```js
import {PolymerElement, html} from '@polymer/polymer';
import '@advanced-rest-client/variables-preview-overlay/variables-preview-overlay.js';

class SampleElement extends PolymerElement {
  static get template() {
    return html`
    <variables-preview-overlay></variables-preview-overlay>
    `;
  }
}
customElements.define('sample-element', SampleElement);
```

### Installation

```sh
git clone https://github.com/advanced-rest-client/variables-preview-overlay
cd api-url-editor
npm install
npm install -g polymer-cli
```

### Running the demo locally

```sh
polymer serve --npm
open http://127.0.0.1:<port>/demo/
```

### Running the tests
```sh
polymer test --npm
```
