import CourseApi from '../Component/Courses/CourseApi';

export const RECEIVED_COURSESDATA = 'RECEIVED_COURSESDATA';
export const CLEACR_COURSESDATA = 'CLEACR_COURSESDATA';

function receivedCoursesData(courses, statusCode) {
    return {
        type: RECEIVED_COURSESDATA,
        courses,
        isLoading: false,
        statusCode,
    }
}

export function clearCoursesData() {
    return {
        type: CLEACR_COURSESDATA,
    }
}

export function handleReceivedCoursesData() {
    return async (dispatch) => {
        try {
            const data = await CourseApi.getAllCourse();
            data && dispatch(receivedCoursesData(data.courses, data.statusCode))
        } catch (e) {
            console.log(e)
        }

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
            const data = await CourseApi.getCourseById(id);
            data && dispatch(receivedCourseData(data.course, data.statusCode))
        } catch (e) {
            console.log(e)
        }
    }
}

export function handleUpdateCourseData(course) {
    return async (dispatch) => {
        try {
            const data = await CourseApi.updateCourse(course);
            data && dispatch(updateCourseData(data.course, data.statusCode))
        } catch (e) {
            console.log(e)
        }
    }
}

export function handleCreateCourseData(course) {
    return async (dispatch) => {
        try {
            const data = await CourseApi.createNewCourse(course);
            data && dispatch(createCourseData(data.course, data.statusCode))
        } catch (e) {
            console.log(e)
        }
    }
}

export function handleDeleteCourseData(id) {
    return async (dispatch) => {
        try {
            const data = await CourseApi.deleteCourse(id);
            data && dispatch(deleteCourseData(data.statusCode))
        } catch (e) {
            console.log(e)
        }
    }
}

