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

    static find(id) {
        return this.findOneBy({ id });
    }

    static findOneBy(items) {
        return this.findBy(items).then(data => data.length === 1 ? data[0] : null);
    }

    static findAll() {
        return db.run(`select * from ${this.table}`).then(data => data.map(item => this.convert(item)));
    }

    static findBy(items) {
        return this.findAnyBy(this.table, items);
    }

    static findAnyBy(table, items) {
        const str = Object.keys(items).map(k => `${k} = ?`).join(' AND ');
        const params = Object.keys(items).map(key => items[key]);
        return db.run(`select * from ${table} where ${str}`, params)
            .then(data => data.map(item => table === this.table ? this.convert(item) : item));
    }

    static convert(item) {
        const p = new this();
        this.fullProperties().forEach((property) => {
            p[property] = item[property];
        });
        return p;
    }
}

export default Base;
