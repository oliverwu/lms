import LecturersApi from '../Component/Lecturers/LecturersApi';
import StudentsApi from "../Component/Students/StudentsApi";

export const RECEIVED_LECTURERSBYPAGE = 'RECEIVED_LECTURERSBYPAGE';
export const CLEACR_LECTURERSDATA = 'CLEACR_LECTURERSDATA';

function receivedLecturersDataByPage(lecturers, pageNum, pageSize, totalPage, amount, statusCode) {
    return {
        type: RECEIVED_LECTURERSBYPAGE,
        lecturers,
        isLoading: false,
        pageNum,
        pageSize,
        totalPage,
        amount,
        statusCode,
    }
}

export function clearLecturersData() {
    return {
        type: CLEACR_LECTURERSDATA,
    }
}

export function handleReceivedLecturersDataByPage(pageSize, pageNum) {
    return async (dispatch) => {
        try {
            const data = await LecturersApi.getLecturersByPage(pageSize, pageNum);
            data && dispatch(receivedLecturersDataByPage(data.lecturers, data.pageNum, data.pageSize, data.totalPage, data.amount, data.statusCode))
        } catch (e) {
            console.log(e);
        }
    }
}

export const RECEIVED_LECTURERDATA = 'RECEIVED_LECTURERDATA';
export const UPDATE_LECTURERDATA = 'UPDATE_LECTURERDATA';
export const CREATE_LECTURERDATA = 'CREATE_LECTURERDATA';
export const DELETE_LECTURERDATA = 'DELETE_LECTURERDATA';
export const CLEAR_LECTURERDATA = 'CLEAR_LECTURERDATA';

function receivedLecturerData(lecturer, statusCode) {
    return {
        type: RECEIVED_LECTURERDATA,
        lecturer,
        isLoading: false,
        statusCode,
    }
}

function updateLecturerData(lecturer, statusCode) {
    return {
        type: UPDATE_LECTURERDATA,
        lecturer,
        isLoading: false,
        statusCode,
    }
}

function createLecturerData(lecturer, statusCode) {
    return {
        type: CREATE_LECTURERDATA,
        lecturer,
        isLoading: false,
        statusCode,
    }
}

function deleteLecturerData(statusCode) {
    return {
        type: DELETE_LECTURERDATA,
        isLoading: false,
        statusCode,
    }
}

export function clearLecturerData() {
    return {
        type: CLEAR_LECTURERDATA,
    }
}

export function handleReceivedLecturerData(id) {
    return async (dispatch) => {
        try {
            const data = await LecturersApi.getLecturerById(id);
            data && dispatch(receivedLecturerData(data.lecturer, data.statusCode));
        } catch (e) {
            console.log(e)
        }
    }
}

export function handleUpdateLecturerData(lecturer) {
    return async (dispatch) => {
        try {
            const data = await LecturersApi.updateLecturer(lecturer);
            data && dispatch(updateLecturerData(data.lecturer, data.statusCode))
        } catch (e) {
            console.log(e)
        }
    }
}

export function handleCreateLecturerData(lecturer) {
    return async (dispatch) => {
        try {
            const data = await LecturersApi.createNewLecturer(lecturer);
            data && dispatch(createLecturerData(data.lecturer, data.statusCode))
        } catch (e) {
            console.log(e)
        }
    }
}

export function handleDeleteLecturerData(id) {
    return async (dispatch) => {
        try {
            const data = await LecturersApi.deleteLecturer(id);
            dispatch(deleteLecturerData(data.statusCode));
        } catch (e) {
            console.log(e)
        }
    }
}



