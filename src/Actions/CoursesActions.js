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

