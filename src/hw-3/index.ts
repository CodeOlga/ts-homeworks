interface Printable {
  print(): string;
}
abstract class Shape {
  constructor(
    readonly name: string,
    readonly color: string
  ) {}

  abstract calculateArea(): number;
}
class Circle extends Shape {
  constructor(
    name: string,
    color: string,
    public radius: number
  ) {
    super(name, color);
  }

  calculateArea(): number {
    return Math.PI * this.radius ** 2;
  }
}

class Rectangle extends Shape implements Printable {
  constructor(
    name: string,
    color: string,
    public width: number,
    public height: number
  ) {
    super(name, color);
  }

  calculateArea(): number {
    return this.width * this.height;
  }

  print(): string {
    return `Площа прямокутника: width * height = ${this.width} * ${this.height}`;
  }
}

class Square extends Shape implements Printable {
  constructor(
    name: string,
    color: string,
    public side: number
  ) {
    super(name, color);
  }

  calculateArea(): number {
    return this.side ** 2;
  }

  print(): string {
    return `Площа квадрата: side * side = ${this.side} * ${this.side}`;
  }
}

class Triangle extends Shape {
  constructor(
    name: string,
    color: string,
    public base: number,
    public height: number
  ) {
    super(name, color);
  }

  calculateArea(): number {
    return (this.base * this.height) / 2;
  }
}
