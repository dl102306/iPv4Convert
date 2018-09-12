const ipv4Convert = require('./index');

//InvalidValue: only 0-255 allowed
//case 1: empty value between ..
test('throws on InvalidValue: "1...1"', () => {
  expect(() => {
    ipv4Convert('1...1');
  }).toThrow('InvalidValue, data should be range from 0 to 255');
});

test('throws on InvalidValue: "...1"', () => {
  expect(() => {
    ipv4Convert('...1');
  }).toThrowError('InvalidValue, data should be range from 0 to 255');
});

test('throws on InvalidValue: "1. .1.1"', () => {
  expect(() => {
    ipv4Convert('1. .1.1');
  }).toThrowError('InvalidValue, data should be range from 0 to 255');
});

//case2: value range 0-255
test('throws on InvalidValue: "278.222.5.1"', () => {
  expect(() => {
    ipv4Convert('278.222.5.1');
  }).toThrowError('InvalidValue, data should be range from 0 to 255');
});

test('throws on InvalidValue: "256.0.0.0"', () => {
  expect(() => {
    ipv4Convert('256.0.0.0');
  }).toThrowError('InvalidValue, data should be range from 0 to 255');
});

//InvalidChar: only 0-9 allowed
test('throws on InvalidChar: "21+8.222.5.1"', () => {
  expect(() => {
    ipv4Convert('21+8.222.5.1');
  }).toThrowError('InvalidChar, character + is not allowed in ip address');
});

test('throws on InvalidChar: "2a.222.5.1"', () => {
  expect(() => {
    ipv4Convert('2a.222.5.1');
  }).toThrowError('InvalidChar, character a is not allowed in ip address');
});

test('throws on InvalidChar: "*.222.5.1"', () => {
  expect(() => {
    ipv4Convert('*.222.5.1');
  }).toThrowError('InvalidChar, character * is not allowed in ip address');
});

test('throws on InvalidValue: "-1.168.5.1"', () => {
  expect(() => {
    ipv4Convert('-1.168.5.1');
  }).toThrowError('InvalidChar, character - is not allowed in ip address');
});

//InvalidNum: total number of value should be 4
test('throws on InvalidNum: "172.16.8.5.1"', () => {
  expect(() => {
    ipv4Convert('172.16.8.5.1');
  }).toThrowError('InvalidNum, total number of values should be 4');
});

test('throws on InvalidNum: "172.5.1"', () => {
  expect(() => {
    ipv4Convert('172.5.1');
  }).toThrowError('InvalidNum, total number of values should be 4');
});

//InvalidSpace: space between numbers not allowed
test('throws on InvalidSpace: "172.16 8 5.1"', () => {
  expect(() => {
    ipv4Convert('172.16 8 5.1');
  }).toThrowError('InvalidSpace, space between numbers not allowed');
});

//correct input - normal case
test('convert "172.168.5.1" to 2896692481', () => {
  expect(ipv4Convert('172.168.5.1')).toBe(2896692481);
});

test('convert "119.12.5.1" to 1997276417', () => {
  expect(ipv4Convert('119.12.5.1')).toBe(1997276417);
});

//correct input - Boundary value

test('convert "0.0.0.0" to 0', () => {
  expect(ipv4Convert('0.0.0.0')).toBe(0);
});

test('convert "255.255.255.255" to 4294967295', () => {
  expect(ipv4Convert('255.255.255.255')).toBe(4294967295);
});

//correct input - space case
test('convert " 172. 168.5 .1 " to 2896692481', () => {
  expect(ipv4Convert(' 172. 168.5 .1 ')).toBe(2896692481);
});
