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

    async importItemsInTable(table, items, dateFields = []) {
        for await (const item of items) {
            let insertedItem = {...item};
            for (const field of dateFields) {
                if (insertedItem[field]) {
                    insertedItem[field] = new Date(insertedItem[field]);
                }
            }
            console.log(insertedItem);
            await db.run(`insert into ${table} values ?`, [insertedItem]);
        }
    }

    /**
     * @param {File} file 
     */
    async importFile(file) {
        const event = await new Promise((resolve) => {
            const reader = new FileReader();
            reader.addEventListener('load', resolve);
            reader.readAsText(file);
        });

        try {
            const {
                inscriptions,
                courses,
                postes,
                coursesInscriptions,
                postesInscriptions,
            } = JSON.parse(event.target.result);
            const dbName = file.name.replace('.json', '') + "_" + Date.now();
            await this.swap(dbName);

            await this.importItemsInTable(INSCRIPTIONS, inscriptions);
            await this.importItemsInTable(COURSES, courses);
            await this.importItemsInTable(POSTES, postes);
            await this.importItemsInTable(POSTES_INSCRIPTIONS, postesInscriptions);
            await this.importItemsInTable(COURSES_INSCRIPTIONS, coursesInscriptions, ['debut', 'arrivee']);
        } catch (e) {
            console.error(e);
            alert(`Une erreur s'est produite: ${e.message}`);
        }
    }

    async exportDB(dbname) {
        const oldDb = localStorage.getItem(ACTIVE_DB);
        await this.swap(dbname);
        const inscriptions = await this.run(`SELECT * FROM ${INSCRIPTIONS}`);
        const courses = await this.run(`SELECT * FROM ${COURSES}`);
        const postes = await this.run(`SELECT * FROM ${POSTES}`);
        const coursesInscriptions = await this.run(`SELECT * FROM ${COURSES_INSCRIPTIONS}`);
        const postesInscriptions = await this.run(`SELECT * FROM ${POSTES_INSCRIPTIONS}`);

        const data = JSON.stringify({
            inscriptions,
            courses,
            postes,
            postesInscriptions,
            coursesInscriptions,
        });

        const blob = new Blob([data], { type: 'text/json' });
        if (window.navigator.msSaveOrOpenBlob) {
            window.navigator.msSaveBlob(blob, `${dbname}.json`);
        } else {
            const anchor = document.createElement('a');
            anchor.href = window.URL.createObjectURL(blob);
            anchor.target = '_blank';
            anchor.download = `${dbname}.json`;
            document.body.append(anchor);
            anchor.click();
        }

        await this.swap(oldDb);
    }

    exist(dbname) {
        return this.getDatabaseNames().includes(dbname);
    }
}

const db = new DB();
export default db;
