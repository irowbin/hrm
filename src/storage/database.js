import Dexie from 'dexie';

// Employee Database Context
export class EmployeeDbContext extends Dexie {
    // employee table
    employees;
    // account table
    account;
    // employee address table
    address;
    // employee contact table
    contact;

    constructor() {
        // create database
        super("HrmDatabase");

        this.version(1).stores({
            // schemas with columns
            employees: "++id,firstName,lastName,age,gender,email",
            account: '++id, employeeId, username,password,role, status',
            address: '++id,employeeId, street,zip,city,country,addressType',
            contact: '++id,employeeId, contactType,key,value'
        });

        // init table instances
        this.employees = this.table("employees");
        this.account = this.table("account");
        this.address = this.table("address");
        this.contact = this.table("contact");
    }

    // add initial data
    async initSeed() {
        let employees = await this.employees.count();

        if (employees > 0) {
            return;
        }
        const id = await this.employees.add({
            firstName: 'John',
            lastName: 'doe',
            age: 30,
            gender: 'male',
            email: 'john@email.com'
        });

        await this.account.add({
            employeeId: id,
            username: 'john123',
            password: '1234',
            role: 'manager',
            status: 'active'
        });
        await this.address.bulkAdd([
            {
                employeeId: id,
                street: ' 5th avenue',
                zip: 1233,
                city: 'awesome city',
                country: 'Japan',
                addressType: 'Temporary'
            },
            {
                employeeId: id,
                street: 'new diner 11th street',
                zip: 88123,
                city: 'awesome city',
                country: 'USA',
                addressType: 'Permanent'
            }
        ]);

        await this.contact.bulkAdd([
            {
                employeeId: id,
                contactType: 'phoneNumbers',
                key: ' Office',
                value: ' 553 - 412 - 3120'
            }, {
                employeeId: id,
                contactType: 'phoneNumbers',
                key: ' Home',
                value: '667 - 412 - 3120'
            },
            {
                employeeId: id,
                contactType: 'mailbox',
                key: ' Office',
                value: 'super@mail.com'
            }
        ])
    }

    // Initially gets all data
    async getEmployees() {
        await this.initSeed()

        let employees = await this.employees.orderBy('id').reverse().toArray();
        // Attach resolved properties on each employee
        // using parallel queries:
        await Promise.all(employees.map(async emp => {

            [emp.account, emp.contact, emp.address] = await Promise.all([
                this.account.where('employeeId').equals(emp.id).first(),
                this.address.where('employeeId').equals(emp.id).toArray(),
                this.contact.where('employeeId').equals(emp.id).toArray()
            ]);

        }));

        return employees;
    }

    // Get employee by Id
    async getById(id) {

        const employee = await this.employees.get(id)
        await Promise.all([
            employee.account = await this.account.where('employeeId').equals(id).first(),
            employee.address = await this.address.where('employeeId').equals(id).toArray(),
            employee.contact = await this.contact.where('employeeId').equals(id).toArray()
        ])


        return employee;
    }

    // Either add or update employee and it's descendants
    async addOrUpdateEmployee(payload) {
        let id;
        if (payload?.id > 0) {
            await Promise.all([
                this.employees.put(payload),
                this.account.put(payload.account),
                this.address.bulkPut(payload.address),
                this.contact.bulkPut(payload.contact)
            ]);
        } else {
            // lets auto increment in the DB.
            delete payload.id;
            id = await this.employees.add(payload);
            if (payload.account) {
                await this.account.add({...payload.account, status: 'active', employeeId: id})
            }
            if (payload.address?.length > 0) {
                await this.address.bulkAdd(payload.address.map(el => ({...el, employeeId: id})))
            }
            if (payload.contact?.length > 0) {

                await this.contact.bulkAdd(payload.contact.map(el => ({...el, employeeId: id})))
            }
        }

        // we might use it later
        return id > 0 ? id : payload.id;
    }

    // Remove employee and it's descendants
    async deleteEmployeeById(id) {
        const addIds = await this.address.where('employeeId').equals(id).toArray();
        const ctIds = await this.contact.where('employeeId').equals(id).toArray();
        await Promise.all([
            this.employees.delete(id),
            this.account.where('employeeId').equals(id).delete(),
            this.address.bulkDelete([...addIds.map(a => a.id) || 0]),
            this.contact.bulkDelete([...ctIds.map(c => c.id || 0)]),
        ])
    }
}
