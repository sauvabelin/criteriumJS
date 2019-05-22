import Base from './Base';
import { INSCRIPTIONS } from '../db';
import { getUnite, getSousUnite } from '../unites';

const PROPERTIES = ['dossard', 'nom', 'prenom', 'naissance', 'unitId'];

class Participant extends Base {
    constructor() {
        super();
        this.dossard = null;
        this.nom = null;
        this.prenom = null;
        this.naissance = null;
        this.unitId = null;
    }

    unite() {
        return getUnite(this.sousUnite().uid);
    }

    sousUnite() {
        return getSousUnite(this.unitId);
    }
}

Participant.table = INSCRIPTIONS;
Participant.properties = PROPERTIES;

export default Participant;
