import { lmsURL } from "../Login/LoginApiOliver";
import { redirect, getAccessToken } from "../Utils/Help";


let CourseApi = {
    getAllCourse: async () => {
        let endpoint = `${lmsURL}api/courses`;
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
                    courses: [],
                    statusCode,
                };
            } else {
                if (response.ok) {
                    const jsonResponse = await response.json();
                    return {
                        courses: (jsonResponse instanceof Array) ? jsonResponse.map((data) => {
                            return {
                                ...data
                            }
                        }) : [],
                        statusCode,
                    };
                }
            }
        } catch (e) {
            console.log(e);
        }
    },

    getCourseById: async (id) => {
        let endpoint = `${lmsURL}api/courses?id=${id}`;
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
                    course: {},
                    statusCode,
                };
            } else {
                if (response.ok) {
                    const jsonResponse = await response.json();
                    console.log(jsonResponse);
                    return {
                        course: jsonResponse ? {
                            ...jsonResponse
                        } : {},
                        statusCode,
                    }
                }
            }
        } catch (e) {
            console.log(e);
        }
    },

    createNewCourse: async (course) => {
        let endpoint = `${lmsURL}api/courses`;
        try {
            const response = await fetch(endpoint,{
                method: 'POST',
                headers: {
                    'Authorization': getAccessToken(),
                    "Content-type": "application/json",
                },
                body:  JSON.stringify(course)
            });
            const statusCode = response.status;
            if (statusCode > 300) {
                if (statusCode === 401 ) {
                    localStorage.removeItem('accessToken');
                }
                return {
                    course: {},
                    statusCode,
                };
            } else {
                const jsonResponse = await response.json();
                console.log(jsonResponse);
                return {
                    course: jsonResponse ? {
                        ...jsonResponse
                    } : {},
                    statusCode,
                }
            }
        } catch (e) {
            console.log(e);
        }
    },

    updateCourse: async (course) => {
        let endpoint = `${lmsURL}api/courses`;
        try {
            const response = await fetch(endpoint,{
                method: 'PUT',
                headers: {
                    'Authorization': getAccessToken(),
                    "Content-type": "application/json",
                },
                body:  JSON.stringify(course)
            });
            console.log(response);
            const statusCode = response.status;
            if (statusCode > 300) {
                if (statusCode === 401 ) {
                    localStorage.removeItem('accessToken');
                }
                return {
                    course: {},
                    statusCode,
                };
            } else {
                const jsonResponse = await response.json();
                return {
                    course: jsonResponse ? {
                        ...jsonResponse
                    } : {},
                    statusCode,
                }
            }
        } catch (e) {
            console.log(e);
        }
    },


    deleteCourse: async (id) => {
        let endpoint = `${lmsURL}api/courses?id=${id}`;
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
                    course: {},
                    statusCode,
                };
            } else {
                return {
                    course: {},
                    statusCode,
                }
            }
        } catch (e) {
            console.log(e);
        }
    },
};

export default CourseApi;
