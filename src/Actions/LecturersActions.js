import LecturersApi from '../Component/Lecturers/LecturersApi';

export const RECEIVED_ALlLECTURERSDATA = 'RECEIVED_ALlLECTURERSDATA';
export const CLEACR_LECTURERSDATA = 'CLEACR_LECTURERSDATA';

function receivedAllLecturersData(allLecturers) {
    return {
        type: RECEIVED_ALlLECTURERSDATA,
        allLecturers,
        isLoading: false
    }
}

export function clearLecturersData() {
    return {
        type: CLEACR_LECTURERSDATA,
    }
}

export function handleReceivedAllLecturersData() {
    return async (dispatch) => {
        const allLecturers = await LecturersApi.getAllLecturers();
        dispatch(receivedAllLecturersData(allLecturers))
    }
}

export const RECEIVED_LECTURERDATA = 'RECEIVED_LECTURERDATA';
export const UPDATE_LECTURERDATA = 'UPDATE_LECTURERDATA';
export const CREATE_LECTURERDATA = 'CREATE_LECTURERDATA';
export const DELETE_LECTURERDATA = 'DELETE_LECTURERDATA';
export const CLEAR_LECTURERDATA = 'CLEAR_LECTURERDATA';

function receivedLecturerData(lecturer) {
    return {
        type: RECEIVED_LECTURERDATA,
        lecturer,
        isLoading: false,
        statusCode: null,
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
            const lecturer = await LecturersApi.getLecturerById(id);
            dispatch(receivedLecturerData(lecturer));
        } catch (e) {
            console.log(e)
        }
    }
}

export function handleUpdateLecturerData(lecturer) {
    return async (dispatch) => {
        try {
            const statusCode = await LecturersApi.updateLecturer(lecturer);
            dispatch(updateLecturerData(lecturer, statusCode))
        } catch (e) {
            console.log(e)
        }
    }
}

export function handleCreateLecturerData(lecturer) {
    return async (dispatch) => {
        try {
            const statusCode = await LecturersApi.createNewLecturer(lecturer);
            dispatch(createLecturerData(lecturer, statusCode))
        } catch (e) {
            console.log(e)
        }
    }
}

export function handleDeleteLecturerData(id) {
    return async (dispatch) => {
        try {
            const statusCode = await LecturersApi.deleteLecturer(id);
            dispatch(deleteLecturerData(statusCode));
        } catch (e) {
            console.log(e)
        }
    }
}



