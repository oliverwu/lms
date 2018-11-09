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
    },

    getLecturerById: async (id) => {
        let endpoint = `${lmsURL}api/lecturers/${id}`;
        try {
            const response = await fetch(endpoint, {
                headers: {
                    'Authorization': getAccessToken(),
                }
            });
            const { ok, status} = response;
            if ( status > 300) {
                localStorage.removeItem('accessToken');
                redirect('login');
            } else {
                if (ok) {
                    const jsonResponse = await response.json();
                    const { id, name, staffNumber, email, bibliography } = jsonResponse;
                    const firstName = name.split(' ')[0];
                    const lastName= name.split(' ')[1];
                    return {
                        id: id,
                        firstName: firstName,
                        lastName: lastName,
                        staffNumber: staffNumber,
                        email: email,
                        bibliography: bibliography,
                    }
                }
            }
        } catch (e) {
            console.log(e)
        }
    }
};

export default LecturersApi;