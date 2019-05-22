import * as alasql from 'alasql';

const LS_KEY = 'criterium_dbs';
export const INSCRIPTIONS = 'inscriptions';
export const COURSES = 'courses';
export const COURSES_INSCRIPTIONS = 'coursesinscriptions';
export const POSTES_INSCRIPTIONS = 'postesinscriptions';
export const POSTES = 'postes';

class DB {
    constructor() {
        this.prefix = 'criteriumDBs';
        this.alasql = alasql;
        this.dbname = null;
    }

    async init() {
        const dbs = this.getDatabaseNames();
        if (dbs.length === 0) {
            await this.install(new Date().getFullYear());
        } else {
            await this.useDB(dbs[0]);
        }
    }

    getDatabaseNames() {
        const data = localStorage.getItem(LS_KEY);
        return data === null ? [] : JSON.parse(data);
    }

    run(query, params) {
        return new Promise((resolve, reject) => {
            console.log(`running (${query})`);
            alasql.promise(query, params).then((data) => {
                resolve(data);
            }).catch((err) => {
                console.error(err);
                reject(err);
            });
        });
    }

    async swap(dbname) {
        if (!this.exist(dbname)) this.install(dbname);
        else {
            const name = this.formatName(dbname);
            await this.useDB(name);
        }
    }

    async install(dbname) {
        if (await this.exist(dbname)) await this.swap(dbname);
        else {
            const name = this.formatName(dbname);
            await this.run(`create INDEXEDDB database if not exists ${name}`);
            await this.useDB(name);
            await this.run(`create table ${INSCRIPTIONS} (id STRING, dossard INT, nom STRING, prenom STRING, naissance INT, unitId INT)`);
            await this.run(`create table ${COURSES} (id STRING, nom STRING)`);
            await this.run(`create table ${POSTES} (id STRING, nom STRING, max INT, coefficient INT)`);
            await this.run(`create table ${COURSES_INSCRIPTIONS} (id STRING, dossard INT, debut DATE, arrivee DATE)`);
            await this.run(`create table ${POSTES_INSCRIPTIONS} (id STRING, dossard INT, points INT)`);
            console.log('Installed db');
            localStorage.setItem(LS_KEY, JSON.stringify([name].concat(this.getDatabaseNames())));
        }
    }

    async useDB(name) {
        await this.run(`attach INDEXEDDB database ${name}`);
        await this.run(`use ${name}`);
        this.dbname = name;
    }

    async exist(dbname) {
        const name = this.formatName(dbname);
        const dbs = await this.run(`show databases like '%${name}%'`);
        return dbs.filter(db => db.databaseid === name).length === 1;
    }

    formatName(dbname) {
        return `${this.prefix}${dbname}`;
    }
}

const db = new DB();
export default db;
