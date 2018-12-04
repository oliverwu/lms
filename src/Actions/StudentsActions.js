import StudentsApi from '../Component/Students/StudentsApi';

export const RECEIVED_STUDENTSDATABYPAGE = 'RECEIVED_STUDENTSDATABYPAGE';
export const CLEAR_STUDENTSDATA = "CLEAR_STUDENTDATA";

function receivedStudentsDataByPage(students, pageNum, pageSize, totalPage, amount, statusCode) {
    return {
        type: RECEIVED_STUDENTSDATABYPAGE,
        students,
        isLoading: false,
        pageNum,
        pageSize,
        totalPage,
        amount,
        statusCode,
    }
}

export function clearStudentsData() {
    return {
        type: CLEAR_STUDENTSDATA
    }
}

export function handleReceivedStudentsDataByPage(pageSize, pageNum) {
    return async (dispatch) => {
        try {
            const data = await StudentsApi.getStudentsByPage(pageSize, pageNum);
            data && dispatch(receivedStudentsDataByPage(data.students, data.pageNum, data.pageSize, data.totalPage, data.amount, data.statusCode))
        } catch (e) {
            console.log(e);
        }
    }
}

export const RECEIVED_STUDENTDATA = 'RECEIVED_STUDENTDATA';
export const UPDATE_STUDENTDATA = 'UPDATE_STUDENTDATA';
export const CREATE_STUDENTDATA = 'CREATE_STUDENTDATA';
export const DELETE_STUDENTDATA = 'DELETE_STUDENTDATA';
export const CLEAR_STUDENTDATA = 'CLEAR_STUDENTDATA';

function receivedStudentData(student, statusCode) {
    return {
        type: RECEIVED_STUDENTDATA,
        student,
        isLoading: false,
        statusCode,
    }
}

function updateStudentData(student, statusCode) {
    return {
        type: UPDATE_STUDENTDATA,
        student,
        isLoading: false,
        statusCode,
    }
}

function createStudentData(student, statusCode) {
    return {
        type: CREATE_STUDENTDATA,
        student,
        isLoading: false,
        statusCode,
    }
}

function deleteStudentData(statusCode) {
    return {
        type: DELETE_STUDENTDATA,
        isLoading: false,
        statusCode,
    }
}

export function clearStudentData() {
    return {
        type: CLEAR_STUDENTDATA,
    }
}



export function handleReceivedStudentData(id) {
    return async (dispatch) => {
        try {
            const data = await StudentsApi.getStudentById(id);
            data && dispatch(receivedStudentData(data.student, data.statusCode))
        } catch (e) {
            console.log(e)
        }
    }
}

export function handleUpdateStudentData(student) {
    return async (dispatch) => {
        try {
            const data = await StudentsApi.updateStudent(student);
            data && dispatch(updateStudentData(data.student, data.statusCode))
        } catch (e) {
            console.log(e)
        }
    }
}

export function handleCreateStudentData(student) {
    return async (dispatch) => {
        try {
            const data = await StudentsApi.createNewStudent(student);
            data && dispatch(createStudentData(data.student, data.statusCode))
        } catch (e) {
            console.log(e)
        }
    }
}

export function handleDeleteStudentData(id) {
    return async (dispatch) => {
        try {
            const data = await StudentsApi.deleteStudent(id);
            data && dispatch(deleteStudentData(data.statusCode))
        } catch (e) {
            console.log(e)
        }
    }
}



