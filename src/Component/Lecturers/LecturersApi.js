import {lmsURL} from "../Login/LoginApi";
import { redirect, getAccessToken} from "../Utils/Help";

let access_token = localStorage.getItem('accessToken');
let BearerAccessToken = 'Bearer ' + access_token;

let LecturersApi = {
    getAllLecturers: async () => {
        let endpoint = `${lmsURL}api/lecturers`;
        try {
            const response = await fetch(endpoint, {
                headers: {
                    'Authorization': getAccessToken(),
                }
            });
            const { ok, status} = response;
            console.log(status);
            if ( status > 300) {
                localStorage.removeItem('accessToken');
                redirect('login');
            } else {
                if (ok) {
                    const jsonResponse = await response.json();
                    console.log(jsonResponse);
                    return jsonResponse.map((item) => {
                        return {
                            id: item.id,
                            name: item.name,
                            staffNumber: item.staffNumber,
                            email: item.email,
                            bibliography: item.bibliography,
                        }
                    })
                }
            }
        } catch (e) {
            console.log(e)
        }

    }
};

export default LecturersApi;