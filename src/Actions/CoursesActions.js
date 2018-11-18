import CourseApi from '../Component/Courses/CourseApi';

export const RECEIVED_ALLCOURSESDATA = 'RECEIVED_ALLCOURSESDATA';
export const RECEIVED_COURSEBYIDDATA = 'RECEIVED_COURSEBYIDDATA';


function receivedALLCoursesData(courses) {
    return {
        type: RECEIVED_ALLCOURSESDATA,
        courses,
    }
}

function receivedCourseByIdData(course) {
    return {
        type: RECEIVED_COURSEBYIDDATA,
        course,
    }
}


export function handleReceivedALLCoursesData() {
    return async (dispatch) => {
        const courses = await CourseApi.getAllCourse();
        dispatch(receivedALLCoursesData(courses))
    }
}

export function handleReceivedCourseByIdData(id) {
    return async (dispatch) => {
        const course = await CourseApi.getCourseById(id);
        dispatch(receivedCourseByIdData(course))
    }
}
