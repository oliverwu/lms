import {CLEACR_LECTURERSDATA, RECEIVED_ALlLECTURERSDATA} from "../Actions/LecturersActions";

const initialState = {
    allLecturers: [],
    isLoading: true,
};

export function lecturers(state = initialState, action) {
    switch (action.type) {
        case RECEIVED_ALlLECTURERSDATA :
            return {
                allLecturers: action.allLecturers,
                isLoading: action.isLoading,
            };
        case CLEACR_LECTURERSDATA :
            return initialState;
        default :
            return state;
    }
}