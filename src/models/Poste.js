import Base from './Base';
import Store from '../store';
import db, { POSTES_INSCRIPTIONS, INSCRIPTIONS, POSTES } from '../db';
import Participant from './Participant';

const PROPERTIES = ['nom', 'max', 'coefficient'];

class Poste extends Base {
    constructor() {
        super();
        this.nom = null;
        this.max = null;
        this.coefficient = null;
    }

    async insert() {
        await super.insert();
        await Poste.findAll();
    }

    getMax() {
        return parseInt(this.max, 10);
    }


    static findAll() {
        return super.findAll().then((postes) => {
            Store.commit('cleanPostes');
            postes.forEach((poste) => {
                Store.commit('addPoste', poste);
            });
            return postes;
        });
    }

    async participantsPasEntres() {
        const inDB = await db.run(`SELECT * FROM ${INSCRIPTIONS} p JOIN ${POSTES_INSCRIPTIONS} c ON c.participantId = p.id WHERE c.posteId = ?`, [this.id]);
        const postesEntreesIds = inDB.filter(d => d.points !== null).map(d => d.participantId);
        const participants = await Participant.findAll();
        return participants.filter(p => !postesEntreesIds.includes(p.id));
    }

    async getResultats() {
        const inDB = await db.run(`SELECT * FROM ${INSCRIPTIONS} p JOIN ${POSTES_INSCRIPTIONS} c ON c.participantId = p.id WHERE c.posteId = ?`, [this.id]);
        return inDB.sort((a, b) => parseInt(a.points, 10) < parseInt(b.points, 10)).map((item) => {
            const p = Participant.convert(item);
            p.id = item.participantId;
            p.points = item.points;
            return p;
        });
    }
}

Poste.table = POSTES;
Poste.properties = PROPERTIES;

export default Poste;
