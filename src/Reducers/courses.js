import { RECEIVED_COURSESDATA, CLEACR_COURSESDATA } from "../Actions/CoursesActions";

const initialState = {
    allCourses:[],
    isLoading: true
};

export function courses (state = initialState, action) {
    switch (action.type) {
        case RECEIVED_COURSESDATA :
            return {
                allCourses: action.allCourses,
                isLoading: action.isLoading,
            };
        case CLEACR_COURSESDATA :
            return initialState;
        default :
            return state;
    }
}