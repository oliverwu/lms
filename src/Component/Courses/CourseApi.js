import {lmsURL} from "../Login/LoginApi";
import { redirect, getAccessToken } from "../Utils/Help";

let access_token = localStorage.getItem('accessToken');
let BearerAccessToken = 'Bearer ' + access_token;

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
                    const { title, fee, maxStudent, description, language} = jsonResponse;
                    return {
                        title: title,
                        description: description,
                        fee: fee,
                        maxStudents: maxStudent,
                        language: language,
                    }
                }
            }
        } catch (e) {
            console.log(e);
        }
    },
};

export default CourseApi;

// import axios from 'axios';
// axios.defaults.headers.common.Authorizaiotn = `Bearer ${accessToken}`;