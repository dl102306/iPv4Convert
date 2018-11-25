function ipv4Convert(ipv) {
  const VALID_CHARS_RE = /\d|\.|\s/;
  const masks = [];
  const len = ipv.length + 1;
  let value = '';
  let gittest = 'confilct-release1.0-2';

  ipv = ipv + '.';
  for (let i = 0; i < len; i++) {
    const char = ipv.charAt(i);

    //invalid char check
    if (!VALID_CHARS_RE.test(char)) {
      throw new Error(`InvalidChar, character ${char} is not allowed in ip address`);
    }

    // handle "." case
    if (char === '.') {
      value = parseInt(value);
      if (isNaN(value) || value > 255 || value < 0) {
        throw new Error('InvalidValue, data should be range from 0 to 255');
      }
      masks.push(parseInt(value));
      // Once the value number is greater than 4, not continue anymore - "1.1.1.1.1..."
      if (masks.length > 4) {
        throw new Error('InvalidNum, total number of values should be 4');
      }
      value = '';
    } else {
      // handle [space] case
      const prevChar = ipv.charAt(i - 1);
      const nextChar = ipv.charAt(i + 1);
      if (char === ' ' && !Number.isNaN(parseInt(prevChar)) && !Number.isNaN(parseInt(nextChar))) {
        throw new Error('InvalidSpace, space between numbers not allowed');
      }
      value = value + char;
    }
  }

  if (masks.length !== 4) {
    throw new Error('InvalidNum, total number of values should be 4');
  }
  return masks.reduce((prev, curr, idx) => prev + curr * 256 ** (3 - idx), 0);
}
module.exports = ipv4Convert;
