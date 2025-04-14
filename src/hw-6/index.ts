// Фільтрація масиву

function filterArray<T>(array: T[], condition: (item: T) => boolean): T[] {
  return array.filter(condition);
}

// Приклад використання:
const numbers = [1, 2, 3, 4, 5];
const evenNumbers = filterArray(numbers, num => num % 2 === 0);
console.log(evenNumbers); // [2, 4]

// Узагальнений стек

class Stack<T> {
  private items: T[] = [];

  push(item: T): void {
    this.items.push(item);
  }

  pop(): T | undefined {
    return this.items.pop();
  }

  peek(): T | undefined {
    return this.items[this.items.length - 1];
  }
}

// Приклад використання:
const numberStack = new Stack<number>();
numberStack.push(10);
numberStack.push(20);
console.log(numberStack.peek()); // 20
console.log(numberStack.pop()); // 20

// Узагальнений словник

class Dictionary<K extends string | number | symbol, V> {
  private items: Record<K, V> = {} as Record<K, V>;

  set(key: K, value: V): void {
    this.items[key] = value;
  }

  get(key: K): V | undefined {
    return this.items[key];
  }

  has(key: K): boolean {
    return key in this.items;
  }
}

// Приклад використання:
const userAges = new Dictionary<string, number>();
userAges.set('Оля', 25);
console.log(userAges.get('Оля')); // 25
console.log(userAges.has('Оля')); // true
