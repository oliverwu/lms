import StudentsApi from '../Component/Students/StudentsApi';

export const RECEIVED_STUDENTSDATABYPAGE = 'RECEIVED_STUDENTSDATABYPAGE';
export const CLEAR_STUDENTDATA = "CLEAR_STUDENTDATA";

function receivedStudentsDataByPage(students, pageNum, pageSize, totalPage, count) {
    return {
        type: RECEIVED_STUDENTSDATABYPAGE,
        students,
        isLoading: false,
        pageNum,
        pageSize,
        totalPage,
        count,
    }
}

export function clearStudentsData() {
    return {
        type: CLEAR_STUDENTDATA
    }
}

export function handleReceivedStudentsDataByPage(page) {
    return async (dispatch) => {
        const data = await StudentsApi.getStudentsByPage(page);
        if (data) {
            const { pageNum, pageSize, totalPage, students} = data;
            const dataInLastPage = await StudentsApi.getStudentsByPage(totalPage);
            const studentsInLastPageCount = dataInLastPage.students.length;
            const count = (totalPage - 1)*pageSize + studentsInLastPageCount;
            dispatch(receivedStudentsDataByPage(students, pageNum, pageSize, totalPage, count))
        } else {
            dispatch(receivedStudentsDataByPage())
        }
    }
}



