// const item = require('./ufsg-item/init');
// const realm = require('./ufsg-realm/init');
const creature = require('./ufsg-simple-creature/init');

async function init() {
  // await item();
  // await realm();
  await creature();
}

module.exports = init;
