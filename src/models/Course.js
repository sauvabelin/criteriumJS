import Base from './Base';
import Store from '../store';
import { COURSES } from '../db';

const PROPERTIES = ['nom'];

class Course extends Base {
    constructor() {
        super();
        this.nom = null;
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
}

Course.table = COURSES;
Course.properties = PROPERTIES;

export default Course;
