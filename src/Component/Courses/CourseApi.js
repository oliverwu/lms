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
};

export default CourseApi;