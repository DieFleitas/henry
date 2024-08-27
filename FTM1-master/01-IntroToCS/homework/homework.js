"use strict";

function BinarioADecimal(num) {
  // tu codigo aca
  let numToString = String(num);
  let decimal = 0;
  for (let i = 0; i < numToString.length; i++) {
    decimal =
      decimal + 2 ** i * Number(numToString[numToString.length - i - 1]);
  }
  return decimal;
}

function DecimalABinario(num) {
  // tu codigo aca
  let bin = String(num % 2);
  for (; num > 1; ) {
    num = parseInt(num / 2);
    bin = (num % 2) + bin;
  }
  return bin;
}

module.exports = {
  BinarioADecimal,
  DecimalABinario,
};
