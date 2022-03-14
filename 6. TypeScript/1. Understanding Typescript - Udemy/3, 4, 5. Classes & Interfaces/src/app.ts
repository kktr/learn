class Department {
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
    private readonly id: number
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
    private readonly id: number
  ) {}
}

const accountingES2022 = new DepartmentES2022('ES2022', 'is', 'awesome', 777);

console.log(accountingES2022.esVersionIs);
