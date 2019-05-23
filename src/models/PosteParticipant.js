import Base from './Base';
import { POSTES_INSCRIPTIONS } from '../db';

const PROPERTIES = ['participantId', 'points', 'posteId'];

class PosteParticipant extends Base {
    constructor() {
        super();
        this.participantId = null;
        this.points = null;
        this.posteId = null;
    }
}

PosteParticipant.table = POSTES_INSCRIPTIONS;
PosteParticipant.properties = PROPERTIES;

export default PosteParticipant;
