import StudentsApi from '../Component/Students/StudentsApi';

export const RECEIVED_STUDENTSDATA = 'RECEIVED_STUDENTSDATA';

function receivedStudentsData(students) {
    return {
        type: RECEIVED_STUDENTSDATA,
        students,
    }
}

export function handleReceivedStudentsData(id) {
    return async (dispatch) => {
        const students = await StudentsApi.getStudentsByPage(id);
        dispatch(receivedStudentsData(students))
    }
}



