import escapeRegExp from 'lodash/escapeRegExp';
import isString from 'lodash/isString';
import flatten from 'lodash/flatten';
import isArray from 'lodash/isArray';
import isObject from 'lodash/isObject';

/**
 *
 * @param {string} str
 * @param {regex|string} match
 * @param {function} fn
 * @returns {array}
 */
const replaceStringInner = (str, match, fn) => {
  if (str === '') {
    return str;
  } else if (!str || !isString(str)) {
    throw new TypeError('First argument to must be a string');
  }

  const re = new RegExp('(' + escapeRegExp(match) + ')', 'gi');
  const result = str.split(re);

  // Apply fn to all odd elements based on str.split
  for (let i = 1; i < result.length; i += 2) {
    result[i] = fn(result[i], i);
  }
  return result;
};

// In the case the user chose a word already highlighted
// convert back to a string before replacing
const handleRevisitingWords = (source, match) =>
  source.map(item =>
    (isObject(item) && item.props.children === match) ? item.props.children : item
  );

export const replaceString = (source, match, fn) => {
  if (!isArray(source)) {
    source = [source]
  }
  const reviewedSource = handleRevisitingWords(source, match);
  return flatten(reviewedSource.map(item =>
    isString(item) ? replaceStringInner(item, match, fn) : item
  ));
};

