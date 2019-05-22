import * as uniqid from 'uniqid';
import db from '../db';

class Base {
    constructor() {
        this.id = `${uniqid.time()}-${Math.floor(Math.random() * 10000)}`;
    }

    static fullProperties() {
        return this.properties.concat(['id']);
    }

    async insert() {
        const params = {};
        this.constructor.fullProperties().forEach((property) => {
            params[property] = this[property];
        });
        await db.run(`insert into ${this.constructor.table} values ?`, [params]);
    }

    async update(key, value) {
        return db.run(`update ${this.constructor.table} set ${key} = ? where id = ?`, [value, this.id]).then(() => {
            this[key] = value;
        });
    }

    static findAll() {
        return db.run(`select * from ${this.table}`).then(data => data.map((item) => {
            console.log(item);
            const p = new this();
            this.fullProperties().forEach((property) => {
                p[property] = item[property];
            });
            return p;
        }));
    }
}

export default Base;
