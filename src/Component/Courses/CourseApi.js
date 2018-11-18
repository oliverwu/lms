import {lmsURL} from "../Login/LoginApi";
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
                localStorage.removeItem('accessToken');
                redirect('login');
            } else {
                if (response.ok) {
                    const jsonResponse = await response.json();
                    return (jsonResponse instanceof Array) && jsonResponse.map((data) => {
                        return {
                            id: data.id,
                            title: data.title,
                            description: data.description,
                            fee: data.fee,
                            maxStudent: data.maxStudent,
                            language: data.language,
                        }
                    });
                }
            }
        } catch (e) {
            console.log(e);
        }
    },

    getCourseById: async (id) => {
        let endpoint = `${lmsURL}api/courses/${id}`;
        try {
            const response = await fetch(endpoint,{
                headers: {
                    'Authorization': getAccessToken(),
                }
            });
            const statusCode = response.status;
            if (statusCode > 300) {
                localStorage.removeItem('accessToken');
                redirect('login');
            } else {
                if (response.ok) {
                    const jsonResponse = await response.json();
                    console.log(jsonResponse.maxStudent);
                    const { id, title, fee, maxStudent, description, language} = jsonResponse;
                    return {
                        id: id,
                        title: title,
                        description: description,
                        fee: fee,
                        maxStudent: maxStudent,
                        language: language,
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
            if (statusCode === 401) {
                localStorage.removeItem('accessToken');
                redirect('login');
            } else {
                const jsonResponse = await response.json();
                console.log(jsonResponse);
                return statusCode
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
            if (statusCode === 401) {
                localStorage.removeItem('accessToken');
                redirect('login');
            } else {
                return statusCode
            }
        } catch (e) {
            console.log(e);
        }
    },


    deleteCourse: async (id) => {
        let endpoint = `${lmsURL}api/courses/${id}`;
        try {
            const response = await fetch(endpoint,{
                method: 'DELETE',
                headers: {
                    'Authorization': getAccessToken(),
                },
            });
            const statusCode = response.status;
            if (statusCode === 401) {
                localStorage.removeItem('accessToken');
                redirect('login');
            } else {
                if (response.ok) {
                    const jsonResponse = await response.json();
                    return jsonResponse;
                }
            }
        } catch (e) {
            console.log(e);
        }
    },
};

export default CourseApi;
