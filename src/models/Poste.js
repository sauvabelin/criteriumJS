import Base from './Base';
import Store from '../store';
import { POSTES } from '../db';

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


    static findAll() {
        return super.findAll().then((postes) => {
            Store.commit('cleanPostes');
            postes.forEach((poste) => {
                Store.commit('addPoste', poste);
            });
            return postes;
        });
    }
}

Poste.table = POSTES;
Poste.properties = PROPERTIES;

export default Poste;
