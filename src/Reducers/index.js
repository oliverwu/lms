import { combineReducers } from 'redux';
import { courses, course } from "./courses";
import { lecturers, lecturer } from "./lecturers";
import { students } from "./students";
//redux-form
import { reducer as reduxFormReducer } from 'redux-form';

export default combineReducers({
    courses,
    course,
    lecturers,
    lecturer,
    students,
    //redux-form
    form: reduxFormReducer,
})

