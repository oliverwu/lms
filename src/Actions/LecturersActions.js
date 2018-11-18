import LecturersApi from '../Component/Lecturers/LecturersApi';

export const RECEIVED_ALlLECTURERSDATA = 'RECEIVED_ALlLECTURERSDATA';
export const RECEIVED_LECTURERBYIDDATA = 'RECEIVED_LECTURERBYIDDATA';

function receivedAllLecturersData(lecturers) {
    return {
        type: RECEIVED_ALlLECTURERSDATA,
        lecturers,
    }
}

function receivedLecturerByIdData(lecturer) {
    return {
        type: RECEIVED_LECTURERBYIDDATA,
        lecturer,
    }
}

export function handleReceivedAllLecturersData() {
    return async (dispatch) => {
        const lecturers = await LecturersApi.getAllLecturers();
        dispatch(receivedAllLecturersData(lecturers))
    }
}

export function handleReceivedLecturerByIdData(id) {
    return async (dispatch) => {
        const lecturer = await LecturersApi.getLecturerById(id);
        dispatch(receivedLecturerByIdData(lecturer))
    }
}


