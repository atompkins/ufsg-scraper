const cheerio = require('cheerio');

const valNext = ($e) => $e.closest('td').next().text();
const valOver = ($e) => $e.closest('td').next().next().next()
  .text();
const perc = (val) => Number(val.replace('%', ''));
const statMap = ([key, value]) => [key, key === 'Type' ? value : Number(value)];
const enhMap = ([key, value]) => [key, perc(value)];
const craftMap = ([key, value]) => [`craft${key}`, Number(value)];
const setMap = ([key, value]) => [`set${key}`, perc(value)];

function statsFromRow($, tHead, valLoc, mapFn) {
  return Object.fromEntries(
    tHead.nextUntil('tr:has([colspan="10"])')
      .find('b')
      .get()
      .map((e) => [
        `${$(e).text().replace(/[\s:]/g, '')}`,
        valLoc($(e)),
      ])
      .map(mapFn),
  );
}

function statsFromHeader($, tableRows, title, valLoc, mapFn) {
  const tHead = tableRows.has(`.tHeader:contains(${title})`);
  return statsFromRow($, tHead, valLoc, mapFn);
}

function stats($, tableRows) {
  return statsFromHeader($, tableRows, 'Statistics', valNext, statMap);
}

function enhancements($, tableRows) {
  return statsFromHeader($, tableRows, 'Enhancements', valNext, enhMap);
}

function craft($, tableRows) {
  return statsFromHeader($, tableRows, 'Crafting', valOver, craftMap);
}

function set($, tableRows) {
  const setLoc = tableRows.has('td:contains(When the complete)');
  if (setLoc.length) {
    return { setName: setLoc.find('b').text(), ...statsFromRow($, setLoc, valNext, setMap) };
  }
  return {};
}

function processItemPage({ config, data }) {
  const id = Number(/&item_id=(\d+)&/.exec(config.url)[1]);
  const $ = cheerio.load(data);
  const tableRows = $('table[width="800"] table tbody').children();
  const nameCell = tableRows.eq(0).children().eq(0);
  const name = nameCell.children().eq(0).text();
  const rarity = /\((.*)\)/.exec(nameCell.contents().eq(1).text())[1];
  return {
    id,
    name,
    rarity,
    ...stats($, tableRows),
    ...enhancements($, tableRows),
    ...craft($, tableRows),
    ...set($, tableRows),
  };
}

module.exports = processItemPage;
