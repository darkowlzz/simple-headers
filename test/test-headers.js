'use strict';

var should = require('should'),
    simpleHeaders = require('../');


var HEADERS = {
  'content-type': 'text/html; charset=UTF-8',
  'strict-transport-security': 'max-age=10893354; includeSubDomains',
  'set-cookie':
   [ 'GAPS=1:Jk7rHS1FHjeHwOueZeT5IYR:w22jEiODynyfb7OC;Path=/;Expires=Thu, 19-Jan-2017 18:20:13 GMT;Secure;HttpOnly;Priority=HIGH',
     'GALX=ICWmdB7NjBk;Path=/;Secure' ],
  'x-frame-options': 'DENY',
  'cache-control': 'no-cache, no-store',
  pragma: 'no-cache',
  expires: 'Mon, 01-Jan-1990 00:00:00 GMT',
  'x-auto-login': 'realm=com.google&args=continue%3Dhttps%253A%252F%252Fgoogle.com%252FManageAccount',
  'transfer-encoding': 'chunked',
  date: 'Tue, 20 Jan 2015 18:20:13 GMT',
  'x-content-type-options': 'nosniff',
  'x-xss-protection': '1; mode=block',
  server: 'GSE',
  'alternate-protocol': '443:quic,p=0.02'
};

var stringifiedHeaders;


var expectedStr1 = "Content-Type: text/html; charset=UTF-8\r\nStrict-Transport-Security: max-age=10893354; includeSubDomains\r\nSet-Cookie: GAPS=1:Jk7rHS1FHjeHwOueZeT5IYR:w22jEiODynyfb7OC;Path=/;Expires=Thu, 19-Jan-2017 18:20:13 GMT;Secure;HttpOnly;Priority=HIGH\r\nSet-Cookie: GALX=ICWmdB7NjBk;Path=/;Secure\r\nX-Frame-Options: DENY\r\nCache-Control: no-cache, no-store\r\nPragma: no-cache\r\nExpires: Mon, 01-Jan-1990 00:00:00 GMT\r\nX-Auto-Login: realm=com.google&args=continue%3Dhttps%253A%252F%252Fgoogle.com%252FManageAccount\r\nTransfer-Encoding: chunked\r\nDate: Tue, 20 Jan 2015 18:20:13 GMT\r\nX-Content-Type-Options: nosniff\r\nX-Xss-Protection: 1; mode=block\r\nServer: GSE\r\nAlternate-Protocol: 443:quic,p=0.02\r\n";

var expectedStr2 = "HTTP/1.1 200 OK\r\nContent-Type: text/html; charset=UTF-8\r\nStrict-Transport-Security: max-age=10893354; includeSubDomains\r\nSet-Cookie: GAPS=1:Jk7rHS1FHjeHwOueZeT5IYR:w22jEiODynyfb7OC;Path=/;Expires=Thu, 19-Jan-2017 18:20:13 GMT;Secure;HttpOnly;Priority=HIGH\r\nSet-Cookie: GALX=ICWmdB7NjBk;Path=/;Secure\r\nX-Frame-Options: DENY\r\nCache-Control: no-cache, no-store\r\nPragma: no-cache\r\nExpires: Mon, 01-Jan-1990 00:00:00 GMT\r\nX-Auto-Login: realm=com.google&args=continue%3Dhttps%253A%252F%252Fgoogle.com%252FManageAccount\r\nTransfer-Encoding: chunked\r\nDate: Tue, 20 Jan 2015 18:20:13 GMT\r\nX-Content-Type-Options: nosniff\r\nX-Xss-Protection: 1; mode=block\r\nServer: GSE\r\nAlternate-Protocol: 443:quic,p=0.02\r\n";


describe('Test stringify', function () {
  it('should stringify without status info', function () {
    var result = simpleHeaders.stringify(HEADERS);
    result.should.be.exactly(expectedStr1);
  });

  it('should stringify with status info', function () {
    var opts = {
      httpVersion: '1.1',
      statusCode: 200
    };
    var result = simpleHeaders.stringify(HEADERS, opts);
    stringifiedHeaders = result;
    result.should.be.exactly(expectedStr2);
  });
});

describe('Test parse', function () {
  it('should parse stringified headers', function () {
    var result = simpleHeaders.parse(stringifiedHeaders);
    JSON.stringify(result).should.be.exactly(JSON.stringify(HEADERS));
  });
});
