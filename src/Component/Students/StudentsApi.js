import {lmsURL} from "../Login/LoginApi";
import moment from 'moment';
import { redirect, getAccessToken } from "../Utils/Help";

const genderMap = [
    {
        abbr: 'M',
        name: 'Male'
    },
    {
        abbr: 'F',
        name: 'Female'
    }
];


let StudentsApi = {
    getStudentsByPage: async (pageNum) => {
        let endpoint = `${lmsURL}api/students?pageNumber=${pageNum}`;
        try {
            const response = await fetch(endpoint,{
                headers: {
                    'Authorization': getAccessToken(),
                }
            });
            const statusCode = response.status;
            if (statusCode > 300) {
                localStorage.removeItem('accessToken');
                redirect('dashboard');
            } else {
                if (response.ok) {
                    const jsonResponse = await response.json();
                    return {
                        pageNum: jsonResponse.pageNumber,
                        pageSize: jsonResponse.pageSize,
                        totalPage: jsonResponse.totalPage,
                        students: jsonResponse.students.map((student) => {
                            return {
                                id: student.id,
                                name: student.fullName,
                                email: student.email,
                                gender: student.gender,
                                DOB: student.dateOfBirth,
                                credit: student.credit,
                            }
                        }),
                    }
                }
            }

        } catch (e) {
            console.log(e);
        }
    },

    getStudentById: async (id) => {
        let endpoint = `${lmsURL}api/students/${id}`;
        try {
            const response = await fetch(endpoint,{
                headers: {
                    'Authorization': getAccessToken(),
                }
            });
            const statusCode = response.status;
            if (statusCode > 300) {
                localStorage.removeItem('accessToken');
                redirect('dashboard');
            } else {
                if (response.ok) {
                    const jsonResponse = await response.json();
                    const { id, fullName, dateOfBirth, gender, email, credit} = jsonResponse;
                    const firstName = fullName.split(' ')[0];
                    const lastName= fullName.split(' ')[1];
                    const newGender = genderMap.filter((item) => {
                        return  gender === item.abbr;
                    })[0].name;
                    const formatDOB =moment(dateOfBirth).format("YYYY-MM-DD");
                    return {
                        id: id,
                        firstName: firstName,
                        lastName: lastName,
                        gender: newGender,
                        DOB: formatDOB,
                        email: email,
                        credit: credit
                    }
                }
            }
        } catch (e) {
            console.log(e);
        }
    },
};

export default StudentsApi;