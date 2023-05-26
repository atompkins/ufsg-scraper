const sqlite3 = require('sqlite3').verbose();

let db;
let statement;

function createTable() {
  db.run(`CREATE TABLE IF NOT EXISTS creature (
      id               integer primary key
    , name             text    null
    , class            text    null
    , level            integer null
    , attack           integer null
    , defense          integer null
    , armor            integer null
    , damage           integer null
    , hp               integer null
    , lastSeen         datetime null
  )`);
}

function prepareStmt() {
  statement = db.prepare(`REPLACE INTO creature (
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
  VALUES (
      ?
    , ?
    , ?
    , ?
    , ?
    , ?
    , ?
    , ?
    , ?
    , current_timestamp
  )`);
}

function initSql() {
  db = new sqlite3.Database('data.sqlite');
  db.serialize(() => {
    createTable();
    prepareStmt();
  });
}

function sqlWriter(parsedItem) {
  statement.run(parsedItem);
}

function closeSql() {
  statement.finalize();
  db.close();
}

module.exports = { closeSql, initSql, sqlWriter };
