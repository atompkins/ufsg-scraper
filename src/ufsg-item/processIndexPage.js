const cheerio = require('cheerio');
const getPage = require('../getPage');
const processItemPage = require('./processItemPage');
const { sqlWriter } = require('./sqliteWriter');

const itemTypes = (thisRow) => [
  'Amulet', 'Armor', 'Boots', 'Gloves', 'Helmet',
  'Ring', 'Rune', 'Shield', 'Weapon',
].includes(thisRow.children().eq(2).text());

async function doRows($, aRow) {
  const thisRow = $(aRow);
  const itemAnchor = $('a', thisRow);
  const response = await getPage(itemAnchor.attr('href'));
  const parsedItem = processItemPage(response);
  sqlWriter(parsedItem);
}

async function processIndexPage({ data }) {
  const $ = cheerio.load(data);
  const mainTable = $('table[width="800"]');
  const thisPageFont = $('tr:first-child font[color="#FF0000"]', mainTable);
  const nextPageAnchor = thisPageFont.parent().next();
  const nextPageUrl = nextPageAnchor.attr('href');
  const nextPageLabel = nextPageAnchor.text();
  const itemRows = $('tr:nth-child(2n+3):not(:last-child)', mainTable)
    .get()
    .filter((aRow) => itemTypes($(aRow)));
  await Promise.all(itemRows.map((aRow) => doRows($, aRow)));
  return { nextPageLabel, nextPageUrl };
}

module.exports = processIndexPage;
