import {
    CLEAR_STUDENTDATA,
    CLEAR_STUDENTSDATA,
    CREATE_STUDENTDATA,
    DELETE_STUDENTDATA,
    RECEIVED_STUDENTDATA,
    RECEIVED_STUDENTSDATABYPAGE,
    UPDATE_STUDENTDATA
} from "../Actions/StudentsActions";


const initialStudentsState = {
    students: [],
    isLoading: true,
    pageNum: 1,
    pageSize: 10,
    totalPage: 1,
    amount: 0,
    statusCode: null,
};

const initialStudentState = {
    student: {},
    isLoading: true,
    statusCode: null,
};

export function students(state = initialStudentsState, action) {
    const { type, students, isLoading, pageNum, pageSize, totalPage, amount, statusCode } = action;
    switch (type) {
        case RECEIVED_STUDENTSDATABYPAGE :
            return {
                students,
                isLoading,
                pageNum,
                pageSize,
                totalPage,
                amount,
                statusCode,
            };
        case CLEAR_STUDENTSDATA :
            return initialStudentsState;
        default :
            return state
    }
}

export function student (state = initialStudentState, action) {
    const { type, student, isLoading, statusCode } = action;
    switch (type) {
        case RECEIVED_STUDENTDATA :
            return {
                ...initialStudentState,
                student,
                isLoading,
            };
        case UPDATE_STUDENTDATA :
            return {
                student,
                isLoading,
                statusCode,
            };
        case CREATE_STUDENTDATA :
            return {
                student,
                isLoading,
                statusCode,
            };
        case DELETE_STUDENTDATA :
            return {
                ...initialStudentState,
                isLoading,
                statusCode,
            };
        case CLEAR_STUDENTDATA :
            return {
                ...initialStudentState,
            };
        default :
            return state;
    }
}