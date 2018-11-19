import { combineReducers } from 'redux';
import { courses } from "./courses";
import { lecturers} from "./lecturers";
import { students } from "./students";

export default combineReducers({
    courses,
    lecturers,
    students,
})

