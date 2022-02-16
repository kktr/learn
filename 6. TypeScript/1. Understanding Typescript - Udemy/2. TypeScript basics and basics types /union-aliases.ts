// 2/22 Union Types

function combine(
  n1: number | string,
  n2: number | string,
  resultConversion: 'as-number' | 'as-text'
) {
  let result: number | string;
  if (
    (typeof n1 === 'number' && typeof n2 === 'number') ||
    resultConversion === 'as-number'
  ) {
    result = +n1 + +n2;
  } else {
    result = n1.toString() + n2.toString();
  }
  return result;
}
// 2/23 Literal Types

const combineNumbers = combine(20, 30, 'as-number');
console.log('🚀 ~ combineNumbers', combineNumbers);

const combineNumbers2 = combine('20', '30', 'as-text');
console.log('🚀 ~ combineNumbers2', combineNumbers2);

const combineNumbers3 = combine('20', '30', 'as-number');
console.log('🚀 ~ combineNumbers3', combineNumbers3);

const combineStrings = combine('test', 'combine', 'as-text');
console.log('🚀 ~ combineStrings', combineStrings);

// 2/24 Type Aliases / Custom Types

type Combinable = number | string;
type ConversionDescriptor = 'as-number' | 'as-text';

function combine2(
  n1: Combinable,
  n2: Combinable,
  resultConversion: ConversionDescriptor
) {
  let result: number | string;
  if (
    (typeof n1 === 'number' && typeof n2 === 'number') ||
    resultConversion === 'as-number'
  ) {
    result = +n1 + +n2;
  } else {
    result = n1.toString() + n2.toString();
  }
  return result;
}
