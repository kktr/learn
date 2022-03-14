class Department {
  // static, can call only in class instance: Department.fiscalYear
  static fiscalYear = 2022;
  // public is standard state
  // declaration in 3 places
  longWayForCreateProp: string;
  // es2022 declaration in 1 place
  #es2022shortWayForCreatePublicAndPrivateProp: string[] = [];
  es2022shortWayForCreatePublicProp: string = 'public ES 2022!';
  // private and readonly work only in TS
  constructor(
    // declaration in 3 places
    longWayForCreateProp: string,
    // declaration in 2 places
    public beforeEs2022ShortWayForCreateProp: string,
    // es2022 declaration in 1 place, only in constructor
    private TSWayForPrivate: string,
    protected id: number
  ) {
    // declaration in 3 places
    this.longWayForCreateProp = longWayForCreateProp;
    // declaration in 2 places
    this.beforeEs2022ShortWayForCreateProp = beforeEs2022ShortWayForCreateProp;
    // this.#es2022shortWayForCreatePublicAndPrivateProp = [];
  }

  describe(this: Department): void {
    console.log('Department: ' + this.beforeEs2022ShortWayForCreateProp);
  }

  addEmployee(employee: string): void {
    this.#es2022shortWayForCreatePublicAndPrivateProp.push(employee);
  }

  printEmployee(): void {
    console.log(
      this.#es2022shortWayForCreatePublicAndPrivateProp.length,
      this.#es2022shortWayForCreatePublicAndPrivateProp
    );
  }

  printEmployeeID(): number {
    console.log(this.id);
    return this.id;
  }

  static addEmployee(name: string) {
    return { name: name };
  }
}

const accounting = new Department(
  'this is a long way for create properties in JS',
  'this is a short way for create private properties in TS before es2022',
  'private',
  1
);

console.log(accounting.printEmployeeID());

// const accountingCopy = { describe: accounting.describe.bind(accounting) };

const accountingCopy = {
  name: 'test',
  describe: accounting.describe,
};

// accountingCopy.describe();

accounting.addEmployee('jk');
accounting.addEmployee('th');
accounting.printEmployee();

console.log(accounting);

class ITDepartment extends Department {
  clients;

  constructor(
    es2022shortWayForCreatePublicProp: string,
    longWayForCreateProp: string,
    TSWayForPrivate: string,
    id: number,
    public admins: string[],
    clients: string[]
  ) {
    super(
      es2022shortWayForCreatePublicProp,
      longWayForCreateProp,
      TSWayForPrivate,
      id
    );
    this.clients = clients;
  }
}

const ITAccounting = new ITDepartment(
  'know',
  'lw',
  'wfp',
  2,
  ['admin1', 'admin2'],
  ['client1', 'client2']
);

console.log(ITAccounting);

console.log(ITAccounting.admins);
console.log(ITAccounting.clients);

console.log(ITAccounting.printEmployeeID());

class ITDepartmentES2022 extends Department {
  description = 'we dont need  describe it in constructor';
  // constructor is needed only when we create more props than in base Class
  #privateES2022 = 'we can use new private hash';

  static #privateStatic() {
    console.log(
      'a private static only accessible from inside of our prototype class'
    );
  }
}

const ITAccountingES2022 = new ITDepartmentES2022('know', 'lw', 'wfp', 2);

console.log(ITAccountingES2022);

class DepartmentES2022 {
  constructor(
    // declaration in 1places
    public esVersionIs: string,
    public be: string,
    private what: string,
    private readonly id: number,
    protected likePrivateButAlsoWorksInExtendedClasses: string
  ) {}
}

const accountingES2022 = new DepartmentES2022(
  'ES2022',
  'is',
  'awesome',
  777,
  'protected'
);

console.log(accountingES2022.esVersionIs);

// 5/67 Getters & Setters

class AccountingDepartment extends Department {
  private lastReport: string;

  get mostRecentReport() {
    if (this.lastReport) {
      return this.lastReport;
    }
    throw new Error('report not found');
  }

  set mostRecentReport(value: string) {
    this.addReport(value);
  }

  private employees: string[] = [];
  constructor(id: string, private reports: string[]) {
    super(id, 'Accounting', 'Private', 3);
    this.lastReport = reports[0];
  }

  addEmployee(name: string): void | undefined {
    if (name === 'Max') {
      return;
    }
    this.employees.push(name);
  }

  addReport(text: string) {
    this.reports.push(text);
    this.lastReport = text;
  }

  printEmployeeID() {
    const message = `here I overwritten printEmployeeID for AccountingDepartment, but the way, id is ${this.id} `;
    console.log(message);
    return this.id;
  }
}

const accDepartment1 = new AccountingDepartment('1', []);

// error
// console.log(accDepartment1.mostRecentReport);

accDepartment1.addReport('new report, here I AM !, ty ty, ty, tyty, tytyty!');

console.log(accDepartment1.mostRecentReport);

accDepartment1.mostRecentReport = 'newest report';

console.log(accDepartment1.mostRecentReport);

// call static method
console.log(Department.addEmployee('new employee'));

const newEmployee = Department.addEmployee('Joe Dillinger');
console.log(newEmployee);

console.log(Department.fiscalYear);

console.log(accDepartment1.printEmployeeID());

// create abstract classes when you want to force reassign method
abstract class DepartmentAbstract {
  abstract printEmployeeID(): void;
  constructor(protected id: number) {}
}

class ITDepartment2 extends DepartmentAbstract {
  printEmployeeID() {
    console.log(this.id);
  }
}

const itDepartment2 = new ITDepartment2(4);

itDepartment2.printEmployeeID();
