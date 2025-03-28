class Circle {
  public constructor(
    public readonly name: string,
    public readonly color: string,
    public radius: number
  ) {}

  public calculateArea(): number {
    return Math.PI * this.radius ** 2;
  }
}

class Rectangle {
  public constructor(
    public readonly name: string,
    public readonly color: string,
    public width: number,
    public height: number
  ) {}

  public calculateArea(): number {
    return this.width * this.height;
  }

  public print(): string {
    return `Площа прямокутника: width * height = ${this.width} * ${this.height}`;
  }
}

class Square {
  public constructor(
    public readonly name: string,
    public readonly color: string,
    public side: number
  ) {}

  public calculateArea(): number {
    return this.side ** 2;
  }

  public print(): string {
    return `Площа квадрата: side * side = ${this.side} * ${this.side}`;
  }
}

class Triangle {
  public constructor(
    public readonly name: string,
    public readonly color: string,
    public base: number,
    public height: number
  ) {}

  public calculateArea(): number {
    return (this.base * this.height) / 2;
  }
}
