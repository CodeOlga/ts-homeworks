// Інтерфейс з сигнатурою індексу, де тип значення - число або рядок
interface UnionIndexSignature {
  [key: string]: number | string;
}

// Інтерфейс з сигнатурою індексу, де значення - функції
interface FunctionIndexSignature {
  [key: string]: (...args: any[]) => any;
}

// Інтерфейс для об'єкта, подібного до масиву
interface ObjectLikeArray {
  [index: number]: string;
}

// Інтерфейс з певними властивостями та індексною сигнатурою
interface DifferentProperties {
  name: string;
  [key: string]: string | number;
}

// Перший інтерфейс з індексною сигнатурою
interface BaseValues {
  [key: string]: string | number;
}

// Другий інтерфейс, який розширює перший
interface ExtendedIndexSignature extends BaseValues {
  specificProperty: string;
}

// Функція для перевірки об'єкта з індексною сигнатурою
interface NumberMap {
  [key: string]: number;
}

function areAllValuesNumbers(obj: { [key: string]: any }): boolean {
  return Object.values(obj).every(value => typeof value === 'number');
}

// Приклади перевірки
const test1: NumberMap = { a: 1, b: 2, c: 3 };
const test2 = { a: 1, b: 'hello' };

console.log(areAllValuesNumbers(test1)); // true
console.log(areAllValuesNumbers(test2)); // false
