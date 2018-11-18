import { RECEIVED_COURSEBYIDDATA } from "../Actions/CoursesActions";

export function CourseDetailsReducer(status = {}, action) {
    switch (action.type) {
        case RECEIVED_COURSEBYIDDATA:
            return action.course;
        default:
            return status;
    }
}