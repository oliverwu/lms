import {
    CLEACR_LECTURERSDATA, CLEAR_LECTURERDATA, CREATE_LECTURERDATA, DELETE_LECTURERDATA,
    RECEIVED_ALlLECTURERSDATA,
    RECEIVED_LECTURERDATA,
    UPDATE_LECTURERDATA
} from "../Actions/LecturersActions";

const initialLecturersState = {
    allLecturers: [],
    isLoading: true,
};

const initialLecturerState = {
    lecturer: {},
    isLoading: true,
    statusCode: null,
};

export function lecturers(state = initialLecturersState, action) {
    const { type, allLecturers, isLoading} = action;
    switch (type) {
        case RECEIVED_ALlLECTURERSDATA :
            return {
                allLecturers,
                isLoading,
            };
        case CLEACR_LECTURERSDATA :
            return initialLecturersState;
        default :
            return state;
    }
}

export function lecturer(state = initialLecturerState, action) {
    const { type, lecturer, isLoading, statusCode} = action;
    switch (type) {
        case RECEIVED_LECTURERDATA :
            return {
                ...initialLecturerState,
                lecturer,
                isLoading,
            };
        case UPDATE_LECTURERDATA :
            return {
                ...initialLecturerState,
                isLoading,
                statusCode,
            };
        case CREATE_LECTURERDATA :
            return {
                ...initialLecturerState,
                isLoading,
                statusCode,
            };
        case DELETE_LECTURERDATA :
            return {
                ...initialLecturerState,
                isLoading,
                statusCode,
            };
        case CLEAR_LECTURERDATA :
            return {
                ...initialLecturerState,
            };
        default :
            return state;
    }
}