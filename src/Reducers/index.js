import { combineReducers } from 'redux';
import { courses } from "./courses";
import { lecturers} from "./lecturers";

export default combineReducers({
    courses,
    lecturers,
})

