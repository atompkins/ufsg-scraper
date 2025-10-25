const cheerio = require('cheerio');
const getPage = require('../getPage');
const processItemPage = require('./processItemPage');

function sqlWriter(db, parsedItem) {
  const keys = Object.keys(parsedItem);
  const cols = keys.join(', ');
  const placeholders = keys.map((x) => `$${x}`).join(', ');
  const stmt = db.prepare(
    `replace into item (${cols}, lastSeen) values (${placeholders}, current_timestamp)`,
  );
  stmt.run(parsedItem);
}

const itemTypes = (thisRow) =>
  [
    'Amulet',
    'Armor',
    'Boots',
    'Gloves',
    'Helmet',
    'Ring',
    'Rune',
    'Shield',
    'Weapon',
  ].includes(thisRow.children().eq(2).text());

async function doRows(db, $, aRow) {
  const thisRow = $(aRow);
  const itemAnchor = $('a', thisRow);
  const response = await getPage(itemAnchor.attr('href'));
  const parsedItem = processItemPage(response);
  sqlWriter(db, parsedItem);
}

async function processIndexPage(db, { data }) {
  const $ = cheerio.load(data);
  const mainTable = $('table[width="800"]');
  const thisPageFont = $('tr:first-child font[color="#FF0000"]', mainTable);
  const nextPageAnchor = thisPageFont.parent().next();
  const nextPageUrl = nextPageAnchor.attr('href');
  const nextPageLabel = nextPageAnchor.text();
  const itemRows = $('tr:nth-child(2n+3):not(:last-child)', mainTable)
    .get()
    .filter((aRow) => itemTypes($(aRow)));
  await Promise.all(itemRows.map((aRow) => doRows(db, $, aRow)));
  return { nextPageLabel, nextPageUrl };
}

module.exports = processIndexPage;
