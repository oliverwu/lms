import { RECEIVED_ALLCOURSESDATA } from "../Actions/CoursesActions";

export function AllLecturersReducer(state = [], action) {
    switch (action.type) {
        case RECEIVED_ALLCOURSESDATA :
            return action.lecturers;
        default :
            return state;
    }
}