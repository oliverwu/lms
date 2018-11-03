// import axios from 'axios';
import {lmsURL, BearerAccessToken} from "../Login/LoginApi";


// axios.defaults.headers.common.Authorizaiotn = `Bearer ${accessToken}`;


let CourseApi = {
    getAllCourse: async () => {
        let endpoint = `${lmsURL}api/courses`;
        try {
            const response = await fetch(endpoint,{
                headers: {
                    'Authorization': BearerAccessToken,
                }
            });
            const statusCode = response.status;
            console.log(response);
            if (response.ok) {
                const jsonResponse = await response.json();
                console.log(jsonResponse);
                return {
                    statusCode: statusCode,
                    courses: (jsonResponse instanceof Array) && jsonResponse.map((data) => {
                        return {
                            id: data.id,
                            title: data.title,
                            description: data.description,
                            fee: data.fee,
                            maxStudent: data.maxStudent,
                            language: data.language,
                        }
                    })
                };
            } else {
                return {
                    statusCode: statusCode,
                }
            }
        } catch (e) {
            console.log(e);
        }
    },

    getAllCourseById: async (id) => {
        let endpoint = `${lmsURL}api/courses/${id}`;
        try {
            const response = await fetch(endpoint,{
                headers: {
                    'Authorization': BearerAccessToken,
                }
            });
            const statusCode = response.status;
            if (response.ok) {
                const jsonResponse = await response.json();
                console.log(jsonResponse);
                const { title, fee, maxStudent, description, language} = jsonResponse;
                console.log({ title, fee, maxStudent, description, language});
                return {
                    statusCode: statusCode,
                    course: {
                        title: title,
                        description: description,
                        fee: fee,
                        maxStudents: maxStudent,
                        language: language,
                    }
                };
            } else {
                return {
                    statusCode: statusCode,
                }
            }
        } catch (e) {
            console.log(e);
        }
    },
};

export default CourseApi;