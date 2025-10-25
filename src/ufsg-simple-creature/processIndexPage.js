const cheerio = require('cheerio');

function doRows(stmt, $, aRow) {
  const itemAnchor = $('a', aRow);
  stmt.run([
    /creature_id=(\d+)&/.exec(itemAnchor.attr('href'))[1],
    itemAnchor.text(),
    $(':nth-child(2)', aRow).text(),
    $(':nth-child(3)', aRow).text(),
    $(':nth-child(4)', aRow).text(),
    $(':nth-child(5)', aRow).text(),
    $(':nth-child(6)', aRow).text(),
    $(':nth-child(7)', aRow).text(),
    $(':nth-child(8)', aRow).text(),
  ]);
}

async function processIndexPage(stmt, { data }) {
  const $ = cheerio.load(data);
  const mainTable = $('table[width="800"]');
  const thisPageFont = $('tr:first-child font[color="#FF0000"]', mainTable);
  const nextPageAnchor = thisPageFont.parent().next();
  const nextPageUrl = nextPageAnchor.attr('href');
  const nextPageLabel = nextPageAnchor.text();
  const itemRows = $('tr:nth-child(2n+3):not(:last-child)', mainTable)
    .get();
  itemRows.forEach((aRow) => doRows(stmt, $, aRow));
  return { nextPageLabel, nextPageUrl };
}

module.exports = processIndexPage;
