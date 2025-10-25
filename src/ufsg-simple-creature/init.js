const path = require('node:path');
const { readFileSync } = require('node:fs');
const getPage = require('../getPage');
const stdout = require('../stdout');
const processIndexPage = require('./processIndexPage');

const begin = 'index.php?cmd=creatures&index=0';

function createTable(db) {
  const create = readFileSync(
    path.resolve(__dirname, './createCreature.sql'),
    'utf8',
  );
  db.exec(create);
}

function prepareStmt(db) {
  return db.prepare(`REPLACE INTO creature (
      id
    , name
    , class
    , level
    , attack
    , defense
    , armor
    , damage
    , hp
    , lastSeen
  )
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, current_timestamp)`);
}

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
