import { RECEIVED_ALLCOURSESDATA } from "../Actions/CoursesActions";

export function AllCoursesReducer (state = [], action) {
    switch (action.type) {
        case RECEIVED_ALLCOURSESDATA :
            return action.courses;
        default :
            return state;
    }
}