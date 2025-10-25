const cheerio = require('cheerio');
const getPage = require('../getPage');
const processItemPage = require('./processItemPage');
const stdout = require('../stdout');

async function doRows(stmt, $, aRow) {
  const itemAnchor = $('a', aRow);
  const response = await getPage(itemAnchor.attr('href'));
  if (response) processItemPage(stmt, response);
  else stdout(itemAnchor.text());
}

async function processIndexPage(stmt, { data }) {
  const $ = cheerio.load(data);
  const mainTable = $('table[width="800"]');
  const thisPageFont = $('tr:first-child font[color="#FF0000"]', mainTable);
  const nextPageAnchor = thisPageFont.parent().next();
  const nextPageUrl = nextPageAnchor.attr('href');
  const nextPageLabel = nextPageAnchor.text();
  const itemRows = $('tr:nth-child(2n+3):not(:last-child)', mainTable).get();
  await Promise.all(itemRows.map((aRow) => doRows(stmt, $, aRow)));
  return { nextPageLabel, nextPageUrl };
}

module.exports = processIndexPage;
