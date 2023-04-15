const { NotImplementedError } = require('../extensions/index.js');

/**
 * Given an array of domains, return the object with the appearances of the DNS.
 *
 * @param {Array} domains
 * @return {Object}
 *
 * @example
 * domains = [
 *  'code.yandex.ru',
 *  'music.yandex.ru',
 *  'yandex.ru'
 * ]
 *
 * The result should be the following:
 * {
 *   '.ru': 3,
 *   '.ru.yandex': 3,
 *   '.ru.yandex.code': 1,
 *   '.ru.yandex.music': 1,
 * }
 *
 */
function getDNSStats(domains) {
  const dnsList = [];
  domains.forEach(domain => {
    const domainParts = domain.split(".").reverse();
    let domainPart = "";
    for (let i = 0; i < domainParts.length; i++) {
      domainPart += `.${domainParts[i]}`;
      dnsList.push(domainPart);
    }
  });

  const dnsInfoObject = {};
  dnsList.sort();
  for (let i = 0; i < dnsList.length;) {
    let currentDnsCounter = 1;
    let j = i + 1;
    while (j < dnsList.length && dnsList[i] === dnsList[j]) {
      currentDnsCounter++;
      j++;
    }

    dnsInfoObject[dnsList[i]] = currentDnsCounter;
    i = j;
  }

  return dnsInfoObject;
}

module.exports = {
  getDNSStats
};
