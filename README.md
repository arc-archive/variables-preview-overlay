[![Build Status](https://travis-ci.org/advanced-rest-client/variables-preview-overlay.svg?branch=stage)](https://travis-ci.org/advanced-rest-client/variables-preview-overlay)  

# variables-preview-overlay

An element to display quick preview of variables values for selected environment.

The lement works with [variables-manager](https://github.com/advanced-rest-client/variables-manager/)
that provide an API to get information about environemnts and variables.

The element displays an overlay controlled by `Polymer.IronOverlayBehavior` with
list of variables associated with current environment.
It listens for `variables-list-changed` custom event dispatched by the `variables-manager`.
If the event cannot be send by the application then set `variables` and `environemnt`
properties to corresponding values.

### Example

```html
<variables-preview-overlay id="overlay"></variables-preview-overlay>
<script>
document.getElementById('overlay').positionTarget = target; // HTML element
</script>
```

### Styling
`<variables-preview-overlay>` provides the following custom properties and mixins for styling:

Custom property | Description | Default
----------------|-------------|----------
`--variables-preview-overlay` | Mixin applied to the element | `{}`
`--variables-preview-overlay-background-color` | Background color of the oberlay | `inherit`
`--variables-preview-overlay-dialog-color` | Overlay foreground color | `--primary-text-color`
`--variables-preview-overlay-title` | Mixin applied to the title element | `{}`



### Events
| Name | Description | Params |
| --- | --- | --- |
| open-variables-editor | Fired when the user requested to edit variables for selected environemnt. | __none__ |
