import { combineReducers } from 'redux';
import { AllCoursesReducer } from "./AllCoursesReducer";
import { AllLecturersReducer} from "./AllLecturersReducer";
import { CourseDetailsReducer} from "./CourseDetailsReducer";
import { LecturerDetailsReducer} from "./LecturerDetailsReducer";

export default combineReducers({
    AllCoursesReducer,
    AllLecturersReducer,
    CourseDetailsReducer,
    LecturerDetailsReducer,
})

