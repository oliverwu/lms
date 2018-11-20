import CourseApi from '../Component/Courses/CourseApi';

export const RECEIVED_COURSESDATA = 'RECEIVED_COURSESDATA';
export const CLEACR_COURSESDATA = 'CLEACR_COURSESDATA';

function receivedALLCoursesData(allCourses) {
    return {
        type: RECEIVED_COURSESDATA,
        allCourses,
        isLoading: false,
    }
}

export function clearCoursesData() {
    return {
        type: CLEACR_COURSESDATA,
    }
}

export function handleReceivedALLCoursesData() {
    return async (dispatch) => {
        const allCourses = await CourseApi.getAllCourse();
        console.log(allCourses);
        dispatch(receivedALLCoursesData(allCourses))
    }
}

export const RECEIVED_COURSEDATA = 'RECEIVED_COURSEDATA';
export const UPDATE_COURSEDATA = 'UPDATE_COURSEDATA';
export const CREATE_COURSEDATA = 'CREATE_COURSEDATA';
export const DELETE_COURSEDATA = 'DELETE_COURSEDATA';
export const CLEAR_COURSEDATA = 'CLEAR_COURSEDATA';

function receivedCourseData(course) {
    return {
        type: RECEIVED_COURSEDATA,
        course,
        isLoading: false,
        statusCode: null,
    }
}

function updateCourseData(course, statusCode) {
    return {
        type: UPDATE_COURSEDATA,
        course,
        isLoading: false,
        statusCode,
    }
}

function createCourseData(course, statusCode) {
    return {
        type: CREATE_COURSEDATA,
        course,
        isLoading: false,
        statusCode,
    }
}

function deleteCourseData(statusCode) {
    return {
        type: DELETE_COURSEDATA,
        statusCode,
        isLoading: false,
    }
}

export function clearCourseData() {
    return {
        type: CLEAR_COURSEDATA,
    }
}



export function handleReceivedCourseData(id) {
    return async (dispatch) => {
        try {
            const course = await CourseApi.getCourseById(id);
            dispatch(receivedCourseData(course))
        } catch (e) {
            console.log(e)
        }
    }
}

export function handleUpdateCourseData(course) {
    return async (dispatch) => {
        try {
            const statusCode = await CourseApi.updateCourse(course);
            dispatch(updateCourseData(course, statusCode))
        } catch (e) {
            console.log(e)
        }
    }
}

export function handleCreateCourseData(course) {
    return async (dispatch) => {
        try {
            const statusCode = await CourseApi.createNewCourse(course);
            dispatch(createCourseData(course, statusCode))
        } catch (e) {
            console.log(e)
        }
    }
}

export function handleDeleteCourseData(id) {
    return async (dispatch) => {
        try {
            const statusCode = await CourseApi.deleteCourse(id);
            console.log(statusCode);
            dispatch(deleteCourseData(statusCode))
        } catch (e) {
            console.log(e)
        }
    }
}

