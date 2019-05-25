import Base from './Base';
import Store from '../store';
import db, { COURSES, INSCRIPTIONS, COURSES_INSCRIPTIONS } from '../db';
import Participant from './Participant';
import { getSeconds, timeDiff } from '../filters/Time';

const PROPERTIES = ['nom', 'coefficient'];

class Course extends Base {
    constructor() {
        super();
        this.nom = null;
        this.coefficient = null;
    }

    async insert() {
        await super.insert();
        await Course.findAll();
    }


    static findAll() {
        return super.findAll().then((courses) => {
            Store.commit('cleanCourses');
            courses.forEach((course) => {
                Store.commit('addCourse', course);
            });
            return courses;
        });
    }

    async participantsPasFini() {
        const inDB = await db.run(`SELECT * FROM ${INSCRIPTIONS} p JOIN ${COURSES_INSCRIPTIONS} c ON c.participantId = p.id WHERE c.courseId = ?`, [this.id]);
        const courseFinieIds = inDB.filter(d => d.debut !== null && d.arrivee !== null).map(d => d.participantId);
        const participants = await Participant.findAll();
        return participants.filter(p => !courseFinieIds.includes(p.id));
    }

    async getResultats() {
        const inDB = await db.run(`SELECT * FROM ${INSCRIPTIONS} p JOIN ${COURSES_INSCRIPTIONS} c ON c.participantId = p.id WHERE c.courseId = ?`, [this.id]);
        return inDB.filter(p => p.debut !== null && p.arrivee !== null).sort((a, b) => (getSeconds(a.arrivee) - getSeconds(a.debut)) > (getSeconds(b.arrivee) - getSeconds(b.debut))).map((item) => {
            const p = Participant.convert(item);
            p.id = item.participantId;
            p.temps = timeDiff([item.arrivee, item.debut]);
            return p;
        });
    }
}

Course.table = COURSES;
Course.properties = PROPERTIES;

export default Course;
