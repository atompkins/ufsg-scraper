function stdout(...args) {
  console.log(new Date(), ...args);
}

module.exports = stdout;
