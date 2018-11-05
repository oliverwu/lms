import {BearerAccessToken, lmsURL} from "../Login/LoginApi";

let LecturersApi = {
    getAllLecturers: async () => {
        let endpoint = `${lmsURL}api/lecturers`;
        try {
            const response = await fetch(endpoint, {
                headers: {
                    'Authorization': BearerAccessToken,
                }
            });
            const { ok, status} = response;
            if (ok) {
                const jsonResponse = await response.json();
                console.log(jsonResponse);
                return {
                    lecturers: jsonResponse.map((item) => {
                        return {
                            id: item.id,
                            name: item.name,
                            staffNumber: item.staffNumber,
                            email: item.email,
                            bibliography: item.bibliography,
                        }
                    }),
                    statusCode: status,
                }
            } else {
                return {
                    statusCode: status,
                }
            }
        } catch (e) {
            console.log(e)
        }

    }
};

export default LecturersApi;