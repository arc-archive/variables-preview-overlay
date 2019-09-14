/**
 * Sort function for dom-repeat for vars
 * @param {Object} a
 * @param {Object} b
 * @return {Number}
 */
export const varsSort = (a, b) => {
  if (a.enabled === b.enabled) {
    return 0;
  }
  if (a.enabled < b.enabled) {
    return 1;
  }
  return -1;
};
/**
 * Computes value for a variable label depending on value of `maskedValues`.
 *
 * @param {String} value Variable value
 * @param {Boolean} maskedValues True to maks the value.
 * @return {String} When `maskedValues` is true then it returns series of `•`.
 * The input otherwise.
 */
export const valueLabel = (value, maskedValues) => {
  if (!value) {
    return;
  }
  if (maskedValues) {
    const len = value.length;
    const arr = new Array(len);
    return arr.fill('•', 0, len).join('');
  }
  return value;
};
