import isString from 'lodash/isString';
import flatten from 'lodash/flatten';
import isArray from 'lodash/isArray';
import isObject from 'lodash/isObject';

const shouldReplaceString = (str, indexAt, match) => {
  const isSingleChar = () => (match.length > 1 ? str.charAt(indexAt) === match[0] : str.charAt(indexAt) === match);
  return str.indexOf(match) > -1 && isSingleChar();
};

const constructArrayFromString = (str, match, color, indexAt) =>
  [str.slice(0, indexAt), { color, indexAt, match }, str.slice(indexAt + match.length)];

const replaceStringWithHighlightObj = (str, match, color, indexAt) =>
  (shouldReplaceString(str, indexAt, match))
    ? constructArrayFromString(str, match, color, indexAt)
    : str;

/**
 * convert to array if input is string,
 * for each determine if has a match and mutate to object
 * @param source {string|array}
 * @param match {string}
 * @param color {string}
 * @param indexAt {number}
 * @returns {Array}
 */
export const replaceMatchChars = (source, match, color, indexAt) => {
  if (!isArray(source)) source = [source];

  return flatten(
    source.map(itr => {
      if (isObject(itr)) {
        return itr.indexAt === indexAt ? Object.assign(itr, { color }) : itr;
      }
      if (isString(itr)) {
        return replaceStringWithHighlightObj(itr, match, color, indexAt);
      }
    })
  );
};
