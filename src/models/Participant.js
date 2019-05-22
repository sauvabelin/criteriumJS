import Base from './Base';
import db, { INSCRIPTIONS } from '../db';
import { getUnite, getSousUnite } from '../unites';

const PROPERTIES = ['dossard', 'nom', 'prenom', 'naissance', 'unitId'];

class Participant extends Base {
    constructor() {
        super(INSCRIPTIONS, PROPERTIES);
        this.dossard = null;
        this.nom = null;
        this.prenom = null;
        this.naissance = null;
        this.unitId = null;
    }

    getPostesResults() {

    }

    getCoursesResults() {

    }

    unite() {
        return getUnite(this.sousUnite().uid);
    }

    sousUnite() {
        return getSousUnite(this.unitId);
    }

    static findAll() {
        return db.run(`select * from ${INSCRIPTIONS}`).then(data => data.map((item) => {
            const p = new Participant();
            PROPERTIES.concat(['id']).forEach((property) => {
                p[property] = item[property];
            });
            return p;
        }));
    }
}

export default Participant;
