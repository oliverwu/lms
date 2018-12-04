import {lmsURL} from "../Login/LoginApiOliver";
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
    getStudentsByPage: async ( pageSize, pageNum ) => {
        let endpoint = `${lmsURL}api/students?pageSize=${pageSize}&pageNumber=${pageNum}`;
        try {
            const response = await fetch(endpoint,{
                headers: {
                    'Authorization': getAccessToken(),
                }
            });
            const statusCode = response.status;
            if (statusCode > 300) {
                if (statusCode === 401 ) {
                    localStorage.removeItem('accessToken');
                }
                return {
                    students: [],
                    pageNum: 1,
                    pageSize: 10,
                    totalPage: 1,
                    amount: 0,
                    statusCode,
                };
            } else {
                if (response.ok) {
                    const jsonResponse = await response.json();
                    return {
                        pageNum: jsonResponse.pageNumber,
                        pageSize: jsonResponse.pageSize,
                        totalPage: jsonResponse.totalPage,
                        amount: jsonResponse.amount,
                        students: jsonResponse.students.map((student) => {
                            const dateOfBirth = moment(student.dateOfBirth).format("YYYY-MM-DD");
                            return {
                                id: student.id,
                                name: `${student.firstName} ${student.lastName}`,
                                email: student.email,
                                gender: student.gender,
                                dateOfBirth,
                                credit: student.credit,
                            }
                        }),
                        statusCode,
                    }
                }
            }

        } catch (e) {
            console.log(e);
        }
    },

    getStudentById: async (id) => {
        let endpoint = `${lmsURL}api/students?id=${id}`;
        try {
            const response = await fetch(endpoint,{
                headers: {
                    'Authorization': getAccessToken(),
                }
            });
            const statusCode = response.status;
            if (statusCode > 300) {
                if (statusCode === 401 ) {
                    localStorage.removeItem('accessToken');
                }
                return {
                    student: {},
                    statusCode,
                };
            } else {
                if (response.ok) {
                    const jsonResponse = await response.json();
                    const newGender = genderMap.filter((item) => {
                        return  jsonResponse.gender === item.abbr;
                    })[0].name;
                    const dateOfBirth =moment(jsonResponse.dateOfBirth).format("YYYY-MM-DD");
                    return {
                        student: {
                            ...jsonResponse,
                            gender: newGender,
                            dateOfBirth,
                        },
                        statusCode,
                    }
                }
            }
        } catch (e) {
            console.log(e);
        }
    },

    createNewStudent: async (student) => {
        let endpoint = `${lmsURL}api/students`;
        try {
            const response = await fetch(endpoint,{
                method: 'POST',
                headers: {
                    'Authorization': getAccessToken(),
                    "Content-type": "application/json",
                },
                body:  JSON.stringify(student)
            });
            const statusCode = response.status;
            if (statusCode > 300) {
                if (statusCode === 401 ) {
                    localStorage.removeItem('accessToken');
                }
                return {
                    student: {},
                    statusCode,
                };
            } else {
                if (response.ok) {
                    const jsonResponse = await response.json();
                    const newGender = genderMap.filter((item) => {
                        return  jsonResponse.gender === item.abbr;
                    })[0].name;
                    const dateOfBirth =moment(jsonResponse.dateOfBirth).format("YYYY-MM-DD");
                    return {
                        student: {
                            ...jsonResponse,
                            gender: newGender,
                            dateOfBirth,
                        },
                        statusCode,
                    }
                }
            }
        } catch (e) {
            console.log(e);
        }
    },

    updateStudent: async (student) => {
        let endpoint = `${lmsURL}api/students`;
        try {
            const response = await fetch(endpoint,{
                method: 'PUT',
                headers: {
                    'Authorization': getAccessToken(),
                    "Content-type": "application/json",
                },
                body:  JSON.stringify(student)
            });
            const statusCode = response.status;
            if (statusCode > 300) {
                if (statusCode === 401 ) {
                    localStorage.removeItem('accessToken');
                }
                return {
                    student: {},
                    statusCode,
                };
            } else {
                if (response.ok) {
                    const jsonResponse = await response.json();
                    const newGender = genderMap.filter((item) => {
                        return  jsonResponse.gender === item.abbr;
                    })[0].name;
                    const dateOfBirth =moment(jsonResponse.dateOfBirth).format("YYYY-MM-DD");
                    return {
                        student: {
                            ...jsonResponse,
                            gender: newGender,
                            dateOfBirth,
                        },
                        statusCode,
                    }
                }
            }
        } catch (e) {
            console.log(e);
        }
    },

    deleteStudent: async (id) => {
        let endpoint = `${lmsURL}api/students?id=${id}`;
        try {
            const response = await fetch(endpoint,{
                method: 'DELETE',
                headers: {
                    'Authorization': getAccessToken(),
                },
            });
            const statusCode = response.status;
            if (statusCode > 300) {
                if (statusCode === 401 ) {
                    localStorage.removeItem('accessToken');
                }
                return {
                    student: {},
                    statusCode,
                };
            } else {
                return {
                    student: {},
                    statusCode,
                }
            }
        } catch (e) {
            console.log(e);
        }
    },
};

export default StudentsApi;