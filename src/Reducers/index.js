import { combineReducers } from 'redux';
import { courses, course } from "./courses";
import { lecturers, lecturer } from "./lecturers";
import { students, student } from "./students";
//redux-form
import { reducer as reduxFormReducer } from 'redux-form';

export default combineReducers({
    courses,
    course,
    lecturers,
    lecturer,
    students,
    student,
    //redux-form
    form: reduxFormReducer,
})

