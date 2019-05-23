import Base from './Base';
import { COURSES_INSCRIPTIONS } from '../db';

const PROPERTIES = ['participantId', 'debut', 'arrivee', 'courseId'];

class CourseParticipant extends Base {
    constructor() {
        super();
        this.participantId = null;
        this.debut = null;
        this.arrivee = null;
        this.courseId = null;
    }
}

CourseParticipant.table = COURSES_INSCRIPTIONS;
CourseParticipant.properties = PROPERTIES;

export default CourseParticipant;
