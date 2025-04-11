// Ось ДЗ по темі Захисники типів:

// У вас є сутність - Компанія, яка має назву, список департаментів,
// список попередньо найнятого персоналу, а також список усього персоналу компанії
// - співробітники всіх департаментів і попередньо найняті.

// Сутність Департамент - має назву, доменну область, список своїх співробітників
// і бюджет, що складається з дебіту і кредиту. Так само у неї існують методи
// для обчислення балансу виходячи з поточного бюджету, додавання нових співробітників,
// який враховує зміни балансу і перетворення з Попередньо найнятого на Співробітника
// або видалення Співробітника з минулого відділу.

// Сутність Попередньо найнятого співробітника має ім'я, прізвище, зарплата
// та номер банківського рахунку.

// Сутність Співробітника - ім'я, прізвище, платіжну інформацію, зарплату, статус
// (активний, неактивний, у неоплачуваній відпустці) і знання про департамент, до якого він прикріплений.

// Так само у нас є сутність Бухгалтерія, яка є департаментом і має властивість баланс,
// а також методи для взяття на баланс співробітника або департаменту,
// зняття з балансу і виплати зарплати для всього персоналу.

// Попередньо найняті співробітники отримують зарплату за допомогою зовнішніх оплат,
// Співробітники (тільки активні) - за допомогою внутрішніх.

// Типи та перерахування
type PaymentInfo = {
  bankAccountNumber: string;
};

type Budget = {
  debit: number;
  credit: number;
};

enum EmployeeStatus {
  Active = 'active',
  Inactive = 'inactive',
  UnpaidLeave = 'unpaid_leave',
}

// Попередньо найнятий співробітник
class PreHiredEmployee {
  constructor(
    public firstName: string,
    public lastName: string,
    public salary: number,
    public bankAccountNumber: string
  ) {}
}

// Співробітник
class Employee {
  constructor(
    public firstName: string,
    public lastName: string,
    public salary: number,
    public paymentInfo: PaymentInfo,
    public status: EmployeeStatus,
    public department: Department
  ) {}
}

// Департамент
class Department {
  employees: Employee[] = [];

  constructor(
    public name: string,
    public domain: string,
    public budget: Budget
  ) {}

  getBalance(): number {
    return this.budget.credit - this.budget.debit;
  }

  addEmployee(preHired: PreHiredEmployee): Employee {
    const newEmployee = new Employee(
      preHired.firstName,
      preHired.lastName,
      preHired.salary,
      { bankAccountNumber: preHired.bankAccountNumber },
      EmployeeStatus.Active,
      this
    );
    this.employees.push(newEmployee);
    this.budget.debit += preHired.salary;
    return newEmployee;
  }

  removeEmployee(employee: Employee) {
    this.employees = this.employees.filter(e => e !== employee);
    this.budget.debit -= employee.salary;
  }
}

// Бухгалтерія
class Accounting extends Department {
  balance: number = 0;

  takeOnBalance(entity: Department | Employee) {
    if (entity instanceof Department) {
      this.balance += entity.getBalance();
    } else if (entity instanceof Employee) {
      this.balance += entity.salary;
    }
  }

  removeFromBalance(entity: Department | Employee) {
    if (entity instanceof Department) {
      this.balance -= entity.getBalance();
    } else if (entity instanceof Employee) {
      this.balance -= entity.salary;
    }
  }

  paySalaries(employees: (Employee | PreHiredEmployee)[]) {
    for (const person of employees) {
      if (person instanceof Employee && person.status === EmployeeStatus.Active) {
        this.balance -= person.salary;
        console.log(`💵 Paid salary to employee: ${person.firstName}`);
      } else if (person instanceof PreHiredEmployee) {
        console.log(`🌐 External payment to pre-hired: ${person.firstName}`);
      }
    }
  }
}

// Компанія
class Company {
  departments: Department[] = [];
  preHiredEmployees: PreHiredEmployee[] = [];
  allEmployees: (Employee | PreHiredEmployee)[] = [];

  constructor(public name: string) {}

  addDepartment(dep: Department) {
    this.departments.push(dep);
  }

  hire(preHired: PreHiredEmployee, department: Department) {
    const employee = department.addEmployee(preHired);
    this.allEmployees.push(employee);
    this.preHiredEmployees = this.preHiredEmployees.filter(e => e !== preHired);
  }

  addPreHired(preHired: PreHiredEmployee) {
    this.preHiredEmployees.push(preHired);
    this.allEmployees.push(preHired);
  }
}

// === Приклад використання ===

// Створюємо компанію
const myCompany = new Company('NextGen Tech');

// Створюємо департаменти
const devDepartment = new Department('Development', 'dev.nextgen.com', {
  debit: 0,
  credit: 100000,
});
const accounting = new Accounting('Accounting', 'accounting.nextgen.com', {
  debit: 0,
  credit: 50000,
});

// Додаємо департаменти в компанію
myCompany.addDepartment(devDepartment);
myCompany.addDepartment(accounting);

// Додаємо попередньо найнятих співробітників
const preHired1 = new PreHiredEmployee('Olga', 'Ivanenko', 3000, 'UA123456');
const preHired2 = new PreHiredEmployee('Petro', 'Shevchenko', 3500, 'UA654321');

myCompany.addPreHired(preHired1);
myCompany.addPreHired(preHired2);

// Наймаємо одного з них у Development
myCompany.hire(preHired1, devDepartment);

// Accounting бере департамент на баланс
accounting.takeOnBalance(devDepartment);

// Accounting виплачує зарплати
accounting.paySalaries(myCompany.allEmployees);

// Виводимо фінансовий баланс бухгалтерії
console.log(`📊 Accounting balance: ${accounting.balance}`);

// Видаляємо співробітника зі списку департаменту
devDepartment.removeEmployee(devDepartment.employees[0]);

// Знову оновлюємо баланс
accounting.removeFromBalance(devDepartment);
console.log(`📉 Accounting balance after removal: ${accounting.balance}`);
