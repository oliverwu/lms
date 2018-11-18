import CourseApi from '../Component/Courses/CourseApi';

export const RECEIVED_ALLCOURSESDATA = 'RECEIVED_ALLCOURSESDATA';

function receivedALLCoursesData(allCourses) {
    return {
        type: RECEIVED_ALLCOURSESDATA,
        allCourses,
        isLoading: false,
    }
}

export function handleReceivedALLCoursesData() {
    return async (dispatch) => {
        const allCourses = await CourseApi.getAllCourse();
        dispatch(receivedALLCoursesData(allCourses))
    }
}

