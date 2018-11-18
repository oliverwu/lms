import { RECEIVED_ALlLECTURERSDATA } from "../Actions/LecturersActions";

export function allLecturers(state = [], action) {
    switch (action.type) {
        case RECEIVED_ALlLECTURERSDATA :
            return action.allLecturers;
        default :
            return state;
    }
}