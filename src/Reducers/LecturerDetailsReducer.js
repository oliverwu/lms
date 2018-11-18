import { RECEIVED_LECTURERBYIDDATA } from "../Actions/LecturersActions";

export function LecturerDetailsReducer(state = {}, action) {
    switch (action.type) {
        case RECEIVED_LECTURERBYIDDATA :
            return action.lecturer;
        default :
            return state;
    }
}