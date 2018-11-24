import { lmsURL } from "../Login/LoginApiOliver";
import { getAccessToken } from "../Utils/Help";


let LecturersApi = {
    getLecturersByPage: async ( pageSize, pageNum ) => {
        let endpoint = `${lmsURL}api/lecturers?pageSize=${pageSize}&pageNumber=${pageNum}`;
        try {
            const response = await fetch(endpoint, {
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
                    lecturers: [],
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
                        lecturers: jsonResponse.lecturers.map((lecturer) => {
                            return {
                                ...lecturer
                            }
                        }),
                        statusCode,
                    }
                }
            }
        } catch (e) {
            console.log(e)
        }
    },

    getLecturerById: async (id) => {
        let endpoint = `${lmsURL}api/lecturers?id=${id}`;
        try {
            const response = await fetch(endpoint, {
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
                    lecturer: {},
                    statusCode,
                };
            } else {
                if (response.ok) {
                    const jsonResponse = await response.json();
                    const { name } = jsonResponse;
                    const firstName = name.split(' ')[0];
                    const lastName= name.split(' ')[1];
                    return {
                        lecturer: {
                            ...jsonResponse,
                            firstName,
                            lastName,
                        },
                        statusCode,
                    }
                }
            }
        } catch (e) {
            console.log(e)
        }
    },

    createNewLecturer: async (lecturer) => {
        let endpoint = `${lmsURL}api/lecturers`;
        try {
            const response = await fetch(endpoint,{
                method: 'POST',
                headers: {
                    'Authorization': getAccessToken(),
                    "Content-type": "application/json",
                },
                body:  JSON.stringify(lecturer)
            });
            const statusCode = response.status;
            if (statusCode > 300) {
                if (statusCode === 401 ) {
                    localStorage.removeItem('accessToken');
                }
                return {
                    lecturer: {},
                    statusCode,
                };
            } else {
                if (response.ok) {
                    const jsonResponse = await response.json();
                    const { name } = jsonResponse;
                    const firstName = name.split(' ')[0];
                    const lastName= name.split(' ')[1];
                    return {
                        lecturer: {
                            ...jsonResponse,
                            firstName,
                            lastName,
                        },
                        statusCode,
                    }
                }
            }
        } catch (e) {
            console.log(e);
        }
    },

    updateLecturer: async (lecturer) => {
        let endpoint = `${lmsURL}api/lecturers`;
        try {
            const response = await fetch(endpoint,{
                method: 'PUT',
                headers: {
                    'Authorization': getAccessToken(),
                    "Content-type": "application/json",
                },
                body:  JSON.stringify(lecturer)
            });
            const statusCode = response.status;
            if (statusCode > 300) {
                if (statusCode === 401 ) {
                    localStorage.removeItem('accessToken');
                }
                return {
                    lecturer: {},
                    statusCode,
                };
            } else {
                if (response.ok) {
                    const jsonResponse = await response.json();
                    const { name } = jsonResponse;
                    const firstName = name.split(' ')[0];
                    const lastName= name.split(' ')[1];
                    return {
                        lecturer: {
                            ...jsonResponse,
                            firstName,
                            lastName,
                        },
                        statusCode,
                    }
                }
            }
        } catch (e) {
            console.log(e);
        }
    },

    deleteLecturer: async (id) => {
        let endpoint = `${lmsURL}api/lecturers?id=${id}`;
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
                    lecturer: {},
                    statusCode,
                };
            } else {
                return {
                    lecturer: {},
                    statusCode,
                }
            }
        } catch (e) {
            console.log(e);
        }
    },
};

export default LecturersApi;