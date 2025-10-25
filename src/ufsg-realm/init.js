const path = require('node:path');
const { readFileSync } = require('node:fs');
const getPage = require('../getPage');
const stdout = require('../stdout');
const processIndexPage = require('./processIndexPage');

function createTable(db) {
  const create = readFileSync(
    path.resolve(__dirname, './createRealm.sql'),
    'utf8',
  );
  db.exec(create);
}

function prepareStmt(db) {
  return db.prepare(`replace into realm (
      realm_id
    , realm_name
    , level
    , creature_id
    , creature_name
    , creature_class
    , lastSeen
  )
  VALUES (?, ?, ?, ?, ?, ?, current_timestamp)`);
}

const begin = 'index.php?cmd=realms&index=0';

async function getItems(stmt, url) {
  const response = await getPage(url);
  const { nextPageLabel, nextPageUrl } = await processIndexPage(stmt, response);
  if (nextPageLabel && nextPageLabel !== 'Last') {
    stdout(nextPageLabel);
    return getItems(stmt, nextPageUrl);
  }
  return false;
}

async function init(db) {
  createTable(db);
  const stmt = prepareStmt(db);
  await getItems(stmt, begin);
}

module.exports = init;
