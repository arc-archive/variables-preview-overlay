import { css } from 'lit-element';

export default css`
:host {
  display: block;
  background-color: var(--variables-preview-overlay-background-color, inherit);
  color: var(--variables-preview-overlay-color, var(--primary-text-color));

  font-size: var(--arc-font-body1-font-size);
  font-weight: var(--arc-font-body1-font-weight);
  line-height: var(--arc-font-body1-line-height);

  box-shadow: 0 16px 24px 2px rgba(0, 0, 0, 0.14),
              0  6px 30px 5px rgba(0, 0, 0, 0.12),
              0  8px 10px -5px rgba(0, 0, 0, 0.4);
}

header {
  display: flex;
  flex-direction: row;
}

h2 {
  position: relative;
  margin-top: 20px;
  padding: 0 24px;
  flex: 1;
  flex-basis: 0.000000001px;

  white-space: var(--arc-font-nowrap-white-space);
  overflow: var(--arc-font-nowrap-overflow);
  text-overflow: var(--arc-font-nowrap-text-overflow);
  font-size: var(--arc-font-title-font-size);
  font-weight: var(--arc-font-title-font-weight);
  line-height: var(--arc-font-title-line-height);
}

.container {
  display: flex;
  flex-direction: column;
  max-height: inherit;
}

.content {
  overflow: auto;
  flex: 1;
  flex-basis: 0.000000001px;
  max-height: inherit;
  height: 100vh;
  flex-basis: initial;
}

.buttons {
  position: relative;
  padding: 8px 8px 8px 24px;
  margin: 0;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}

.list {
  list-style: none;
}

.list,
.no-vars {
  margin-top: 24px;
  margin-bottom: 24px;
  padding: 0 24px;
  min-width: 300px;
}

.list li {
  display: flex;
  word-break: normal;
  user-select: text;
  cursor: text;
}

.var-name {
  color: var(--variables-preview-overlay-var-name-color, rgba(0, 0, 0, .54));
  margin-right: 16px;
  min-width: 80px;
}

.var-value {
  color: var(--variables-preview-overlay-var-value-color, rgba(0, 0, 0, .87));
  display: inline-block;
  word-break: break-all;
  flex: 1;
}

li span {
  text-decoration: line-through;
}

li[data-enabled] span {
  text-decoration: none;
}
`;
