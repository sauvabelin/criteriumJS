import db from '../db';

export default class {
    constructor(table, properties) {
        this.id = null;
        this.properties = properties;
        this.table = table;
    }

    async insert() {
        const params = {};
        this.properties.forEach((property) => {
            params[property] = this[property];
        });
        await db.run(`insert into ${this.table} values ?`, [params]);
    }

    async update(key, value) {
        return db.run(`update ${this.table} set ${key} = ? where id = ?`, [value, this.id]).then(() => {
            this[key] = value;
        });
    }
}
