const axios = require('axios');
const stdout = require('./stdout');

function logError(url, error) {
  if (error.response) {
    stdout('error.response.status', error.response.status, url);
  } else if (error.request) {
    stdout('error.request', error.request);
  } else {
    stdout('error.message', error.message);
  }
}

const interval = 1000;
let lastRefill = 0;
const refillAmount = 5;
let tokens = 0;

const delay = (ms) => new Promise((r) => { setTimeout(r, ms); });

async function refillTokens() {
  if (tokens < refillAmount && performance.now() - lastRefill >= interval) {
    tokens = refillAmount;
    lastRefill = performance.now();
  } else await delay(100);
}

async function limiter() {
  // eslint-disable-next-line no-await-in-loop
  while (tokens < 1) await refillTokens();
  tokens -= 1;
}

async function getPage(target, attempt = 1) {
  await limiter();
  let result;
  const url = `https://guide.fallensword.com/${target}`;
  try {
    result = await axios.get(url);
  } catch (error) {
    logError(url, error);
    if (error.response.status === 500) return result;
    if (attempt <= 10) {
      await delay(attempt * 100);
      return getPage(target, attempt + 1);
    }
    throw error;
  }
  return result;
}

module.exports = getPage;
