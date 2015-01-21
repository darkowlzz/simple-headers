'use strict';

var capitalize   = require('capitalize'),
    parseHeaders = require('parse-headers'),
    status       = require('statuses');

/**
 * Stringify http header properties to form a serialized string.
 * @param {json} headers
 *    A json object with header properties.
 *    Example:
 *    {content-type: 'text/html;',
 *     cache-control: 'no-cache, no-store'}
 *
 * @param {json} [optional] options
 *    A json object containing respose details like httpVersion
 *    and statusCode.
 *    Example: {httpVersion: '1.1', statusCode: 200}
 */
function stringify (headers, options) {
  var result = '';
  if (options) {
    result += 'HTTP/' + options.httpVersion + ' ' +
              options.statusCode + ' ' + status[options.statusCode] +
              '\r\n';
  }

  var keys = Object.keys(headers);
  keys.forEach(function (key) {
    if (key === 'set-cookie') {
      headers[key].forEach(function (cookie) {
        result += capitalize.words(key) + ': ' + cookie + '\r\n';
      });
    } else {
      result += capitalize.words(key) + ': ' + headers[key] + '\r\n';
    }
  });
  return result;
}
exports.stringify = stringify;


/**
 * Parse http headers and create json object with the header attributes.
 * @param {string} headers - Header to be parsed.
 *
 * @return {json} - JSON object with header content as key/value.
 */
function parse (headers) {
  if (headers.slice(0,4).toLowerCase() == 'http') {
    var newlineIndex = headers.indexOf('\r\n');
    headers = headers.slice(newlineIndex + 2);
  }
  return parseHeaders(headers);
}
exports.parse = parse;
