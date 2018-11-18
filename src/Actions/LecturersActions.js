import LecturersApi from '../Component/Lecturers/LecturersApi';

export const RECEIVED_ALlLECTURERSDATA = 'RECEIVED_ALlLECTURERSDATA';

function receivedAllLecturersData(allLecturers) {
    return {
        type: RECEIVED_ALlLECTURERSDATA,
        allLecturers,
    }
}

export function handleReceivedAllLecturersData() {
    return async (dispatch) => {
        const allLecturers = await LecturersApi.getAllLecturers();
        dispatch(receivedAllLecturersData(allLecturers))
    }
}


