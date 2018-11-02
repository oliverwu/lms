import {BearerAccessToken, lmsURL} from "../Login/LoginApi";

// let lmsURL = 'https://lms1210.azurewebsites.net/';
// let accessToken = '4Ou8PSD5ga52rvlDE-wK1Ly4RJWf7UcXZwYImlulP9Y0hW6qL2Qc2eVLKGBAiKY9LHnDF3MqmquUwEDaeSEPsynTcZggcatiAyL6Soj3t5WRIzYwUXaekNlwijMAtGhG7MkKdwWs7H7wGt8nGErd3oopr2g54hAS8LIKiAbjonR36zft7poBk2pSAjPjepAKSPC31d5q8RiFMnj5YVeXaBi_8jvxpBbG9-IcKmORF9A';
// let BearerAccessToken = 'Bearer ' + access_token;


let StudentsApi = {
    getStudentsByPage: async (pageNum) => {
        let endpoint = `${lmsURL}api/students?pageNumber=${pageNum}`;
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
                    pageNum: jsonResponse.pageNumber,
                    pageSize: jsonResponse.pageSize,
                    totalPage: jsonResponse.totalPage,
                    students: jsonResponse.students.map((student) => {
                        return {
                            id: student.id,
                            name: student.fullName,
                            email: student.email,
                            gender: student.gender,
                            DOB: student.dateOfBirth,
                            credit: student.credit,
                        }
                    }),
                    statusCode: statusCode,
                }
            } else {
                return {
                    statusCode: statusCode,
                }
            }
        } catch (e) {
            console.log(e);
        }
    },
    getStudentsPageSize: async () => {
        let endpoint = `${lmsURL}api/students`;
        try {
            const response = await fetch(endpoint,{
                headers: {
                    'Authorization': BearerAccessToken,
                }
            });
            const statusCode = response.status;
            if (response.ok) {
                const jsonResponse = await response.json();
                return {
                    pageSize: jsonResponse.pageSize,
                    statusCode: statusCode,
                }
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

export default StudentsApi;