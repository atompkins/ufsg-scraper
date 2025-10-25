const path = require('node:path');
const { readFileSync } = require('node:fs');
const getPage = require('../getPage');
const stdout = require('../stdout');
const processIndexPage = require('./processIndexPage');

const begin = 'index.php?cmd=items&index=0';

function createTable(db) {
  const create = readFileSync(
    path.resolve(__dirname, './createItems.sql'),
    'utf8',
  );
  db.exec(create);
}

async function getItems(db, url) {
  const response = await getPage(url);
  const { nextPageLabel, nextPageUrl } = await processIndexPage(db, response);
  if (nextPageLabel && nextPageLabel !== 'Last') {
    stdout(nextPageLabel);
    return getItems(db, nextPageUrl);
  }
  return false;
}

async function init(db) {
  createTable(db);
  await getItems(db, begin);
}

module.exports = init;
