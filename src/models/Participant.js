import Base from './Base';
import { INSCRIPTIONS } from '../db';
import { getUnite, getSousUnite } from '../unites';
import CourseParticipant from './CourseParticipant';
import PosteParticipant from './PosteParticipant';

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

    async getCoursesData() {
        return CourseParticipant.findBy({ participantId: this.id });
    }

    async getPostesData() {
        return PosteParticipant.findBy({ participantId: this.id });
    }

    unite() {
        return getUnite(this.sousUnite().uid);
    }

    sousUnite() {
        return getSousUnite(this.unitId);
    }

    async setCourseData(courseId, time, step) {
        const link = await CourseParticipant.findOneBy({ participantId: this.id, courseId });
        if (link === null) {
            const nlink = new CourseParticipant();
            nlink.courseId = courseId;
            nlink.participantId = this.id;
            nlink[step] = time;
            await nlink.insert();
        } else {
            await link.update(step, time);
        }
    }

    async setPosteData(posteId, points) {
        const link = await PosteParticipant.findOneBy({ participantId: this.id, posteId });
        if (link === null) {
            const nlink = new PosteParticipant();
            nlink.points = points;
            nlink.posteId = posteId;
            nlink.participantId = this.id;
            await nlink.insert();
        } else {
            await link.update('points', points);
        }
    }
}

Participant.table = INSCRIPTIONS;
Participant.properties = PROPERTIES;

export default Participant;
