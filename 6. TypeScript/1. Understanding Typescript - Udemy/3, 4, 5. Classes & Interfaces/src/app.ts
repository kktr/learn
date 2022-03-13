class Department {
  // public is standard state
  longWayForCreateProp: string;
  // beforeEs2022ShortWayForCreateProp: string;

  // es2022 declaration in 1 place
  #es2022shortWayForCreatePublicAndPrivateProp: string[] = [];
  es2022shortWayForCreatePublicProp: string = 'public ES 2022!';
  // private and readonly work only in TS
  constructor(
    // declaration in 3 places
    longWayForCreateProp: string,
    // declaration in 2 places
    public beforeEs2022ShortWayForCreateProp: string,
    private TSWayForPrivate: string,
    private readonly id: number
  ) {
    this.longWayForCreateProp = longWayForCreateProp;
    // this.beforeEs200ShortWayForCreateProp = beforeEs200ShortWayForCreateProp;
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

  printEmployeeID(): void {
    console.log(this.id);
  }
}

const accounting = new Department(
  'this is a long way for create properties in JS',
  'this is a short way for create private properties in TS before es2022',
  'private',
  1
);

accounting.printEmployeeID();

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
  'know',
  'lw',
  'wfp',
  2,
  ['admin1', 'admin2'],
  ['client1', 'client2']
);

console.log(ITAccounting.admins);
console.log(ITAccounting.clients);

class ITDepartmentES2022 extends Department {
  description = 'we dont need  describe it in constructor';
  #privateES2022 = 'we can use new private hash';

  static #privateStatic() {
    console.log(
      'a private static only accessible from inside of our prototype class'
    );
  }
}

const ITAccountingES2022 = new ITDepartmentES2022('know', 'lw', 'wfp', 2);

console.log(ITAccountingES2022);
