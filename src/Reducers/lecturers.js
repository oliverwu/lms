import {
    CLEACR_LECTURERSDATA,
    CLEAR_LECTURERDATA,
    CREATE_LECTURERDATA,
    DELETE_LECTURERDATA,
    RECEIVED_LECTURERSBYPAGE,
    RECEIVED_LECTURERDATA,
    UPDATE_LECTURERDATA
} from "../Actions/LecturersActions";

const initialLecturersState = {
    lecturers: [],
    isLoading: true,
    pageNum: 1,
    pageSize: 10,
    totalPage: 1,
    amount: 0,
    statusCode: null,
};

const initialLecturerState = {
    lecturer: {},
    isLoading: true,
    statusCode: null,
};

export function lecturers(state = initialLecturersState, action) {
    const { type, lecturers, isLoading, pageNum, pageSize, totalPage, amount, statusCode } = action;
    switch (type) {
        case RECEIVED_LECTURERSBYPAGE :
            return {
                lecturers,
                isLoading,
                pageNum,
                pageSize,
                totalPage,
                amount,
                statusCode,
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
                lecturer,
                isLoading,
                statusCode,
            };
        case CREATE_LECTURERDATA :
            return {
                lecturer,
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