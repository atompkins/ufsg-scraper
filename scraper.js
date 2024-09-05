const init = require('./src/init');
const stdout = require('./src/stdout');

stdout('fetch', typeof fetch);
stdout('Request', typeof Request);
stdout('Response', typeof Response);
stdout('ReadableStream', typeof ReadableStream);

init()
  .then(() => stdout('Finished...'))
  .catch((e) => stdout(e));
