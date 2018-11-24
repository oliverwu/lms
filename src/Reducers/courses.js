import {
    RECEIVED_COURSESDATA,
    CLEACR_COURSESDATA,
    RECEIVED_COURSEDATA,
    UPDATE_COURSEDATA,
    CREATE_COURSEDATA,
    DELETE_COURSEDATA,
    CLEAR_COURSEDATA
} from "../Actions/CoursesActions";

const initialCoursesState = {
    allCourses:[],
    isLoading: true,
    statusCode: null,
};

const initialCourseState = {
    course: {},
    isLoading: true,
    statusCode: null,
};

export function courses (state = initialCoursesState, action) {
    const { type, courses, isLoading, statusCode } = action;
    switch (type) {
        case RECEIVED_COURSESDATA :
            return {
                courses,
                isLoading,
                statusCode,
            };
        case CLEACR_COURSESDATA :
            return initialCoursesState;
        default :
            return state;
    }
}

export function course (state = initialCourseState, action) {
    const { type, course, isLoading, statusCode } = action;
    switch (type) {
        case RECEIVED_COURSEDATA :
            return {
                ...initialCourseState,
                course,
                isLoading,
            };
        case UPDATE_COURSEDATA :
            return {
                course,
                isLoading,
                statusCode,
            };
        case CREATE_COURSEDATA :
            return {
                course,
                isLoading,
                statusCode,
            };
        case DELETE_COURSEDATA :
            return {
                ...initialCourseState,
                isLoading,
                statusCode,
            };
        case CLEAR_COURSEDATA :
            return {
                ...initialCourseState,
            };
        default :
            return state;
    }
}