function stdout(...args) {
  // eslint-disable-next-line no-console
  console.log(new Date(), ...args);
}

module.exports = stdout;
