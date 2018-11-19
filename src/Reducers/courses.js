import {
    RECEIVED_COURSESDATA,
    CLEACR_COURSESDATA,
    RECEIVED_COURSEDATA,
    UPDATE_COURSEDATA, CREATE_COURSEDATA, DELETE_COURSEDATA, CLEAR_COURSEDATA
} from "../Actions/CoursesActions";

const initialCoursesState = {
    allCourses:[],
    isLoading: true,
};

const initialCourseState = {
    course: {},
    isLoading: true,
    statusCode: null,
};

export function courses (state = initialCoursesState, action) {
    switch (action.type) {
        case RECEIVED_COURSESDATA :
            return {
                allCourses: action.allCourses,
                isLoading: action.isLoading,
            };
        case CLEACR_COURSESDATA :
            return initialCoursesState;
        default :
            return state;
    }
}

export function course (state = initialCourseState, action) {
    switch (action.type) {
        case RECEIVED_COURSEDATA :
            return {
                ...initialCourseState,
                course: action.course,
                isLoading: action.isLoading,
            };
        case UPDATE_COURSEDATA :
            return {
                ...initialCourseState,
                isLoading: action.isLoading,
                statusCode: action.statusCode,
            };
        case CREATE_COURSEDATA :
            return {
                ...initialCourseState,
                isLoading: action.isLoading,
                statusCode: action.statusCode,
            };
        case DELETE_COURSEDATA :
            return {
                ...initialCourseState,
                isLoading: action.isLoading,
                statusCode: action.statusCode,
            };
        case CLEAR_COURSEDATA :
            return {
                ...initialCourseState,
            };
        default :
            return state;
    }
}