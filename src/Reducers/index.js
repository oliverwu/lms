import { combineReducers } from 'redux';
import { courses } from "./courses";
import { allLecturers} from "./allLecturers";

export default combineReducers({
    courses,
    allLecturers,
})

