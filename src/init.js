const Database = require('better-sqlite3');
const item = require('./ufsg-item/init');
const realm = require('./ufsg-realm/init');
const creature = require('./ufsg-simple-creature/init');

async function init() {
  const db = new Database('data.sqlite');

  process.on('exit', () => db.close());
  process.on('SIGHUP', () => process.exit(128 + 1));
  process.on('SIGINT', () => process.exit(128 + 2));
  process.on('SIGTERM', () => process.exit(128 + 15));

  await item(db);
  await realm(db);
  await creature(db);

  db.close();
}

module.exports = init;
