class Department {
  longWayForCreateProp: string;
  #name: string;
  #employees: string[];

  // private and readonly work only in TS
  constructor(
    n: string,
    longWayForCreateProp: string,
    private TSWayForPrivate: string,
    private readonly id: number
  ) {
    this.longWayForCreateProp = longWayForCreateProp;
    this.#name = n;
    this.#employees = [];
  }

  describe(this: Department): void {
    console.log('Department: ' + this.#name);
  }

  addEmployee(employee: string): void {
    this.#employees.push(employee);
  }

  printEmployee(): void {
    console.log(this.#employees.length, this.#employees);
  }
}

const accounting = new Department(
  'Acc',
  'this is a long way for create properties in JS',
  'this is a short way for create private properties in TS before es2022',
  1
);

accounting.describe();

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
    n: string,
    longWayForCreateProp: string,
    TSWayForPrivate: string,
    id: number,
    public admins: string[],
    clients: string[]
  ) {
    super(n, longWayForCreateProp, TSWayForPrivate, id);
    this.clients = clients;
  }
}

const ITAccounting = new ITDepartment(
  'ITACC',
  'lw',
  'wfp',
  2,
  ['admin1', 'admin2'],
  ['client1', 'client2']
);

console.log(ITAccounting.admins);
console.log(ITAccounting.clients);
