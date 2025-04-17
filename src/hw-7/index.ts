// Тип DeepReadonly: робить всі властивості об'єкта (включаючи вкладені) доступними тільки для читання
type DeepReadonly<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly<T[K]> : T[K];
};

// Тип DeepRequireReadonly: робить всі властивості об'єкта (включаючи вкладені) доступними тільки для читання та обов'язковими
type DeepRequireReadonly<T> = {
  readonly [K in keyof T]-?: T[K] extends object ? DeepRequireReadonly<T[K]> : T[K];
};

// Тип UpperCaseKeys: перетворює всі ключі об'єкта у верхній регістр
type UpperCaseKeys<T> = {
  [K in keyof T as Uppercase<string & K>]: T[K];
};

// Тип ObjectToPropertyDescriptor: перетворює об'єкт у об'єкт, де кожне значення є дескриптором властивості
type ObjectToPropertyDescriptor<T> = {
  [K in keyof T]: {
    value: T[K];
    writable: boolean;
    enumerable: boolean;
    configurable: boolean;
  };
};
