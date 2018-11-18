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


