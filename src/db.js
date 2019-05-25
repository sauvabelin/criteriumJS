import * as alasql from 'alasql';

const LS_KEY = 'criterium_dbs';
const ACTIVE_DB = 'criterium_active_db';
export const INSCRIPTIONS = 'inscriptions';
export const COURSES = 'courses';
export const COURSES_INSCRIPTIONS = 'coursesinscriptions';
export const POSTES_INSCRIPTIONS = 'postesinscriptions';
export const POSTES = 'postes';

class DB {
    constructor() {
        this.alasql = alasql;
        this.dbname = null;
    }

    async init() {
        const dbname = localStorage.getItem(ACTIVE_DB);
        if (dbname === null) {
            const dbs = this.getDatabaseNames();
            if (dbs.length === 0) {
                await this.install(`criterium${new Date().getFullYear()}`);
            } else {
                await this.useDB(dbs[0]);
            }
        } else await this.useDB(dbname);
    }

    getDatabaseNames() {
        const data = localStorage.getItem(LS_KEY);
        return data === null ? [] : JSON.parse(data);
    }

    run(query, params) {
        return new Promise((resolve, reject) => {
            console.log(`running (${query}) with params (${JSON.stringify(params)})`);
            alasql.promise(query, params).then((data) => {
                resolve(data);
            }).catch((err) => {
                console.error(err);
                reject(err);
            });
        });
    }

    async swap(dbname) {
        if (!this.exist(dbname)) return this.install(dbname);
        await this.useDB(dbname);
        return dbname;
    }

    async install(dbname) {
        if (this.exist(dbname)) return this.swap(dbname);

        await this.run(`create INDEXEDDB database if not exists ${dbname}`);
        await this.useDB(dbname);
        await this.run(`create table ${INSCRIPTIONS} (id STRING, dossard INT, nom STRING, prenom STRING, naissance INT, unitId INT)`);
        await this.run(`create table ${COURSES} (id STRING, nom STRING, coefficient INT)`);
        await this.run(`create table ${POSTES} (id STRING, nom STRING, max INT, coefficient INT)`);
        await this.run(`create table ${COURSES_INSCRIPTIONS} (id STRING, participantId STRING, debut DATE NULL, arrivee DATE NULL, courseId STRING)`);
        await this.run(`create table ${POSTES_INSCRIPTIONS} (id STRING, participantId STRING, points INT NULL, posteId STRING)`);
        console.log('Installed db');
        localStorage.setItem(LS_KEY, JSON.stringify([dbname].concat(this.getDatabaseNames())));
        return dbname;
    }

    async useDB(name) {
        localStorage.setItem(ACTIVE_DB, name);
        await this.run(`attach INDEXEDDB database ${name}`);
        await this.run(`use ${name}`);
        this.dbname = name;
    }

    exist(dbname) {
        return this.getDatabaseNames().includes(dbname);
    }
}

const db = new DB();
export default db;
