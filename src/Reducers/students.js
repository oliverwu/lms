import {CLEAR_STUDENTDATA, RECEIVED_STUDENTSDATABYPAGE} from "../Actions/StudentsActions";

const initialState = {
    students: [],
    isLoading: true,
    pageNum: 1,
    pageSize: 10,
    totalPage: 1,
    count: 0,
};

export function students(state = initialState, action) {
    switch (action.type) {
        case RECEIVED_STUDENTSDATABYPAGE :
            return {
                students: action.students,
                isLoading: action.isLoading,
                pageNum: action.pageNum,
                pageSize: action.pageSize,
                totalPage: action.totalPage,
                count: action.count,
            };
        case CLEAR_STUDENTDATA :
            return initialState;
        default :
            return state
    }
}