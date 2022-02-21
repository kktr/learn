"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Department_name, _Department_employees;
class Department {
    constructor(n, longWayForCreateProp, TSWayForPrivate, id) {
        this.TSWayForPrivate = TSWayForPrivate;
        this.id = id;
        _Department_name.set(this, void 0);
        _Department_employees.set(this, void 0);
        this.longWayForCreateProp = longWayForCreateProp;
        __classPrivateFieldSet(this, _Department_name, n, "f");
        __classPrivateFieldSet(this, _Department_employees, [], "f");
    }
    describe() {
        console.log('Department: ' + __classPrivateFieldGet(this, _Department_name, "f"));
    }
    addEmployee(employee) {
        __classPrivateFieldGet(this, _Department_employees, "f").push(employee);
    }
    printEmployee() {
        console.log(__classPrivateFieldGet(this, _Department_employees, "f").length, __classPrivateFieldGet(this, _Department_employees, "f"));
    }
}
_Department_name = new WeakMap(), _Department_employees = new WeakMap();
const accounting = new Department('Acc', 'this is a long way for create properties in JS', 'this is a short way for create private properties in TS before es2022', 1);
accounting.describe();
const accountingCopy = {
    name: 'test',
    describe: accounting.describe,
};
accounting.addEmployee('jk');
accounting.addEmployee('th');
accounting.printEmployee();
console.log(accounting);
class ITDepartment extends Department {
    constructor(n, longWayForCreateProp, TSWayForPrivate, id, admins, clients) {
        super(n, longWayForCreateProp, TSWayForPrivate, id);
        this.admins = admins;
        this.clients = clients;
    }
}
const ITAccounting = new ITDepartment('ITACC', 'lw', 'wfp', 2, ['admin1', 'admin2'], ['client1', 'client2']);
console.log(ITAccounting.admins);
console.log(ITAccounting.clients);
//# sourceMappingURL=app.js.map