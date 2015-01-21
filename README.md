simple-headers
==============
[![Build Status](https://travis-ci.org/darkowlzz/simple-headers.svg?branch=master)](https://travis-ci.org/darkowlzz/simple-headers)

Parse and serialize http headers.


## To use

  1. Install it:

    ```bash
    $ npm i simple-headers
    ```

  2. Require it and use:

    ```js
    var simpleHeaders = require('simple-headers');
    ```

## Example
```js
var simpleHeaders = require('simple-headers');

var headerObject = {
  'content-type': 'text/html;',
  'cache-control': 'no-cache'
};

var serial = simpleHeaders.stringify(headerObject);
// "Content-Type: text/html;\r\nCache-Control: no-cache\r\n"

simpleHeaders.parse(serial);
// {
//   'content-type': 'text/html;',
//   'cache-control': 'no-cache'
// }
```

## License

MIT &copy; 2015 Sunny (darkowlzz)
