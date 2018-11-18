import { RECEIVED_ALLCOURSESDATA } from "../Actions/CoursesActions";

export function courses (state = {allCourses:[], isLoading: true}, action) {
    switch (action.type) {
        case RECEIVED_ALLCOURSESDATA :
            return {
                allCourses: action.allCourses,
                isLoading: action.isLoading,
            };
        default :
            return state;
    }
}